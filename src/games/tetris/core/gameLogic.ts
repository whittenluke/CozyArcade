import { BOARD_WIDTH, BOARD_HEIGHT, SPAWN_POSITION, POINTS } from './constants';
import type { Piece } from './pieces';
import { createPiece, getRandomPiece } from './pieces';
import { checkCollision, getCompletedRows, clearRows, isGameOver } from './collision';
import { rotatePiece } from './rotation';

export interface GameState {
  board: number[][];
  boardColors: (string | null)[][];
  currentPiece: Piece;
  currentPosition: { x: number; y: number };
  nextPiece: Piece;
  holdPiece?: Piece;
  hasHeld: boolean;
  score: number;
  level: number;
  lines: number;
  isGameOver: boolean;
}

// Initialize a new game state
export function initializeGame(): GameState {
  const board = Array(BOARD_HEIGHT).fill(0).map(() => 
    Array(BOARD_WIDTH).fill(0)
  );
  
  const boardColors = Array(BOARD_HEIGHT).fill(null).map(() => 
    Array(BOARD_WIDTH).fill(null)
  );
  
  return {
    board,
    boardColors,
    currentPiece: getRandomPiece(),
    currentPosition: { ...SPAWN_POSITION },
    nextPiece: getRandomPiece(),
    hasHeld: false,
    score: 0,
    level: 1,
    lines: 0,
    isGameOver: false
  };
}

// Move piece left or right
export function movePiece(
  state: GameState,
  direction: 'left' | 'right'
): GameState | null {
  const newX = state.currentPosition.x + (direction === 'left' ? -1 : 1);
  const newPosition = { x: newX, y: state.currentPosition.y };
  
  if (!checkCollision(state.currentPiece, newPosition, state.board)) {
    return {
      ...state,
      currentPosition: newPosition
    };
  }
  
  return null;
}

// Rotate the current piece
export function rotate(state: GameState, clockwise: boolean = true): GameState | null {
  const result = rotatePiece(
    state.currentPiece,
    state.currentPosition,
    state.board,
    clockwise
  );
  
  if (result.success && result.newPosition && result.newShape) {
    return {
      ...state,
      currentPiece: {
        ...state.currentPiece,
        shape: result.newShape,
        rotation: ((state.currentPiece.rotation + (clockwise ? 90 : -90)) % 360) as 0 | 90 | 180 | 270
      },
      currentPosition: result.newPosition
    };
  }
  
  return null;
}

// Move piece down one row
export function moveDown(state: GameState): GameState {
  const newPosition = { 
    ...state.currentPosition,
    y: state.currentPosition.y + 1 
  };
  
  if (!checkCollision(state.currentPiece, newPosition, state.board)) {
    return {
      ...state,
      currentPosition: newPosition
    };
  }
  
  // If we can't move down, lock the piece and generate a new one
  return lockPiece(state);
}

// Lock the current piece in place and generate a new one
function lockPiece(state: GameState): GameState {
  const newBoard = state.board.map(row => [...row]);
  const newBoardColors = state.boardColors.map(row => [...row]);
  
  // Place the piece on the board
  for (let y = 0; y < state.currentPiece.shape.length; y++) {
    for (let x = 0; x < state.currentPiece.shape[y].length; x++) {
      if (state.currentPiece.shape[y][x]) {
        const boardY = state.currentPosition.y + y;
        const boardX = state.currentPosition.x + x;
        newBoard[boardY][boardX] = 1;
        newBoardColors[boardY][boardX] = state.currentPiece.color;
      }
    }
  }
  
  // Check for completed rows
  const completedRows = getCompletedRows(newBoard);
  const clearedBoard = clearRows(newBoard, completedRows);
  
  // Calculate score
  const additionalScore = calculateScore(completedRows.length, state.level);
  const newLines = state.lines + completedRows.length;
  const newLevel = Math.floor(newLines / 10) + 1;
  
  // Check for game over
  if (isGameOver(clearedBoard)) {
    return {
      ...state,
      board: clearedBoard,
      boardColors: newBoardColors,
      isGameOver: true
    };
  }
  
  // Generate new piece
  return {
    ...state,
    board: clearedBoard,
    boardColors: newBoardColors,
    currentPiece: state.nextPiece,
    currentPosition: { ...SPAWN_POSITION },
    nextPiece: getRandomPiece(),
    hasHeld: false,
    score: state.score + additionalScore,
    level: newLevel,
    lines: newLines
  };
}

// Calculate score based on number of lines cleared
function calculateScore(lines: number, level: number): number {
  switch (lines) {
    case 1: return POINTS.SINGLE * level;
    case 2: return POINTS.DOUBLE * level;
    case 3: return POINTS.TRIPLE * level;
    case 4: return POINTS.TETRIS * level;
    default: return 0;
  }
}

// Hold the current piece
export function holdPiece(state: GameState): GameState | null {
  if (state.hasHeld) return null;
  
  const heldPiece = state.holdPiece;
  const newHoldPiece = createPiece(state.currentPiece.type);
  
  return {
    ...state,
    currentPiece: heldPiece || state.nextPiece,
    nextPiece: heldPiece ? state.nextPiece : getRandomPiece(),
    holdPiece: newHoldPiece,
    currentPosition: { ...SPAWN_POSITION },
    hasHeld: true
  };
}
