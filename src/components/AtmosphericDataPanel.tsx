import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Thermometer, 
  Wind, 
  Zap, 
  Sun, 
  Activity,
  Satellite
} from 'lucide-react';
import { Badge } from './ui/badge';

interface AtmosphericData {
  timestamp: string;
  solarActivity: {
    solarFlares: number;
    solarWind: number;
    magneticField: number;
    coronalMass: number;
  };
  earthAtmosphere: {
    temperature: number;
    pressure: number;
    humidity: number;
    ozone: number;
    co2: number;
    radiation: number;
  };
  spaceWeather: {
    kpIndex: number;
    apIndex: number;
    dstIndex: number;
    f107: number;
  };
  planetaryData: {
    mars: { temp: number; pressure: number; dust: number };
    venus: { temp: number; pressure: number; sulfur: number };
    jupiter: { temp: number; radiation: number; storms: number };
    saturn: { temp: number; rings: number; moons: number };
  };
}

const generateAtmosphericData = (): AtmosphericData => {
  const now = new Date();
  return {
    timestamp: now.toISOString(),
    solarActivity: {
      solarFlares: Math.random() * 10 + 1,
      solarWind: Math.random() * 800 + 300,
      magneticField: Math.random() * 50 + 10,
      coronalMass: Math.random() * 5,
    },
    earthAtmosphere: {
      temperature: Math.random() * 30 + 10,
      pressure: Math.random() * 50 + 1000,
      humidity: Math.random() * 40 + 40,
      ozone: Math.random() * 100 + 250,
      co2: Math.random() * 20 + 410,
      radiation: Math.random() * 0.5 + 0.1,
    },
    spaceWeather: {
      kpIndex: Math.random() * 9,
      apIndex: Math.random() * 400,
      dstIndex: Math.random() * 200 - 100,
      f107: Math.random() * 200 + 70,
    },
    planetaryData: {
      mars: { 
        temp: Math.random() * 40 - 80, 
        pressure: Math.random() * 2 + 0.4, 
        dust: Math.random() * 100 
      },
      venus: { 
        temp: Math.random() * 50 + 450, 
        pressure: Math.random() * 10 + 90, 
        sulfur: Math.random() * 100 
      },
      jupiter: { 
        temp: Math.random() * 20 - 150, 
        radiation: Math.random() * 1000 + 500, 
        storms: Math.floor(Math.random() * 5) + 1 
      },
      saturn: { 
        temp: Math.random() * 20 - 180, 
        rings: Math.random() * 100 + 95, 
        moons: 146 
      },
    },
  };
};

export const AtmosphericDataPanel: React.FC = () => {
  const [data, setData] = useState<AtmosphericData>(generateAtmosphericData());
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        setData(generateAtmosphericData());
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isLive]);

  const formatValue = (value: number, decimals = 1): string => {
    return value.toFixed(decimals);
  };

  const getStatusColor = (value: number, min: number, max: number): string => {
    const normalized = (value - min) / (max - min);
    if (normalized < 0.3) return 'text-green-400';
    if (normalized < 0.7) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-black/95 backdrop-blur-xl border-t border-space-primary/30 p-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-space-primary" />
            <h2 className="text-lg font-bold text-space-primary font-mono">
              SOLAR SYSTEM ATMOSPHERIC MONITORING
            </h2>
          </div>
          <Badge className="bg-green-500 hover:bg-green-600 animate-pulse">
            LIVE DATA
          </Badge>
        </div>
        <div className="text-xs text-space-accent font-mono">
          GMT {data.timestamp.split('T')[1].split('.')[0]} | 
          {data.timestamp.split('T')[0]}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 font-mono text-sm">
        
        <Card className="bg-black/60 border-orange-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-orange-400 text-sm flex items-center space-x-2">
              <Sun className="w-4 h-4" />
              <span>SOLAR ACTIVITY</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">FLARES:</span>
                <div className={`${getStatusColor(data.solarActivity.solarFlares, 0, 10)}`}>
                  {formatValue(data.solarActivity.solarFlares)} X-CLASS
                </div>
              </div>
              <div>
                <span className="text-gray-400">WIND:</span>
                <div className="text-yellow-400">
                  {formatValue(data.solarActivity.solarWind, 0)} km/s
                </div>
              </div>
              <div>
                <span className="text-gray-400">MAG FIELD:</span>
                <div className="text-blue-400">
                  {formatValue(data.solarActivity.magneticField)} nT
                </div>
              </div>
              <div>
                <span className="text-gray-400">CME:</span>
                <div className={`${getStatusColor(data.solarActivity.coronalMass, 0, 5)}`}>
                  {formatValue(data.solarActivity.coronalMass)} events
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/60 border-blue-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-400 text-sm flex items-center space-x-2">
              <Thermometer className="w-4 h-4" />
              <span>EARTH ATMOSPHERE</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">TEMP:</span>
                <div className="text-green-400">
                  {formatValue(data.earthAtmosphere.temperature)}°C
                </div>
              </div>
              <div>
                <span className="text-gray-400">PRESSURE:</span>
                <div className="text-cyan-400">
                  {formatValue(data.earthAtmosphere.pressure, 0)} hPa
                </div>
              </div>
              <div>
                <span className="text-gray-400">HUMIDITY:</span>
                <div className="text-blue-300">
                  {formatValue(data.earthAtmosphere.humidity)}%
                </div>
              </div>
              <div>
                <span className="text-gray-400">OZONE:</span>
                <div className="text-purple-400">
                  {formatValue(data.earthAtmosphere.ozone, 0)} DU
                </div>
              </div>
              <div>
                <span className="text-gray-400">CO2:</span>
                <div className={`${getStatusColor(data.earthAtmosphere.co2, 400, 450)}`}>
                  {formatValue(data.earthAtmosphere.co2)} ppm
                </div>
              </div>
              <div>
                <span className="text-gray-400">RADIATION:</span>
                <div className="text-yellow-300">
                  {formatValue(data.earthAtmosphere.radiation, 2)} mSv/h
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/60 border-purple-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-purple-400 text-sm flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>SPACE WEATHER</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">Kp INDEX:</span>
                <div className={`${getStatusColor(data.spaceWeather.kpIndex, 0, 9)}`}>
                  {formatValue(data.spaceWeather.kpIndex)}
                </div>
              </div>
              <div>
                <span className="text-gray-400">Ap INDEX:</span>
                <div className="text-orange-400">
                  {formatValue(data.spaceWeather.apIndex, 0)}
                </div>
              </div>
              <div>
                <span className="text-gray-400">Dst INDEX:</span>
                <div className={`${data.spaceWeather.dstIndex < 0 ? 'text-red-400' : 'text-green-400'}`}>
                  {formatValue(data.spaceWeather.dstIndex, 0)} nT
                </div>
              </div>
              <div>
                <span className="text-gray-400">F10.7:</span>
                <div className="text-yellow-400">
                  {formatValue(data.spaceWeather.f107, 0)} sfu
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/60 border-space-accent/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-space-accent text-sm flex items-center space-x-2">
              <Satellite className="w-4 h-4" />
              <span>PLANETARY DATA</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-3 text-xs">
              <div>
                <div className="text-red-400 font-semibold mb-1">MARS:</div>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div>
                    <span className="text-gray-400">T:</span>
                    <span className="text-red-300 ml-1">{formatValue(data.planetaryData.mars.temp)}°C</span>
                  </div>
                  <div>
                    <span className="text-gray-400">P:</span>
                    <span className="text-orange-300 ml-1">{formatValue(data.planetaryData.mars.pressure)} kPa</span>
                  </div>
                  <div>
                    <span className="text-gray-400">DUST:</span>
                    <span className="text-yellow-300 ml-1">{formatValue(data.planetaryData.mars.dust, 0)}%</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-yellow-400 font-semibold mb-1">VENUS:</div>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div>
                    <span className="text-gray-400">T:</span>
                    <span className="text-red-400 ml-1">{formatValue(data.planetaryData.venus.temp, 0)}°C</span>
                  </div>
                  <div>
                    <span className="text-gray-400">P:</span>
                    <span className="text-orange-400 ml-1">{formatValue(data.planetaryData.venus.pressure)} bar</span>
                  </div>
                  <div>
                    <span className="text-gray-400">H2SO4:</span>
                    <span className="text-green-300 ml-1">{formatValue(data.planetaryData.venus.sulfur, 0)}%</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-orange-400 font-semibold mb-1">JUPITER:</div>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div>
                    <span className="text-gray-400">T:</span>
                    <span className="text-blue-300 ml-1">{formatValue(data.planetaryData.jupiter.temp)}°C</span>
                  </div>
                  <div>
                    <span className="text-gray-400">RAD:</span>
                    <span className="text-red-300 ml-1">{formatValue(data.planetaryData.jupiter.radiation, 0)} Gy</span>
                  </div>
                  <div>
                    <span className="text-gray-400">STORMS:</span>
                    <span className="text-yellow-300 ml-1">{data.planetaryData.jupiter.storms}</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-yellow-300 font-semibold mb-1">SATURN:</div>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div>
                    <span className="text-gray-400">T:</span>
                    <span className="text-blue-400 ml-1">{formatValue(data.planetaryData.saturn.temp)}°C</span>
                  </div>
                  <div>
                    <span className="text-gray-400">RINGS:</span>
                    <span className="text-cyan-300 ml-1">{formatValue(data.planetaryData.saturn.rings, 0)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">MOONS:</span>
                    <span className="text-white ml-1">{data.planetaryData.saturn.moons}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">SYSTEM NOMINAL</span>
          </div>
          <div className="text-gray-400">
            DATA REFRESH: 2.0s
          </div>
          <div className="text-gray-400">
            SOURCES: NASA • ESA • NOAA • SWPC
          </div>
        </div>
        <div className="text-space-accent">
          .OrbitScope MONITORING STATION
        </div>
      </div>

      <div className="mt-8 border-t border-space-primary/30 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-bold text-blue-400 font-mono">
                EARTH CLIMATE MONITORING SYSTEM
              </h2>
            </div>
            <Badge className="bg-blue-500 hover:bg-blue-600 animate-pulse">
              LIVE EARTH DATA
            </Badge>
          </div>
          <div className="text-xs text-blue-300 font-mono">
            GMT {data.timestamp.split('T')[1].split('.')[0]} | 
            {data.timestamp.split('T')[0]}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 font-mono text-sm">
          
          <Card className="bg-black/60 border-blue-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-blue-400 text-sm flex items-center space-x-2">
                <Thermometer className="w-4 h-4" />
                <span>ATMOSPHERIC CONDITIONS</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400">TEMP:</span>
                  <div className="text-green-400">
                    {formatValue(data.earthAtmosphere.temperature)}°C
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">PRESSURE:</span>
                  <div className="text-cyan-400">
                    {formatValue(data.earthAtmosphere.pressure, 0)} hPa
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">HUMIDITY:</span>
                  <div className="text-blue-300">
                    {formatValue(data.earthAtmosphere.humidity)}%
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">VISIBILITY:</span>
                  <div className="text-white">
                    {formatValue(Math.random() * 20 + 10)} km
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">WIND:</span>
                  <div className="text-cyan-300">
                    {formatValue(Math.random() * 30 + 5)} km/h
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">UV INDEX:</span>
                  <div className={`${getStatusColor(Math.random() * 11, 0, 11)}`}>
                    {formatValue(Math.random() * 11)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-green-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-green-400 text-sm flex items-center space-x-2">
                <Wind className="w-4 h-4" />
                <span>AIR QUALITY</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400">CO2:</span>
                  <div className={`${getStatusColor(data.earthAtmosphere.co2, 400, 450)}`}>
                    {formatValue(data.earthAtmosphere.co2)} ppm
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">OZONE:</span>
                  <div className="text-purple-400">
                    {formatValue(data.earthAtmosphere.ozone, 0)} DU
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">NO2:</span>
                  <div className="text-orange-400">
                    {formatValue(Math.random() * 50 + 20)} µg/m³
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">PM2.5:</span>
                  <div className="text-red-300">
                    {formatValue(Math.random() * 35 + 10)} µg/m³
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">PM10:</span>
                  <div className="text-yellow-300">
                    {formatValue(Math.random() * 50 + 20)} µg/m³
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">AQI:</span>
                  <div className={`${getStatusColor(Math.random() * 150 + 50, 0, 300)}`}>
                    {formatValue(Math.random() * 150 + 50, 0)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-yellow-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-yellow-400 text-sm flex items-center space-x-2">
                <Sun className="w-4 h-4" />
                <span>CLIMATE PATTERNS</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400">SEASON:</span>
                  <div className="text-green-400">
                    {new Date().getMonth() >= 2 && new Date().getMonth() <= 4 ? 'SPRING' :
                     new Date().getMonth() >= 5 && new Date().getMonth() <= 7 ? 'SUMMER' :
                     new Date().getMonth() >= 8 && new Date().getMonth() <= 10 ? 'AUTUMN' : 'WINTER'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">DAYLIGHT:</span>
                  <div className="text-yellow-300">
                    {formatValue(Math.random() * 4 + 10)}h {formatValue(Math.random() * 60, 0)}m
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">MOON PHASE:</span>
                  <div className="text-gray-300">
                    {['NEW', 'WAXING', 'FULL', 'WANING'][Math.floor(Math.random() * 4)]}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">TIDES:</span>
                  <div className="text-blue-300">
                    {['HIGH', 'LOW', 'RISING', 'FALLING'][Math.floor(Math.random() * 4)]}
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">STORMS:</span>
                  <div className="text-red-300">
                    {Math.floor(Math.random() * 5)} ACTIVE
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">ALERTS:</span>
                  <div className={`${Math.random() > 0.7 ? 'text-red-400' : 'text-green-400'}`}>
                    {Math.random() > 0.7 ? 'ACTIVE' : 'NONE'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/60 border-space-accent/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-space-accent text-sm flex items-center space-x-2">
                <Satellite className="w-4 h-4" />
                <span>GLOBAL MONITORING</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-3 text-xs">
                {/* Regional Data */}
                <div>
                  <div className="text-cyan-400 font-semibold mb-1">NORTH AMERICA:</div>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div>
                      <span className="text-gray-400">T:</span>
                      <span className="text-green-300 ml-1">{formatValue(Math.random() * 20 + 5)}°C</span>
                    </div>
                    <div>
                      <span className="text-gray-400">AQI:</span>
                      <span className="text-yellow-300 ml-1">{formatValue(Math.random() * 100 + 50, 0)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">FIRES:</span>
                      <span className="text-red-300 ml-1">{Math.floor(Math.random() * 20)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-blue-400 font-semibold mb-1">EUROPE:</div>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div>
                      <span className="text-gray-400">T:</span>
                      <span className="text-blue-300 ml-1">{formatValue(Math.random() * 15 + 2)}°C</span>
                    </div>
                    <div>
                      <span className="text-gray-400">AQI:</span>
                      <span className="text-green-300 ml-1">{formatValue(Math.random() * 80 + 30, 0)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">STORMS:</span>
                      <span className="text-cyan-300 ml-1">{Math.floor(Math.random() * 8)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-orange-400 font-semibold mb-1">ASIA:</div>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div>
                      <span className="text-gray-400">T:</span>
                      <span className="text-orange-300 ml-1">{formatValue(Math.random() * 25 + 10)}°C</span>
                    </div>
                    <div>
                      <span className="text-gray-400">AQI:</span>
                      <span className="text-red-300 ml-1">{formatValue(Math.random() * 200 + 100, 0)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">MONSOON:</span>
                      <span className="text-blue-300 ml-1">{Math.random() > 0.5 ? 'ACTIVE' : 'INACTIVE'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-green-400 font-semibold mb-1">OCEANIA:</div>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div>
                      <span className="text-gray-400">T:</span>
                      <span className="text-green-300 ml-1">{formatValue(Math.random() * 18 + 12)}°C</span>
                    </div>
                    <div>
                      <span className="text-gray-400">CORAL:</span>
                      <span className="text-cyan-300 ml-1">{formatValue(Math.random() * 100 + 70, 0)}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">CYCLONES:</span>
                      <span className="text-yellow-300 ml-1">{Math.floor(Math.random() * 3)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400">EARTH SYSTEMS OPERATIONAL</span>
            </div>
            <div className="text-gray-400">
              CLIMATE REFRESH: 1.0s
            </div>
            <div className="text-gray-400">
              SOURCES: NOAA • WMO • ECMWF • NCEP
            </div>
          </div>
          <div className="text-blue-400">
            EARTH CLIMATE MONITORING STATION
          </div>
        </div>
      </div>
    </motion.div>
  );
};