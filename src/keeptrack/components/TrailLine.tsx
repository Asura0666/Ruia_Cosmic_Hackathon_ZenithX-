import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { generateTrailPoints } from '../orbit/propagate';
import { useKeeptrackStore } from '../store';
import { useTLECatalog } from '../tle/useTLECatalog';

export const TrailLine: React.FC = () => {
  const { selection, timeline, frame } = useKeeptrackStore();
  const { getById } = useTLECatalog();

  const trailData = useMemo(() => {
    if (!selection.id) return null;
    
    const satellite = getById(selection.id);
    if (!satellite) return null;
    
    const currentDate = new Date(timeline.dateISO);
    const points = generateTrailPoints(satellite, currentDate, frame, 60, 30);
    
    // Prevent Line component error with empty points array
    if (!points || points.length === 0) return null;
    
    return points.map(p => [p.x, p.y, p.z] as [number, number, number]);
  }, [selection.id, timeline.dateISO, frame, getById]);

  if (!trailData || trailData.length === 0) return null;

  return (
    <Line
      points={trailData}
      color="#FF6B35"
      lineWidth={3}
      transparent
      opacity={0.7}
    />
  );
};