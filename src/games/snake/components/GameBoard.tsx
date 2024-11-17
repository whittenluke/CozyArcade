import { RefreshCw } from 'lucide-react';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../core/constants';
import type { Position } from '../core/gameLogic';

interface GameBoardProps {
  snake: Position[];
  food: Position;
  isPaused: boolean;
  isGameOver: boolean;
  onRestart: () => void;
}

export default function GameBoard({ 
  snake, 
  food, 
  isPaused, 
  isGameOver,
  onRestart 
}: GameBoardProps) {
  // Helper to determine cell content and styling
  const getCellContent = (x: number, y: number) => {
    // Check if cell is snake head
    if (snake[0].x === x && snake[0].y === y) {
      return "bg-green-600 rounded-full border-2 border-green-400";
    }
    // Check if cell is snake body
    if (snake.slice(1).some(segment => segment.x === x && segment.y === y)) {
      return "bg-green-500 rounded-sm border border-green-400";
    }
    // Check if cell is food
    if (food.x === x && food.y === y) {
      return "bg-red-500 rounded-full border border-red-400";
    }
    // Empty cell
    return "bg-gray-800";
  };

  return (
    <div 
      className="relative rounded-lg overflow-hidden shadow-lg"
      style={{
        backgroundImage: 'url("/images/games/snake/grass-pattern.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div 
        className="grid gap-px bg-gray-900/20"
        style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, minmax(0, 1fr))`,
          aspectRatio: `${BOARD_WIDTH}/${BOARD_HEIGHT}`
        }}
      >
        {Array.from({ length: BOARD_HEIGHT }, (_, y) =>
          Array.from({ length: BOARD_WIDTH }, (_, x) => (
            <div
              key={`${x}-${y}`}
              className={`
                aspect-square
                ${getCellContent(x, y)}
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
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              <RefreshCw className="w-5 h-5" />
              Play Again
            </button>
          )}
        </div>
      )}
    </div>
  );
}
