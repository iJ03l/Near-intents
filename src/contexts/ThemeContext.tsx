import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setIsDark(saved === 'dark');
    else setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);
  const toggleTheme = () => {
    const n = !isDark;
    setIsDark(n);
    localStorage.setItem('theme', n ? 'dark' : 'light');
  };
  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
}
export function useTheme() {
  const c = useContext(ThemeContext);
  if (!c) throw new Error('useTheme must be inside ThemeProvider');
  return c;
}
