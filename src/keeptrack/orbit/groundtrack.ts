import { propagateAt, positionForFrame } from './propagate';
import { eciToEcf, ecfToLLA, normalizePosition } from './frames';
import type { TLERecord, OrbitPosition } from '../../types/keeptrack';

export interface GroundTrackPoint {
  lat: number;
  lon: number;
  position3D: OrbitPosition;
}

export const generateGroundTrack = (
  tle: TLERecord,
  startDate: Date,
  minutes: number = 90,
  samples: number = 180
): GroundTrackPoint[] => {
  const points: GroundTrackPoint[] = [];
  const intervalMs = (minutes * 60 * 1000) / samples;
  
  for (let i = 0; i <= samples; i++) {
    const date = new Date(startDate.getTime() + i * intervalMs);
    const result = propagateAt(tle, date);
    
    if (!result) continue;
    
    // Convert ECI to ECEF for ground track
    const ecfPosition = eciToEcf(result.position, date);
    const lla = ecfToLLA(ecfPosition);
    
    // Project onto Earth surface for 3D visualization
    const earthSurfaceKm: [number, number, number] = [
      6371 * Math.cos(lla.lat * Math.PI / 180) * Math.cos(lla.lon * Math.PI / 180),
      6371 * Math.cos(lla.lat * Math.PI / 180) * Math.sin(lla.lon * Math.PI / 180),
      6371 * Math.sin(lla.lat * Math.PI / 180)
    ];
    
    const normalized = normalizePosition(earthSurfaceKm);
    
    points.push({
      lat: lla.lat,
      lon: lla.lon,
      position3D: {
        x: normalized[0],
        y: normalized[1],
        z: normalized[2]
      }
    });
  }
  
  return points;
};

// Handle longitude wrapping for continuous lines
export const processGroundTrackForRendering = (points: GroundTrackPoint[]): GroundTrackPoint[][] => {
  const segments: GroundTrackPoint[][] = [];
  let currentSegment: GroundTrackPoint[] = [];
  
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const prevPoint = points[i - 1];
    
    if (prevPoint && Math.abs(point.lon - prevPoint.lon) > 180) {
      // Longitude wrap detected, start new segment
      if (currentSegment.length > 0) {
        segments.push(currentSegment);
        currentSegment = [];
      }
    }
    
    currentSegment.push(point);
  }
  
  if (currentSegment.length > 0) {
    segments.push(currentSegment);
  }
  
  return segments;
};