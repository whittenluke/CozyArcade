import { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { useGameState } from '../hooks/useGameState';
import GameBoard from './GameBoard';
import ScorePanel from './ScorePanel';

export default function SnakeGame() {
  const {
    snake,
    food,
    score,
    speed,
    state,
    isPaused,
    countdown,
    startGame,
    handleStartGame
  } = useGameState();

  // Remove auto-start effect
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-4 px-2 sm:py-6 sm:px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-xl sm:text-3xl font-bold text-white">Cozy Snake</h1>
            <button
              onClick={startGame}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              title="Restart Game"
            >
              <RefreshCw className="w-5 h-5 text-gray-400 hover:text-purple-400" />
            </button>
          </div>
          <p className="mt-2 text-gray-400 text-sm">
            {window.matchMedia('(pointer: coarse)').matches 
              ? 'Swipe to control the snake'
              : 'Use arrow keys or WASD to play'}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* Game board - scales with screen size */}
          <div className="w-full max-w-[min(90vw,400px)] aspect-square">
            <GameBoard
              snake={snake.body}
              snakeDirection={snake.direction}
              food={food}
              isPaused={isPaused}
              isGameOver={state === 'gameOver'}
              state={state}
              countdown={countdown}
              onRestart={startGame}
              onStartGame={handleStartGame}
            />
          </div>

          {/* Score panel - full width on mobile */}
          <div className="w-full max-w-[min(90vw,400px)] sm:w-32">
            <ScorePanel
              score={score}
              speed={speed}
              length={snake.body.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
