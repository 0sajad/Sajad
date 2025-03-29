
import React, { createContext, useContext, useState, useCallback } from 'react';

type SoundType = 'success' | 'error' | 'warning' | 'info';

interface A11yContextType {
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
  playNotificationSound: (type: SoundType) => void;
  soundFeedback: boolean;
  setSoundFeedback: (enabled: boolean) => void;
}

const A11yContext = createContext<A11yContextType | undefined>(undefined);

export const A11yProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundFeedback, setSoundFeedback] = useState(true);

  const announce = useCallback((message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    // Implementation for screen reader announcements
    const element = document.createElement('div');
    element.setAttribute('aria-live', politeness);
    element.className = 'sr-only';
    document.body.appendChild(element);
    
    // Use a timeout to ensure the DOM change is registered
    setTimeout(() => {
      element.textContent = message;
      
      // Clean up after announcement
      setTimeout(() => {
        document.body.removeChild(element);
      }, 1000);
    }, 50);
  }, []);

  const playNotificationSound = useCallback((type: SoundType) => {
    if (!soundFeedback) return;
    
    try {
      // Simulated sound playing logic
      console.log(`Playing ${type} sound`);
      // In a real implementation, this would play actual sounds
    } catch (error) {
      console.error('Error playing notification sound:', error);
    }
  }, [soundFeedback]);

  return (
    <A11yContext.Provider value={{
      announce,
      playNotificationSound,
      soundFeedback,
      setSoundFeedback
    }}>
      {children}
    </A11yContext.Provider>
  );
};

export const useA11yContext = (): A11yContextType => {
  const context = useContext(A11yContext);
  
  if (!context) {
    // Provide a default implementation if context is not available
    return {
      announce: (message) => console.log('Announcement:', message),
      playNotificationSound: (type) => console.log('Sound:', type),
      soundFeedback: true,
      setSoundFeedback: () => {}
    };
  }
  
  return context;
};
