import * as satellite from 'satellite.js';
import { eciToEcf, ecfToEci, normalizePosition } from './frames';
import type { TLERecord, OrbitPosition } from '@/types/keeptrack';

export const propagateAt = (
  tle: TLERecord,
  date: Date
): { position: [number, number, number]; velocity: [number, number, number] } | null => {
  try {
    const satrec = satellite.twoline2satrec(tle.line1, tle.line2);
    const positionAndVelocity = satellite.propagate(satrec, date);

    if (!positionAndVelocity.position || !positionAndVelocity.velocity) {
      return null;
    }

    const pos = positionAndVelocity.position as satellite.EciVec3<number>;
    const vel = positionAndVelocity.velocity as satellite.EciVec3<number>;

    return {
      position: [pos.x, pos.y, pos.z],
      velocity: [vel.x, vel.y, vel.z]
    };
  } catch (error) {
    console.warn('Propagation failed for', tle.name, error);
    return null;
  }
};

export const positionForFrame = (
  tle: TLERecord,
  date: Date,
  frame: 'ECI' | 'ECF'
): OrbitPosition | null => {
  const result = propagateAt(tle, date);
  if (!result) return null;

  let finalPosition = result.position;
  
  if (frame === 'ECF') {
    finalPosition = eciToEcf(finalPosition, date);
  }

  const normalized = normalizePosition(finalPosition);
  
  return {
    x: normalized[0],
    y: normalized[1],
    z: normalized[2]
  };
};

// Generate orbit points (one complete orbit)
export const generateOrbitPoints = (
  tle: TLERecord,
  startDate: Date,
  frame: 'ECI' | 'ECF',
  samples: number = 90
): OrbitPosition[] => {
  const points: OrbitPosition[] = [];
  
  // Calculate orbital period from TLE
  const line2 = tle.line2;
  const meanMotion = parseFloat(line2.substring(52, 63)); // revolutions per day
  const periodMinutes = (24 * 60) / meanMotion; // period in minutes
  const periodMs = periodMinutes * 60 * 1000;
  
  for (let i = 0; i <= samples; i++) {
    const t = (i / samples) * periodMs;
    const date = new Date(startDate.getTime() + t);
    const position = positionForFrame(tle, date, frame);
    
    if (position) {
      points.push(position);
    }
  }
  
  return points;
};

// Generate trail points (historical positions)
export const generateTrailPoints = (
  tle: TLERecord,
  currentDate: Date,
  frame: 'ECI' | 'ECF',
  trailMinutes: number = 90,
  samples: number = 45
): OrbitPosition[] => {
  const points: OrbitPosition[] = [];
  const intervalMs = (trailMinutes * 60 * 1000) / samples;
  
  for (let i = samples; i >= 0; i--) {
    const date = new Date(currentDate.getTime() - i * intervalMs);
    const position = positionForFrame(tle, date, frame);
    
    if (position) {
      points.push(position);
    }
  }
  
  return points;
};