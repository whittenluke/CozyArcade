import { useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import GameBoard from './GameBoard';
import PiecePreview from './PiecePreview';
import ScorePanel from './ScorePanel';
import { RefreshCw } from 'lucide-react';

export default function TetrisGame() {
  const {
    board,
    currentPiece,
    currentPosition,
    nextPiece,
    holdPiece,
    score,
    level,
    lines,
    isPaused,
    isGameOver,
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
            <h1 className="text-3xl font-bold text-white">Cozy Tetris</h1>
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

        <div className="flex justify-center gap-8">
          {/* Left side - Hold piece */}
          <div className="w-32">
            <PiecePreview piece={holdPiece} label="Hold" />
          </div>

          {/* Center - Game board */}
          <div className="w-[320px]">
            <GameBoard
              board={board}
              currentPiece={currentPiece}
              currentPosition={currentPosition}
              isPaused={isPaused}
              isGameOver={isGameOver}
              onRestart={startGame}
            />
          </div>

          {/* Right side - Score and next piece */}
          <div className="w-32 space-y-4">
            <ScorePanel
              score={score}
              level={level}
              lines={lines}
            />
            <PiecePreview piece={nextPiece} label="Next" />
          </div>
        </div>

        {/* Controls help */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>↑/W: Rotate • ←/A: Move Left • →/D: Move Right • ↓/S: Soft Drop</p>
          <p className="mt-1">Space: Hard Drop • C: Hold • P/Esc: Pause</p>
        </div>
      </div>
    </div>
  );
}
