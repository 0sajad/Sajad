
import { useState, useEffect } from 'react';

/**
 * Hook for cursor-related accessibility features
 */
export function useCursorFeatures() {
  const [customCursor, setCustomCursor] = useState(
    localStorage.getItem('customCursor') === 'true'
  );
  
  // Apply custom cursor
  useEffect(() => {
    if (customCursor) {
      document.body.classList.add('custom-cursor');
    } else {
      document.body.classList.remove('custom-cursor');
    }
    
    localStorage.setItem('customCursor', customCursor.toString());
  }, [customCursor]);

  return {
    customCursor,
    setCustomCursor
  };
}

/**
 * Hook for color inversion accessibility features
 */
export function useColorInversionFeatures() {
  const [invertColors, setInvertColors] = useState(
    localStorage.getItem('invertColors') === 'true'
  );
  
  // Apply color inversion
  useEffect(() => {
    if (invertColors) {
      document.body.classList.add('invert-colors');
    } else {
      document.body.classList.remove('invert-colors');
    }
    
    localStorage.setItem('invertColors', invertColors.toString());
  }, [invertColors]);

  return {
    invertColors,
    setInvertColors
  };
}

/**
 * Hook for monochrome accessibility features
 */
export function useMonochromeFeatures() {
  const [monochrome, setMonochrome] = useState(
    localStorage.getItem('monochrome') === 'true'
  );
  
  // Apply monochrome mode
  useEffect(() => {
    if (monochrome) {
      document.body.classList.add('monochrome');
    } else {
      document.body.classList.remove('monochrome');
    }
    
    localStorage.setItem('monochrome', monochrome.toString());
  }, [monochrome]);

  return {
    monochrome,
    setMonochrome
  };
}
