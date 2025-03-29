
import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { useAppState } from '@/hooks/state';

// Define types for the context
type Theme = 'light' | 'dark' | 'system';
type Mode = 'rtl' | 'ltr';

interface ModeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
  isRTL: boolean;
}

// Create context with a default value
const ModeContext = createContext<ModeContextType | undefined>(undefined);

// Provider component
interface ModeProviderProps {
  children: React.ReactNode;
}

export const ModeProvider: React.FC<ModeProviderProps> = ({ children }) => {
  // Get initial theme from Zustand store, but don't subscribe to changes to avoid loops
  const initialTheme = useAppState.getState().theme || 'system';
  const initialMode = document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';
  
  // Use local state to manage theme/mode within this component
  const [theme, setThemeState] = useState<Theme>(initialTheme as Theme);
  const [mode, setModeState] = useState<Mode>(initialMode);
  
  // Memoize the isRTL value to prevent unnecessary re-renders
  const isRTL = useMemo(() => mode === 'rtl', [mode]);
  
  // Handle theme changes with a useCallback to prevent recreation on each render
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    
    // Apply theme to document
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
    
    // Only update the store if the value has actually changed
    if (useAppState.getState().theme !== newTheme) {
      useAppState.getState().setTheme(newTheme);
    }
  }, []);
  
  // Handle mode changes with a useCallback
  const setMode = useCallback((newMode: Mode) => {
    setModeState(newMode);
    document.documentElement.dir = newMode;
    document.documentElement.lang = newMode === 'rtl' ? 'ar' : 'en';
    document.documentElement.classList.toggle('rtl', newMode === 'rtl');
    document.documentElement.classList.toggle('ltr', newMode === 'ltr');
  }, []);
  
  // Listen for system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        document.documentElement.classList.toggle('dark', e.matches);
      };
      
      // Apply initial value
      document.documentElement.classList.toggle('dark', mediaQuery.matches);
      
      // Listen for changes
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);
  
  // Memoize the context value to prevent unnecessary re-renders of children
  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    mode,
    setMode,
    isRTL
  }), [theme, setTheme, mode, setMode, isRTL]);
  
  return (
    <ModeContext.Provider value={contextValue}>
      {children}
    </ModeContext.Provider>
  );
};

// Custom hook to use the context
export const useMode = (): ModeContextType => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
