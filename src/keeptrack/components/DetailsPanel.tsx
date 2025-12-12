import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { 
  X, 
  Satellite, 
  Target, 
  Route,
  Clock,
  Gauge,
  Globe
} from 'lucide-react';
import { useKeeptrackStore } from '../store';
import { useTLECatalog } from '../tle/useTLECatalog';
import { propagateAt } from '../orbit/propagate';

export const DetailsPanel: React.FC = () => {
  const { selection, setSelection, timeline } = useKeeptrackStore();
  const { getById } = useTLECatalog();

  const satelliteData = useMemo(() => {
    if (!selection.id) return null;
    
    const satellite = getById(selection.id);
    if (!satellite) return null;
    
    const currentDate = new Date(timeline.dateISO);
    const result = propagateAt(satellite, currentDate);
    
    if (!result) return { satellite, result: null };
    
    // Calculate orbital parameters
    const position = result.position;
    const velocity = result.velocity;
    const distance = Math.sqrt(position[0]**2 + position[1]**2 + position[2]**2);
    const speed = Math.sqrt(velocity[0]**2 + velocity[1]**2 + velocity[2]**2);
    const altitude = distance - 6371;
    
    // Extract orbital elements from TLE
    const line2 = satellite.line2;
    const inclination = parseFloat(line2.substring(8, 16));
    const raan = parseFloat(line2.substring(17, 25));
    const eccentricity = parseFloat('0.' + line2.substring(26, 33));
    const argPerigee = parseFloat(line2.substring(34, 42));
    const meanAnomaly = parseFloat(line2.substring(43, 51));
    const meanMotion = parseFloat(line2.substring(52, 63));
    
    const period = (24 * 60) / meanMotion; // minutes
    
    return {
      satellite,
      result,
      altitude: Math.round(altitude),
      speed: speed.toFixed(2),
      period: period.toFixed(1),
      inclination: inclination.toFixed(2),
      raan: raan.toFixed(2),
      eccentricity: eccentricity.toFixed(4),
      argPerigee: argPerigee.toFixed(2),
      meanAnomaly: meanAnomaly.toFixed(2),
    };
  }, [selection.id, timeline.dateISO, getById]);

  if (!selection.id || !satelliteData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="absolute top-4 right-4 w-80 max-h-[calc(100vh-2rem)] overflow-y-auto"
    >
      <Card className="bg-black/90 backdrop-blur-xl border-white/20">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-white text-lg">
                {satelliteData.satellite.name}
              </CardTitle>
              <div className="flex space-x-2 mt-2">
                <Badge variant="secondary">
                  ID: {satelliteData.satellite.id}
                </Badge>
                <Badge 
                  variant="secondary"
                  style={{ backgroundColor: satelliteData.satellite.group === 'starlink' ? '#00D1FF' : '#e06c75' }}
                >
                  {satelliteData.satellite.group.toUpperCase()}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelection({})}
              className="text-gray-400 hover:text-white h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Status */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white flex items-center space-x-2">
              <Satellite className="w-4 h-4" />
              <span>Current Status</span>
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Altitude</div>
                <div className="text-white font-mono">{satelliteData.altitude} km</div>
              </div>
              <div>
                <div className="text-gray-400">Speed</div>
                <div className="text-white font-mono">{satelliteData.speed} km/s</div>
              </div>
            </div>
          </div>

          {/* Orbital Elements */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Orbital Elements</span>
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Period</span>
                <span className="text-white font-mono">{satelliteData.period} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Inclination</span>
                <span className="text-white font-mono">{satelliteData.inclination}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">RAAN</span>
                <span className="text-white font-mono">{satelliteData.raan}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Eccentricity</span>
                <span className="text-white font-mono">{satelliteData.eccentricity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Arg. Perigee</span>
                <span className="text-white font-mono">{satelliteData.argPerigee}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Mean Anomaly</span>
                <span className="text-white font-mono">{satelliteData.meanAnomaly}°</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full">
              <Target className="w-4 h-4 mr-2" />
              Center View
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <Route className="w-4 h-4 mr-2" />
              Show Ground Track
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};