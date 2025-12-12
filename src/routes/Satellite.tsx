import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { KeeptrackCanvas } from "../keeptrack/KeeptrackCanvas";
import { KeeptrackHUD } from "../keeptrack/KeeptrackHUD";
import { KeeptrackHelp } from "../keeptrack/KeeptrackHelp";
import { DetailsPanel } from "../keeptrack/components/DetailsPanel";
import { useKeepURL } from "../keeptrack/useKeepURL";
import { useKeeptrackStore } from "../keeptrack/store";
import { AtmosphericDataPanel } from "../components/AtmosphericDataPanel";
import Header from "../components/base/Header";

export const Keeptrack: React.FC = () => {
  const [showHelp, setShowHelp] = useState(false);
  const { selection, setColorMode, setFilters, setSelection } =
    useKeeptrackStore();

  useKeepURL();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement) return;

      switch (event.code) {
        case "Space":
          event.preventDefault();
          const { timeline, setTimeline } = useKeeptrackStore.getState();
          setTimeline({ playing: !timeline.playing });
          break;

        case "BracketLeft":
          event.preventDefault();
          const { timeline: tl1, setTimeline: st1 } =
            useKeeptrackStore.getState();
          const newSpeed1 = Math.max(1, tl1.speed / 2);
          st1({ speed: newSpeed1 });
          break;

        case "BracketRight":
          event.preventDefault();
          const { timeline: tl2, setTimeline: st2 } =
            useKeeptrackStore.getState();
          const newSpeed2 = Math.min(300, tl2.speed * 2);
          st2({ speed: newSpeed2 });
          break;

        case "KeyG":
          event.preventDefault();
          break;

        case "KeyC":
          event.preventDefault();
          const { colorMode } = useKeeptrackStore.getState();
          const modes = ["group", "altitude", "velocity", "operator"];
          const currentIndex = modes.indexOf(colorMode);
          const nextMode = modes[(currentIndex + 1) % modes.length];
          setColorMode(nextMode as any);
          break;

        case "KeyS":
          event.preventDefault();
          const { filters } = useKeeptrackStore.getState();
          setFilters({
            group: filters.group === "starlink" ? "all" : "starlink",
          });
          break;

        case "KeyD":
          event.preventDefault();
          const { filters: f2 } = useKeeptrackStore.getState();
          setFilters({ group: f2.group === "debris" ? "all" : "debris" });
          break;

        case "Escape":
          event.preventDefault();
          setSelection({});
          break;

        case "KeyR":
          event.preventDefault();
          const { resetCamera } = useKeeptrackStore.getState();
          resetCamera();
          break;

        case "KeyH":
        case "Slash":
          if (event.shiftKey && event.code === "Slash") {
            event.preventDefault();
            setShowHelp(!showHelp);
          } else if (event.code === "KeyH") {
            event.preventDefault();
            setShowHelp(!showHelp);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [showHelp]);

  return (
    <>
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-screen bg-black relative overflow-y-auto"
      >
        {/* 3D Canvas Container */}
        <div className="h-screen relative">
          <KeeptrackCanvas />

          {/* HUD Overlay */}
          <KeeptrackHUD onShowHelp={() => setShowHelp(true)} />

          {/* Details Panel */}
          {selection.id && <DetailsPanel />}
        </div>

        {/* Atmospheric Data Panel - Below Canvas */}
        <div className="bg-black border-t border-space-primary/30">
          <AtmosphericDataPanel />
        </div>

        {/* Help Modal */}
        <KeeptrackHelp isOpen={showHelp} onClose={() => setShowHelp(false)} />

        {/* Loading indicator (optional) */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute inset-0 bg-black flex items-center justify-center pointer-events-none"
        >
          <div className="text-white text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p>Loading Keeptrack...</p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
