import { useState, useEffect } from 'react';
import { gameSessionsApi, apiRequest } from '../lib/api';
import type { GameSession } from '../types/database';
import { useAuth } from '../contexts/AuthContext';

export function useGameSessions() {
  const [sessions, setSessions] = useState<GameSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function loadSessions() {
      if (!user) return;
      
      const [data, error] = await apiRequest(gameSessionsApi.getUserSessions(user.uid));
      setLoading(false);
      if (error) {
        setError(error);
      } else {
        setSessions(data || []);
      }
    }

    loadSessions();
  }, [user]);

  const createSession = async (gameId: string) => {
    if (!user) return null;

    const [sessionId, error] = await apiRequest(
      gameSessionsApi.create({
        gameId,
        userId: user.uid,
        startedAt: new Date().toISOString(),
        score: 0,
        state: {}
      })
    );

    if (error) {
      setError(error);
      return null;
    }

    return sessionId;
  };

  return { 
    sessions, 
    loading, 
    error,
    createSession
  };
} 