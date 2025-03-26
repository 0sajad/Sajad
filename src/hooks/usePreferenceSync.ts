
import { useEffect } from 'react';
import { useA11y } from './useA11y';

export function usePreferenceSync() {
  const { 
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode
  } = useA11y();

  // Sync with localStorage
  useEffect(() => {
    // Load initial values from localStorage
    const savedHighContrast = localStorage.getItem('a11y-highContrast');
    const savedLargeText = localStorage.getItem('a11y-largeText');
    const savedReducedMotion = localStorage.getItem('a11y-reducedMotion');
    const savedFocusMode = localStorage.getItem('a11y-focusMode');
    
    if (savedHighContrast === 'true') setHighContrast(true);
    if (savedLargeText === 'true') setLargeText(true);
    if (savedReducedMotion === 'true') setReducedMotion(true);
    if (savedFocusMode === 'true') setFocusMode(true);
    
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches && savedReducedMotion === null) {
      setReducedMotion(true);
    }
    
    // Check for prefers-color-scheme for potential high contrast
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDarkWithContrast = window.matchMedia('(prefers-contrast: more)');
    if (prefersColorScheme.matches && prefersDarkWithContrast.matches && savedHighContrast === null) {
      setHighContrast(true);
    }
  }, [setHighContrast, setLargeText, setReducedMotion, setFocusMode]);
  
  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('a11y-highContrast', highContrast.toString());
  }, [highContrast]);
  
  useEffect(() => {
    localStorage.setItem('a11y-largeText', largeText.toString());
  }, [largeText]);
  
  useEffect(() => {
    localStorage.setItem('a11y-reducedMotion', reducedMotion.toString());
  }, [reducedMotion]);
  
  useEffect(() => {
    localStorage.setItem('a11y-focusMode', focusMode.toString());
  }, [focusMode]);
  
  // Add listener for system preference changes
  useEffect(() => {
    const prefersReducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      // Only update if the user hasn't explicitly set a preference
      if (localStorage.getItem('a11y-reducedMotion') === null) {
        setReducedMotion(e.matches);
      }
    };
    
    prefersReducedMotionMediaQuery.addEventListener('change', handleReducedMotionChange);
    
    return () => {
      prefersReducedMotionMediaQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, [setReducedMotion]);

  return null;
}
