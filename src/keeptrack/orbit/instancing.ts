import * as THREE from 'three';
import { positionForFrame } from './propagate';
import { getColorForSatellite } from './colors';
import type { TLERecord } from '../../types/keeptrack';

export interface SatelliteInstance {
  position: THREE.Vector3;
  color: THREE.Color;
  id: string;
}

export class SatelliteInstanceManager {
  private instancedMesh: THREE.InstancedMesh;
  private dummy = new THREE.Object3D();
  private colorArray: Float32Array;
  private instances: SatelliteInstance[] = [];
  private needsUpdate = false;

  constructor(maxCount: number = 10000) {
    const geometry = new THREE.SphereGeometry(0.002, 6, 6);
    const material = new THREE.MeshBasicMaterial({ vertexColors: true });
    
    this.instancedMesh = new THREE.InstancedMesh(geometry, material, maxCount);
    this.colorArray = new Float32Array(maxCount * 3);
    
    // Initialize color attribute
    const colorAttribute = new THREE.InstancedBufferAttribute(this.colorArray, 3);
    this.instancedMesh.instanceColor = colorAttribute;
  }

  updateInstances(
    satellites: TLERecord[],
    date: Date,
    frame: 'ECI' | 'ECF',
    colorMode: string
  ): void {
    this.instances = [];
    let index = 0;

    for (const satellite of satellites) {
      if (index >= this.instancedMesh.count) break;

      const position = positionForFrame(satellite, date, frame);
      if (!position) continue;

      const color = getColorForSatellite(satellite, position, colorMode);
      
      this.instances.push({
        position: new THREE.Vector3(position.x, position.y, position.z),
        color: new THREE.Color(color),
        id: satellite.id
      });

      // Update transform matrix
      this.dummy.position.set(position.x, position.y, position.z);
      this.dummy.updateMatrix();
      this.instancedMesh.setMatrixAt(index, this.dummy.matrix);

      // Update color
      const colorIndex = index * 3;
      const c = new THREE.Color(color);
      this.colorArray[colorIndex] = c.r;
      this.colorArray[colorIndex + 1] = c.g;
      this.colorArray[colorIndex + 2] = c.b;

      index++;
    }

    // Set actual count
    this.instancedMesh.count = index;
    
    // Mark for update
    this.instancedMesh.instanceMatrix.needsUpdate = true;
    if (this.instancedMesh.instanceColor) {
      this.instancedMesh.instanceColor.needsUpdate = true;
    }
    
    this.needsUpdate = false;
  }

  getMesh(): THREE.InstancedMesh {
    return this.instancedMesh;
  }

  getInstanceAt(index: number): SatelliteInstance | undefined {
    return this.instances[index];
  }

  findInstanceById(id: string): { instance: SatelliteInstance; index: number } | undefined {
    const index = this.instances.findIndex(inst => inst.id === id);
    if (index === -1) return undefined;
    return { instance: this.instances[index], index };
  }

  dispose(): void {
    this.instancedMesh.dispose();
  }
}

// Throttled update helper
export const createThrottledUpdater = (callback: () => void, delay: number = 250) => {
  let timeout: NodeJS.Timeout | null = null;
  let lastUpdate = 0;

  return () => {
    const now = Date.now();
    
    if (now - lastUpdate > delay) {
      callback();
      lastUpdate = now;
    } else {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback();
        lastUpdate = Date.now();
      }, delay - (now - lastUpdate));
    }
  };
};