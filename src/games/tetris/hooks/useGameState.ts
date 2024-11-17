import { useState, useCallback, useEffect } from 'react';
import { GameState, initializeGame, movePiece, rotate, moveDown, holdPiece } from '../core/gameLogic';
import { useGameLoop } from './useGameLoop';
import { useInput } from './useInput';
import { useAuth } from '../../../contexts/AuthContext';
import { tetrisApi } from '../../../lib/api';
import { CONTROLS } from '../core/constants';

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(initializeGame());
  const [isPaused, setIsPaused] = useState(false);
  const [isSoftDropping, setIsSoftDropping] = useState(false);
  const { user } = useAuth();

  // Handle game actions
  const handleInput = useCallback((input: keyof typeof CONTROLS) => {
    if (gameState.isGameOver) return;

    if (input === 'PAUSE') {
      setIsPaused(p => !p);
      return;
    }

    if (isPaused) return;

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
        default:
          return current;
      }
    });
  }, [gameState.isGameOver, isPaused]);

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
      console.log('Attempting to save score:', {
        score: gameState.score,
        user: user.uid,
        username: user.displayName
      });
      
      tetrisApi.saveHighScore({
        userId: user.uid,
        username: user.displayName || 'Anonymous',
        score: gameState.score,
        level: gameState.level,
        lines: gameState.lines,
        timestamp: new Date().toISOString()
      }).then(([result, error]) => {
        if (error) {
          console.error('Failed to save score:', error);
        } else if (result) {
          console.log('Score saved successfully');
        }
      });
    }
  }, [gameState.isGameOver, user, gameState.score, gameState.level, gameState.lines]);

  return {
    ...gameState,
    isPaused,
    isSoftDropping,
    startGame: () => setGameState(initializeGame()),
    pauseGame: () => setIsPaused(true),
    resumeGame: () => setIsPaused(false)
  };
}
