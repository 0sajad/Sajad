
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useAppState } from '@/hooks/state';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

// Define the A11yContextType to include all required properties
export interface A11yContextType {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusMode: boolean;
  dyslexicFont: boolean;
  readingGuide: boolean;
  soundFeedback: boolean;
  colorBlindMode: string;
  keyboardNavigationVisible: boolean;
  setHighContrast: (value: boolean) => void;
  setLargeText: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  setFocusMode: (value: boolean) => void;
  setDyslexicFont: (value: boolean) => void;
  setReadingGuide: (value: boolean) => void;
  setSoundFeedback: (value: boolean) => void;
  setColorBlindMode: (mode: string) => void;
  setKeyboardNavigationVisible: (value: boolean) => void;
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
  playSound: (soundType: string) => void;
  showA11yMenu: boolean;
  toggleA11yMenu: () => void;
}

// Create the context
const A11yContext = createContext<A11yContextType | undefined>(undefined);

// Provider component
export function A11yProvider({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [showA11yMenu, setShowA11yMenu] = useState(false);
  
  // Get accessibility settings from app state
  const {
    highContrast,
    largeText,
    reducedMotion,
    focusMode,
    dyslexicFont,
    readingGuide,
    soundFeedback,
    colorBlindMode,
    keyboardNavigationVisible,
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setFocusMode,
    setDyslexicFont,
    setReadingGuide,
    setSoundFeedback,
    setColorBlindMode,
    setKeyboardNavigationVisible
  } = useAppState();
  
  // Announce function for screen readers
  const announce = useCallback((message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    if (window.announce) {
      window.announce(message, politeness);
    }
  }, []);
  
  // Play sound feedback
  const playSound = useCallback((soundType: string) => {
    if (!soundFeedback) return;
    
    // Map of sound types to audio files
    const sounds: Record<string, string> = {
      click: '/sounds/click.mp3',
      success: '/sounds/success.mp3',
      error: '/sounds/error.mp3',
      notification: '/sounds/notification.mp3'
    };
    
    const soundUrl = sounds[soundType];
    if (!soundUrl) return;
    
    try {
      const audio = new Audio(soundUrl);
      audio.volume = 0.5;
      audio.play().catch(err => console.error('Failed to play sound:', err));
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, [soundFeedback]);
  
  // Toggle A11y menu
  const toggleA11yMenu = useCallback(() => {
    setShowA11yMenu(prev => !prev);
    playSound('click');
    
    // Show toast notification when enabled
    if (!showA11yMenu) {
      toast({
        title: t('accessibility.menuOpened'),
        description: t('accessibility.menuOpenedDesc'),
        variant: 'default',
      });
    }
  }, [playSound, showA11yMenu, t]);
  
  const contextValue: A11yContextType = {
    highContrast,
    largeText,
    reducedMotion,
    focusMode,
    dyslexicFont,
    readingGuide,
    soundFeedback,
    colorBlindMode,
    keyboardNavigationVisible,
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setFocusMode,
    setDyslexicFont,
    setReadingGuide,
    setSoundFeedback,
    setColorBlindMode,
    setKeyboardNavigationVisible,
    announce,
    playSound,
    showA11yMenu,
    toggleA11yMenu
  };
  
  return (
    <A11yContext.Provider value={contextValue}>
      {children}
    </A11yContext.Provider>
  );
}

// Hook for using the A11y context
export function useA11y() {
  const context = useContext(A11yContext);
  if (context === undefined) {
    throw new Error('useA11y must be used within an A11yProvider');
  }
  return context;
}
