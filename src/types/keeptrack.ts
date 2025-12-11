export interface TLERecord {
  id: string;
  name: string;
  line1: string;
  line2: string;
  group: 'starlink' | 'debris' | 'navigation' | 'communication' | 'earth_observation' | 'scientific' | 'military' | 'weather' | 'amateur' | 'space_station' | 'other';
  operator?: string;
  mission?: string;
  country?: string;
}

export interface Selection {
  id?: string;
}

export interface CameraState {
  pitch: number;
  yaw: number;
  zoom: number;
}

export interface TimelineState {
  playing: boolean;
  speed: number;
  dateISO: string;
}

export interface FiltersState {
  group: 'all' | 'starlink' | 'debris' | 'navigation' | 'communication' | 'earth_observation' | 'scientific' | 'military' | 'weather' | 'amateur' | 'space_station';
  altMin: number;
  altMax: number;
  activeOnly: boolean;
}

export interface KeeptrackState {
  camera: CameraState;
  timeline: TimelineState;
  frame: 'ECI' | 'ECF';
  colorMode: 'group' | 'altitude' | 'velocity' | 'operator' | 'mission' | 'country';
  filters: FiltersState;
  selection: Selection;
  query: string;
}

export interface OrbitPosition {
  x: number;
  y: number;
  z: number;
}

export interface SatelliteOrbit {
  positions: OrbitPosition[];
  groundTrack: { lat: number; lon: number }[];
}