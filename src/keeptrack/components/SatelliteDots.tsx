import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { positionForFrame } from '../orbit/propagate';
import { getColorForSatellite } from '../orbit/colors';
import { useKeeptrackStore } from '../store';
import { useTLECatalog } from '../tle/useTLECatalog';

export const SatelliteDots: React.FC = () => {
  const { timeline, frame, colorMode, filters, setSelection } = useKeeptrackStore();
  const { records } = useTLECatalog();
  const { raycaster, mouse, camera } = useThree();
  
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);
  const timeRef = useRef(0);
  
  // Filter records based on current filters
  const filteredRecords = useMemo(() => {
    let filtered = records;
    
    if (filters.group !== 'all') {
      filtered = filtered.filter(record => record.group === filters.group);
    }
    
    if (filters.activeOnly) {
      filtered = filtered.filter(record => 
        !record.name.toLowerCase().includes('deb') && 
        !record.name.toLowerCase().includes('r/b')
      );
    }
    
    // Limit satellites for better performance
    return filtered.slice(0, 15000);
  }, [records, filters]);

  // Create optimized instanced mesh
  const instancedMesh = useMemo(() => {
    const geometry = new THREE.SphereGeometry(0.006, 6, 6); // Optimized geometry
    const material = new THREE.MeshLambertMaterial({ 
      transparent: true,
      opacity: 0.8,
    });
    
    const mesh = new THREE.InstancedMesh(geometry, material, 15000); // Optimized count
    
    // Create color attribute for instanced rendering
    const colors = new Float32Array(15000 * 3);
    for (let i = 0; i < 15000; i++) {
      colors[i * 3] = 1.0;     // R
      colors[i * 3 + 1] = 1.0; // G  
      colors[i * 3 + 2] = 1.0; // B
    }
    
    const colorAttribute = new THREE.InstancedBufferAttribute(colors, 3);
    mesh.instanceColor = colorAttribute;
    
    return mesh;
  }, []);

  // Update satellite positions and colors
  useEffect(() => {
    if (!meshRef.current) return;
    
    const currentDate = new Date(timeline.dateISO);
    let count = 0;
    
    // Process satellites with performance optimization
    for (const satellite of filteredRecords) {
      if (count >= 15000) break; // Limit for performance
      
      const position = positionForFrame(satellite, currentDate, frame);
      if (!position) continue;
      
      // Apply altitude filter
      const distance = Math.sqrt(position.x ** 2 + position.y ** 2 + position.z ** 2);
      const altitude = (distance - 1.0) * 6371; // Convert to km
      
      if (altitude < filters.altMin || altitude > filters.altMax) continue;
      
      // Simple floating animation based on satellite index and time
      const time = timeRef.current;
      const satelliteIndex = parseInt(satellite.id) || count;
      
      // Optimized floating animation
      const floatSpeed = satellite.group === 'starlink' ? 1.5 : 
                        satellite.group === 'debris' ? 0.8 : 1.0;
      const floatAmplitude = 0.003;
      const orbitSpeed = satellite.group === 'starlink' ? 0.5 : 
                        satellite.group === 'debris' ? 0.2 : 0.3;
      
      // Calculate animated position with simple math
      const floatY = Math.sin(time * floatSpeed + satelliteIndex) * floatAmplitude;
      const orbitX = Math.cos(time * orbitSpeed + satelliteIndex) * 0.008;
      const orbitZ = Math.sin(time * orbitSpeed + satelliteIndex) * 0.008;
      
      tempObject.position.set(
        position.x + orbitX,
        position.y + floatY,
        position.z + orbitZ
      );
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(count, tempObject.matrix);
      
      // Set color
      const color = getColorForSatellite(satellite, position, colorMode);
      tempColor.set(color);
      meshRef.current.setColorAt(count, tempColor);
      
      count++;
    }
    
    meshRef.current.count = count;
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [filteredRecords, timeline.dateISO, frame, colorMode, filters]);

  // Optimized continuous animation
  useFrame((state) => {
    timeRef.current = state.clock.elapsedTime;
  }
  )

  // Handle clicking on satellites
  const handleClick = (event: any) => {
    event.stopPropagation();
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(meshRef.current!);
    
    if (intersects.length > 0) {
      const instanceId = intersects[0].instanceId;
      if (instanceId !== undefined) {
        const satellite = filteredRecords[instanceId];
        if (satellite) {
          setSelection({ id: satellite.id });
        }
      }
    }
  };

  return (
    <primitive 
      ref={meshRef}
      object={instancedMesh} 
      onClick={handleClick}
    />
  );
};