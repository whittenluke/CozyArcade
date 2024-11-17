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
    startGame
  } = useGameState();

  // Start new game on mount
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-3xl font-bold text-white">Cozy Snake</h1>
            <button
              onClick={startGame}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              title="Restart Game"
            >
              <RefreshCw className="w-6 h-6 text-gray-400 hover:text-purple-400" />
            </button>
          </div>
          <p className="mt-2 text-gray-400">Use arrow keys or WASD to play</p>
        </div>

        <div className="max-w-[600px] mx-auto">
          <div className="flex justify-center gap-4 sm:gap-8">
            {/* Game board */}
            <div className="w-[320px] sm:w-[400px] shrink-0">
              <GameBoard
                snake={snake.body}
                snakeDirection={snake.direction}
                food={food}
                isPaused={isPaused}
                isGameOver={state === 'gameOver'}
                onRestart={startGame}
              />
            </div>

            {/* Score panel */}
            <div className="w-[120px] sm:w-32 shrink-0">
              <ScorePanel
                score={score}
                speed={speed}
                length={snake.body.length}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
