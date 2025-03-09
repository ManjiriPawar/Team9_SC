import React, { useEffect, useCallback } from 'react';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { PuzzlePiece } from './PuzzlePiece';
import { useGameStore } from '../store';
import confetti from 'canvas-confetti';

const IMAGE_URL = "dream.jpg";

interface PuzzleGridProps {
  onComplete: () => void;
}

export const PuzzleGrid: React.FC<PuzzleGridProps> = ({ onComplete }) => {
  const { difficulty, pieces, updatePieces, isComplete, resetGame } = useGameStore();
  
  const gridSize = { easy: 3, medium: 4, hard: 5 }[difficulty] || 4;

  useEffect(() => {
    if (pieces.length !== gridSize * gridSize) {
      resetGame(gridSize);
    }
  }, [difficulty, gridSize]);  

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const oldIndex = pieces.findIndex((piece) => piece.id === active.id);
    const newIndex = pieces.findIndex((piece) => piece.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      // Update the pieces in the order
      const updatedPieces = [...pieces];
      const [movedPiece] = updatedPieces.splice(oldIndex, 1); // Remove the dragged piece
      updatedPieces.splice(newIndex, 0, movedPiece); // Insert it into the new position

      updatePieces(updatedPieces); // Update the state with the new pieces
    }
  }, [pieces, updatePieces]);

  const handleSubmit = () => {
    // Check if each piece's current index matches the correct index
    const isCorrect = pieces.every((piece, index) => piece.index === index);

    if (isCorrect) {
      onComplete();
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      (function frame() {
        if (Date.now() > animationEnd) return;
        confetti({
          particleCount: 10,
          startVelocity: 40, 
          spread: 360,
          origin: { x: Math.random(), y: 0 },
          gravity: randomInRange(0.3, 0.5),
          scalar: randomInRange(0.9, 1.3),
        });
        requestAnimationFrame(frame);
      })();

      alert("🎉 Correct! You solved the puzzle!");
    } else {
      alert("❌ Incorrect! Keep trying.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#87CEEB] via-[#B2EBF2] to-[#87CEEB]">
  
      {/* Motivational Message */}
      <div className="text-center mb-6 p-4 bg-white bg-opacity-50 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-pink-600">
          "Stay focused, your dream is just a few steps away!"
        </h2>
      </div>

      {/* Puzzle Grid */}
      <div
        className="relative w-[90%] max-w-[400px] aspect-square mx-auto rounded-xl border-8 border-pink-400 shadow-2xl bg-white bg-opacity-80 backdrop-blur-lg overflow-hidden"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext items={pieces.map((p) => p.id)} strategy={rectSortingStrategy}>
            {pieces.map((piece) => (
              <PuzzlePiece
                key={piece.id}
                id={piece.id}
                index={piece.index}
                imageUrl={IMAGE_URL}
                gridSize={gridSize}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* Submit Button - Pink */}
      <button
        onClick={handleSubmit}
        disabled={isComplete}
        className="mt-6 flex items-center gap-3 px-8 py-3 bg-pink-400 text-white rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Solution
      </button>
    </div>
  );
};
