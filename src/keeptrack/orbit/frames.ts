/**
 * Coordinate frame transformations and utilities
 */

export const EARTH_RADIUS_KM = 6371.0;

// Greenwich Mean Sidereal Time
export const getGMST = (date: Date): number => {
  const ut1 = date.getTime() / 1000; // Unix timestamp
  const jd = ut1 / 86400 + 2440587.5; // Julian date
  const t = (jd - 2451545.0) / 36525; // Julian centuries since J2000

  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * t * t - (t * t * t) / 38710000;
  
  // Normalize to [0, 360)
  gmst = gmst % 360;
  if (gmst < 0) gmst += 360;
  
  return (gmst * Math.PI) / 180; // Return in radians
};

// Earth-Centered Inertial to Earth-Centered Fixed
export const eciToEcf = (eci: [number, number, number], date: Date): [number, number, number] => {
  const gmst = getGMST(date);
  const cosGmst = Math.cos(gmst);
  const sinGmst = Math.sin(gmst);

  const [x, y, z] = eci;
  
  return [
    x * cosGmst + y * sinGmst,
    -x * sinGmst + y * cosGmst,
    z
  ];
};

// Earth-Centered Fixed to Earth-Centered Inertial
export const ecfToEci = (ecf: [number, number, number], date: Date): [number, number, number] => {
  const gmst = getGMST(date);
  const cosGmst = Math.cos(gmst);
  const sinGmst = Math.sin(gmst);

  const [x, y, z] = ecf;
  
  return [
    x * cosGmst - y * sinGmst,
    x * sinGmst + y * cosGmst,
    z
  ];
};

// ECEF to Latitude, Longitude, Altitude
export const ecfToLLA = (ecf: [number, number, number]): { lat: number; lon: number; alt: number } => {
  const [x, y, z] = ecf;
  
  const lon = Math.atan2(y, x);
  const p = Math.sqrt(x * x + y * y);
  const lat = Math.atan2(z, p);
  const alt = Math.sqrt(x * x + y * y + z * z) - EARTH_RADIUS_KM;
  
  return {
    lat: (lat * 180) / Math.PI,
    lon: (lon * 180) / Math.PI,
    alt
  };
};

// Normalize position for 3D rendering (Earth radius = 1.0)
export const normalizePosition = (positionKm: [number, number, number]): [number, number, number] => {
  const scale = 1.0 / EARTH_RADIUS_KM;
  return [
    positionKm[0] * scale,
    positionKm[1] * scale,
    positionKm[2] * scale
  ];
};