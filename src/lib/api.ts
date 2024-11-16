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
  limit
} from 'firebase/firestore';
import { db } from './firebase';
import type { Game, GameSession } from '../types/database';

// Games API
export const gamesApi = {
  async getAll(): Promise<Game[]> {
    const gamesRef = collection(db, 'games');
    const snapshot = await getDocs(gamesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Game));
  },

  async getById(id: string): Promise<Game | null> {
    const docRef = doc(db, 'games', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Game : null;
  },

  async getTopGames(limitCount: number = 10): Promise<Game[]> {
    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, orderBy('stats.totalPlays', 'desc'), limit(limitCount));
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