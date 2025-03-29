
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// Add type declaration for window.announce
declare global {
  interface Window {
    announce: (message: string, politeness?: 'polite' | 'assertive') => void;
  }
}

export function LiveAnnouncer() {
  const politeAnnouncerRef = useRef<HTMLDivElement>(null);
  const assertiveAnnouncerRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  
  // Format message based on language
  const formatAnnouncementForLang = (message: string): string => {
    const currentLang = i18n.language || 'en';
    
    // Add period at end if not present
    if (!message.endsWith('.') && !message.endsWith('!') && !message.endsWith('?')) {
      message = `${message}.`;
    }
    
    // Format message based on language
    if (currentLang.startsWith('ar')) {
      return message;
    } else if (currentLang === 'fr') {
      return message.replace(/([!?])/, ' $1');
    }
    
    return message;
  };
  
  useEffect(() => {
    // Store previous announce function if it exists
    const previousAnnounce = window.announce;
    
    // Create new announce function
    window.announce = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
      if (!message) return;
      
      const announcer = politeness === 'assertive' 
        ? assertiveAnnouncerRef.current 
        : politeAnnouncerRef.current;
        
      if (announcer) {
        try {
          // Format the message based on language
          const formattedMessage = formatAnnouncementForLang(message);
          
          // First clear the content
          announcer.textContent = '';
          
          // Using requestAnimationFrame instead of setTimeout for better performance
          requestAnimationFrame(() => {
            if (announcer) {
              announcer.textContent = formattedMessage;
            }
          });
        } catch (error) {
          console.error('Error announcing message:', error);
        }
      }
    };
    
    // Cleanup
    return () => {
      // Restore previous announce function if it existed
      if (previousAnnounce) {
        window.announce = previousAnnounce;
      } else {
        // Or provide a no-op function
        window.announce = () => {};
      }
    };
  }, [i18n.language]); // Only re-create when language changes
  
  return (
    <>
      <div 
        ref={politeAnnouncerRef} 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        lang={i18n.language}
        dir={i18n.language.startsWith('ar') ? 'rtl' : 'ltr'}
      />
      <div 
        ref={assertiveAnnouncerRef} 
        aria-live="assertive" 
        aria-atomic="true" 
        className="sr-only"
        lang={i18n.language}
        dir={i18n.language.startsWith('ar') ? 'rtl' : 'ltr'}
      />
    </>
  );
}
