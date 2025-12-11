import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { generateGroundTrack, processGroundTrackForRendering } from '../orbit/groundtrack';
import { useKeeptrackStore } from '../store';
import { useTLECatalog } from '../tle/useTLECatalog';

export const GroundTrackLine: React.FC = () => {
  const { selection, timeline } = useKeeptrackStore();
  const { getById } = useTLECatalog();

  const groundTrackData = useMemo(() => {
    if (!selection.id) return [];
    
    const satellite = getById(selection.id);
    if (!satellite) return [];
    
    const currentDate = new Date(timeline.dateISO);
    const groundTrack = generateGroundTrack(satellite, currentDate, 120, 240);
    const segments = processGroundTrackForRendering(groundTrack);
    
    return segments.map(segment => 
      segment.map(point => [point.position3D.x, point.position3D.y, point.position3D.z] as [number, number, number])
    );
  }, [selection.id, timeline.dateISO, getById]);

  if (groundTrackData.length === 0) return null;

  return (
    <>
      {groundTrackData.map((segment, index) => (
        <Line
          key={index}
          points={segment}
          color="#21FABD"
          lineWidth={1.5}
          transparent
          opacity={0.6}
        />
      ))}
    </>
  );
};