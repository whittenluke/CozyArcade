export type PieceType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';
export type Rotation = 0 | 90 | 180 | 270;

export interface Piece {
  type: PieceType;
  shape: number[][];
  color: string;
  rotation: Rotation;
}

// Shape matrices for each piece type
export const PIECES: Record<PieceType, Piece> = {
  I: {
    type: 'I',
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: 'bg-cyan-600',
    rotation: 0
  },
  O: {
    type: 'O',
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: 'bg-yellow-500',
    rotation: 0
  },
  T: {
    type: 'T',
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: 'bg-purple-600',
    rotation: 0
  },
  S: {
    type: 'S',
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: 'bg-green-600',
    rotation: 0
  },
  Z: {
    type: 'Z',
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: 'bg-red-600',
    rotation: 0
  },
  J: {
    type: 'J',
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: 'bg-blue-600',
    rotation: 0
  },
  L: {
    type: 'L',
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: 'bg-orange-600',
    rotation: 0
  },
};

// Get a random piece type
export function getRandomPiece(): Piece {
  const pieces = Object.values(PIECES);
  return pieces[Math.floor(Math.random() * pieces.length)];
}

// Create a new piece instance
export function createPiece(type: PieceType): Piece {
  return {
    ...PIECES[type],
    shape: PIECES[type].shape.map(row => [...row]), // Deep copy of shape
  };
}
