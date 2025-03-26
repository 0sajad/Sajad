
import { useState, useEffect } from 'react';

/**
 * Hook for color-related accessibility features
 */
export function useA11yColor() {
  const [colorBlindMode, setColorBlindMode] = useState<string | null>(
    localStorage.getItem('colorBlindMode')
  );

  // Apply color blind mode
  useEffect(() => {
    // Remove all color blind modes first
    document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    
    if (colorBlindMode) {
      document.body.classList.add(colorBlindMode);
      localStorage.setItem('colorBlindMode', colorBlindMode);
    } else {
      localStorage.removeItem('colorBlindMode');
    }
  }, [colorBlindMode]);

  return {
    colorBlindMode, 
    setColorBlindMode
  };
}
