
import { useState, useEffect } from 'react';

/**
 * Hook for dyslexia-related accessibility features
 */
export function useDyslexiaFeatures() {
  const [dyslexiaFont, setDyslexiaFont] = useState(
    localStorage.getItem('dyslexiaFont') === 'true'
  );
  
  // Apply dyslexic font
  useEffect(() => {
    if (dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
    
    localStorage.setItem('dyslexiaFont', dyslexiaFont.toString());
  }, [dyslexiaFont]);

  return {
    dyslexiaFont,
    setDyslexiaFont
  };
}

/**
 * Hook for text spacing accessibility features
 */
export function useTextSpacingFeatures() {
  const [textSpacing, setTextSpacing] = useState(
    localStorage.getItem('textSpacing') === 'true'
  );
  
  // Apply text spacing
  useEffect(() => {
    if (textSpacing) {
      document.body.classList.add('text-spacing');
    } else {
      document.body.classList.remove('text-spacing');
    }
    
    localStorage.setItem('textSpacing', textSpacing.toString());
  }, [textSpacing]);

  return {
    textSpacing,
    setTextSpacing
  };
}

/**
 * Hook for link underline accessibility features
 */
export function useLinkFeatures() {
  const [underlineLinks, setUnderlineLinks] = useState(
    localStorage.getItem('underlineLinks') === 'true'
  );
  
  // Apply link underlining
  useEffect(() => {
    if (underlineLinks) {
      document.body.classList.add('underline-links');
    } else {
      document.body.classList.remove('underline-links');
    }
    
    localStorage.setItem('underlineLinks', underlineLinks.toString());
  }, [underlineLinks]);

  return {
    underlineLinks,
    setUnderlineLinks
  };
}
