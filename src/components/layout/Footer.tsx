import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CozyArcade
              </span>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
              A cozy corner of the internet where gamers can relax, play, and connect.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/games" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/leaderboards" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                  Leaderboards
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}