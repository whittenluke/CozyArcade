import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CozyArcade
              </span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              A cozy corner of the internet where gamers can relax, play, and connect.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/games" className="text-gray-600 hover:text-purple-600">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/leaderboards" className="text-gray-600 hover:text-purple-600">
                  Leaderboards
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:text-purple-600">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-purple-600">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-purple-600">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-purple-600">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">© 2024 CozyArcade. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="https://github.com/cozyarcade" className="text-gray-400 hover:text-gray-500">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}