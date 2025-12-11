import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { X, Keyboard, Link } from 'lucide-react';

interface KeeptrackHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeeptrackHelp: React.FC<KeeptrackHelpProps> = ({ isOpen, onClose }) => {
  const shortcuts = [
    { key: 'Space', action: 'Play/pause timeline' },
    { key: '[ ]', action: 'Decrease/increase speed' },
    { key: 'G', action: 'Toggle ECF/ECI frame' },
    { key: 'C', action: 'Cycle color modes' },
    { key: 'F', action: 'Focus selected satellite' },
    { key: 'S', action: 'Toggle Starlink filter' },
    { key: 'D', action: 'Toggle debris filter' },
    { key: 'Mouse Drag', action: 'Rotate camera view' },
    { key: 'Mouse Wheel', action: 'Zoom in/out' },
    { key: 'R', action: 'Reset camera position' },
    { key: 'Esc', action: 'Clear selection' },
    { key: 'H', action: 'Toggle help (this dialog)' },
    { key: '?', action: 'Toggle help (this dialog)' },
  ];

  const urlParams = [
    { param: 'pitch', description: 'Camera pitch angle (degrees)' },
    { param: 'yaw', description: 'Camera yaw angle (degrees)' },
    { param: 'zoom', description: 'Camera zoom level (1.0-10.0)' },
    { param: 'color', description: 'Color mode (group|altitude|velocity|operator)' },
    { param: 'ecf', description: 'ECF frame (1) vs ECI (0)' },
    { param: 'date', description: 'Date/time (epoch milliseconds or ISO)' },
    { param: 'selected', description: 'Selected satellite ID' },
    { param: 'q', description: 'Search query' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Help Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-4 md:inset-10 bg-black/95 backdrop-blur-xl rounded-lg border border-white/20 p-6 overflow-y-auto z-50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <Keyboard className="w-6 h-6" />
                <span>Keeptrack Help</span>
              </h2>
              <Button
                variant="ghost"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Keyboard Shortcuts */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Keyboard Shortcuts</h3>
                <div className="space-y-2">
                  {shortcuts.map((shortcut, index) => (
                    <motion.div
                      key={shortcut.key}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                    >
                      <span className="font-mono bg-white/10 px-2 py-1 rounded text-sm text-blue-400">
                        {shortcut.key}
                      </span>
                      <span className="text-gray-300 text-sm flex-1 ml-4">
                        {shortcut.action}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* URL Parameters */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                  <Link className="w-5 h-5" />
                  <span>URL Parameters</span>
                </h3>
                <div className="space-y-2">
                  {urlParams.map((param, index) => (
                    <motion.div
                      key={param.param}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="p-3 bg-white/5 rounded-lg"
                    >
                      <div className="font-mono text-green-400 text-sm mb-1">
                        {param.param}
                      </div>
                      <div className="text-gray-300 text-xs">
                        {param.description}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-blue-400 font-medium mb-2">Example Deep Link:</h4>
                  <code className="text-xs text-gray-300 break-all">
                    /keeptrack?pitch=10.5&yaw=253.8&zoom=2.5&color=altitude&ecf=1&selected=25544
                  </code>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/20 text-center text-gray-400">
              <p className="text-sm">
                Keeptrack-style satellite tracking • Press <kbd className="bg-white/10 px-1 rounded">H</kbd> or <kbd className="bg-white/10 px-1 rounded">?</kbd> to toggle this help
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};