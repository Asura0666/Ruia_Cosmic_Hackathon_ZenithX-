import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { fetchTLEData } from './sources';
import { parseTLEData, searchSatellites, filterSatellites } from './parsers';
import { useKeeptrackStore } from '../store';
import type { TLERecord } from '@/types/keeptrack';

export const useTLECatalog = () => {
  const { filters, query, timeline } = useKeeptrackStore();

  // Fetch individual catalogs
  const starlink = useQuery({
    queryKey: ['tle', 'starlink'],
    queryFn: () => fetchTLEData('starlink').then(parseTLEData),
    staleTime: 15 * 60 * 1000, // 15 minutes
    refetchInterval: false, // Disable auto-refetch for now
  });

  const mixed = useQuery({
    queryKey: ['tle', 'mixed'],
    queryFn: () => fetchTLEData('mixed').then(parseTLEData),
    staleTime: 15 * 60 * 1000,
    refetchInterval: false, // Disable auto-refetch for now
  });

  // Combined catalog
  const allRecords = useMemo(() => {
    const records: TLERecord[] = [];
    if (starlink.data) records.push(...starlink.data);
    if (mixed.data) records.push(...mixed.data);
    
    // Remove duplicates by ID
    const unique = new Map<string, TLERecord>();
    records.forEach((record) => unique.set(record.id, record));
    
    return Array.from(unique.values());
  }, [starlink.data, mixed.data]);

  // Apply filters and search
  const filteredRecords = useMemo(() => {
    let results = allRecords;
    results = filterSatellites(results, filters);
    results = searchSatellites(results, query);
    return results;
  }, [allRecords, filters, query]);

  // Selectors
  const getById = useMemo(() => {
    const map = new Map<string, TLERecord>();
    allRecords.forEach((record) => map.set(record.id, record));
    return (id: string) => map.get(id);
  }, [allRecords]);

  const getByGroup = useMemo(() => {
    const groups = new Map<string, TLERecord[]>();
    allRecords.forEach((record) => {
      const group = groups.get(record.group) || [];
      group.push(record);
      groups.set(record.group, group);
    });
    return groups;
  }, [allRecords]);

  return {
    records: filteredRecords,
    allRecords,
    getById,
    getByGroup,
    isLoading: starlink.isLoading || mixed.isLoading,
    error: starlink.error || mixed.error,
    refetch: () => {
      starlink.refetch();
      mixed.refetch();
    },
  };
};