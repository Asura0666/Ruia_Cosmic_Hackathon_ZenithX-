import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { BadgeHelp as Help, Palette, Settings, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { FiltersPanel } from './components/FiltersPanel';
import { KeeptrackLegend } from './KeeptrackLegend';
import { useKeeptrackStore } from './store';
import classnames from 'classnames';

interface KeeptrackHUDProps {
  onShowHelp: () => void;
}

export const KeeptrackHUD: React.FC<KeeptrackHUDProps> = ({ onShowHelp }) => {
  const { colorMode, setColorMode, camera, setCamera, resetCamera } = useKeeptrackStore();
  const [showFilters, setShowFilters] = useState(false);

  const colorModes = [
    { value: 'group', label: 'Group' },
    { value: 'altitude', label: 'Altitude' },
    { value: 'velocity', label: 'Velocity' },
    { value: 'operator', label: 'Operator' },
    { value: 'mission', label: 'Mission' },
    { value: 'country', label: 'Country' },
  ];

  const cycleColorMode = () => {
    const modes = colorModes.map(m => m.value);
    const currentIndex = modes.indexOf(colorMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setColorMode(modes[nextIndex] as any);
  };

  const handleZoomIn = () => {
    const newZoom = Math.max(1.5, camera.zoom - 0.5);
    setCamera({ zoom: newZoom });
  };

  const handleZoomOut = () => {
    const newZoom = Math.min(100, camera.zoom + 0.5);
    setCamera({ zoom: newZoom });
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto"
      >
        {/* Left side - Search */}
        <div className="flex items-center space-x-4">
          <SearchBar />
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center space-x-2">
          {/* Color mode */}
          <Button
            variant="ghost"
            size="sm"
            onClick={cycleColorMode}
            className="bg-black/80 backdrop-blur-xl border border-white/20 text-white hover:text-blue-400"
          >
            <Palette className="w-4 h-4 mr-2" />
            {colorModes.find(m => m.value === colorMode)?.label}
          </Button>

          {/* Filters toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className={classnames(
              'bg-black/80 backdrop-blur-xl border border-white/20 text-white hover:text-blue-400',
              { 'bg-blue-500/20 border-blue-500/40': showFilters }
            )}
          >
            <Settings className="w-4 h-4 mr-2" />
            Filters
          </Button>

          {/* Help */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onShowHelp}
            className="bg-black/80 backdrop-blur-xl border border-white/20 text-white hover:text-blue-400"
          >
            <Help className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {/* Zoom Controls */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute right-4 bottom-20 pointer-events-auto"
      >
        <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-lg p-2 space-y-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            className="w-full bg-black/60 text-white hover:text-blue-400 border border-white/20"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            className="w-full bg-black/60 text-white hover:text-blue-400 border border-white/20"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetCamera}
            className="w-full bg-black/60 text-white hover:text-blue-400 border border-white/20"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <div className="text-center text-xs text-gray-400 font-mono mb-2">
            Camera Controls
          </div>
          <div className="text-center text-xs text-gray-300">
            Mouse: Rotate & Zoom
          </div>
        </div>
      </motion.div>
      {/* Left side panels */}
      <div className="absolute left-4 top-20 space-y-4 pointer-events-auto">
        <KeeptrackLegend />
      </div>

      {/* Right side panels */}
      {showFilters && (
        <div className="absolute right-4 top-20 pointer-events-auto">
          <FiltersPanel />
        </div>
      )}

      {/* Bottom controls */}
    </div>
  );
};