import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_STORAGE_KEY = 'nfcs-theme';

export function ThemeProvider({
  children,
  defaultTheme = 'system',
}: {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
}) {
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Read stored theme on mount
  useEffect(() => {
    try {
      const stored = (localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode) || defaultTheme;
      setThemeState(stored);
    } catch {
      setThemeState(defaultTheme);
    }
  }, [defaultTheme]);

  // Apply theme class to <html> element
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (t: ThemeMode) => {
      if (t === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        setResolvedTheme('dark');
      } else if (t === 'light') {
        root.classList.remove('dark');
        root.classList.add('light');
        setResolvedTheme('light');
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          root.classList.add('dark');
          root.classList.remove('light');
          setResolvedTheme('dark');
        } else {
          root.classList.remove('dark');
          root.classList.add('light');
          setResolvedTheme('light');
        }
      }
    };

    applyTheme(theme);

    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme('system');
      mq.addEventListener('change', handleChange);
      return () => mq.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore write errors
    }
    setThemeState(newTheme);
  }, []);

  const toggleDarkMode = useCallback(() => {
    const next = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }, [resolvedTheme, setTheme]);

  const darkMode = resolvedTheme === 'dark';

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      darkMode,
      toggleDarkMode,
      resolvedTheme,
    }),
    [theme, setTheme, darkMode, toggleDarkMode, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider />');
  }
  return ctx;
}
