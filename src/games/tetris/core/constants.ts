// Board dimensions
export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;
export const VISIBLE_HEIGHT = 20;  // Actual visible board height
export const BUFFER_HEIGHT = 4;    // Hidden buffer zone for new pieces

// Game speeds (in ms)
export const SPEEDS = {
  START: 800,
  SOFT_DROP: 50,
  LOCK_DELAY: 500,
  SPEED_INCREASE_PER_LEVEL: 0.8,
} as const;

// Points system
export const POINTS = {
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2,
} as const;

// Level up requirements
export const LINES_PER_LEVEL = 10;
export const SPEED_INCREASE_PER_LEVEL = 0.8; // Multiply current speed by this

// Key mappings
export const CONTROLS = {
  LEFT: ['ArrowLeft', 'KeyA'],
  RIGHT: ['ArrowRight', 'KeyD'],
  DOWN: ['ArrowDown', 'KeyS'],
  DROP: ['Space'],
  ROTATE_RIGHT: ['ArrowUp', 'KeyW'],
  ROTATE_LEFT: ['KeyQ'],
  HOLD: ['ShiftLeft', 'KeyC'],
  PAUSE: ['KeyP', 'Escape'],
} as const;

// Starting position for new pieces
export const SPAWN_POSITION = {
  x: Math.floor(BOARD_WIDTH / 2) - 1,
  y: 0,
} as const;

// Game states
export enum GameState {
  LOADING = 'loading',
  READY = 'ready',
  PLAYING = 'playing',
  PAUSED = 'paused',
  GAME_OVER = 'gameOver',
}
