
import { useEffect } from 'react';

/**
 * Hook to handle accessibility keyboard shortcuts
 */
export function useA11yKeyboard(
  highContrast: boolean,
  setHighContrast: (value: boolean) => void,
  largeText: boolean,
  setLargeText: (value: boolean) => void,
  reducedMotion: boolean,
  setReducedMotion: (value: boolean) => void,
  focusMode: boolean,
  setFocusMode: (value: boolean) => void,
  dyslexicFont: boolean,
  setDyslexicFont: (value: boolean) => void,
  readingGuide: boolean,
  setReadingGuide: (value: boolean) => void
) {
  // Add accessibility shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + C to toggle high contrast
      if (e.altKey && e.key === 'c') {
        setHighContrast(prev => !prev);
      }
      
      // Alt + T to toggle large text
      if (e.altKey && e.key === 't') {
        setLargeText(prev => !prev);
      }
      
      // Alt + M to toggle reduced motion
      if (e.altKey && e.key === 'm') {
        setReducedMotion(prev => !prev);
      }
      
      // Alt + F to toggle focus mode
      if (e.altKey && e.key === 'f') {
        setFocusMode(prev => !prev);
      }
      
      // Alt + D to toggle dyslexic font
      if (e.altKey && e.key === 'd') {
        setDyslexicFont(prev => !prev);
      }
      
      // Alt + R to toggle reading guide
      if (e.altKey && e.key === 'r') {
        setReadingGuide(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    setHighContrast, 
    setLargeText, 
    setReducedMotion, 
    setFocusMode, 
    setDyslexicFont, 
    setReadingGuide
  ]);

  return null;
}
