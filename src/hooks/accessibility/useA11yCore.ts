
import { useState, useEffect, useCallback } from 'react';

export function useA11yCore() {
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [largeText, setLargeText] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [focusMode, setFocusMode] = useState<boolean>(false);
  
  // Apply high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Store the preference in localStorage
    localStorage.setItem('a11y-highContrast', String(highContrast));
  }, [highContrast]);
  
  // Apply large text mode
  useEffect(() => {
    if (largeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
    
    // Store the preference in localStorage
    localStorage.setItem('a11y-largeText', String(largeText));
  }, [largeText]);
  
  // Apply reduced motion mode
  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
    
    // Store the preference in localStorage
    localStorage.setItem('a11y-reducedMotion', String(reducedMotion));
  }, [reducedMotion]);
  
  // Apply focus mode
  useEffect(() => {
    if (focusMode) {
      document.documentElement.classList.add('focus-mode');
    } else {
      document.documentElement.classList.remove('focus-mode');
    }
    
    // Store the preference in localStorage
    localStorage.setItem('a11y-focusMode', String(focusMode));
  }, [focusMode]);
  
  // Load preferences from localStorage on mount
  useEffect(() => {
    const storedHighContrast = localStorage.getItem('a11y-highContrast');
    const storedLargeText = localStorage.getItem('a11y-largeText');
    const storedReducedMotion = localStorage.getItem('a11y-reducedMotion');
    const storedFocusMode = localStorage.getItem('a11y-focusMode');
    
    if (storedHighContrast === 'true') setHighContrast(true);
    if (storedLargeText === 'true') setLargeText(true);
    if (storedReducedMotion === 'true') setReducedMotion(true);
    if (storedFocusMode === 'true') setFocusMode(true);
    
    // Also check system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches && storedReducedMotion === null) {
      setReducedMotion(true);
    }
  }, []);
  
  return {
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode
  };
}
