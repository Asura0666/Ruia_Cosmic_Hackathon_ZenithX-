import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '../components/ui/badge';
import { Palette } from 'lucide-react';
import { useKeeptrackStore } from './store';
import { useTLECatalog } from './tle/useTLECatalog';
import { getLegendForColorMode } from './orbit/colors';

export const KeeptrackLegend: React.FC = () => {
  const { colorMode } = useKeeptrackStore();
  const { records, getByGroup } = useTLECatalog();

  const legendItems = getLegendForColorMode(colorMode);
  const groupCounts = {
    starlink: getByGroup.get('starlink')?.length || 0,
    debris: getByGroup.get('debris')?.length || 0,
    other: getByGroup.get('other')?.length || 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-black/80 backdrop-blur-xl rounded-lg border border-white/20 p-4 space-y-4"
    >
      <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
        <Palette className="w-4 h-4" />
        <span>Legend</span>
      </h3>

      <div className="space-y-2">
        {legendItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center space-x-3"
          >
            <div
              className="w-3 h-3 rounded-full border border-white/20"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-300">{item.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="pt-3 border-t border-white/20">
        <div className="text-xs text-gray-400 mb-2">Object Counts</div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-300">Total Objects</span>
            <Badge variant="secondary" className="h-5 text-xs">
              {records.length}
            </Badge>
          </div>
          {colorMode === 'group' && (
            <>
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">Starlink</span>
                <span className="text-blue-400">{groupCounts.starlink}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">Debris</span>
                <span className="text-red-400">{groupCounts.debris}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-300">Other</span>
                <span className="text-gray-400">{groupCounts.other}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};