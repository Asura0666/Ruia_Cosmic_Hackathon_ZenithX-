import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useKeeptrackStore } from '../../keeptrack/store';

const calculateGMST = (date: Date): number => {
  const ut1 = date.getTime() / 1000; 
  const jd = ut1 / 86400 + 2440587.5; 
  const t = (jd - 2451545.0) / 36525; 

  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545) + 
             0.000387933 * t * t - (t * t * t) / 38710000;
  
  gmst = gmst % 360;
  if (gmst < 0) gmst += 360;
  
  return (gmst * Math.PI) / 180;
};

export const UltraRealisticEarth: React.FC = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const { timeline } = useKeeptrackStore();

  const earthTexture = useLoader(
    THREE.TextureLoader,
    'https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=2048&h=1024&fit=crop'
  );

  React.useEffect(() => {
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.ClampToEdgeWrapping;
    earthTexture.flipY = false;
    earthTexture.generateMipmaps = true;
    earthTexture.minFilter = THREE.LinearMipmapLinearFilter;
    earthTexture.magFilter = THREE.LinearFilter;
    earthTexture.anisotropy = 16;
  }, [earthTexture]);

  const earthMaterial = React.useMemo(() => {
    return new THREE.MeshLambertMaterial({
      map: earthTexture,
    });
  }, [earthTexture]);

  useFrame(() => {
    if (earthRef.current) {
      const currentDate = new Date(timeline.dateISO);
      const gmst = calculateGMST(currentDate);
      
      earthRef.current.rotation.y = gmst;
    }
  });

  return (
    <group>
      <Stars 
        radius={300} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0.3} 
        fade={true}
        speed={0.01}
      />

      <directionalLight 
        position={[10, 2, 5]} 
        intensity={1.5} 
        color="#ffffff"
        castShadow={false}
      />
      <ambientLight intensity={0.3} color="#1a1a3a" />

      <mesh ref={earthRef}>
        <sphereGeometry args={[1.0, 64, 32]} />
        <primitive object={earthMaterial} attach="material" />
      </mesh>
    </group>
  );
};