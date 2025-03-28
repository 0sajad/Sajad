
import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

type SoundType = 'success' | 'error' | 'warning' | 'info';

export interface UseA11yReturnType {
  soundFeedback: boolean;
  setSoundFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  playSound: (soundType?: SoundType) => void;
  highContrast: boolean;
  setHighContrast: React.Dispatch<React.SetStateAction<boolean>>;
  largeText: boolean;
  setLargeText: React.Dispatch<React.SetStateAction<boolean>>;
  reducedMotion: boolean;
  setReducedMotion: React.Dispatch<React.SetStateAction<boolean>>;
  focusMode: boolean;
  setFocusMode: React.Dispatch<React.SetStateAction<boolean>>;
  colorBlindMode: string;
  setColorBlindMode: React.Dispatch<React.SetStateAction<string>>;
  dyslexicFont: boolean;
  setDyslexicFont: React.Dispatch<React.SetStateAction<boolean>>;
  readingGuide: boolean;
  setReadingGuide: React.Dispatch<React.SetStateAction<boolean>>;
  announce: (message: string) => void;
}

export function useA11y(): UseA11yReturnType {
  // Sound feedback
  const [soundFeedback, setSoundFeedback] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-sound-feedback');
    return saved !== null ? saved === 'true' : true;
  });
  
  // High contrast
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-high-contrast');
    return saved !== null ? saved === 'true' : false;
  });
  
  // Large text
  const [largeText, setLargeText] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-large-text');
    return saved !== null ? saved === 'true' : false;
  });
  
  // Reduced motion
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-reduced-motion');
    return saved !== null ? saved === 'true' : false;
  });
  
  // Focus mode
  const [focusMode, setFocusMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-focus-mode');
    return saved !== null ? saved === 'true' : false;
  });
  
  // Color blind mode
  const [colorBlindMode, setColorBlindMode] = useState<string>(() => {
    const saved = localStorage.getItem('a11y-color-blind-mode');
    return saved !== null ? saved : 'none';
  });
  
  // Dyslexic font
  const [dyslexicFont, setDyslexicFont] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-dyslexic-font');
    return saved !== null ? saved === 'true' : false;
  });
  
  // Reading guide
  const [readingGuide, setReadingGuide] = useState<boolean>(() => {
    const saved = localStorage.getItem('a11y-reading-guide');
    return saved !== null ? saved === 'true' : false;
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

  // Function to announce messages for screen readers
  const announce = useCallback((message: string) => {
    // Create or get the live region
    let liveRegion = document.getElementById('a11y-announcer');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'a11y-announcer';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      document.body.appendChild(liveRegion);
    }
    
    // Set the message
    liveRegion.textContent = '';
    setTimeout(() => {
      liveRegion.textContent = message;
    }, 100);
    
    // Play a sound if sound feedback is enabled
    playSound('info');
  }, [soundFeedback]);

  return {
    soundFeedback,
    setSoundFeedback,
    playSound,
    highContrast,
    setHighContrast,
    largeText,
    setLargeText,
    reducedMotion,
    setReducedMotion,
    focusMode,
    setFocusMode,
    colorBlindMode,
    setColorBlindMode,
    dyslexicFont,
    setDyslexicFont,
    readingGuide,
    setReadingGuide,
    announce
  };
}
