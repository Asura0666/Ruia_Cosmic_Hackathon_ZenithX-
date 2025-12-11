import { LLMClimatePrediction } from '../types/api';

// Enhanced fallback climate predictions with more variety and regional specificity
export const generateFallbackPredictions = (cityCode: string, region: string, cityCoords?: [number, number]): LLMClimatePrediction[] => {
  const baseTime = new Date();

  // Use city coordinates if provided, otherwise use defaults
  const baseLat = cityCoords ? cityCoords[0] : 18.4861;
  const baseLon = cityCoords ? cityCoords[1] : -69.9312;

  const predictions: LLMClimatePrediction[] = [
    {
      id: `fallback-${cityCode}-severe-weather-1`,
      type: 'severe_weather',
      title: 'Severe Convective Weather Alert',
      location: `${region} Metropolitan Area`,
      coordinates: {
        lat: baseLat,
        lon: baseLon,
      },
      probability: Math.floor(Math.random() * 20 + 70), // 70-90%
      timeframe: 'Next 6 Hours',
      impact: 'HIGH',
      description: 'Advanced meteorological models indicate convergence of atmospheric conditions conducive to severe convective weather development.',
      detailed_analysis: 'Atmospheric pressure analysis reveals a rapidly deepening low-pressure system approaching the region. Temperature gradients exceeding 5°C per 100km, combined with moisture content above 75%, create optimal conditions for severe thunderstorm formation. Wind shear patterns suggest potential for supercell development with associated hazards including large hail, damaging winds, and localized flooding.',
      recommendations: [
        'Increase emergency stock levels by 25% in affected regions',
        'Activate backup distribution centers and alternative routes',
        'Monitor atmospheric conditions and weather patterns closely',
        'Prepare emergency response teams for rapid deployment',
        'Secure outdoor equipment and materials against wind damage',
      ],
      atmospheric_data: {
        temperature: 28.5 + (Math.random() - 0.5) * 5,
        pressure: 995.2 + (Math.random() - 0.5) * 10,
        humidity: 78.3 + (Math.random() - 0.5) * 15,
        wind_speed: 24.7 + (Math.random() - 0.5) * 10,
        visibility: 8.2 + (Math.random() - 0.5) * 5,
        air_quality_index: 89 + (Math.random() - 0.5) * 30,
      },
      confidence_factors: {
        historical_data: 85 + Math.floor(Math.random() * 10),
        satellite_imagery: 72 + Math.floor(Math.random() * 15),
        weather_models: 91 + Math.floor(Math.random() * 8),
        ai_analysis: 78 + Math.floor(Math.random() * 12),
      },
      generated_at: baseTime.toISOString(),
    },
    {
      id: `fallback-${cityCode}-temperature-extreme-2`,
      type: 'temperature_extreme',
      title: 'Extreme Heat Wave Warning',
      location: `${region} Urban Centers`,
      coordinates: {
        lat: baseLat,
        lon: baseLon,
      },
      probability: Math.floor(Math.random() * 15 + 80), // 80-95%
      timeframe: 'Next 12-24 Hours',
      impact: 'MODERATE',
      description: 'AI thermal analysis indicates significant temperature elevation due to high-pressure ridge formation over the region.',
      detailed_analysis: 'Synoptic analysis reveals a strengthening subtropical ridge that will elevate temperatures 8-12°C above seasonal averages. Urban heat island effects will amplify conditions in metropolitan areas, with peak temperatures potentially reaching dangerous levels. This thermal anomaly poses risks to temperature-sensitive materials and may overwhelm cooling infrastructure.',
      recommendations: [
        'Activate climate-controlled storage for temperature-sensitive materials',
        'Increase cooling capacity in distribution centers by 40%',
        'Schedule deliveries during early morning hours (05:00-09:00)',
        'Monitor material integrity in non-climate-controlled facilities',
        'Implement enhanced heat stress protocols for outdoor workers',
        'Prepare backup power systems for cooling equipment',
      ],
      atmospheric_data: {
        temperature: 42.1 + (Math.random() - 0.5) * 6,
        pressure: 1018.7 + (Math.random() - 0.5) * 8,
        humidity: 45.2 + (Math.random() - 0.5) * 20,
        wind_speed: 8.3 + (Math.random() - 0.5) * 5,
        visibility: 15.8 + (Math.random() - 0.5) * 8,
        air_quality_index: 67 + (Math.random() - 0.5) * 25,
      },
      confidence_factors: {
        historical_data: 92 + Math.floor(Math.random() * 6),
        satellite_imagery: 88 + Math.floor(Math.random() * 10),
        weather_models: 94 + Math.floor(Math.random() * 5),
        ai_analysis: 85 + Math.floor(Math.random() * 10),
      },
      generated_at: new Date(baseTime.getTime() + 5 * 60 * 1000).toISOString(),
    },
    {
      id: `fallback-${cityCode}-air-quality-3`,
      type: 'air_quality',
      title: 'Air Quality Deterioration Alert',
      location: `${region} Industrial Corridor`,
      coordinates: {
        lat: baseLat,
        lon: baseLon,
      },
      probability: Math.floor(Math.random() * 18 + 65), // 65-83%
      timeframe: 'Next 18-36 Hours',
      impact: 'MODERATE',
      description: 'Atmospheric dispersion models predict unfavorable conditions for pollutant dispersal in industrial zones.',
      detailed_analysis: 'Wind pattern analysis indicates a shift to low-speed, variable direction winds that will reduce atmospheric mixing capacity. Combined with increased industrial emissions and reduced boundary layer height, particulate matter concentrations are expected to exceed WHO guidelines. Photochemical processes may also elevate ozone levels during peak sunlight hours.',
      recommendations: [
        'Implement enhanced air filtration systems in all facilities',
        'Provide N95 respiratory protection for outdoor workers',
        'Reduce non-essential outdoor activities during peak hours',
        'Monitor real-time air quality indices every 2 hours',
        'Consider temporary relocation of sensitive operations',
        'Increase ventilation rates in enclosed spaces',
      ],
      atmospheric_data: {
        temperature: 31.8 + (Math.random() - 0.5) * 4,
        pressure: 1012.4 + (Math.random() - 0.5) * 6,
        humidity: 68.9 + (Math.random() - 0.5) * 18,
        wind_speed: 6.1 + (Math.random() - 0.5) * 4,
        visibility: 4.2 + (Math.random() - 0.5) * 3,
        air_quality_index: 156 + (Math.random() - 0.5) * 40,
      },
      confidence_factors: {
        historical_data: 79 + Math.floor(Math.random() * 12),
        satellite_imagery: 65 + Math.floor(Math.random() * 20),
        weather_models: 83 + Math.floor(Math.random() * 12),
        ai_analysis: 72 + Math.floor(Math.random() * 15),
      },
      generated_at: new Date(baseTime.getTime() + 10 * 60 * 1000).toISOString(),
    },
    {
      id: `fallback-${cityCode}-drought-risk-4`,
      type: 'drought_risk',
      title: 'Emerging Drought Conditions',
      location: `${region} Agricultural Zones`,
      coordinates: {
        lat: baseLat,
        lon: baseLon,
      },
      probability: Math.floor(Math.random() * 25 + 55), // 55-80%
      timeframe: 'Next 7-14 Days',
      impact: 'MODERATE',
      description: 'Precipitation deficit analysis indicates developing drought conditions in agricultural regions.',
      detailed_analysis: 'Soil moisture satellite data reveals a 35% decrease in surface water content over the past 30 days. Precipitation models show continued below-average rainfall for the next two weeks, with cumulative deficit reaching 40mm. This trend threatens agricultural productivity and may impact water-dependent supply chain operations.',
      recommendations: [
        'Implement water conservation measures in all facilities',
        'Secure alternative water sources for critical operations',
        'Monitor agricultural supply chain for potential disruptions',
        'Increase inventory of drought-resistant materials',
        'Coordinate with agricultural partners on contingency plans',
        'Prepare water storage and distribution systems',
      ],
      atmospheric_data: {
        temperature: 35.2 + (Math.random() - 0.5) * 5,
        pressure: 1021.8 + (Math.random() - 0.5) * 7,
        humidity: 32.1 + (Math.random() - 0.5) * 15,
        wind_speed: 12.4 + (Math.random() - 0.5) * 6,
        visibility: 18.7 + (Math.random() - 0.5) * 5,
        air_quality_index: 78 + (Math.random() - 0.5) * 20,
      },
      confidence_factors: {
        historical_data: 88 + Math.floor(Math.random() * 8),
        satellite_imagery: 91 + Math.floor(Math.random() * 7),
        weather_models: 76 + Math.floor(Math.random() * 15),
        ai_analysis: 82 + Math.floor(Math.random() * 10),
      },
      generated_at: new Date(baseTime.getTime() + 15 * 60 * 1000).toISOString(),
    },
    {
      id: `fallback-${cityCode}-flood-risk-5`,
      type: 'flood_risk',
      title: 'Flash Flood Risk Assessment',
      location: `${region} Coastal Areas`,
      coordinates: {
        lat: baseLat,
        lon: baseLon,
      },
      probability: Math.floor(Math.random() * 20 + 60), // 60-80%
      timeframe: 'Next 8-16 Hours',
      impact: 'HIGH',
      description: 'Hydrological models indicate elevated flash flood risk due to saturated soil conditions and incoming precipitation.',
      detailed_analysis: 'Soil saturation levels have reached 85% capacity following recent rainfall events. Incoming weather systems are forecast to deliver 25-40mm of additional precipitation within a 6-hour window. Topographical analysis reveals multiple vulnerable drainage basins with limited capacity for rapid water evacuation.',
      recommendations: [
        'Relocate materials from flood-prone storage areas',
        'Activate emergency drainage and pumping systems',
        'Establish elevated temporary storage locations',
        'Monitor water levels in critical infrastructure areas',
        'Prepare rapid response teams for potential evacuations',
        'Secure waterproof packaging for sensitive materials',
      ],
      atmospheric_data: {
        temperature: 26.3 + (Math.random() - 0.5) * 4,
        pressure: 1006.7 + (Math.random() - 0.5) * 8,
        humidity: 89.4 + (Math.random() - 0.5) * 8,
        wind_speed: 18.9 + (Math.random() - 0.5) * 8,
        visibility: 6.8 + (Math.random() - 0.5) * 4,
        air_quality_index: 52 + (Math.random() - 0.5) * 20,
      },
      confidence_factors: {
        historical_data: 84 + Math.floor(Math.random() * 10),
        satellite_imagery: 89 + Math.floor(Math.random() * 8),
        weather_models: 87 + Math.floor(Math.random() * 10),
        ai_analysis: 75 + Math.floor(Math.random() * 15),
      },
      generated_at: new Date(baseTime.getTime() + 20 * 60 * 1000).toISOString(),
    },
    {
      id: `fallback-${cityCode}-storm-system-6`,
      type: 'storm_system',
      title: 'Mesoscale Convective Complex',
      location: `${region} Northern Sectors`,
      coordinates: {
        lat: baseLat,
        lon: baseLon,
      },
      probability: Math.floor(Math.random() * 22 + 68), // 68-90%
      timeframe: 'Next 4-8 Hours',
      impact: 'HIGH',
      description: 'Satellite imagery reveals organized convective system development with potential for severe weather impacts.',
      detailed_analysis: 'Doppler radar analysis shows mesoscale convective organization with rotating updrafts and strong low-level convergence. Atmospheric soundings indicate CAPE values exceeding 3500 J/kg with minimal convective inhibition. The system exhibits characteristics consistent with supercell development, posing risks of large hail, damaging winds exceeding 100 km/h, and potential tornado formation.',
      recommendations: [
        'Implement immediate severe weather protocols',
        'Secure all outdoor equipment and temporary structures',
        'Activate emergency communication systems',
        'Prepare for potential power outages and backup systems',
        'Monitor radar imagery for storm track updates',
        'Coordinate with emergency management agencies',
      ],
      atmospheric_data: {
        temperature: 32.7 + (Math.random() - 0.5) * 6,
        pressure: 998.3 + (Math.random() - 0.5) * 12,
        humidity: 84.6 + (Math.random() - 0.5) * 10,
        wind_speed: 31.2 + (Math.random() - 0.5) * 15,
        visibility: 9.1 + (Math.random() - 0.5) * 6,
        air_quality_index: 73 + (Math.random() - 0.5) * 25,
      },
      confidence_factors: {
        historical_data: 87 + Math.floor(Math.random() * 8),
        satellite_imagery: 94 + Math.floor(Math.random() * 5),
        weather_models: 89 + Math.floor(Math.random() * 8),
        ai_analysis: 81 + Math.floor(Math.random() * 12),
      },
      generated_at: new Date(baseTime.getTime() + 25 * 60 * 1000).toISOString(),
    },
    {
      id: `fallback-${cityCode}-wildfire-risk-7`,
      type: 'wildfire_risk',
      title: 'Wildfire Susceptibility Analysis',
      location: `${region} Mountainous Areas`,
      coordinates: {
        lat: baseLat,
        lon: baseLon,
      },
      probability: Math.floor(Math.random() * 25 + 45), // 45-70%
      timeframe: 'Next 2-5 Days',
      impact: 'MODERATE',
      description: 'Fire weather analysis indicates elevated wildfire risk due to dry conditions and favorable wind patterns.',
      detailed_analysis: 'Fuel moisture content has decreased to 8% in elevated terrain, approaching critical fire weather thresholds. Wind speed forecasts show sustained speeds of 15-25 km/h with gusts to 40 km/h from the northeast. Relative humidity is expected to drop below 30% during afternoon hours, creating optimal fire spread conditions.',
      recommendations: [
        'Implement fire prevention measures in vulnerable areas',
        'Increase water reserves for firefighting operations',
        'Monitor vegetation moisture levels continuously',
        'Restrict outdoor burning and spark-producing activities',
        'Prepare evacuation routes for critical facilities',
        'Coordinate with forestry services for fire suppression readiness',
      ],
      atmospheric_data: {
        temperature: 37.4 + (Math.random() - 0.5) * 5,
        pressure: 1015.9 + (Math.random() - 0.5) * 6,
        humidity: 28.7 + (Math.random() - 0.5) * 12,
        wind_speed: 22.1 + (Math.random() - 0.5) * 8,
        visibility: 16.3 + (Math.random() - 0.5) * 6,
        air_quality_index: 95 + (Math.random() - 0.5) * 30,
      },
      confidence_factors: {
        historical_data: 76 + Math.floor(Math.random() * 15),
        satellite_imagery: 82 + Math.floor(Math.random() * 12),
        weather_models: 79 + Math.floor(Math.random() * 15),
        ai_analysis: 71 + Math.floor(Math.random() * 18),
      },
      generated_at: new Date(baseTime.getTime() + 30 * 60 * 1000).toISOString(),
    },
    {
      id: `fallback-${cityCode}-air-quality-8`,
      type: 'air_quality',
      title: 'Atmospheric Inversion Event',
      location: `${region} Valley Regions`,
      coordinates: {
        lat: baseLat,
        lon: baseLon,
      },
      probability: Math.floor(Math.random() * 20 + 70), // 70-90%
      timeframe: 'Next 12-24 Hours',
      impact: 'HIGH',
      description: 'Meteorological conditions favor formation of temperature inversion layers that will trap pollutants near surface level.',
      detailed_analysis: 'Nocturnal cooling patterns combined with high-pressure conditions are creating strong temperature inversions at 200-400m altitude. This atmospheric lid effect will prevent vertical mixing of pollutants, leading to accumulation of particulate matter and gaseous pollutants in populated valleys. Morning fog formation may further reduce visibility and air quality.',
      recommendations: [
        'Activate enhanced air monitoring protocols',
        'Implement respiratory protection for all outdoor workers',
        'Reduce industrial emissions during inversion periods',
        'Increase indoor air filtration capacity',
        'Monitor vulnerable populations for respiratory distress',
        'Prepare emergency air quality response measures',
      ],
      atmospheric_data: {
        temperature: 24.1 + (Math.random() - 0.5) * 4,
        pressure: 1019.2 + (Math.random() - 0.5) * 5,
        humidity: 91.3 + (Math.random() - 0.5) * 6,
        wind_speed: 3.7 + (Math.random() - 0.5) * 3,
        visibility: 2.8 + (Math.random() - 0.5) * 2,
        air_quality_index: 187 + (Math.random() - 0.5) * 35,
      },
      confidence_factors: {
        historical_data: 91 + Math.floor(Math.random() * 7),
        satellite_imagery: 73 + Math.floor(Math.random() * 18),
        weather_models: 88 + Math.floor(Math.random() * 10),
        ai_analysis: 85 + Math.floor(Math.random() * 12),
      },
      generated_at: new Date(baseTime.getTime() + 35 * 60 * 1000).toISOString(),
    },
    {
      id: `fallback-${cityCode}-temperature-extreme-9`,
      type: 'temperature_extreme',
      title: 'Rapid Temperature Drop Warning',
      location: `${region} Elevated Areas`,
      coordinates: {
        lat: baseLat,
        lon: baseLon,
      },
      probability: Math.floor(Math.random() * 18 + 62), // 62-80%
      timeframe: 'Next 6-12 Hours',
      impact: 'MODERATE',
      description: 'Cold front analysis indicates rapid temperature decrease with potential infrastructure impacts.',
      detailed_analysis: 'A strong cold front is approaching from the northwest, bringing a sharp temperature gradient of 15-20°C within a 4-hour period. This rapid cooling may cause thermal stress in infrastructure, particularly in metal structures and pipelines. Condensation formation on equipment surfaces may lead to operational issues.',
      recommendations: [
        'Prepare heating systems for rapid temperature changes',
        'Monitor thermal expansion joints in infrastructure',
        'Implement condensation prevention measures',
        'Check insulation integrity in critical systems',
        'Prepare for increased energy demand for heating',
        'Monitor equipment for thermal stress indicators',
      ],
      atmospheric_data: {
        temperature: 18.9 + (Math.random() - 0.5) * 8,
        pressure: 1024.1 + (Math.random() - 0.5) * 6,
        humidity: 67.8 + (Math.random() - 0.5) * 20,
        wind_speed: 28.3 + (Math.random() - 0.5) * 10,
        visibility: 14.2 + (Math.random() - 0.5) * 5,
        air_quality_index: 61 + (Math.random() - 0.5) * 25,
      },
      confidence_factors: {
        historical_data: 83 + Math.floor(Math.random() * 12),
        satellite_imagery: 79 + Math.floor(Math.random() * 15),
        weather_models: 92 + Math.floor(Math.random() * 6),
        ai_analysis: 77 + Math.floor(Math.random() * 15),
      },
      generated_at: new Date(baseTime.getTime() + 40 * 60 * 1000).toISOString(),
    },
    {
      id: `fallback-${cityCode}-severe-weather-10`,
      type: 'severe_weather',
      title: 'Squall Line Development',
      location: `${region} Eastern Coastal Areas`,
      coordinates: {
        lat: baseLat,
        lon: baseLon,
      },
      probability: Math.floor(Math.random() * 17 + 73), // 73-90%
      timeframe: 'Next 3-6 Hours',
      impact: 'HIGH',
      description: 'Linear convective system formation detected with potential for widespread severe weather impacts.',
      detailed_analysis: 'Mesoscale analysis reveals a developing squall line with embedded supercells moving inland from oceanic regions. Wind shear profiles support organized convective structures with bow echo potential. Surface convergence zones are strengthening, indicating possible derecho development with widespread damaging winds.',
      recommendations: [
        'Activate comprehensive severe weather emergency protocols',
        'Secure all loose materials and temporary structures',
        'Prepare for extended power outages and communication disruptions',
        'Implement shelter-in-place procedures for personnel',
        'Monitor storm progression with high-resolution radar',
        'Coordinate with regional emergency response networks',
      ],
      atmospheric_data: {
        temperature: 29.8 + (Math.random() - 0.5) * 5,
        pressure: 1001.4 + (Math.random() - 0.5) * 10,
        humidity: 86.2 + (Math.random() - 0.5) * 8,
        wind_speed: 35.7 + (Math.random() - 0.5) * 12,
        visibility: 7.4 + (Math.random() - 0.5) * 4,
        air_quality_index: 68 + (Math.random() - 0.5) * 20,
      },
      confidence_factors: {
        historical_data: 89 + Math.floor(Math.random() * 8),
        satellite_imagery: 96 + Math.floor(Math.random() * 4),
        weather_models: 91 + Math.floor(Math.random() * 7),
        ai_analysis: 83 + Math.floor(Math.random() * 12),
      },
      generated_at: new Date(baseTime.getTime() + 45 * 60 * 1000).toISOString(),
    },
    {
      id: `fallback-${cityCode}-air-quality-11`,
      type: 'air_quality',
      title: 'Saharan Dust Transport Event',
      location: `${region} Atmospheric Column`,
      coordinates: {
        lat: baseLat,
        lon: baseLon,
      },
      probability: Math.floor(Math.random() * 15 + 75), // 75-90%
      timeframe: 'Next 24-48 Hours',
      impact: 'MODERATE',
      description: 'Satellite tracking indicates incoming Saharan dust plume with significant atmospheric particulate loading.',
      detailed_analysis: 'MODIS and VIIRS satellite imagery confirms a dense Saharan dust plume crossing the Atlantic with aerosol optical depth values exceeding 0.8. Transport models indicate arrival within 24-48 hours, bringing elevated PM10 concentrations and reduced visibility. The dust layer extends from surface to 4km altitude.',
      recommendations: [
        'Prepare air filtration systems for increased particulate load',
        'Issue respiratory health advisories for sensitive populations',
        'Increase cleaning frequency for outdoor equipment',
        'Monitor solar panel efficiency due to dust accumulation',
        'Prepare for reduced visibility in transportation operations',
        'Implement dust protection measures for sensitive electronics',
      ],
      atmospheric_data: {
        temperature: 30.4 + (Math.random() - 0.5) * 4,
        pressure: 1016.8 + (Math.random() - 0.5) * 5,
        humidity: 58.9 + (Math.random() - 0.5) * 15,
        wind_speed: 19.6 + (Math.random() - 0.5) * 8,
        visibility: 5.3 + (Math.random() - 0.5) * 3,
        air_quality_index: 142 + (Math.random() - 0.5) * 30,
      },
      confidence_factors: {
        historical_data: 92 + Math.floor(Math.random() * 6),
        satellite_imagery: 97 + Math.floor(Math.random() * 3),
        weather_models: 85 + Math.floor(Math.random() * 10),
        ai_analysis: 88 + Math.floor(Math.random() * 8),
      },
      generated_at: new Date(baseTime.getTime() + 50 * 60 * 1000).toISOString(),
    },
    {
      id: `fallback-${cityCode}-drought-risk-12`,
      type: 'drought_risk',
      title: 'Agricultural Water Stress Alert',
      location: `${region} Rural Agricultural Zones`,
      coordinates: {
        lat: baseLat,
        lon: baseLon,
      },
      probability: Math.floor(Math.random() * 20 + 58), // 58-78%
      timeframe: 'Next 5-10 Days',
      impact: 'MODERATE',
      description: 'Soil moisture analysis reveals developing water stress conditions in agricultural production areas.',
      detailed_analysis: 'SMAP satellite soil moisture data indicates a 42% decrease in root zone water content over the past 21 days. Evapotranspiration rates are exceeding precipitation input by 15mm per week. Crop stress indicators are beginning to appear in satellite vegetation indices, suggesting potential yield impacts.',
      recommendations: [
        'Implement water conservation strategies in agricultural operations',
        'Monitor crop health indicators through satellite imagery',
        'Prepare alternative water sources for irrigation',
        'Adjust planting schedules for water-efficient crops',
        'Coordinate with agricultural cooperatives on water sharing',
        'Implement precision irrigation technologies',
      ],
      atmospheric_data: {
        temperature: 34.6 + (Math.random() - 0.5) * 4,
        pressure: 1020.3 + (Math.random() - 0.5) * 4,
        humidity: 41.2 + (Math.random() - 0.5) * 15,
        wind_speed: 14.8 + (Math.random() - 0.5) * 6,
        visibility: 19.7 + (Math.random() - 0.5) * 4,
        air_quality_index: 84 + (Math.random() - 0.5) * 20,
      },
      confidence_factors: {
        historical_data: 86 + Math.floor(Math.random() * 10),
        satellite_imagery: 93 + Math.floor(Math.random() * 6),
        weather_models: 74 + Math.floor(Math.random() * 18),
        ai_analysis: 80 + Math.floor(Math.random() * 15),
      },
      generated_at: new Date(baseTime.getTime() + 55 * 60 * 1000).toISOString(),
    },
    {
      id: `fallback-${cityCode}-storm-system-13`,
      type: 'storm_system',
      title: 'Tropical Wave Intensification',
      location: `${region} Marine Areas`,
      coordinates: {
        lat: baseLat,
        lon: baseLon,
      },
      probability: Math.floor(Math.random() * 22 + 63), // 63-85%
      timeframe: 'Next 18-36 Hours',
      impact: 'HIGH',
      description: 'Tropical meteorology analysis indicates strengthening tropical wave with cyclogenesis potential.',
      detailed_analysis: 'Sea surface temperatures of 29.2°C combined with low wind shear (<10 knots) are providing favorable conditions for tropical development. Satellite-derived wind analysis shows increasing low-level circulation with convective organization. The system has a 70% probability of reaching tropical depression status within 48 hours.',
      recommendations: [
        'Activate tropical weather preparedness protocols',
        'Secure marine operations and coastal facilities',
        'Monitor storm track forecasts every 6 hours',
        'Prepare for potential tropical storm conditions',
        'Coordinate with maritime authorities for vessel safety',
        'Implement storm surge protection measures',
      ],
      atmospheric_data: {
        temperature: 29.2 + (Math.random() - 0.5) * 3,
        pressure: 1009.7 + (Math.random() - 0.5) * 8,
        humidity: 87.4 + (Math.random() - 0.5) * 8,
        wind_speed: 26.8 + (Math.random() - 0.5) * 12,
        visibility: 11.6 + (Math.random() - 0.5) * 6,
        air_quality_index: 58 + (Math.random() - 0.5) * 20,
      },
      confidence_factors: {
        historical_data: 81 + Math.floor(Math.random() * 12),
        satellite_imagery: 89 + Math.floor(Math.random() * 8),
        weather_models: 86 + Math.floor(Math.random() * 10),
        ai_analysis: 74 + Math.floor(Math.random() * 16),
      },
      generated_at: new Date(baseTime.getTime() + 60 * 60 * 1000).toISOString(),
    },
    {
      id: `fallback-${cityCode}-flood-risk-14`,
      type: 'flood_risk',
      title: 'Urban Drainage System Overload',
      location: `${region} Urban Infrastructure`,
      coordinates: {
        lat: baseLat,
        lon: baseLon,
      },
      probability: Math.floor(Math.random() * 25 + 55), // 55-80%
      timeframe: 'Next 4-8 Hours',
      impact: 'MODERATE',
      description: 'Hydrological modeling indicates potential urban flooding due to drainage system capacity limitations.',
      detailed_analysis: 'Rainfall accumulation forecasts show 35-50mm expected within a 3-hour window, exceeding the design capacity of urban drainage infrastructure by 25%. Combined with high tide conditions and reduced infiltration due to urbanization, surface water accumulation is likely in low-lying areas and poorly drained zones.',
      recommendations: [
        'Activate urban flood management protocols',
        'Deploy portable pumping systems to vulnerable areas',
        'Clear storm drains and drainage channels',
        'Implement traffic management for flood-prone routes',
        'Prepare sandbags and flood barriers',
        'Monitor water levels in critical infrastructure zones',
      ],
      atmospheric_data: {
        temperature: 27.3 + (Math.random() - 0.5) * 4,
        pressure: 1007.9 + (Math.random() - 0.5) * 8,
        humidity: 92.1 + (Math.random() - 0.5) * 6,
        wind_speed: 21.4 + (Math.random() - 0.5) * 8,
        visibility: 8.9 + (Math.random() - 0.5) * 4,
        air_quality_index: 71 + (Math.random() - 0.5) * 18,
      },
      confidence_factors: {
        historical_data: 87 + Math.floor(Math.random() * 10),
        satellite_imagery: 82 + Math.floor(Math.random() * 12),
        weather_models: 89 + Math.floor(Math.random() * 8),
        ai_analysis: 79 + Math.floor(Math.random() * 14),
      },
      generated_at: new Date(baseTime.getTime() + 65 * 60 * 1000).toISOString(),
    },
    {
      id: `fallback-${cityCode}-wildfire-risk-15`,
      type: 'wildfire_risk',
      title: 'Critical Fire Weather Conditions',
      location: `${region} Forested Highlands`,
      coordinates: {
        lat: baseLat,
        lon: baseLon,
      },
      probability: Math.floor(Math.random() * 20 + 65), // 65-85%
      timeframe: 'Next 12-24 Hours',
      impact: 'HIGH',
      description: 'Fire weather index calculations indicate extreme fire danger conditions in forested areas.',
      detailed_analysis: 'Dead fuel moisture content has dropped to 6% in 1-hour timelag fuels, while 10-hour fuels show 9% moisture content. Combined with forecast wind speeds of 25-35 km/h and relative humidity below 25%, the Haines Index reaches level 6 (very high potential for large fire growth). Atmospheric instability may also support erratic fire behavior.',
      recommendations: [
        'Implement highest level fire restrictions immediately',
        'Position firefighting resources in strategic locations',
        'Establish firebreaks around critical infrastructure',
        'Monitor weather stations for wind speed and direction changes',
        'Prepare evacuation plans for personnel in remote areas',
        'Coordinate with forestry services for suppression readiness',
      ],
      atmospheric_data: {
        temperature: 38.7 + (Math.random() - 0.5) * 4,
        pressure: 1013.6 + (Math.random() - 0.5) * 6,
        humidity: 22.4 + (Math.random() - 0.5) * 10,
        wind_speed: 29.1 + (Math.random() - 0.5) * 10,
        visibility: 17.8 + (Math.random() - 0.5) * 5,
        air_quality_index: 103 + (Math.random() - 0.5) * 25,
      },
      confidence_factors: {
        historical_data: 88 + Math.floor(Math.random() * 8),
        satellite_imagery: 85 + Math.floor(Math.random() * 12),
        weather_models: 93 + Math.floor(Math.random() * 6),
        ai_analysis: 81 + Math.floor(Math.random() * 14),
      },
      generated_at: new Date(baseTime.getTime() + 70 * 60 * 1000).toISOString(),
    },
  ];
  
  return predictions;
};

// Enhanced fallback with more realistic regional variations
export const getRegionalFallbackPredictions = (cityCode: string, cityName: string, country: string, cityCoords?: [number, number]): LLMClimatePrediction[] => {
  const baseTime = new Date();

  // Use city coordinates if provided, otherwise use defaults
  const baseLat = cityCoords ? cityCoords[0] : 18.4861;
  const baseLon = cityCoords ? cityCoords[1] : -69.9312;

  console.log('🗺️ Generating predictions for:', {
    cityCode,
    cityName,
    country,
    cityCoords,
    baseLat,
    baseLon
  });

  // Customize predictions based on geographic region
  if (country.includes('Dominican') || country.includes('Caribbean')) {
    const basePredictions = generateFallbackPredictions(cityCode, country, cityCoords);
    console.log('🔮 Base predictions generated:', basePredictions.length);

    const caribbeanPrediction = {
      id: `caribbean-${cityCode}-tropical-1`,
      type: 'storm_system',
      title: 'Tropical Storm Development',
      location: 'Caribbean Basin',
      coordinates: { lat: baseLat, lon: baseLon },
      probability: 68,
      timeframe: 'Next 48 Hours',
      impact: 'HIGH',
      description: 'Tropical disturbance showing signs of organization with potential for rapid intensification.',
      detailed_analysis: 'Sea surface temperatures exceeding 28°C combined with low wind shear create favorable conditions for tropical cyclogenesis. The system is currently located southeast of the Lesser Antilles and tracking west-northwest at 15 mph. Rapid intensification is possible within the next 24-48 hours as the system moves over warmer waters.',
      recommendations: [
        'Secure all outdoor equipment and materials',
        'Activate hurricane preparedness protocols',
        'Monitor storm track updates every 3 hours',
        'Prepare emergency supply distribution plans',
        'Coordinate with regional emergency management',
      ],
      atmospheric_data: {
        temperature: 29.2,
        pressure: 1008.3,
        humidity: 82.1,
        wind_speed: 35.6,
        visibility: 12.4,
        air_quality_index: 45,
      },
      confidence_factors: {
        historical_data: 88,
        satellite_imagery: 92,
        weather_models: 85,
        ai_analysis: 68,
      },
      generated_at: baseTime.toISOString(),
    };

    const result = [caribbeanPrediction, ...basePredictions];
    console.log('🔮 Caribbean predictions total:', result.length, 'predictions');
    return result;
  }

  // For other regions, return the base predictions with regional customization
  const basePredictions = generateFallbackPredictions(cityCode, country, cityCoords);
  
  // Add region-specific predictions based on location
  const regionalPredictions: LLMClimatePrediction[] = [];
  
  if (country.includes('United States')) {
    regionalPredictions.push({
      id: `us-${cityCode}-tornado-1`,
      type: 'severe_weather',
      title: 'Tornado Watch Conditions',
      location: `${country} Tornado Alley`,
      coordinates: { lat: baseLat, lon: baseLon },
      probability: 72,
      timeframe: 'Next 6-12 Hours',
      impact: 'EXTREME',
      description: 'Atmospheric conditions favor tornadic development with strong wind shear and instability.',
      detailed_analysis: 'Supercell thunderstorm development is likely given current atmospheric parameters including strong low-level wind shear, high CAPE values, and significant storm-relative helicity. Doppler radar signatures suggest mesocyclone development with potential for tornado formation.',
      recommendations: [
        'Implement tornado safety protocols immediately',
        'Identify and prepare safe rooms and shelters',
        'Monitor weather radar for rotation signatures',
        'Prepare for rapid emergency response deployment',
        'Secure all loose materials and equipment',
      ],
      atmospheric_data: {
        temperature: 32.1,
        pressure: 1002.7,
        humidity: 76.8,
        wind_speed: 42.3,
        visibility: 9.7,
        air_quality_index: 78,
      },
      confidence_factors: {
        historical_data: 91,
        satellite_imagery: 87,
        weather_models: 94,
        ai_analysis: 82,
      },
      generated_at: new Date(baseTime.getTime() + 75 * 60 * 1000).toISOString(),
    });
  }

  const allPredictions = [...basePredictions, ...regionalPredictions];
  console.log('🔮 Total predictions for other regions:', allPredictions.length, 'predictions');

  return allPredictions;
};