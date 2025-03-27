
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

type SoundType = 'success' | 'error' | 'warning' | 'info';

export interface UseA11yReturnType {
  soundFeedback: boolean;
  setSoundFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  playSound: (soundType?: SoundType) => void;
}

export function useA11y(): UseA11yReturnType {
  const [soundFeedback, setSoundFeedback] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-sound-feedback');
    return saved !== null ? saved === 'true' : true;
  });
  
  const { toast } = useToast();

  // Function to play notification sounds for accessibility
  const playSound = (soundType: SoundType = 'info') => {
    if (!soundFeedback) return;
    
    try {
      let frequency: number;
      let duration: number;
      
      switch (soundType) {
        case 'success':
          frequency = 800;
          duration = 100;
          break;
        case 'error':
          frequency = 300;
          duration = 200;
          break;
        case 'warning':
          frequency = 500;
          duration = 150;
          break;
        case 'info':
        default:
          frequency = 650;
          duration = 80;
          break;
      }
      
      // Create audio context
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gainNode.gain.value = 0.1;
      
      oscillator.start();
      
      setTimeout(() => {
        oscillator.stop();
        audioCtx.close();
      }, duration);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  return {
    soundFeedback,
    setSoundFeedback,
    playSound
  };
}
