import type { TLERecord, OrbitPosition } from '../../types/keeptrack';

export const COLOR_PALETTES = {
  group: {
    starlink: '#00ff41',        // Verde brillante - Starlink
    debris: '#ff1744',          // Rojo brillante - Escombros
    navigation: '#00d4ff',      // Azul cian - GPS, GLONASS, Galileo
    communication: '#ff6d00',   // Naranja - Satélites de comunicación
    earth_observation: '#e91e63', // Rosa - Observación terrestre
    scientific: '#ffeb3b',      // Amarillo - Misiones científicas
    military: '#9c27b0',        // Púrpura - Satélites militares
    weather: '#2196f3',         // Azul - Satélites meteorológicos
    amateur: '#ff9800',         // Naranja claro - Radio amateur
    space_station: '#00e676',   // Verde claro - Estaciones espaciales
    other: '#ffffff',           // Blanco - Otros
  },
  altitude: {
    very_low: '#ff1744',    // < 300km - Rojo brillante
    low: '#ff6d00',         // 300-600km - Naranja
    medium_low: '#ffeb3b',  // 600-900km - Amarillo
    medium: '#00ff41',      // 900-1200km - Verde
    medium_high: '#00d4ff', // 1200-1500km - Azul cian
    high: '#e91e63',        // 1500-2000km - Rosa
    very_high: '#9c27b0',   // 2000-5000km - Púrpura
    extreme: '#ffffff',     // > 5000km - Blanco
  },
  velocity: {
    very_slow: '#ffffff',   // < 6.0 km/s - Blanco (órbitas muy altas)
    slow: '#9c27b0',        // 6.0-7.0 km/s - Púrpura
    medium_slow: '#e91e63', // 7.0-7.3 km/s - Rosa
    medium: '#00d4ff',      // 7.3-7.6 km/s - Azul cian
    medium_fast: '#00ff41', // 7.6-7.9 km/s - Verde
    fast: '#ffeb3b',        // 7.9-8.2 km/s - Amarillo
    very_fast: '#ff6d00',   // 8.2-8.5 km/s - Naranja
    extreme: '#ff1744',     // > 8.5 km/s - Rojo
  },
  operator: {
    SpaceX: '#00ff00',   // Verde para SpaceX
    NASA: '#ff6b6b',     // Rojo claro para NASA
    ROSCOSMOS: '#ff8cc8', // Rosa para ROSCOSMOS
    ESA: '#51cf66',      // Verde azulado para ESA
    JAXA: '#ffd43b',     // Amarillo para JAXA
    CNSA: '#ff4757',     // Rojo para China
    ISRO: '#ff9f43',     // Naranja para India
    'US SPACE FORCE': '#5352ed', // Azul para US Space Force
    'US NAVY': '#3742fa',        // Azul marino para US Navy
    'US AIR FORCE': '#70a1ff',   // Azul claro para US Air Force
    default: '#ffffff',
  },
  mission: {
    GPS: '#00d4ff',           // Azul cian - Navegación GPS
    GLONASS: '#ff6b00',       // Naranja - Navegación GLONASS
    GALILEO: '#9c27b0',       // Púrpura - Navegación Galileo
    BEIDOU: '#ffeb3b',        // Amarillo - Navegación BeiDou
    LANDSAT: '#4caf50',       // Verde - Observación terrestre
    SENTINEL: '#2196f3',      // Azul - Observación terrestre ESA
    GOES: '#ff9800',          // Naranja - Meteorología
    NOAA: '#795548',          // Marrón - Meteorología NOAA
    IRIDIUM: '#e91e63',       // Rosa - Comunicación Iridium
    GLOBALSTAR: '#9e9e9e',    // Gris - Comunicación Globalstar
    INTELSAT: '#607d8b',      // Gris azulado - Comunicación
    HUBBLE: '#ffc107',        // Dorado - Telescopio espacial
    CHANDRA: '#673ab7',       // Púrpura oscuro - Observatorio de rayos X
    SPITZER: '#ff5722',       // Rojo naranja - Telescopio infrarrojo
    default: '#ffffff',
  },
  country: {
    'United States': '#ff4757',    // Rojo - Estados Unidos
    'Russia': '#ff6b00',           // Naranja - Rusia
    'China': '#ffeb3b',            // Amarillo - China
    'European Union': '#2196f3',   // Azul - Unión Europea
    'Japan': '#e91e63',            // Rosa - Japón
    'India': '#ff9800',            // Naranja - India
    'Canada': '#f44336',           // Rojo - Canadá
    'United Kingdom': '#9c27b0',   // Púrpura - Reino Unido
    'France': '#3f51b5',           // Azul índigo - Francia
    'Germany': '#009688',          // Verde azulado - Alemania
    'Italy': '#4caf50',            // Verde - Italia
    'Israel': '#00bcd4',           // Cian - Israel
    'South Korea': '#795548',      // Marrón - Corea del Sur
    'Australia': '#607d8b',        // Gris azulado - Australia
    default: '#ffffff',
  },
};

export const getColorForSatellite = (
  satellite: TLERecord,
  position: OrbitPosition,
  colorMode: string
): string => {
  switch (colorMode) {
    case 'group':
      const groupColor = COLOR_PALETTES.group[satellite.group];
      if (!groupColor) {
        console.warn(`Unknown satellite group: ${satellite.group}, using default`);
        return COLOR_PALETTES.group.other;
      }
      return groupColor;
    
    case 'altitude':
      const altitude = getAltitudeFromPosition(position);
      if (altitude < 300) return COLOR_PALETTES.altitude.very_low;
      if (altitude < 600) return COLOR_PALETTES.altitude.low;
      if (altitude < 900) return COLOR_PALETTES.altitude.medium_low;
      if (altitude < 1200) return COLOR_PALETTES.altitude.medium;
      if (altitude < 1500) return COLOR_PALETTES.altitude.medium_high;
      if (altitude < 2000) return COLOR_PALETTES.altitude.high;
      if (altitude < 5000) return COLOR_PALETTES.altitude.very_high;
      return COLOR_PALETTES.altitude.extreme;
    
    case 'velocity':
      const alt = getAltitudeFromPosition(position);
      const velocity = Math.sqrt(398600.4418 / (6371 + alt));
      if (velocity < 6.0) return COLOR_PALETTES.velocity.very_slow;
      if (velocity < 7.0) return COLOR_PALETTES.velocity.slow;
      if (velocity < 7.3) return COLOR_PALETTES.velocity.medium_slow;
      if (velocity < 7.6) return COLOR_PALETTES.velocity.medium;
      if (velocity < 7.9) return COLOR_PALETTES.velocity.medium_fast;
      if (velocity < 8.2) return COLOR_PALETTES.velocity.fast;
      if (velocity < 8.5) return COLOR_PALETTES.velocity.very_fast;
      return COLOR_PALETTES.velocity.extreme;
    
    case 'operator':
      const op = satellite.operator;
      if (!op) return COLOR_PALETTES.operator.default;
      return COLOR_PALETTES.operator[op as keyof typeof COLOR_PALETTES.operator] || COLOR_PALETTES.operator.default;
    
    case 'mission':
      const mission = satellite.mission;
      if (!mission) return COLOR_PALETTES.mission.default;
      return COLOR_PALETTES.mission[mission as keyof typeof COLOR_PALETTES.mission] || COLOR_PALETTES.mission.default;
    
    case 'country':
      const country = satellite.country;
      if (!country) return COLOR_PALETTES.country.default;
      return COLOR_PALETTES.country[country as keyof typeof COLOR_PALETTES.country] || COLOR_PALETTES.country.default;
    
    default:
      return COLOR_PALETTES.group.other;
  }
};

const getAltitudeFromPosition = (position: OrbitPosition): number => {
  // Position is normalized (Earth radius = 1.0), so calculate altitude
  const distance = Math.sqrt(position.x ** 2 + position.y ** 2 + position.z ** 2);
  return (distance - 1.0) * 6371; // Convert back to km
};

export const getLegendForColorMode = (colorMode: string) => {
  switch (colorMode) {
    case 'group':
      return [
        { label: 'Starlink', color: COLOR_PALETTES.group.starlink },
        { label: 'Debris', color: COLOR_PALETTES.group.debris },
        { label: 'Navigation', color: COLOR_PALETTES.group.navigation },
        { label: 'Communication', color: COLOR_PALETTES.group.communication },
        { label: 'Earth Observation', color: COLOR_PALETTES.group.earth_observation },
        { label: 'Scientific', color: COLOR_PALETTES.group.scientific },
        { label: 'Military', color: COLOR_PALETTES.group.military },
        { label: 'Weather', color: COLOR_PALETTES.group.weather },
        { label: 'Amateur Radio', color: COLOR_PALETTES.group.amateur },
        { label: 'Space Station', color: COLOR_PALETTES.group.space_station },
        { label: 'Other', color: COLOR_PALETTES.group.other },
      ];
    
    case 'altitude':
      return [
        { label: '< 300km', color: COLOR_PALETTES.altitude.very_low },
        { label: '300-600km', color: COLOR_PALETTES.altitude.low },
        { label: '600-900km', color: COLOR_PALETTES.altitude.medium_low },
        { label: '900-1200km', color: COLOR_PALETTES.altitude.medium },
        { label: '1200-1500km', color: COLOR_PALETTES.altitude.medium_high },
        { label: '1500-2000km', color: COLOR_PALETTES.altitude.high },
        { label: '2000-5000km', color: COLOR_PALETTES.altitude.very_high },
        { label: '> 5000km', color: COLOR_PALETTES.altitude.extreme },
      ];
    
    case 'velocity':
      return [
        { label: '< 6.0 km/s', color: COLOR_PALETTES.velocity.very_slow },
        { label: '6.0-7.0 km/s', color: COLOR_PALETTES.velocity.slow },
        { label: '7.0-7.3 km/s', color: COLOR_PALETTES.velocity.medium_slow },
        { label: '7.3-7.6 km/s', color: COLOR_PALETTES.velocity.medium },
        { label: '7.6-7.9 km/s', color: COLOR_PALETTES.velocity.medium_fast },
        { label: '7.9-8.2 km/s', color: COLOR_PALETTES.velocity.fast },
        { label: '8.2-8.5 km/s', color: COLOR_PALETTES.velocity.very_fast },
        { label: '> 8.5 km/s', color: COLOR_PALETTES.velocity.extreme },
      ];
    
    case 'operator':
      return [
        { label: 'SpaceX', color: COLOR_PALETTES.operator.SpaceX },
        { label: 'NASA', color: COLOR_PALETTES.operator.NASA },
        { label: 'ROSCOSMOS', color: COLOR_PALETTES.operator.ROSCOSMOS },
        { label: 'ESA', color: COLOR_PALETTES.operator.ESA },
        { label: 'JAXA', color: COLOR_PALETTES.operator.JAXA },
        { label: 'CNSA', color: COLOR_PALETTES.operator.CNSA },
        { label: 'ISRO', color: COLOR_PALETTES.operator.ISRO },
        { label: 'US Space Force', color: COLOR_PALETTES.operator['US SPACE FORCE'] },
        { label: 'Other', color: COLOR_PALETTES.operator.default },
      ];
    
    case 'mission':
      return [
        { label: 'GPS', color: COLOR_PALETTES.mission.GPS },
        { label: 'GLONASS', color: COLOR_PALETTES.mission.GLONASS },
        { label: 'Galileo', color: COLOR_PALETTES.mission.GALILEO },
        { label: 'BeiDou', color: COLOR_PALETTES.mission.BEIDOU },
        { label: 'Landsat', color: COLOR_PALETTES.mission.LANDSAT },
        { label: 'Sentinel', color: COLOR_PALETTES.mission.SENTINEL },
        { label: 'GOES', color: COLOR_PALETTES.mission.GOES },
        { label: 'Hubble', color: COLOR_PALETTES.mission.HUBBLE },
        { label: 'Other', color: COLOR_PALETTES.mission.default },
      ];
    
    case 'country':
      return [
        { label: 'United States', color: COLOR_PALETTES.country['United States'] },
        { label: 'Russia', color: COLOR_PALETTES.country['Russia'] },
        { label: 'China', color: COLOR_PALETTES.country['China'] },
        { label: 'European Union', color: COLOR_PALETTES.country['European Union'] },
        { label: 'Japan', color: COLOR_PALETTES.country['Japan'] },
        { label: 'India', color: COLOR_PALETTES.country['India'] },
        { label: 'Other', color: COLOR_PALETTES.country.default },
      ];
    
    default:
      return [];
  }
};