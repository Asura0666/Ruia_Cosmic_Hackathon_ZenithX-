import type { TLERecord, OrbitPosition } from '../../types/keeptrack';

export const COLOR_PALETTES = {
  group: {
    starlink: '#00ff41',        
    debris: '#ff1744',          
    navigation: '#00d4ff',      
    communication: '#ff6d00',   
    earth_observation: '#e91e63',
    scientific: '#ffeb3b',      
    military: '#9c27b0',        
    weather: '#2196f3',         
    amateur: '#ff9800',         
    space_station: '#00e676',   
    other: '#ffffff',           
  },
  altitude: {
    very_low: '#ff1744',    
    low: '#ff6d00',         
    medium_low: '#ffeb3b',  
    medium: '#00ff41',      
    medium_high: '#00d4ff', 
    high: '#e91e63',        
    very_high: '#9c27b0',   
    extreme: '#ffffff',     
  },
  velocity: {
    very_slow: '#ffffff',   
    slow: '#9c27b0',        
    medium_slow: '#e91e63', 
    medium: '#00d4ff',      
    medium_fast: '#00ff41', 
    fast: '#ffeb3b',        
    very_fast: '#ff6d00',   
    extreme: '#ff1744',     
  },
  operator: {
    SpaceX: '#00ff00',   
    NASA: '#ff6b6b',     
    ROSCOSMOS: '#ff8cc8', 
    ESA: '#51cf66',      
    JAXA: '#ffd43b',     
    CNSA: '#ff4757',     
    ISRO: '#ff9f43',     
    'US SPACE FORCE': '#5352ed', 
    'US NAVY': '#3742fa',        
    'US AIR FORCE': '#70a1ff',   
    default: '#ffffff',
  },
  mission: {
    GPS: '#00d4ff',           
    GLONASS: '#ff6b00',       
    GALILEO: '#9c27b0',       
    BEIDOU: '#ffeb3b',        
    LANDSAT: '#4caf50',       
    SENTINEL: '#2196f3',      
    GOES: '#ff9800',              NOAA: '#795548',          
    IRIDIUM: '#e91e63',       
    GLOBALSTAR: '#9e9e9e',        INTELSAT: '#607d8b',      
    HUBBLE: '#ffc107',        
    CHANDRA: '#673ab7',       
    SPITZER: '#ff5722',       
    default: '#ffffff',
  },
  country: {
    'United States': '#ff4757',    
    'Russia': '#ff6b00',           
    'China': '#ffeb3b',            
    'European Union': '#2196f3',   
    'Japan': '#e91e63',            
    'India': '#ff9800',            
    'Canada': '#f44336',           
    'United Kingdom': '#9c27b0',   
    'France': '#3f51b5',           
    'Germany': '#009688',          
    'Italy': '#4caf50',            
    'Israel': '#00bcd4',           
    'South Korea': '#795548',      
    'Australia': '#607d8b',        
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
  const distance = Math.sqrt(position.x ** 2 + position.y ** 2 + position.z ** 2);
  return (distance - 1.0) * 6371;
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