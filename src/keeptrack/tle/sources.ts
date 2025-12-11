export const TLE_SOURCES = {
  starlink: {
    primary: 'https://api.keeptrack.space/v2/catalog/latest',
    fallback: '/tle/starlink.tle',
  },
  mixed: {
    primary: 'https://api.keeptrack.space/v2/catalog/latest',
    fallback: '/tle/mixed.tle',
  },
  debris: {
    primary: 'https://api.keeptrack.space/v2/catalog/latest',
    fallback: '/tle/mixed.tle',
  },
};

export const fetchTLEData = async (source: keyof typeof TLE_SOURCES): Promise<string> => {
  const { primary, fallback } = TLE_SOURCES[source];
  
  try {
    console.log(`🛰️ Fetching TLE data for ${source} from Keeptrack API...`);
    const response = await fetch(primary);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.text();
    console.log(`✅ Successfully loaded ${source} TLE data from Keeptrack API`);
    return data;
  } catch (error) {
    console.warn(`❌ Keeptrack API failed for ${source}, using fallback:`, error);
    
    try {
      const response = await fetch(fallback);
      if (!response.ok) {
        throw new Error(`Fallback failed: HTTP ${response.status}`);
      }
      const data = await response.text();
      console.log(`📁 Using fallback TLE data for ${source}`);
      return data;
    } catch (fallbackError) {
      console.error(`💥 Both primary and fallback failed for ${source}:`, fallbackError);
      throw fallbackError;
    }
  }
};