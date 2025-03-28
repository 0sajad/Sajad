
import React, { useEffect } from 'react';

export function KeyboardFocusDetector() {
  useEffect(() => {
    // This function adds the 'keyboard-focus' class to the document
    // when a user presses Tab, indicating keyboard navigation.
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-focus');
        
        // Remove the event listener after first tab
        window.removeEventListener('keydown', handleFirstTab);
        
        // Add a new listener to track mouse clicks
        window.addEventListener('mousedown', handleMouseDown);
      }
    };
    
    // This function removes the 'keyboard-focus' class when
    // the user clicks with the mouse, indicating mouse navigation.
    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-focus');
      
      // Remove mouse listener and re-add keyboard listener
      window.removeEventListener('mousedown', handleMouseDown);
      window.addEventListener('keydown', handleFirstTab);
    };
    
    // Set up the initial keyboard event listener
    window.addEventListener('keydown', handleFirstTab);
    
    // Clean up event listeners on component unmount
    return () => {
      window.removeEventListener('keydown', handleFirstTab);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
  
  return null; // This component doesn't render anything
}
