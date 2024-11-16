import { Link } from 'react-router-dom';
import { Trophy, Users } from 'lucide-react';
import type { Game } from '../../types/database';

type GameCardProps = Game;

export default function GameCard({ id, title, description, imageUrl, stats }: GameCardProps) {
  return (
    <Link to={`/games/${id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition hover:shadow-md">
        <div className="aspect-video relative">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{stats.totalPlays}</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span>{stats.highScore}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}