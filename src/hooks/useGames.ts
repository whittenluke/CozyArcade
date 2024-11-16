import { useState, useEffect } from 'react';
import { gamesApi, apiRequest } from '../lib/api';
import type { Game } from '../types/database';

export function useGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadGames() {
      const [data, error] = await apiRequest(gamesApi.getAll());
      setLoading(false);
      if (error) {
        setError(error);
      } else {
        setGames(data || []);
      }
    }

    loadGames();
  }, []);

  return { games, loading, error };
}

export function useGame(id: string) {
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadGame() {
      const [data, error] = await apiRequest(gamesApi.getById(id));
      setLoading(false);
      if (error) {
        setError(error);
      } else {
        setGame(data);
      }
    }

    loadGame();
  }, [id]);

  return { game, loading, error };
} 