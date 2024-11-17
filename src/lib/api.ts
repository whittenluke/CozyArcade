import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  where,
  orderBy,
  limit as firestoreLimit
} from 'firebase/firestore';
import { db } from './firebase';
import type { Game, GameSession, TetrisHighScore } from '../types/database';

const TEST_GAMES: Game[] = [
  {
    id: 'tetris',
    title: 'Tetris',
    description: 'Classic block-stacking puzzle game. Arrange falling pieces to create and clear complete lines.',
    type: 'tetris',
    imageUrl: '/images/games/tetris/cozytetris.jpg',
    config: {
      difficulty: 'medium'
    },
    stats: {
      totalPlays: 1234,
      highScore: 99999
    }
  },
  {
    id: 'snake',
    title: 'Snake',
    description: 'Guide the snake to collect food and grow longer without hitting walls or yourself.',
    type: 'snake',
    imageUrl: '/images/games/snake/cozysnake.jpg',
    config: {
      difficulty: 'easy'
    },
    stats: {
      totalPlays: 2345,
      highScore: 500
    }
  },
  {
    id: 'match3',
    title: 'Match 3',
    description: 'Connect three or more similar items to score points in this relaxing puzzle game.',
    type: 'match3',
    imageUrl: '/images/games/match3/cozymatch3.jpg',
    config: {
      difficulty: 'easy'
    },
    stats: {
      totalPlays: 3456,
      highScore: 75000
    }
  }
];

// Games API
export const gamesApi = {
  async getAll(): Promise<Game[]> {
    return TEST_GAMES;
  },

  async getById(id: string): Promise<Game | null> {
    const docRef = doc(db, 'games', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Game : null;
  },

  async getTopGames(limitCount: number = 10): Promise<Game[]> {
    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, orderBy('stats.totalPlays', 'desc'), firestoreLimit(limitCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Game));
  }
};

// Game Sessions API
export const gameSessionsApi = {
  async create(sessionData: Omit<GameSession, 'id'>): Promise<string> {
    const sessionsRef = collection(db, 'game-sessions');
    const docRef = doc(sessionsRef);
    await setDoc(docRef, {
      ...sessionData,
      startedAt: new Date().toISOString()
    });
    return docRef.id;
  },

  async update(id: string, data: Partial<GameSession>): Promise<void> {
    const docRef = doc(db, 'game-sessions', id);
    await updateDoc(docRef, data);
  },

  async getUserSessions(userId: string): Promise<GameSession[]> {
    const sessionsRef = collection(db, 'game-sessions');
    const q = query(sessionsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GameSession));
  }
};

// Tetris API
export const tetrisApi = {
  saveHighScore: async (score: TetrisHighScore) => {
    try {
      const scoresRef = collection(db, 'tetris-scores');
      const newScoreRef = doc(scoresRef);
      await setDoc(newScoreRef, {
        ...score,
        timestamp: new Date().toISOString()
      });
      console.log('Score saved successfully:', score);
      return [true, null] as const;
    } catch (error) {
      console.error('Error saving score:', error);
      return [null, error] as const;
    }
  },

  getHighScores: async (limit = 10) => {
    try {
      const scoresRef = collection(db, 'tetris-scores');
      const q = query(
        scoresRef,
        orderBy('score', 'desc'),
        firestoreLimit(limit)
      );
      
      const snapshot = await getDocs(q);
      const scores = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as (TetrisHighScore & { id: string })[];
      
      return [scores, null] as const;
    } catch (error) {
      console.error('Error getting high scores:', error);
      return [null, error] as const;
    }
  }
};

// Error handling wrapper
export async function apiRequest<T>(
  request: Promise<T>
): Promise<[T | null, Error | null]> {
  try {
    const data = await request;
    return [data, null];
  } catch (error) {
    console.error('API Error:', error);
    return [null, error as Error];
  }
} 