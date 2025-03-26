
import { useState, useEffect } from 'react';

/**
 * Core hook for basic accessibility features
 */
export function useA11yCore() {
  // Base accessibility settings
  const [highContrast, setHighContrast] = useState(
    localStorage.getItem('highContrast') === 'true'
  );
  
  const [largeText, setLargeText] = useState(
    localStorage.getItem('largeText') === 'true'
  );
  
  const [reducedMotion, setReducedMotion] = useState(
    localStorage.getItem('reducedMotion') === 'true' || 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  
  const [focusMode, setFocusMode] = useState(
    localStorage.getItem('focusMode') === 'true'
  );
  
  // Apply high contrast if enabled
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    localStorage.setItem('highContrast', highContrast.toString());
  }, [highContrast]);
  
  // Apply large text if enabled
  useEffect(() => {
    if (largeText) {
      document.body.classList.add('large-text');
    } else {
      document.body.classList.remove('large-text');
    }
    
    localStorage.setItem('largeText', largeText.toString());
  }, [largeText]);
  
  // Apply reduced motion
  useEffect(() => {
    if (reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
    
    localStorage.setItem('reducedMotion', reducedMotion.toString());
  }, [reducedMotion]);
  
  // Apply focus mode
  useEffect(() => {
    if (focusMode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
    
    localStorage.setItem('focusMode', focusMode.toString());
  }, [focusMode]);

  return {
    // Current settings
    highContrast,
    setHighContrast,
    largeText,
    setLargeText,
    reducedMotion,
    setReducedMotion,
    focusMode,
    setFocusMode
  };
}
