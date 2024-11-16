import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { getGravatarUrl } from '../utils/gravatar';
import { Sun, Moon, Monitor } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="py-32 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center space-x-6 mb-6">
            <img 
              src={user?.email ? getGravatarUrl(user.email) : ''}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.displayName}</h1>
              <p className="text-gray-600 dark:text-gray-300">{user?.email}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Theme Preferences</h2>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    theme === 'light' 
                      ? 'border-purple-600 text-purple-600 bg-purple-50 dark:bg-purple-900' 
                      : 'border-gray-200 text-gray-700 dark:text-gray-200 dark:border-gray-700 hover:border-purple-600 hover:text-purple-600'
                  }`}
                >
                  <Sun className="w-5 h-5" />
                  Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    theme === 'dark' 
                      ? 'border-purple-600 text-purple-600 bg-purple-50 dark:bg-purple-900' 
                      : 'border-gray-200 text-gray-700 dark:text-gray-200 dark:border-gray-700 hover:border-purple-600 hover:text-purple-600'
                  }`}
                >
                  <Moon className="w-5 h-5" />
                  Dark
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                    theme === 'system' 
                      ? 'border-purple-600 text-purple-600 bg-purple-50 dark:bg-purple-900' 
                      : 'border-gray-200 text-gray-700 dark:text-gray-200 dark:border-gray-700 hover:border-purple-600 hover:text-purple-600'
                  }`}
                >
                  <Monitor className="w-5 h-5" />
                  System
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 