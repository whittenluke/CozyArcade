import { useMemo } from 'react';
import type { Piece } from '../core/pieces';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../core/constants';

interface GameBoardProps {
  board: number[][];
  currentPiece: Piece;
  currentPosition: { x: number; y: number };
  isPaused: boolean;
  isGameOver: boolean;
  onRestart: () => void;
}

export default function GameBoard({ 
  board, 
  currentPiece, 
  currentPosition, 
  isPaused, 
  isGameOver,
  onRestart 
}: GameBoardProps) {
  // Combine the board state with the current piece
  const displayBoard = useMemo(() => {
    const display = board.map(row => [...row]);
    
    // Add current piece to display board
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPosition.y + y;
          const boardX = currentPosition.x + x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            display[boardY][boardX] = 2; // Use 2 to differentiate active piece
          }
        }
      }
    }
    
    return display;
  }, [board, currentPiece, currentPosition]);

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      {/* Game board grid */}
      <div 
        className="grid gap-px bg-gray-800"
        style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, minmax(0, 1fr))`,
          aspectRatio: `${BOARD_WIDTH}/${BOARD_HEIGHT}`,
          padding: '1px'
        }}
      >
        {displayBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`
                aspect-square rounded-sm
                ${cell === 0 ? 'bg-gray-800' : 'bg-purple-500'}
                ${cell === 2 ? 'bg-purple-400' : ''}
                transition-colors duration-100
              `}
            />
          ))
        )}
      </div>

      {/* Overlay states */}
      {(isPaused || isGameOver) && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
          <div className="text-white text-2xl font-bold mb-4">
            {isPaused ? 'PAUSED' : 'GAME OVER'}
          </div>
          {isGameOver && (
            <button
              onClick={onRestart}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Play Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
