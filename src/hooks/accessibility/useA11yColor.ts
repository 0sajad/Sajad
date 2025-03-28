
import { useState, useEffect } from 'react';

type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

export function useA11yColor() {
  const [colorBlindMode, setColorBlindMode] = useState<ColorBlindMode>('none');
  
  // Apply color blind mode
  useEffect(() => {
    // Remove any existing color blind classes
    document.documentElement.classList.remove(
      'protanopia', 
      'deuteranopia', 
      'tritanopia', 
      'achromatopsia'
    );
    
    // Add the new class if not 'none'
    if (colorBlindMode !== 'none') {
      document.documentElement.classList.add(colorBlindMode);
    }
    
    // Store the preference in localStorage
    localStorage.setItem('a11y-colorBlindMode', colorBlindMode);
  }, [colorBlindMode]);
  
  // Load preference from localStorage on mount
  useEffect(() => {
    const storedColorBlindMode = localStorage.getItem('a11y-colorBlindMode') as ColorBlindMode;
    
    if (storedColorBlindMode && storedColorBlindMode !== 'none') {
      setColorBlindMode(storedColorBlindMode);
    }
  }, []);
  
  return { colorBlindMode, setColorBlindMode };
}
