
import React, { useEffect, useRef } from 'react';

export function LiveAnnouncer() {
  const politeAnnouncerRef = useRef<HTMLDivElement>(null);
  const assertiveAnnouncerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Add the announce function to the window object
    window.announce = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
      const announcer = politeness === 'assertive' 
        ? assertiveAnnouncerRef.current 
        : politeAnnouncerRef.current;
        
      if (announcer) {
        // Create a new element for the announcement
        const oldText = announcer.textContent;
        
        // Only announce if the message is different
        if (oldText !== message) {
          // Set the text content to empty first to force screen readers
          // to recognize the change even if the text is the same
          announcer.textContent = '';
          
          // Use setTimeout to ensure screen readers catch the change
          setTimeout(() => {
            if (announcer) {
              announcer.textContent = message;
            }
          }, 10);
        }
      }
    };
    
    // Clean up
    return () => {
      // @ts-ignore - Remove the announce function from the window object
      if (window.announce && typeof window.announce === 'function') {
        window.announce = () => {};
      }
    };
  }, []);
  
  return (
    <>
      <div 
        ref={politeAnnouncerRef} 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      />
      <div 
        ref={assertiveAnnouncerRef} 
        aria-live="assertive" 
        aria-atomic="true" 
        className="sr-only"
      />
    </>
  );
}
