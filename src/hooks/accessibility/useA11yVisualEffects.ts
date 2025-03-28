
import { useState, useEffect } from 'react';

export function useCursorFeatures() {
  const [customCursor, setCustomCursor] = useState<boolean>(false);
  
  // Apply custom cursor
  useEffect(() => {
    if (customCursor) {
      document.documentElement.classList.add('custom-cursor');
    } else {
      document.documentElement.classList.remove('custom-cursor');
    }
    
    localStorage.setItem('a11y-customCursor', String(customCursor));
  }, [customCursor]);
  
  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('a11y-customCursor');
    if (stored === 'true') setCustomCursor(true);
  }, []);
  
  return { customCursor, setCustomCursor };
}

export function useColorInversionFeatures() {
  const [invertColors, setInvertColors] = useState<boolean>(false);
  
  // Apply color inversion
  useEffect(() => {
    if (invertColors) {
      document.documentElement.classList.add('invert-colors');
    } else {
      document.documentElement.classList.remove('invert-colors');
    }
    
    localStorage.setItem('a11y-invertColors', String(invertColors));
  }, [invertColors]);
  
  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('a11y-invertColors');
    if (stored === 'true') setInvertColors(true);
  }, []);
  
  return { invertColors, setInvertColors };
}

export function useMonochromeFeatures() {
  const [monochrome, setMonochrome] = useState<boolean>(false);
  
  // Apply monochrome mode
  useEffect(() => {
    if (monochrome) {
      document.documentElement.classList.add('monochrome');
    } else {
      document.documentElement.classList.remove('monochrome');
    }
    
    localStorage.setItem('a11y-monochrome', String(monochrome));
  }, [monochrome]);
  
  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('a11y-monochrome');
    if (stored === 'true') setMonochrome(true);
  }, []);
  
  return { monochrome, setMonochrome };
}
