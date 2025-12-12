import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { generateOrbitPoints } from '../orbit/propagate';
import { useKeeptrackStore } from '../store';
import { useTLECatalog } from '../tle/useTLECatalog';

export const OrbitLines: React.FC = () => {
  const { selection, timeline, frame } = useKeeptrackStore();
  const { getById } = useTLECatalog();

  const orbitData = useMemo(() => {
    if (!selection.id) return null;
    
    const satellite = getById(selection.id);
    if (!satellite) return null;
    
    const currentDate = new Date(timeline.dateISO);
    const points = generateOrbitPoints(satellite, currentDate, frame, 120);
    
    if (!points || points.length === 0) return null;
    
    return {
      points: points.map(p => [p.x, p.y, p.z] as [number, number, number]),
      name: satellite.name
    };
  }, [selection.id, timeline.dateISO, frame, getById]);

  if (!orbitData) return null;

  return (
    <Line
      points={orbitData.points}
      color="#00D1FF"
      lineWidth={2}
      transparent
      opacity={0.8}
    />
  );
};