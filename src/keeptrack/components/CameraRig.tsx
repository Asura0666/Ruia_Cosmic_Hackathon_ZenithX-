import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeeptrackStore } from '../store';

export const CameraRig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { camera } = useThree();
  const { camera: cameraState, setCamera } = useKeeptrackStore();
  const groupRef = useRef<THREE.Group>(null);
  
  useEffect(() => {

    const distance = 4;
    const lat = 39 * Math.PI / 180; 
    const lon = -95 * Math.PI / 180; 
    
    const x = distance * Math.cos(lat) * Math.cos(lon + Math.PI);
    const y = distance * Math.sin(lat);
    const z = distance * Math.cos(lat) * Math.sin(lon + Math.PI);
    
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    
    setCamera({
      pitch: lat * 180 / Math.PI,
      yaw: (lon + Math.PI) * 180 / Math.PI,
      zoom: distance
    });
  }, [camera, setCamera]);

  useFrame(() => {
    if (cameraState.zoom !== camera.position.length()) {
      const currentDirection = camera.position.clone().normalize();
      camera.position.copy(currentDirection.multiplyScalar(cameraState.zoom));
    }
  });

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
};