import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { GameState, Direction, SPEEDS } from '../core/constants';
import { 
  initializeGame, 
  moveSnake, 
  changeDirection,
  type GameStateType 
} from '../core/gameLogic';
import { useInput } from './useInput';
import { useGameLoop } from './useGameLoop';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

export function useGameState() {
  const [gameState, setGameState] = useState<GameStateType>(initializeGame());
  const [isPaused, setIsPaused] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { user } = useAuth();

  // Reset game
  const startGame = useCallback(() => {
    setGameState(() => initializeGame());
    setIsPaused(false);
    setCountdown(0);
  }, []);

  // Start countdown and game
  const handleStartGame = useCallback(() => {
    setCountdown(3);
    
    const countdownInterval = setInterval(() => {
      setCountdown(current => {
        if (current <= 1) {
          clearInterval(countdownInterval);
          setGameState(state => ({ ...state, state: GameState.PLAYING }));
          return 0;
        }
        return current - 1;
      });
    }, 1000);
  }, []);

  // Handle direction changes
  const handleDirectionChange = useCallback((newDirection: Direction) => {
    if (gameState.state === GameState.PLAYING) {
      setGameState(current => changeDirection(current, newDirection));
    }
  }, [gameState.state]);

  // Handle pause toggle
  const togglePause = useCallback(() => {
    if (gameState.state === GameState.GAME_OVER) return;
    
    setIsPaused(current => !current);
    setGameState(current => ({
      ...current,
      state: current.state === GameState.PLAYING ? GameState.PAUSED : GameState.PLAYING
    }));
  }, [gameState.state]);

  // Game tick handler
  const handleTick = useCallback(() => {
    if (gameState.state === GameState.PLAYING) {
      setGameState(current => moveSnake(current));
    }
  }, [gameState.state]);

  // Start game on mount
  useEffect(() => {
    startGame();
  }, [startGame]);

  // Set up input handling
  useInput({
    onDirectionChange: handleDirectionChange,
    onPause: togglePause
  }, !isPaused && gameState.state !== GameState.GAME_OVER);

  // Set up game loop
  useGameLoop({
    onTick: handleTick,
    speed: gameState.speed,
    isPlaying: gameState.state === GameState.PLAYING && !isPaused
  });

  // Save high score when game ends
  useEffect(() => {
    if (gameState.state === GameState.GAME_OVER && user) {
      const saveScore = async () => {
        try {
          await addDoc(collection(db, 'snake-scores'), {
            userId: user.uid,
            username: user.displayName || 'Anonymous',
            score: gameState.score,
            level: Math.floor((SPEEDS.INITIAL - gameState.speed) / SPEEDS.SPEED_DECREASE),
            length: gameState.snake.body.length,
            timestamp: new Date().toISOString()
          });
          console.log('Score saved successfully');
        } catch (error) {
          console.error('Error saving score:', error);
        }
      };

      saveScore();
    }
  }, [gameState.state, gameState.score, user, gameState.speed, gameState.snake.body.length]);

  return {
    ...gameState,
    isPaused,
    countdown,
    startGame,
    handleStartGame,
    togglePause
  };
}
