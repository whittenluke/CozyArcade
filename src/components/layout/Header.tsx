import { Menu, Search, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, signOutUser } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CozyArcade
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/games" className="text-gray-700 hover:text-purple-600 transition">
              Games
            </Link>
            <Link to="/leaderboards" className="text-gray-700 hover:text-purple-600 transition">
              Leaderboards  
            </Link>
            <Link to="/community" className="text-gray-700 hover:text-purple-600 transition">
              Community
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full">
                  <User className="w-5 h-5 text-gray-700" />
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <LogOut className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  to="/signin" 
                  className="px-4 py-2 text-gray-700 hover:text-purple-600 transition"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup"
                  className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}