import React from "react";
import { useGameStore } from "../store";

export const GameControls: React.FC = () => {
  const { isPaused, timer, resetGame, togglePause } = useGameStore();

  return (
    <div className="flex justify-between items-center px-6 py-3 
        bg-pink-400 from-[#f8c8dc] to-[#283593] 
        text-white rounded-xl shadow-lg">
      
      {/* Timer Display */}
      <div className="flex items-center gap-2 text-lg font-semibold">
        ⏳ <span>{timer}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePause}
          className="flex items-center gap-1 px-4 py-2 
          bg-[#f8c8dc]/40 hover:bg-[#f8c8dc]/60 text-white 
          rounded-lg transition-all shadow-md"
        >
          {isPaused ? "▶️ Resume" : "⏸ Pause"}
        </button>

        <button
          onClick={resetGame}
          className="flex items-center gap-1 px-4 py-2 
          bg-[#f8c8dc]/40 hover:bg-[#f8c8dc]/60 text-white 
          rounded-lg transition-all shadow-md"
        >
          🔄 Restart
        </button>
      </div>
    </div>
  );
};
