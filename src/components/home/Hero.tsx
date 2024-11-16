import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-b from-purple-50 to-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              CozyArcade
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Your cozy corner for relaxing games and friendly competition. Join our community of players who enjoy taking things at their own pace.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link 
              to="/games"
              className="px-8 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition"
            >
              Browse Games
            </Link>
            <Link
              to="/community" 
              className="px-8 py-3 bg-white text-purple-600 rounded-full font-medium border border-purple-200 hover:border-purple-300 transition"
            >
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}