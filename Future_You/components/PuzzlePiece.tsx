import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PuzzlePieceProps {
  id: string;
  index: number;
  imageUrl: string;
  gridSize: number;
}

export const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ id, index, imageUrl, gridSize }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
  transform: CSS.Transform.toString(transform),
  transition,
  width: "100%",  
  height: "100%", 
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`, // Adjust for both X and Y
  backgroundPosition: `${
    (index % gridSize) * (100 / (gridSize - 1))
  }% ${(Math.floor(index / gridSize)) * (100 / (gridSize - 1))}%`,
  backgroundRepeat: "no-repeat",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};


  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative cursor-grab active:cursor-grabbing border border-white/30 transition-transform hover:z-10 hover:scale-105 hover:shadow-lg"
      {...attributes}
      {...listeners}
    />
  );
};
