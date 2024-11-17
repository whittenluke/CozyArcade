import type { Piece } from './pieces';
import { BOARD_WIDTH, BOARD_HEIGHT } from './constants';

interface Position {
  x: number;
  y: number;
}

// Check if a piece at a given position collides with anything
export function checkCollision(
  piece: Piece,
  position: Position,
  board: number[][]
): boolean {
  // Check each cell of the piece
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardX = position.x + x;
        const boardY = position.y + y;

        // Check bounds
        if (
          boardX < 0 || // Left wall
          boardX >= BOARD_WIDTH || // Right wall
          boardY >= BOARD_HEIGHT || // Floor
          boardY < 0 // Ceiling (for rotations)
        ) {
          return true;
        }

        // Check collision with placed pieces
        if (board[boardY] && board[boardY][boardX]) {
          return true;
        }
      }
    }
  }
  return false;
}

// Get the drop position (where piece would land)
export function getDropPosition(
  piece: Piece,
  position: Position,
  board: number[][]
): Position {
  let dropY = position.y;
  
  while (!checkCollision(piece, { x: position.x, y: dropY + 1 }, board)) {
    dropY++;
  }
  
  return { x: position.x, y: dropY };
}

// Check if any rows are complete
export function getCompletedRows(board: number[][]): number[] {
  const completedRows: number[] = [];
  
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    if (board[y].every(cell => cell !== 0)) {
      completedRows.push(y);
    }
  }
  
  return completedRows;
}

// Clear completed rows and return new board state
export function clearRows(board: number[][], rows: number[]): number[][] {
  const newBoard = board.map(row => [...row]);
  
  // Remove completed rows
  rows.forEach(y => {
    newBoard.splice(y, 1);
    // Add new empty row at top
    newBoard.unshift(new Array(BOARD_WIDTH).fill(0));
  });
  
  return newBoard;
}

// Check if game is over (pieces stacked to top)
export function isGameOver(board: number[][]): boolean {
  // Check top row (excluding buffer zone) for any placed pieces
  return board[0].some(cell => cell !== 0);
}
