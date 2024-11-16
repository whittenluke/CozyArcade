import GameCard from '../components/games/GameCard';

const FEATURED_GAMES = [
  {
    id: 'tetris',
    title: 'Cozy Tetris',
    description: 'A relaxing take on the classic block-stacking puzzle game.',
    imageUrl: 'https://images.unsplash.com/photo-1642068131592-d8b8c3cd0f3b?auto=format&fit=crop&q=80',
    playCount: 1234,
    highScore: 99999,
  },
  {
    id: 'snake',
    title: 'Gentle Snake',
    description: 'Guide your snake through a peaceful garden, collecting fruits at your own pace.',
    imageUrl: 'https://images.unsplash.com/photo-1628277613967-6abca504d0ac?auto=format&fit=crop&q=80',
    playCount: 987,
    highScore: 5000,
  },
  {
    id: 'match3',
    title: 'Calm Match',
    description: 'Match colorful gems in this soothing puzzle experience.',
    imageUrl: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&q=80',
    playCount: 2468,
    highScore: 75000,
  },
];

export default function Games() {
  return (
    <div className="py-32 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Games</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Choose from our collection of relaxing games
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_GAMES.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>
      </div>
    </div>
  );
}