
import { useCallback } from 'react';
import { useA11yPreferences } from './useA11yPreferences';

type SoundType = 'success' | 'error' | 'warning' | 'info' | 'language';

export function useA11ySound() {
  const { soundFeedback, setSoundFeedback } = useA11yPreferences();
  
  // Function to play sound based on type
  const playSound = useCallback((type: SoundType) => {
    if (!soundFeedback) return;
    
    // Create an audio context
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create an oscillator
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connect the nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Set sound parameters based on type
    switch (type) {
      case 'success':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(587.33, audioContext.currentTime); // D5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
        
      case 'error':
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(196.00, audioContext.currentTime); // G3
        oscillator.frequency.setValueAtTime(185.00, audioContext.currentTime + 0.1); // F#3
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
        
      case 'warning':
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(220.00, audioContext.currentTime); // A3
        oscillator.frequency.setValueAtTime(220.00, audioContext.currentTime + 0.2); // A3
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
        break;
        
      case 'info':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(261.63, audioContext.currentTime); // C4
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
        break;
        
      case 'language':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(349.23, audioContext.currentTime); // F4
        oscillator.frequency.setValueAtTime(392.00, audioContext.currentTime + 0.15); // G4
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.4);
        break;
    }
    
    // Clean up
    return () => {
      oscillator.stop();
      audioContext.close();
    };
  }, [soundFeedback]);
  
  return { playSound };
}
