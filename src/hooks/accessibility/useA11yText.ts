
import { useState, useEffect } from 'react';

export function useA11yText() {
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(false);
  const [readingGuide, setReadingGuide] = useState<boolean>(false);
  
  // Apply dyslexic font
  useEffect(() => {
    if (dyslexicFont) {
      document.documentElement.classList.add('dyslexic-font');
    } else {
      document.documentElement.classList.remove('dyslexic-font');
    }
    
    // Store the preference in localStorage
    localStorage.setItem('a11y-dyslexicFont', String(dyslexicFont));
  }, [dyslexicFont]);
  
  // Apply reading guide
  useEffect(() => {
    if (readingGuide) {
      document.documentElement.classList.add('reading-guide');
    } else {
      document.documentElement.classList.remove('reading-guide');
    }
    
    // Store the preference in localStorage
    localStorage.setItem('a11y-readingGuide', String(readingGuide));
  }, [readingGuide]);
  
  // Load preferences from localStorage on mount
  useEffect(() => {
    const storedDyslexicFont = localStorage.getItem('a11y-dyslexicFont');
    const storedReadingGuide = localStorage.getItem('a11y-readingGuide');
    
    if (storedDyslexicFont === 'true') setDyslexicFont(true);
    if (storedReadingGuide === 'true') setReadingGuide(true);
  }, []);
  
  return {
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide
  };
}
