
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useA11yCore } from './accessibility/useA11yCore';
import { useA11yColor } from './accessibility/useA11yColor';
import { useA11yText } from './accessibility/useA11yText';
import { useA11yKeyboard } from './accessibility/useA11yKeyboard';
import { useSystemPreferences } from './accessibility/useA11yPreferences';

type SoundType = 'success' | 'error' | 'warning' | 'info';

export interface UseA11yReturnType {
  // Core accessibility features
  highContrast: boolean;
  setHighContrast: React.Dispatch<React.SetStateAction<boolean>>;
  largeText: boolean;
  setLargeText: React.Dispatch<React.SetStateAction<boolean>>;
  reducedMotion: boolean;
  setReducedMotion: React.Dispatch<React.SetStateAction<boolean>>;
  focusMode: boolean;
  setFocusMode: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Color features
  colorBlindMode: string | null;
  setColorBlindMode: (mode: string | null) => void;
  
  // Text features
  dyslexicFont: boolean;
  setDyslexicFont: React.Dispatch<React.SetStateAction<boolean>>;
  readingGuide: boolean;
  setReadingGuide: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Sound features
  soundFeedback: boolean;
  setSoundFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  playSound: (soundType?: SoundType) => void;
  
  // Announcement functionality
  announce: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
}

export function useA11y(): UseA11yReturnType {
  // Core accessibility features
  const {
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode
  } = useA11yCore();
  
  // Color features
  const { colorBlindMode, setColorBlindMode } = useA11yColor();
  
  // Text features
  const { dyslexicFont, setDyslexicFont, readingGuide, setReadingGuide } = useA11yText();
  
  // Monitor system preferences for accessibility
  useSystemPreferences(setReducedMotion);
  
  // Set up keyboard shortcuts for accessibility features
  useA11yKeyboard(
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide
  );
  
  // Sound feedback
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
  
  // Function to announce messages to screen readers
  const announce = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    try {
      if (soundFeedback) {
        playSound(type as SoundType);
      }
      
      // Check if window.announce is available (global helper)
      if (typeof window !== 'undefined' && window.announce) {
        window.announce(message);
        return;
      }
      
      // Create an announcement element if one doesn't exist
      const announcementId = 'a11y-announcer';
      let announcer = document.getElementById(announcementId);
      
      if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = announcementId;
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
      }
      
      // Update the content to trigger screen reader announcement
      announcer.textContent = message;
      
      // Clear after a delay to prevent repeated announcements
      setTimeout(() => {
        if (announcer && document.body.contains(announcer)) {
          announcer.textContent = '';
        }
      }, 3000);
    } catch (error) {
      console.error('Error announcing message:', error);
    }
  };

  // Persist sound feedback setting
  useEffect(() => {
    localStorage.setItem('a11y-sound-feedback', soundFeedback.toString());
  }, [soundFeedback]);

  return {
    // Core accessibility features
    highContrast,
    setHighContrast,
    largeText,
    setLargeText,
    reducedMotion,
    setReducedMotion,
    focusMode,
    setFocusMode,
    
    // Color features
    colorBlindMode,
    setColorBlindMode,
    
    // Text features
    dyslexicFont,
    setDyslexicFont,
    readingGuide,
    setReadingGuide,
    
    // Sound features
    soundFeedback,
    setSoundFeedback,
    playSound,
    
    // Announcement functionality
    announce
  };
}

// Augment Window interface to add announce function
declare global {
  interface Window {
    announce?: (message: string, priority?: 'polite' | 'assertive') => void;
  }
}
