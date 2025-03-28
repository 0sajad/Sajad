
import { useState, useEffect } from 'react';

export function useDyslexiaFeatures() {
  const [dyslexiaFont, setDyslexiaFont] = useState<boolean>(false);
  
  // Apply dyslexia font
  useEffect(() => {
    if (dyslexiaFont) {
      document.documentElement.classList.add('dyslexia-font');
    } else {
      document.documentElement.classList.remove('dyslexia-font');
    }
    
    localStorage.setItem('a11y-dyslexiaFont', String(dyslexiaFont));
  }, [dyslexiaFont]);
  
  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('a11y-dyslexiaFont');
    if (stored === 'true') setDyslexiaFont(true);
  }, []);
  
  return { dyslexiaFont, setDyslexiaFont };
}

export function useTextSpacingFeatures() {
  const [textSpacing, setTextSpacing] = useState<boolean>(false);
  
  // Apply text spacing
  useEffect(() => {
    if (textSpacing) {
      document.documentElement.classList.add('text-spacing');
    } else {
      document.documentElement.classList.remove('text-spacing');
    }
    
    localStorage.setItem('a11y-textSpacing', String(textSpacing));
  }, [textSpacing]);
  
  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('a11y-textSpacing');
    if (stored === 'true') setTextSpacing(true);
  }, []);
  
  return { textSpacing, setTextSpacing };
}

export function useLinkFeatures() {
  const [underlineLinks, setUnderlineLinks] = useState<boolean>(false);
  
  // Apply underline links
  useEffect(() => {
    if (underlineLinks) {
      document.documentElement.classList.add('underline-links');
    } else {
      document.documentElement.classList.remove('underline-links');
    }
    
    localStorage.setItem('a11y-underlineLinks', String(underlineLinks));
  }, [underlineLinks]);
  
  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('a11y-underlineLinks');
    if (stored === 'true') setUnderlineLinks(true);
  }, []);
  
  return { underlineLinks, setUnderlineLinks };
}
