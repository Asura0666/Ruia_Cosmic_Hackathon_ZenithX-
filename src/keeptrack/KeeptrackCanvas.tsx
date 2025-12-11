import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Globe } from './components/Globe';
import { CameraRig } from './components/CameraRig';
import { SatelliteDots } from './components/SatelliteDots';
import { OrbitLines } from './components/OrbitLines';
import { GroundTrackLine } from './components/GroundTrackLine';
import { TrailLine } from './components/TrailLine';
import { SelectionGizmo } from './components/SelectionGizmo';

export const KeeptrackCanvas: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [-2, 1, 4], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: false, 
          powerPreference: 'high-performance',
          shadowMap: { enabled: true, type: THREE.PCFSoftShadowMap },
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        dpr={[1, 2]}
      >
        {/* Background */}
        <color attach="background" args={['#000005']} />
        <fog attach="fog" args={['#000010', 50, 300]} />

        <Suspense fallback={null}>
          <CameraRig>
            {/* Earth */}
            <Globe />
            
            {/* Satellites */}
            <SatelliteDots />
            
            {/* Orbital elements for selected satellite */}
            <OrbitLines />
            <GroundTrackLine />
            <TrailLine />
            <SelectionGizmo />
          </CameraRig>
        </Suspense>

        {/* OrbitControls for mouse interaction */}
        <OrbitControls
          enableZoom={true}
          enableRotate={true}
          enablePan={true}
          zoomSpeed={-0.6}
          rotateSpeed={0.5}
          panSpeed={0.8}
          minDistance={1.5}
          maxDistance={100}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={false}
          makeDefault
        />
      </Canvas>
    </div>
  );
};