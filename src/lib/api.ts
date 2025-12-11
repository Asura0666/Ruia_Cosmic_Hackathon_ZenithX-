import { QueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { 
  EventSchema, 
  AirQualitySchema, 
  SpaceWeatherSchema, 
  SSISchema, 
  EconomicsSchema,
  LLMClimatePredictionSchema,
  Event,
  AirQuality,
  SpaceWeather,
  SSI,
  Economics,
  LLMClimatePrediction
} from '../types/api';
import { getRegionalFallbackPredictions } from './llm-fallback';

const API_BASE = import.meta.env.VITE_API_BASE || '';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

class ApiClient {
  private async request<T>(endpoint: string, schema: z.ZodSchema<T>): Promise<T> {
    // If no API base is configured, throw a descriptive error
    if (!API_BASE) {
      throw new Error('Backend API not configured. Please set VITE_API_BASE environment variable.');
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return schema.parse(data);
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.warn(`Backend API not available for ${endpoint}. This is expected if backend is not running.`);
        throw new Error('Backend API not available');
      }
      console.warn(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  async getEvents(bbox?: string, days = 7): Promise<Event[]> {
    const params = new URLSearchParams();
    if (bbox) params.set('bbox', bbox);
    params.set('days', days.toString());
    
    try {
      return await this.request(
        `/api/v1/events/recent?${params}`,
        z.array(EventSchema)
      );
    } catch (error) {
      // Si el backend no está disponible, usar datos de fallback
      console.log('Backend no disponible para eventos, usando datos de fallback');
      return this.getFallbackEvents();
    }
  }

  async getAirQuality(city: string, hours = 6): Promise<AirQuality> {
    const params = new URLSearchParams({
      city,
      h: hours.toString(),
    });
    
    try {
      return await this.request(
        `/api/v1/predict/air-quality?${params}`,
        AirQualitySchema
      );
    } catch (error) {
      // Si el backend no está disponible, usar datos de fallback
      console.log('Backend no disponible para calidad del aire, usando datos de fallback');
      return this.getFallbackAirQuality(city);
    }
  }

  async getSpaceWeather(): Promise<SpaceWeather> {
    try {
      return await this.request('/api/v1/predict/space-weather', SpaceWeatherSchema);
    } catch (error) {
      // Si el backend no está disponible, usar datos de fallback
      console.log('Backend no disponible para clima espacial, usando datos de fallback');
      return this.getFallbackSpaceWeather();
    }
  }

  async getSSI(city: string): Promise<SSI> {
    const params = new URLSearchParams({ city });
    try {
      return await this.request(`/api/v1/ssi?${params}`, SSISchema);
    } catch (error) {
      // Si el backend no está disponible, usar datos de fallback
      console.log('Backend no disponible para SSI, usando datos de fallback');
      return this.getFallbackSSI(city);
    }
  }

  async getEconomics(city: string, timestamp?: string): Promise<Economics> {
    const params = new URLSearchParams({ city });
    if (timestamp) params.set('ts', timestamp);
    
    try {
      return await this.request(`/api/v1/economics?${params}`, EconomicsSchema);
    } catch (error) {
      // Si el backend no está disponible, usar datos de fallback
      console.log('Backend no disponible para economía, usando datos de fallback');
      return this.getFallbackEconomics(city);
    }
  }

  async getLLMClimatePredictions(city: string, region?: string): Promise<LLMClimatePrediction[]> {
    const params = new URLSearchParams({ city });
    if (region) params.set('region', region);
    
    try {
      return await this.request(
        `/api/v1/predict/llm-climate?${params}`,
        z.array(LLMClimatePredictionSchema)
      );
    } catch (error) {
      // Si el backend no está disponible, usar datos de fallback
      console.log('Backend no disponible para predicciones LLM, usando datos de fallback');
      return getRegionalFallbackPredictions(city, city, region || 'Caribbean');
    }
  }

  async ping(endpoint: string): Promise<{ latency: number; status: 'ok' | 'error' }> {
    const start = Date.now();
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      });
      return {
        latency: Date.now() - start,
        status: response.ok ? 'ok' : 'error',
      };
    } catch {
      return {
        latency: Date.now() - start,
        status: 'error',
      };
    }
  }

  // Métodos de fallback para cuando el backend no está disponible
  private getFallbackEvents(): Event[] {
    const now = new Date();
    return [
      {
        id: 'fallback-event-1',
        title: 'Tropical Storm Warning',
        description: 'Tropical disturbance approaching Caribbean region',
        category: 'storms',
        coordinates: { lat: 18.4861, lon: -69.9312 },
        date: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
        source: 'NOAA',
        severity: 'moderate',
        status: 'active'
      },
      {
        id: 'fallback-event-2',
        title: 'Air Quality Alert',
        description: 'Elevated particulate matter levels detected',
        category: 'air_quality',
        coordinates: { lat: 18.4861, lon: -69.9312 },
        date: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString(),
        source: 'EPA',
        severity: 'high',
        status: 'active'
      }
    ];
  }

  private getFallbackAirQuality(city: string): AirQuality {
    const now = new Date();
    return {
      city,
      timestamp: now.toISOString(),
      aqi: 85 + Math.floor(Math.random() * 30),
      pm25: 35 + Math.floor(Math.random() * 20),
      pm10: 45 + Math.floor(Math.random() * 25),
      no2: 25 + Math.floor(Math.random() * 15),
      o3: 45 + Math.floor(Math.random() * 20),
      co: 1.2 + Math.random() * 0.8,
      so2: 8 + Math.floor(Math.random() * 12),
      forecast: Array.from({ length: 6 }, (_, i) => ({
        hour: i + 1,
        aqi: 80 + Math.floor(Math.random() * 40),
        pm25: 30 + Math.floor(Math.random() * 30),
        confidence: 75 + Math.floor(Math.random() * 20)
      }))
    };
  }

  private getFallbackSpaceWeather(): SpaceWeather {
    const now = new Date();
    return {
      timestamp: now.toISOString(),
      kp_index: 3 + Math.floor(Math.random() * 3),
      ap_index: 15 + Math.floor(Math.random() * 20),
      solar_wind_speed: 400 + Math.floor(Math.random() * 200),
      bz: -5 + Math.floor(Math.random() * 10),
      solar_flux: 120 + Math.floor(Math.random() * 50),
      sunspot_number: 45 + Math.floor(Math.random() * 30),
      geomagnetic_storm: Math.random() > 0.7 ? 'minor' : 'none',
      aurora_activity: Math.random() > 0.8 ? 'active' : 'quiet',
      forecast: Array.from({ length: 24 }, (_, i) => ({
        hour: i + 1,
        kp_index: 2 + Math.floor(Math.random() * 4),
        storm_probability: Math.floor(Math.random() * 30)
      }))
    };
  }

  private getFallbackSSI(city: string): SSI {
    const now = new Date();
    const baseScore = 75 + Math.floor(Math.random() * 20);
    return {
      city,
      timestamp: now.toISOString(),
      score: baseScore,
      air_quality_component: Math.floor(baseScore * 0.4),
      space_weather_component: Math.floor(baseScore * 0.35),
      visibility_component: Math.floor(baseScore * 0.25),
      trend: Math.random() > 0.5 ? 'improving' : 'stable',
      forecast: Array.from({ length: 24 }, (_, i) => ({
        hour: i + 1,
        score: baseScore + Math.floor(Math.random() * 20) - 10,
        confidence: 80 + Math.floor(Math.random() * 15)
      }))
    };
  }

  private getFallbackEconomics(city: string): Economics {
    const now = new Date();
    return {
      city,
      timestamp: now.toISOString(),
      aviation_losses: 125000 + Math.floor(Math.random() * 50000),
      agriculture_losses: 75000 + Math.floor(Math.random() * 30000),
      health_losses: 45000 + Math.floor(Math.random() * 20000),
      infrastructure_losses: 85000 + Math.floor(Math.random() * 35000),
      total_daily_loss: 330000 + Math.floor(Math.random() * 135000),
      forecast: Array.from({ length: 7 }, (_, i) => ({
        day: i + 1,
        estimated_loss: 300000 + Math.floor(Math.random() * 150000),
        confidence: 70 + Math.floor(Math.random() * 25)
      }))
    };
  }
}

export const api = new ApiClient();

// Query keys
export const queryKeys = {
  events: (bbox?: string, days?: number) => ['events', bbox, days],
  airQuality: (city: string, hours?: number) => ['air-quality', city, hours],
  spaceWeather: () => ['space-weather'],
  ssi: (city: string) => ['ssi', city],
  economics: (city: string, timestamp?: string) => ['economics', city, timestamp],
  llmClimatePredictions: (city: string, region?: string) => ['llm-climate-predictions', city, region],
  apiStatus: (endpoint: string) => ['api-status', endpoint],
};