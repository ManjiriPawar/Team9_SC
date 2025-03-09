import { create } from 'zustand';
import { GameState, Difficulty, PuzzlePiece } from './types';

const motivationalQuotes = [
  "Great achievements don’t happen overnight. Just like drops of water fill an ocean, small, consistent savings lead to long-term financial security. Stay patient, stay committed, and watch your dreams unfold.",
  "Money is not just currency; it’s a reflection of what you value. If you make saving a priority, you’re prioritizing your future self over temporary desires.",
  "A goal without a plan is just a wish. Visualize where you want to be, break your savings journey into manageable steps, and track your progress.",
  "Financial independence is not just about having money; it’s about having choices. Every smart financial decision you make today adds to your ability to say YES to the opportunities that truly matter tomorrow.",
  "There will be moments when saving feels difficult—unexpected expenses, temptations to spend, or even self-doubt. But in those moments, remind yourself why you started.",
  "Wealth is not just about accumulating money; it’s about creating security, opportunities, and the freedom to live life on your terms.",
  "You don’t need permission to take charge of your financial future. The more you learn and take control of your finances, the more power you have to shape the life you deserve.",
  "If you see saving as a burden, it will always feel like a sacrifice. But if you see it as an investment in your dreams, it will become second nature.",
  "Think of saving like building a house—without a strong foundation, the structure won’t stand the test of time. Start where you are, use what you have, and keep building.",
  "No matter where you start, your financial journey is yours to shape. Past mistakes do not define your future. The pen is in your hands—write a story of empowerment and success.",
  "Every dollar you save is a step toward a life where money is not a limitation but a tool for empowerment.",
  "Small sacrifices today build financial security for tomorrow. Each decision you make is a vote for the future you want.",
  "Success in financial planning comes from consistency, not perfection. Keep going, even if progress feels slow.",
  "Money should serve you, not control you. When you master your finances, you master your future.",
  "Savings is not about denying yourself—it's about giving yourself more options in the future.",
  "Each time you resist unnecessary spending, you strengthen your financial discipline. Your future self will thank you.",
  "Building wealth is a marathon, not a sprint. Keep taking those small, steady steps, and you’ll get there.",
  "Financial success is about habits, not luck. The sooner you build smart saving habits, the stronger your foundation will be.",
  "When challenges arise, don’t panic—pivot. Find new ways to save, invest, and grow your resources.",
  "Your financial freedom is built on the choices you make today. Choose wisely, and stay focused on your long-term goals.",
  "Confidence in money management comes from knowledge. Keep learning, keep applying, and keep growing.",
  "Every woman deserves financial independence. Your savings are not just numbers—they’re symbols of your strength, freedom, and self-respect.",
  "You are capable of managing and growing your wealth. Believe in yourself, take control, and own your financial journey.",
  "Savings is not about deprivation—it’s about creating a future full of possibilities.",
  "A small habit repeated daily becomes a life-changing force. The same applies to saving. Keep going!",
  "True success is not just in making money, but in keeping and multiplying it. Think beyond today.",
  "When in doubt, think of your future self. Will she thank you for today’s financial decisions? Make choices that empower her.",
  "The road to financial success is not always straight, but every step forward counts. Adjust, adapt, and keep moving.",
  "There’s no magic formula for financial stability—just consistent effort, smart decisions, and the courage to stay the course.",
  "You are not just saving money—you are building a life of security, confidence, and endless possibilities."
];

export const useGameStore = create<GameState>((set, get) => ({
  difficulty: 'easy',
  isPlaying: false,
  isPaused: false,
  isMuted: false,
  isComplete: false,
  timer: 0,
  pieces: [],
  currentQuote: '',
  
  setDifficulty: (difficulty: Difficulty) => set({ difficulty }),
  
  startGame: () => {
    const difficulty = get().difficulty;
    const gridSize = { easy: 3, medium: 4, hard: 5 }[difficulty];
    const totalPieces = gridSize * gridSize;
    
    const pieces: PuzzlePiece[] = Array.from({ length: totalPieces }, (_, i) => ({
      id: `piece-${i}`,
      index: i,
      currentPosition: i,
    }));
    
    const shuffledPieces = [...pieces].sort(() => Math.random() - 0.5);
    
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    
    set({
      isPlaying: true,
      pieces: shuffledPieces,
      timer: 0,
      isComplete: false,
      currentQuote: randomQuote,
    });
  },
  
  pauseGame: () => set((state) => ({ isPaused: !state.isPaused })),
  
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  
  completeGame: () => set({ isComplete: true, isPlaying: false }),
  
  updateTimer: () => set((state) => ({ timer: state.timer + 1 })),
  
  resetGame: () => set({
    isPlaying: false,
    isPaused: false,
    isComplete: false,
    timer: 0,
    pieces: [],
    currentQuote: '',
  }),
  
  updatePieces: (pieces: PuzzlePiece[]) => set({ pieces }),
  
  checkPuzzle: () => set((state) => {
    const isCorrect = state.pieces.every((piece, index) => piece.index === index);
    if (isCorrect) {
      return { isComplete: true, isPlaying: false };
    }
    return state;
  }),
}));
