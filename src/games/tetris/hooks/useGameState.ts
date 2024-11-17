import { useState, useCallback, useEffect } from 'react';
import { GameState, initializeGame, movePiece, rotate, moveDown, holdPiece } from '../core/gameLogic';
import { useGameLoop } from './useGameLoop';
import { useInput } from './useInput';
import { useAuth } from '../../../contexts/AuthContext';
import { gameSessionsApi } from '../../../lib/api';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [isPaused, setIsPaused] = useState(false);
  const [isSoftDropping, setIsSoftDropping] = useState(false);
  const { user } = useAuth();

  // Handle game actions
  const handleInput = useCallback((input: string) => {
    if (gameState.isGameOver) return;

    setGameState(current => {
      switch (input) {
        case 'LEFT':
          return movePiece(current, 'left') || current;
        case 'RIGHT':
          return movePiece(current, 'right') || current;
        case 'DOWN':
          setIsSoftDropping(true);
          return current;
        case 'ROTATE_RIGHT':
          return rotate(current, true) || current;
        case 'ROTATE_LEFT':
          return rotate(current, false) || current;
        case 'HOLD':
          return holdPiece(current) || current;
        case 'PAUSE':
          setIsPaused(p => !p);
          return current;
        default:
          return current;
      }
    });
  }, [gameState.isGameOver]);

  // Handle key release
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'ArrowDown' || event.code === 'KeyS') {
        setIsSoftDropping(false);
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, []);

  // Game tick handler
  const handleTick = useCallback(() => {
    if (!isPaused && !gameState.isGameOver) {
      setGameState(current => moveDown(current));
    }
  }, [isPaused, gameState.isGameOver]);

  // Set up input handling
  useInput(handleInput, !isPaused);

  // Set up game loop
  useGameLoop({
    onTick: handleTick,
    isPlaying: !isPaused && !gameState.isGameOver,
    level: gameState.level,
    isSoftDropping
  });

  // Save high score when game ends
  useEffect(() => {
    if (gameState.isGameOver && user) {
      gameSessionsApi.create({
        gameId: 'tetris',
        userId: user.uid,
        startedAt: new Date().toISOString(),
        score: gameState.score,
        state: {
          level: gameState.level,
          lines: gameState.lines
        }
      });
    }
  }, [gameState.isGameOver, gameState.score, user]);

  return {
    ...gameState,
    isPaused,
    isSoftDropping,
    startGame: () => setGameState(initializeGame()),
    pauseGame: () => setIsPaused(true),
    resumeGame: () => setIsPaused(false)
  };
}
