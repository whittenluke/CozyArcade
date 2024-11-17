import { RefreshCw } from 'lucide-react';
import { BOARD_WIDTH, BOARD_HEIGHT, GameState } from '../core/constants';
import type { Position } from '../core/gameLogic';
import type { Direction } from '../core/constants';

// Snake head SVG as a component
function SnakeHead({ direction }: { direction: Direction }) {
  // Calculate rotation angle based on direction
  const getRotationAngle = (dir: Direction) => {
    switch (dir) {
      case 'UP': return -90;
      case 'RIGHT': return 0;
      case 'DOWN': return 90;
      case 'LEFT': return 180;
    }
  };

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full"
      style={{
        transform: `rotate(${getRotationAngle(direction)}deg)`,
        transformOrigin: 'center'
      }}
    >
      <path
        d="M0 0
           H70
           L90 10
           L90 90
           L70 100
           H0
           V0
           Z"
        className="fill-green-500"
      />
      <circle cx="65" cy="25" r="6" className="fill-gray-800" />
      <circle cx="65" cy="75" r="6" className="fill-gray-800" />
    </svg>
  );
}

interface GameBoardProps {
  snake: Position[];
  snakeDirection: Direction;
  food: Position;
  isPaused: boolean;
  isGameOver: boolean;
  state: GameState;
  countdown: number;
  onRestart: () => void;
  onStartGame: () => void;
}

export default function GameBoard({ 
  snake, 
  snakeDirection,
  food, 
  isPaused,
  isGameOver,
  state,
  countdown,
  onRestart,
  onStartGame
}: GameBoardProps) {
  const CELL_SIZE = 20; // Size of each cell in pixels

  // Helper to get pixel position
  const getPixelPosition = (pos: Position) => ({
    x: pos.x * CELL_SIZE,
    y: pos.y * CELL_SIZE
  });

  return (
    <div 
      className="relative rounded-lg overflow-hidden shadow-lg bg-gray-800"
      style={{
        width: BOARD_WIDTH * CELL_SIZE,
        height: BOARD_HEIGHT * CELL_SIZE
      }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 gap-[1px] pointer-events-none">
        {Array.from({ length: BOARD_WIDTH * BOARD_HEIGHT }).map((_, i) => (
          <div key={i} className="bg-gray-900/10" />
        ))}
      </div>

      {/* Snake body segments */}
      {snake.slice(1).map((segment, index) => {
        const { x, y } = getPixelPosition(segment);
        return (
          <div
            key={index}
            className="absolute w-[20px] h-[20px] bg-green-500 transition-all duration-200 ease-linear"
            style={{
              transform: `translate(${x}px, ${y}px)`
            }}
          />
        );
      })}

      {/* Snake head */}
      {(() => {
        const { x, y } = getPixelPosition(snake[0]);
        return (
          <div
            className="absolute w-[20px] h-[20px] transition-all duration-200 ease-linear"
            style={{
              transform: `translate(${x}px, ${y}px)`
            }}
          >
            <SnakeHead direction={snakeDirection} />
          </div>
        );
      })()}

      {/* Food */}
      {(() => {
        const { x, y } = getPixelPosition(food);
        return (
          <div
            className="absolute w-[20px] h-[20px] bg-red-500 rounded-full animate-pulse"
            style={{
              transform: `translate(${x}px, ${y}px)`
            }}
          />
        );
      })()}

      {/* Start Game / Countdown Overlay */}
      {state === GameState.READY && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
          <button
            onClick={onStartGame}
            className="px-8 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition"
          >
            Start Game
          </button>
        </div>
      )}

      {/* Countdown Overlay */}
      {countdown > 0 && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-6xl font-bold text-white animate-pulse">
            {countdown}
          </div>
        </div>
      )}

      {/* Game Over overlay */}
      {isGameOver && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
          <div className="text-white text-2xl font-bold mb-4">
            GAME OVER
          </div>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            <RefreshCw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      )}

      {/* Pause overlay */}
      {isPaused && !isGameOver && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-white text-2xl font-bold">
            PAUSED
          </div>
        </div>
      )}
    </div>
  );
}
