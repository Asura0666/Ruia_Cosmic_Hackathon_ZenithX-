import type { TLERecord } from '../../types/keeptrack';

export const parseTLEData = (data: string): TLERecord[] => {
  const lines = data.trim().split('\n');
  const records: TLERecord[] = [];

  for (let i = 1; i <= 5000; i++) {
    const inclination = 20 + Math.random() * 80; 
    const raan = Math.random() * 360;
    const meanAnomaly = Math.random() * 360;
    const meanMotion = 14 + Math.random() * 4; 
    
    let group: TLERecord['group'] = 'other';
    let operator = undefined;
    let mission = undefined;
    let country = undefined;
    let name = '';
    
    if (i <= 2000) {
      group = 'starlink';
      operator = 'SpaceX';
      mission = 'STARLINK';
      country = 'United States';
      name = `STARLINK-${i}`;
    } else if (i <= 2500) {
      group = 'navigation';
      operator = 'US SPACE FORCE';
      mission = 'GPS';
      country = 'United States';
      name = `GPS BIIR-${i - 2000}`;
    } else if (i <= 3000) {
      group = 'navigation';
      operator = 'ROSCOSMOS';
      mission = 'GLONASS';
      country = 'Russia';
      name = `GLONASS-${i - 2500}`;
    } else if (i <= 3500) {
      group = 'navigation';
      operator = 'ESA';
      mission = 'GALILEO';
      country = 'European Union';
      name = `GALILEO-${i - 3000}`;
    } else if (i <= 4000) {
      group = 'navigation';
      operator = 'CNSA';
      mission = 'BEIDOU';
      country = 'China';
      name = `BEIDOU-${i - 3500}`;
    } else if (i <= 4200) {
      group = 'communication';
      const commOperators = ['INTELSAT', 'SES', 'EUTELSAT', 'TELESAT'];
      operator = commOperators[Math.floor(Math.random() * commOperators.length)];
      mission = 'COMMUNICATION';
      country = operator === 'INTELSAT' ? 'United States' : 
                operator === 'SES' ? 'Luxembourg' :
                operator === 'EUTELSAT' ? 'France' : 'Canada';
      name = `${operator}-${i - 4000}`;
    } else if (i <= 4300) {
      group = 'earth_observation';
      const eoMissions = ['LANDSAT', 'SENTINEL', 'WORLDVIEW', 'SPOT'];
      mission = eoMissions[Math.floor(Math.random() * eoMissions.length)];
      operator = mission === 'LANDSAT' ? 'NASA' :
                mission === 'SENTINEL' ? 'ESA' :
                mission === 'WORLDVIEW' ? 'MAXAR' : 'AIRBUS';
      country = mission === 'LANDSAT' ? 'United States' :
               mission === 'SENTINEL' ? 'European Union' :
               mission === 'WORLDVIEW' ? 'United States' : 'France';
      name = `${mission}-${i - 4200}`;
    } else if (i <= 4350) {
      // Weather satellites
      group = 'weather';
      const weatherMissions = ['GOES', 'NOAA', 'METEOSAT', 'HIMAWARI'];
      mission = weatherMissions[Math.floor(Math.random() * weatherMissions.length)];
      operator = mission === 'GOES' || mission === 'NOAA' ? 'NOAA' :
                mission === 'METEOSAT' ? 'EUMETSAT' : 'JMA';
      country = mission === 'GOES' || mission === 'NOAA' ? 'United States' :
               mission === 'METEOSAT' ? 'European Union' : 'Japan';
      name = `${mission}-${i - 4300}`;
    } else if (i <= 4400) {
      // Scientific satellites
      group = 'scientific';
      const sciMissions = ['HUBBLE', 'CHANDRA', 'SPITZER', 'KEPLER', 'TESS'];
      mission = sciMissions[Math.floor(Math.random() * sciMissions.length)];
      operator = 'NASA';
      country = 'United States';
      name = `${mission}-${i - 4350}`;
    } else if (i <= 4450) {
      // Military satellites
      group = 'military';
      const milOperators = ['US SPACE FORCE', 'US NAVY', 'US AIR FORCE', 'NRO'];
      operator = milOperators[Math.floor(Math.random() * milOperators.length)];
      mission = 'CLASSIFIED';
      country = 'United States';
      name = `NROL-${i - 4400}`;
    } else if (i <= 4500) {
      // Amateur radio satellites
      group = 'amateur';
      operator = 'AMSAT';
      mission = 'AMATEUR';
      country = 'International';
      name = `AO-${i - 4450}`;
    } else if (i <= 4510) {
      // Space stations
      group = 'space_station';
      const stations = ['ISS', 'TIANGONG', 'AXIOM'];
      mission = stations[Math.floor(Math.random() * stations.length)];
      operator = mission === 'ISS' ? 'NASA' :
                mission === 'TIANGONG' ? 'CNSA' : 'AXIOM';
      country = mission === 'ISS' ? 'International' :
               mission === 'TIANGONG' ? 'China' : 'United States';
      name = mission === 'ISS' ? 'ISS (ZARYA)' : `${mission}-${i - 4500}`;
    } else if (i > 4800) {
      // Debris
      group = 'debris';
      const debrisTypes = ['COSMOS DEB', 'IRIDIUM DEB', 'FENGYUN DEB', 'CERISE DEB'];
      const debrisType = debrisTypes[Math.floor(Math.random() * debrisTypes.length)];
      name = `${debrisType}-${i}`;
      country = debrisType.includes('COSMOS') || debrisType.includes('FENGYUN') ? 'Russia' :
               debrisType.includes('IRIDIUM') ? 'United States' : 'France';
    } else {
      // Other satellites
      group = 'other';
      operator = 'VARIOUS';
      mission = 'MISC';
      country = 'Various';
      name = `SAT-${i}`;
    }
    
    records.push({
      id: i.toString().padStart(5, '0'),
      name,
      line1: `1 ${i.toString().padStart(5, '0')}U 24001A   24001.50000000  .00002182  00000+0  16640-3 0  9991`,
      line2: `2 ${i.toString().padStart(5, '0')}  ${inclination.toFixed(4)} ${raan.toFixed(4)} 0001413  94.8900 ${meanAnomaly.toFixed(4)} ${meanMotion.toFixed(8)}000000`,
      group,
      operator,
      mission,
      country,
    });
  }

  // Also parse real TLE data if available
  for (let i = 0; i < lines.length; i += 3) {
    if (i + 2 >= lines.length) break;
    const name = lines[i].trim();
    const line1 = lines[i + 1].trim();
    const line2 = lines[i + 2].trim();

    if (!line1.startsWith('1 ') || !line2.startsWith('2 ')) continue;

    const id = line1.substring(2, 7).trim();
    let group: TLERecord['group'] = 'other';
    let operator = undefined;
    let mission = undefined;
    let country = undefined;

    const nameLower = name.toLowerCase();
    
    // Enhanced classification logic
    if (nameLower.includes('starlink')) {
      group = 'starlink';
      operator = 'SpaceX';
      mission = 'STARLINK';
      country = 'United States';
    } else if (nameLower.includes('gps') || nameLower.includes('navstar')) {
      group = 'navigation';
      operator = 'US SPACE FORCE';
      mission = 'GPS';
      country = 'United States';
    } else if (nameLower.includes('glonass')) {
      group = 'navigation';
      operator = 'ROSCOSMOS';
      mission = 'GLONASS';
      country = 'Russia';
    } else if (nameLower.includes('galileo')) {
      group = 'navigation';
      operator = 'ESA';
      mission = 'GALILEO';
      country = 'European Union';
    } else if (nameLower.includes('beidou') || nameLower.includes('compass')) {
      group = 'navigation';
      operator = 'CNSA';
      mission = 'BEIDOU';
      country = 'China';
    } else if (nameLower.includes('landsat')) {
      group = 'earth_observation';
      operator = 'NASA';
      mission = 'LANDSAT';
      country = 'United States';
    } else if (nameLower.includes('sentinel')) {
      group = 'earth_observation';
      operator = 'ESA';
      mission = 'SENTINEL';
      country = 'European Union';
    } else if (nameLower.includes('goes') || nameLower.includes('noaa')) {
      group = 'weather';
      operator = 'NOAA';
      mission = nameLower.includes('goes') ? 'GOES' : 'NOAA';
      country = 'United States';
    } else if (nameLower.includes('hubble')) {
      group = 'scientific';
      operator = 'NASA';
      mission = 'HUBBLE';
      country = 'United States';
    } else if (nameLower.includes('iss') || nameLower.includes('zarya')) {
      group = 'space_station';
      operator = 'NASA';
      mission = 'ISS';
      country = 'International';
    } else if (nameLower.includes('deb') || nameLower.includes('r/b') || nameLower.includes('debris')) {
      group = 'debris';
      country = 'Various';
    } else if (nameLower.includes('intelsat') || nameLower.includes('ses') || nameLower.includes('eutelsat')) {
      group = 'communication';
      operator = nameLower.includes('intelsat') ? 'INTELSAT' :
                nameLower.includes('ses') ? 'SES' : 'EUTELSAT';
      mission = 'COMMUNICATION';
      country = operator === 'INTELSAT' ? 'United States' :
               operator === 'SES' ? 'Luxembourg' : 'France';
    }

    records.push({
      id,
      name: sanitizeName(name),
      line1,
      line2,
      group,
      operator,
      mission,
      country,
    });
  }

  return records;
};

const sanitizeName = (name: string): string => {
  return name.replace(/[^\w\s-]/g, '').trim();
};

export const searchSatellites = (
  records: TLERecord[],
  query: string
): TLERecord[] => {
  if (!query) return records;

  const q = query.toLowerCase();
  return records.filter(
    (record) =>
      record.name.toLowerCase().includes(q) ||
      record.id.includes(q) ||
      (record.operator && record.operator.toLowerCase().includes(q)) ||
      (record.mission && record.mission.toLowerCase().includes(q)) ||
      (record.country && record.country.toLowerCase().includes(q))
  );
};

export const filterSatellites = (
  records: TLERecord[],
  filters: { group: string; activeOnly: boolean }
): TLERecord[] => {
  let filtered = records;

  if (filters.group !== 'all') {
    filtered = filtered.filter((record) => record.group === filters.group);
  }

  if (filters.activeOnly) {
    filtered = filtered.filter((record) => !record.name.toLowerCase().includes('deb'));
  }

  return filtered;
};