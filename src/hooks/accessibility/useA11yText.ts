
import { useState, useEffect } from 'react';

/**
 * Hook for text-related accessibility features
 */
export function useA11yText() {
  const [dyslexicFont, setDyslexicFont] = useState(
    localStorage.getItem('dyslexicFont') === 'true'
  );
  
  const [readingGuide, setReadingGuide] = useState(
    localStorage.getItem('readingGuide') === 'true'
  );

  // Apply dyslexic font helper
  useEffect(() => {
    if (dyslexicFont) {
      document.body.classList.add('dyslexic-font');
    } else {
      document.body.classList.remove('dyslexic-font');
    }
    
    localStorage.setItem('dyslexicFont', dyslexicFont.toString());
  }, [dyslexicFont]);
  
  // Apply reading guide
  useEffect(() => {
    if (readingGuide) {
      document.body.classList.add('reading-guide');
      
      // Create reading guide if it doesn't exist
      if (!document.getElementById('reading-guide-element')) {
        const guide = document.createElement('div');
        guide.id = 'reading-guide-element';
        guide.className = 'reading-guide-element';
        document.body.appendChild(guide);
        
        // Track mouse cursor to move reading guide
        const handleMouseMove = (e: MouseEvent) => {
          guide.style.top = `${e.clientY}px`;
        };
        
        document.addEventListener('mousemove', handleMouseMove);
      }
    } else {
      document.body.classList.remove('reading-guide');
      
      // Remove reading guide
      const guide = document.getElementById('reading-guide-element');
      if (guide) {
        document.body.removeChild(guide);
        document.removeEventListener('mousemove', () => {});
      }
    }
    
    localStorage.setItem('readingGuide', readingGuide.toString());
  }, [readingGuide]);

  return {
    dyslexicFont,
    setDyslexicFont,
    readingGuide,
    setReadingGuide
  };
}
