import { useGames } from '../hooks/useGames';
import GameCard from '../components/games/GameCard';
import { Loader2 } from 'lucide-react';

export default function Games() {
  const { games, loading, error } = useGames();

  if (loading) {
    return (
      <div className="py-32 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-32 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            Failed to load games. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-32 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Games</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Choose from our collection of relaxing games
          </p>
        </div>

        {games.length === 0 ? (
          <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
            No games available yet. Check back soon!
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}