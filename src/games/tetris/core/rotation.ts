import type { Piece } from './pieces';
import { checkCollision } from './collision';

interface Position {
  x: number;
  y: number;
}

// Wall kick data for J, L, S, T, Z pieces
const WALL_KICK_DATA = {
  '0>90': [{x: 0, y: 0}, {x: -1, y: 0}, {x: -1, y: -1}, {x: 0, y: 2}, {x: -1, y: 2}],
  '90>180': [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 0, y: -2}, {x: 1, y: -2}],
  '180>270': [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: -1}, {x: 0, y: 2}, {x: 1, y: 2}],
  '270>0': [{x: 0, y: 0}, {x: -1, y: 0}, {x: -1, y: 1}, {x: 0, y: -2}, {x: -1, y: -2}],
} as const;

// I piece has different wall kick data
const I_WALL_KICK_DATA = {
  '0>90': [{x: 0, y: 0}, {x: -2, y: 0}, {x: 1, y: 0}, {x: -2, y: 1}, {x: 1, y: -2}],
  '90>180': [{x: 0, y: 0}, {x: -1, y: 0}, {x: 2, y: 0}, {x: -1, y: -2}, {x: 2, y: 1}],
  '180>270': [{x: 0, y: 0}, {x: 2, y: 0}, {x: -1, y: 0}, {x: 2, y: -1}, {x: -1, y: 2}],
  '270>0': [{x: 0, y: 0}, {x: 1, y: 0}, {x: -2, y: 0}, {x: 1, y: 2}, {x: -2, y: -1}],
} as const;

// Rotate a matrix 90 degrees clockwise
function rotateMatrix(matrix: number[][]): number[][] {
  const N = matrix.length;
  const rotated = matrix.map((row, i) => 
    row.map((_, j) => matrix[N - 1 - j][i])
  );
  return rotated;
}

// Rotate a matrix 90 degrees counterclockwise
function rotateMatrixCCW(matrix: number[][]): number[][] {
  const N = matrix.length;
  const rotated = matrix.map((row, i) => 
    row.map((_, j) => matrix[j][N - 1 - i])
  );
  return rotated;
}

// Try to rotate a piece with wall kicks
export function rotatePiece(
  piece: Piece,
  position: Position,
  board: number[][],
  clockwise: boolean = true
): { success: boolean; newPosition?: Position; newShape?: number[][] } {
  const newShape = clockwise 
    ? rotateMatrix(piece.shape)
    : rotateMatrixCCW(piece.shape);
  
  // Test all possible wall kick positions
  const kicks = piece.type === 'I' ? I_WALL_KICK_DATA : WALL_KICK_DATA;
  const rotationKey = `${piece.rotation}>${(piece.rotation + (clockwise ? 90 : -90)) % 360}` as keyof typeof kicks;
  
  for (const kick of kicks[rotationKey]) {
    const newPosition = {
      x: position.x + kick.x,
      y: position.y + kick.y
    };
    
    if (!checkCollision({ ...piece, shape: newShape }, newPosition, board)) {
      return {
        success: true,
        newPosition,
        newShape
      };
    }
  }
  
  return { success: false };
}
