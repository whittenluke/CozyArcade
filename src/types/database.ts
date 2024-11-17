// User-related types
interface UserProfile {
  uid: string;
  username: string;
  email: string;
  createdAt: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
  };
}

// Game-related types
interface Game {
  id: string;
  title: string;
  description: string;
  type: 'tetris' | 'snake' | 'match3';
  imageUrl: string;
  config: {
    gridSize?: number;
    speed?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
  };
  stats: {
    totalPlays: number;
    highScore: number;
  };
}

// Game session types
interface GameSession {
  id: string;
  gameId: string;
  userId: string;
  startedAt: string;
  endedAt?: string;
  score: number;
  state: Record<string, any>;
}

// Add this interface
interface TetrisHighScore {
  userId: string;
  username: string;
  score: number;
  level: number;
  lines: number;
  timestamp: string;
}

export type { UserProfile, Game, GameSession, TetrisHighScore }; 