import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Play, Pause, RotateCcw, Calendar } from 'lucide-react';
import { useKeeptrackStore } from '../store';

export const TimeControls3D: React.FC = () => {
  const { timeline, setTimeline } = useKeeptrackStore();

  const togglePlay = () => {
    setTimeline({ playing: !timeline.playing });
  };

  const setSpeed = (speed: number) => {
    setTimeline({ speed });
  };

  const setToNow = () => {
    setTimeline({ dateISO: new Date().toISOString() });
  };

  const handleDateChange = (value: string) => {
    try {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        setTimeline({ dateISO: date.toISOString() });
      }
    } catch (error) {
      console.warn('Invalid date:', value);
    }
  };

  const currentDate = new Date(timeline.dateISO);
  const dateString = currentDate.toISOString().slice(0, 19);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/80 backdrop-blur-xl rounded-lg border border-white/20 p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Time Controls</h3>
        <div className="text-xs text-gray-300">
          {currentDate.toLocaleString()}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Play/Pause */}
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlay}
          className="text-white hover:text-blue-400"
        >
          {timeline.playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>

        {/* Speed controls */}
        <div className="flex space-x-1">
          {[1, 10, 60, 300].map((speed) => (
            <Button
              key={speed}
              variant={timeline.speed === speed ? "default" : "ghost"}
              size="sm"
              onClick={() => setSpeed(speed)}
              className="text-xs h-7 px-2"
            >
              {speed}×
            </Button>
          ))}
        </div>

        {/* Now button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={setToNow}
          className="text-white hover:text-blue-400"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Now
        </Button>
      </div>

      {/* Date picker */}
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-gray-400" />
        <Input
          type="datetime-local"
          value={dateString}
          onChange={(e) => handleDateChange(e.target.value)}
          className="flex-1 h-8 text-xs bg-black/50 border-white/30 text-white"
        />
      </div>
    </motion.div>
  );
};