import { Link } from 'react-router-dom';
import { Trophy, Users } from 'lucide-react';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  playCount: number;
  highScore: number;
}

export default function GameCard({ id, title, description, imageUrl, playCount, highScore }: GameCardProps) {
  return (
    <Link to={`/games/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition hover:shadow-md">
        <div className="aspect-video relative">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{playCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span>{highScore}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}