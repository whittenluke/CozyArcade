import { createContext, useContext, useEffect, useState } from 'react';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  setTheme: async () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const { user } = useAuth();

  // Load theme preference from Firestore
  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setThemeState(userData.preferences?.theme || 'system');
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), {
        'preferences.theme': newTheme
      });
    }
    
    if (newTheme === 'system') {
      document.documentElement.classList.remove('dark', 'light');
      // Check system preference immediately when switching to system
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(newTheme);
    }
  };

  // Apply system preference on mount
  useEffect(() => {
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 