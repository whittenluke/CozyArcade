import { RefreshCw } from 'lucide-react';
import { BOARD_WIDTH, BOARD_HEIGHT, GameState } from '../core/constants';
import type { Position } from '../core/gameLogic';
import type { Direction } from '../core/constants';

// Snake head SVG as a component
function SnakeHead() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full"
      fill="currentColor"
    >
      {/* Main head shape */}
      <path
        d="M50 20
           L80 50
           L50 80
           L20 50
           Z"
        className="fill-green-400"
      />
      {/* Eyes */}
      <circle cx="35" cy="40" r="5" className="fill-gray-800" />
      <circle cx="65" cy="40" r="5" className="fill-gray-800" />
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

function getSegmentStyle(snake: Position[], index: number) {
  if (index === 0) return ''; // Head has its own styling

  const prev = snake[index - 1];
  const curr = snake[index];
  const next = snake[index + 1];

  // Calculate which directions have connections
  const connections = {
    top: prev && (prev.y < curr.y || (prev.y === BOARD_HEIGHT - 1 && curr.y === 0)),
    right: prev && (prev.x > curr.x || (prev.x === 0 && curr.x === BOARD_WIDTH - 1)),
    bottom: prev && (prev.y > curr.y || (prev.y === 0 && curr.y === BOARD_HEIGHT - 1)),
    left: prev && (prev.x < curr.x || (prev.x === BOARD_WIDTH - 1 && curr.x === 0)),
  };

  if (next) {
    if (next.y < curr.y || (next.y === BOARD_HEIGHT - 1 && curr.y === 0)) connections.top = true;
    if (next.x > curr.x || (next.x === 0 && curr.x === BOARD_WIDTH - 1)) connections.right = true;
    if (next.y > curr.y || (next.y === 0 && curr.y === BOARD_HEIGHT - 1)) connections.bottom = true;
    if (next.x < curr.x || (next.x === BOARD_WIDTH - 1 && curr.x === 0)) connections.left = true;
  }

  // Simplified segment styling - remove size modifications
  return 'rounded-sm';
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
  // Helper to determine head rotation based on direction
  const getHeadRotation = (direction: Direction) => {
    switch (direction) {
      case 'UP': return 'rotate-180';
      case 'RIGHT': return '-rotate-90';
      case 'DOWN': return 'rotate-0';
      case 'LEFT': return 'rotate-90';
    }
  };

  // Helper to determine cell content and styling
  const getCellContent = (x: number, y: number) => {
    // Check if cell is snake head
    if (snake[0].x === x && snake[0].y === y) {
      return `
        relative
        bg-green-600 
        transition-all duration-100
        ${getHeadRotation(snakeDirection)}
      `;
    }

    // Check if cell is snake body
    const bodyIndex = snake.findIndex((segment, i) => i > 0 && segment.x === x && segment.y === y);
    if (bodyIndex !== -1) {
      return `
        bg-green-500
        border border-green-400/50
        shadow-inner
        transition-all duration-100
        ${getSegmentStyle(snake, bodyIndex)}
      `;
    }

    // Check if cell is food
    if (food.x === x && food.y === y) {
      return `
        bg-red-500 rounded-full border border-red-400
        animate-pulse
      `;
    }

    // Empty cell
    return "bg-gray-800";
  };

  const isHead = (x: number, y: number) => snake[0].x === x && snake[0].y === y;

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
        className="grid gap-0 bg-gray-900/10"
        style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, minmax(0, 1fr))`,
          aspectRatio: `${BOARD_WIDTH}/${BOARD_HEIGHT}`,
          isolation: 'isolate'
        }}
      >
        {Array.from({ length: BOARD_HEIGHT }, (_, y) =>
          Array.from({ length: BOARD_WIDTH }, (_, x) => (
            <div
              key={`${x}-${y}`}
              className={`
                aspect-square
                relative
                border-[0.5px] border-gray-900/10
                ${getCellContent(x, y)}
                transform-gpu
              `}
            >
              {isHead(x, y) && <SnakeHead />}
            </div>
          ))
        )}
      </div>

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
