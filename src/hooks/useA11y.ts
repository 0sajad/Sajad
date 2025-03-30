
import { useState } from 'react';
import { useAppState } from './state';

/**
 * A wrapper around useAppState for accessibility features
 * This hook provides access to all accessibility-related state and functions
 */
export function useA11y() {
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
  
  // State for A11y menu
  const [showA11yMenu, setShowA11yMenu] = useState(false);
  
  // Announce function for screen readers
  const announce = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    if (window.announce) {
      window.announce(message, politeness);
    }
  };

  // Play sound feedback function
  const playSound = (soundType: string) => {
    if (!soundFeedback) return;
    
    // Map of sound types to audio files
    const sounds: Record<string, string> = {
      click: '/sounds/click.mp3',
      success: '/sounds/success.mp3',
      error: '/sounds/error.mp3',
      notification: '/sounds/notification.mp3',
      info: '/sounds/info.mp3',
      warning: '/sounds/warning.mp3'
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
  };
  
  // Toggle A11y menu
  const toggleA11yMenu = () => {
    setShowA11yMenu(prev => !prev);
    playSound('click');
  };
  
  return {
    // State
    highContrast,
    largeText,
    reducedMotion,
    focusMode,
    dyslexicFont,
    readingGuide,
    soundFeedback,
    colorBlindMode,
    keyboardNavigationVisible,
    showA11yMenu,
    
    // Setters
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setFocusMode,
    setDyslexicFont,
    setReadingGuide,
    setSoundFeedback,
    setColorBlindMode,
    setKeyboardNavigationVisible,
    toggleA11yMenu,
    
    // Helper functions
    announce,
    playSound
  };
}

export default useA11y;
