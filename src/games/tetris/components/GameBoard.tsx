import { useMemo } from 'react';
import type { Piece } from '../core/pieces';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../core/constants';

interface GameBoardProps {
  board: number[][];
  boardColors: (string | null)[][];
  currentPiece: Piece;
  currentPosition: { x: number; y: number };
  isPaused: boolean;
  isGameOver: boolean;
  onRestart: () => void;
}

export default function GameBoard({ 
  board, 
  boardColors,
  currentPiece, 
  currentPosition, 
  isPaused, 
  isGameOver,
  onRestart 
}: GameBoardProps) {
  const displayBoard = useMemo(() => {
    const display = board.map(row => [...row]);
    
    // Add current piece to display board
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = currentPosition.y + y;
          const boardX = currentPosition.x + x;
          if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
            display[boardY][boardX] = 2;
          }
        }
      }
    }
    
    return display;
  }, [board, currentPiece, currentPosition]);

  // Updated color getter
  const getCellColor = (cell: number, y: number, x: number) => {
    if (cell === 0) return '';
    if (cell === 2) return currentPiece.color;
    return boardColors[y][x] || '';
  };

  return (
    <div 
      className="relative rounded-lg overflow-hidden shadow-lg"
      style={{
        backgroundImage: 'url("/images/games/tetris/wood-grain-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div 
        style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, minmax(0, 1fr))`,
          aspectRatio: `${BOARD_WIDTH}/${BOARD_HEIGHT}`,
          display: 'grid',
          gap: '1px'
        }}
      >
        {displayBoard.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`
                aspect-square relative
                ${getCellColor(cell, y, x)}
                ${cell !== 0 ? `
                  border-t-2 border-r-2 border-white/20
                  after:absolute after:inset-0 
                  after:border-b-2 after:border-l-2 after:border-black/30
                ` : ''}
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
