import React from "react";
import { Difficulty } from "../types";
import { useGameStore } from "../store";
import { PuzzleIcon } from "lucide-react";

export const DifficultySelector: React.FC = () => {
  const { difficulty, setDifficulty, startGame } = useGameStore();

  const difficulties: { label: string; value: Difficulty }[] = [
    { label: "Easy (3x3)", value: "easy" },
    { label: "Medium (4x4)", value: "medium" },
    { label: "Hard (5x5)", value: "hard" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-[#FFE4E1] to-[#FFD1DC] p-6 relative">
      {/* Decorative Floating Circles */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center -z-10">
        <div className="w-96 h-96 bg-pink-200 opacity-20 rounded-full blur-3xl absolute top-10 left-10"></div>
        <div className="w-80 h-80 bg-purple-200 opacity-20 rounded-full blur-3xl absolute bottom-10 right-10"></div>
      </div>

      {/* Motivational Message */}
      <div className="text-center mb-10 px-6">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text tracking-wide drop-shadow-lg">
          Welcome, Queen! 👑
        </h2>
        <p className="text-lg text-gray-800 font-medium italic mt-4 px-6 py-4 bg-white backdrop-blur-md rounded-xl shadow-lg leading-relaxed">
          Feeling drained? Take a refreshing break! ✨                                                        
          <h3 className="mt-2 text-gray-700 font-semibold">Solve this puzzle & let your dream goal image 
          MOTIVATE YOU to keep going! 💖</h3>
        </p>
      </div>

      {/* Glowing Card */}
      <div className="relative w-full max-w-md bg-white shadow-xl rounded-3xl p-10 border border-pink-200 text-gray-900 transition-all duration-300 hover:shadow-pink-300/50">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <PuzzleIcon className="w-12 h-12 text-pink-500 animate-bounce" />
          <h1 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
            Jigsaw Puzzle
          </h1>
        </div>

        {/* Difficulty Selector */}
        <div className="mt-6 text-center space-y-5">
          <h2 className="text-lg font-semibold text-gray-700">
            Choose Your Challenge
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {difficulties.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => {
                  setDifficulty(value);
                  startGame();
                }}
                className={`w-full sm:w-auto px-6 py-3 rounded-full font-semibold tracking-wide transition-all duration-300 ease-in-out transform shadow-md
                  ${
                    difficulty === value
                      ? "bg-pink-500 text-white shadow-pink-500/50 scale-105"
                      : "bg-white text-pink-600 hover:bg-pink-500 hover:text-white hover:scale-105"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};