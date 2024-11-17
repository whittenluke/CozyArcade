// Board dimensions
export const BOARD_WIDTH = 20;
export const BOARD_HEIGHT = 20;

// Game speeds (in ms)
export const SPEEDS = {
  INITIAL: 200,
  MIN_SPEED: 50,  // Maximum speed (minimum interval)
  SPEED_DECREASE: 5  // ms to decrease per food eaten
} as const;

// Points
export const POINTS = {
  FOOD: 100,  // Points per food eaten
  SPEED_BONUS: 50  // Additional points when moving at high speed
} as const;

// Key mappings
export const CONTROLS = {
  UP: ['ArrowUp', 'KeyW'],
  DOWN: ['ArrowDown', 'KeyS'],
  LEFT: ['ArrowLeft', 'KeyA'],
  RIGHT: ['ArrowRight', 'KeyD'],
  PAUSE: ['KeyP', 'Escape']
} as const;

// Directions
export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

// Starting position (center of board)
export const INITIAL_POSITION = {
  x: Math.floor(BOARD_WIDTH / 2),
  y: Math.floor(BOARD_HEIGHT / 2)
} as const;

// Game states
export enum GameState {
  READY = 'ready',
  PLAYING = 'playing',
  PAUSED = 'paused',
  GAME_OVER = 'gameOver'
}
