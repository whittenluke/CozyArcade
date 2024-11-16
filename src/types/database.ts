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

export type { UserProfile, Game, GameSession }; 