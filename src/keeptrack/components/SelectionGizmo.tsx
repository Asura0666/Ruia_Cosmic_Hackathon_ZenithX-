import React, { useMemo } from 'react';
import { Text, Billboard } from '@react-three/drei';
import { positionForFrame } from '../orbit/propagate';
import { useKeeptrackStore } from '../store';
import { useTLECatalog } from '../tle/useTLECatalog';

export const SelectionGizmo: React.FC = () => {
  const { selection, timeline, frame } = useKeeptrackStore();
  const { getById } = useTLECatalog();

  const selectionData = useMemo(() => {
    if (!selection.id) return null;
    
    const satellite = getById(selection.id);
    if (!satellite) return null;
    
    const currentDate = new Date(timeline.dateISO);
    const position = positionForFrame(satellite, currentDate, frame);
    
    if (!position) return null;
    
    const distance = Math.sqrt(position.x ** 2 + position.y ** 2 + position.z ** 2);
    const altitude = Math.round((distance - 1.0) * 6371);
    
    return {
      position: [position.x, position.y, position.z] as [number, number, number],
      name: satellite.name,
      altitude
    };
  }, [selection.id, timeline.dateISO, frame, getById]);

  if (!selectionData) return null;

  return (
    <group position={selectionData.position}>
      <mesh>
        <ringGeometry args={[0.008, 0.012, 16]} />
        <meshBasicMaterial color="#00D1FF" transparent opacity={0.8} />
      </mesh>
      
      <mesh>
        <ringGeometry args={[0.006, 0.015, 16]} />
        <meshBasicMaterial color="#00D1FF" transparent opacity={0.3} />
      </mesh>
      
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, 0.04, 0]}
          fontSize={0.02}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.001}
          outlineColor="#000000"
        >
          {selectionData.name}
        </Text>
        <Text
          position={[0, 0.02, 0]}
          fontSize={0.015}
          color="#00D1FF"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.001}
          outlineColor="#000000"
        >
          {selectionData.altitude} km
        </Text>
      </Billboard>
    </group>
  );
};