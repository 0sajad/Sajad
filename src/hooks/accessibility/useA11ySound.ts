
import { useState, useCallback } from 'react';

type SoundType = 'notification' | 'error' | 'success' | 'warning' | 'click' | 'hover' | 'language';

interface UseA11ySoundReturn {
  soundFeedback: boolean;
  setSoundFeedback: (enabled: boolean) => void;
  playSound: (sound: SoundType) => void;
  playNotificationSound: (type: SoundType) => void;
}

export function useA11ySound(): UseA11ySoundReturn {
  const [soundFeedback, setSoundFeedback] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-sound-feedback');
    return saved !== null ? saved === 'true' : true;
  });
  
  // Save to localStorage when changed
  const setSoundFeedbackWithStorage = useCallback((enabled: boolean) => {
    setSoundFeedback(enabled);
    localStorage.setItem('a11y-sound-feedback', String(enabled));
  }, []);
  
  const playSound = useCallback((sound: SoundType) => {
    if (!soundFeedback) return;
    
    let audioSrc = '';
    
    switch (sound) {
      case 'notification':
        audioSrc = '/sounds/notification.mp3';
        break;
      case 'error':
        audioSrc = '/sounds/error.mp3';
        break;
      case 'success':
        audioSrc = '/sounds/success.mp3';
        break;
      case 'warning':
        audioSrc = '/sounds/warning.mp3';
        break;
      case 'click':
        audioSrc = '/sounds/click.mp3';
        break;
      case 'hover':
        audioSrc = '/sounds/hover.mp3';
        break;
      case 'language':
        audioSrc = '/sounds/language.mp3';
        break;
      default:
        audioSrc = '/sounds/notification.mp3';
    }
    
    // Check if we have already played this sound in the last 500ms
    const now = new Date().getTime();
    const lastPlayedTime = parseInt(sessionStorage.getItem(`last-sound-${sound}`) || '0');
    
    if (now - lastPlayedTime < 500) {
      return; // Don't play again too soon
    }
    
    sessionStorage.setItem(`last-sound-${sound}`, now.toString());
    
    try {
      const audio = new Audio(audioSrc);
      audio.volume = sound === 'hover' ? 0.2 : 0.5; // Lower volume for hover
      audio.play().catch((e) => {
        console.error('Failed to play sound:', e);
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, [soundFeedback]);
  
  // For backward compatibility
  const playNotificationSound = useCallback((type: SoundType = 'notification') => {
    playSound(type);
  }, [playSound]);
  
  return {
    soundFeedback,
    setSoundFeedback: setSoundFeedbackWithStorage,
    playSound,
    playNotificationSound
  };
}
