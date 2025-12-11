import { z } from 'zod';

// Base schemas
export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  date: z.string(),
  geometry: z.array(z.object({
    type: z.string(),
    coordinates: z.array(z.number()),
  })),
  source: z.enum(['EONET', 'DONKI']),
  severity: z.enum(['LOW', 'MODERATE', 'HIGH', 'EXTREME']).optional(),
});

export const AirQualitySchema = z.object({
  city: z.string(),
  current: z.object({
    no2: z.number(),
    timestamp: z.string(),
  }),
  forecast: z.object({
    no2: z.number(),
    confidence: z.number(),
    timestamp: z.string(),
  }),
});

export const SpaceWeatherSchema = z.object({
  score: z.number().min(0).max(100),
  risk_level: z.enum(['LOW', 'MODERATE', 'HIGH', 'EXTREME']),
  events: z.array(z.object({
    type: z.string(),
    eta: z.string().optional(),
    speed: z.number().optional(),
    halo: z.boolean().optional(),
    bz: z.number().optional(),
    sector: z.string(),
  })),
});

export const SSISchema = z.object({
  city: z.string(),
  index: z.number().min(0).max(100),
  components: z.object({
    air_quality: z.number(),
    space_weather: z.number(),
    visibility: z.number(),
  }),
  recommendation: z.string(),
});

export const EconomicsSchema = z.object({
  city: z.string(),
  timestamp: z.string(),
  estimated_losses: z.object({
    aviation: z.number(),
    agriculture: z.number(),
    health: z.number(),
    total: z.number(),
  }),
  assumptions: z.object({
    flight_disruption_rate: z.number(),
    crop_yield_impact: z.number(),
    health_cost_per_case: z.number(),
  }),
});

export const LLMClimatePredictionSchema = z.object({
  id: z.string(),
  type: z.enum(['severe_weather', 'temperature_extreme', 'air_quality', 'drought_risk', 'flood_risk', 'storm_system', 'wildfire_risk']),
  title: z.string(),
  location: z.string(),
  coordinates: z.object({
    lat: z.number(),
    lon: z.number(),
  }).optional(),
  probability: z.number().min(0).max(100),
  timeframe: z.string(),
  impact: z.enum(['LOW', 'MODERATE', 'HIGH', 'EXTREME']),
  description: z.string(),
  detailed_analysis: z.string(),
  recommendations: z.array(z.string()),
  atmospheric_data: z.object({
    temperature: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    wind_speed: z.number(),
    visibility: z.number(),
    air_quality_index: z.number(),
  }),
  confidence_factors: z.object({
    historical_data: z.number(),
    satellite_imagery: z.number(),
    weather_models: z.number(),
    ai_analysis: z.number(),
  }),
  generated_at: z.string(),
});

// Types
export type Event = z.infer<typeof EventSchema>;
export type AirQuality = z.infer<typeof AirQualitySchema>;
export type SpaceWeather = z.infer<typeof SpaceWeatherSchema>;
export type SSI = z.infer<typeof SSISchema>;
export type Economics = z.infer<typeof EconomicsSchema>;
export type LLMClimatePrediction = z.infer<typeof LLMClimatePredictionSchema>;

export interface City {
  name: string;
  code: string;
  coords: [number, number];
  country: string;
}