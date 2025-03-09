import { useEffect } from 'react';
import { DifficultySelector } from './components/DifficultySelector';
import { PuzzleGrid } from './components/PuzzleGrid';
import { GameControls } from './components/GameControls';
import { CompletionMessage } from './components/CompletionMessage';
import { useGameStore } from './store';

function App() {
  const {
    isPlaying,
    isComplete,
    timer,
    updateTimer,
    resetGame,
    completeGame,
    isPaused
  } = useGameStore();

  useEffect(() => {
    let interval: number;
    
    if (isPlaying && !isPaused && !isComplete) {
      interval = setInterval(() => {
        updateTimer();
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, isPaused, isComplete]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-full space-y-8">
        {!isPlaying ? (
          <DifficultySelector />
        ) : (
          <>
            <GameControls />
            <PuzzleGrid onComplete={completeGame} />
          </>
        )}
        
        {isComplete && (
          <CompletionMessage
            timer={timer}
            onRestart={resetGame}
          />
        )}
      </div>
    </div>
  );
}

export default App;