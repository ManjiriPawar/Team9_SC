export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameState {
  difficulty: Difficulty;
  isPlaying: boolean;
  isPaused: boolean;
  isMuted: boolean;
  isComplete: boolean;
  timer: number;
  pieces: PuzzlePiece[];
  currentQuote: string;
  setDifficulty: (difficulty: Difficulty) => void;
  startGame: () => void;
  pauseGame: () => void;
  toggleMute: () => void;
  completeGame: () => void;
  updateTimer: () => void;
  resetGame: () => void;
  updatePieces: (pieces: PuzzlePiece[]) => void;
  checkPuzzle: () => void;
}

export interface PuzzlePiece {
  id: string;
  index: number;
  currentPosition: number;
}