
import { useCallback } from 'react';
import { useA11y } from './useA11y';

type SoundType = 'success' | 'error' | 'warning' | 'info' | 'language';

export function useA11ySound() {
  const { soundFeedback, playSound: basePlaySound } = useA11y();
  
  const playSound = useCallback((type: SoundType | string) => {
    if (!soundFeedback) return;
    
    // Convert non-standard sound types to standard ones
    let standardType: 'success' | 'error' | 'warning' | 'info';
    
    switch (type) {
      case 'success':
      case 'error':
      case 'warning':
      case 'info':
        standardType = type;
        break;
      case 'language':
        standardType = 'info';
        break;
      default:
        standardType = 'info';
    }
    
    basePlaySound(standardType);
  }, [soundFeedback, basePlaySound]);
  
  return { playSound };
}
