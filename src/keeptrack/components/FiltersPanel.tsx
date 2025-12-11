import React from 'react';
import { motion } from 'framer-motion';
import { Switch } from '../../components/ui/switch';
import { Slider } from '../../components/ui/slider';
import { Button } from '../../components/ui/button';
import { Filter, RotateCcw } from 'lucide-react';
import { useKeeptrackStore } from '../store';

export const FiltersPanel: React.FC = () => {
  const { filters, setFilters, resetFilters } = useKeeptrackStore();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-black/80 backdrop-blur-xl rounded-lg border border-white/20 p-4 space-y-4 min-w-[280px]"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-gray-400 hover:text-white h-6 px-2"
        >
          <RotateCcw className="w-3 h-3" />
        </Button>
      </div>

      {/* Group filter */}
      <div className="space-y-3">
        <label className="text-xs font-medium text-gray-300">GROUP</label>
        <div className="grid grid-cols-3 gap-2">
          {['all', 'starlink', 'debris', 'navigation', 'communication', 'scientific'].map((group) => (
            <Button
              key={group}
              variant={filters.group === group ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilters({ group: group as any })}
              className="h-7 text-xs capitalize whitespace-nowrap"
            >
              {group === 'earth_observation' ? 'Earth Obs' : 
               group === 'communication' ? 'Comm' :
               group === 'navigation' ? 'Nav' :
               group === 'scientific' ? 'Science' : group}
            </Button>
          ))}
        </div>
      </div>

      {/* Altitude range */}
      <div className="space-y-3">
        <label className="text-xs font-medium text-gray-300">
          ALTITUDE: {filters.altMin}km - {filters.altMax}km
        </label>
        <div className="px-2">
          <Slider
            value={[filters.altMin, filters.altMax]}
            min={100}
            max={5000}
            step={50}
            onValueChange={([min, max]) => setFilters({ altMin: min, altMax: max })}
            className="w-full"
          />
        </div>
      </div>

      {/* Active only */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-300">ACTIVE ONLY</label>
        <Switch
          checked={filters.activeOnly}
          onCheckedChange={(checked) => setFilters({ activeOnly: checked })}
        />
      </div>
    </motion.div>
  );
};