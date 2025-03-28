
import React, { useEffect, useRef } from 'react';
import { useA11y } from '@/hooks/useA11y';

export function ReadingGuide() {
  const { readingGuide } = useA11y();
  const guideRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!readingGuide) return;
    
    // Create guide element if it doesn't exist
    if (!guideRef.current) {
      const guide = document.createElement('div');
      guide.className = 'reading-guide-cursor';
      document.body.appendChild(guide);
      guideRef.current = guide;
    }
    
    // Track mouse movement to position the guide
    const handleMouseMove = (e: MouseEvent) => {
      if (guideRef.current) {
        guideRef.current.style.top = `${e.clientY - 20}px`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Remove the guide element when component unmounts
      if (guideRef.current && document.body.contains(guideRef.current)) {
        document.body.removeChild(guideRef.current);
      }
    };
  }, [readingGuide]);
  
  return null; // This component doesn't render visible content
}
