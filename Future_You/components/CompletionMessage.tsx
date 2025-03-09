import React from 'react';
import { PartyPopper } from 'lucide-react';

interface CompletionMessageProps {
  timer: number;
  onRestart: () => void;
}

export const CompletionMessage: React.FC<CompletionMessageProps> = ({ timer, onRestart }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} minute${mins !== 1 ? 's' : ''} and ${secs} second${secs !== 1 ? 's' : ''}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center space-y-6">
        <div className="flex justify-center">
          <PartyPopper className="w-16 h-16 text-yellow-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800">
          Congratulations!
        </h2>
        
        <p className="text-gray-600">
          You completed the puzzle in {formatTime(timer)}!
        </p>
        
        <p className="text-gray-700 font-medium">
          "You are doing great! Keep going and continue to accomplish the goals reflected in your image!"
        </p>
        
        <button
          onClick={onRestart}
          className="w-full py-3 px-6 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};