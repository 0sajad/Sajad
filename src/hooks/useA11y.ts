
import { useState, useEffect } from 'react';
import { useDyslexiaFeatures, useTextSpacingFeatures, useLinkFeatures } from './accessibility/useA11yFeatures';
import { useA11yCore } from './accessibility/useA11yCore';
import { useA11yText } from './accessibility/useA11yText';
import { useA11yColor } from './accessibility/useA11yColor';
import { useCursorFeatures, useColorInversionFeatures, useMonochromeFeatures } from './accessibility/useA11yVisualEffects';

/**
 * Hook to manage all accessibility features
 */
export function useA11y() {
  // Core accessibility features
  const {
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode
  } = useA11yCore();
  
  // Text-related features
  const {
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide
  } = useA11yText();
  
  // Color-related features
  const { colorBlindMode, setColorBlindMode } = useA11yColor();
  
  // Visual effects features
  const { customCursor, setCustomCursor } = useCursorFeatures();
  const { invertColors, setInvertColors } = useColorInversionFeatures();
  const { monochrome, setMonochrome } = useMonochromeFeatures();
  
  // Text spacing & link features
  const { dyslexiaFont, setDyslexiaFont } = useDyslexiaFeatures();
  const { textSpacing, setTextSpacing } = useTextSpacingFeatures();
  const { underlineLinks, setUnderlineLinks } = useLinkFeatures();
  
  // Add sound feedback state
  const [soundFeedback, setSoundFeedback] = useState<boolean>(false);
  
  // Add keyboard navigation state
  const [keyboardNavigationVisible, setKeyboardNavigationVisible] = useState<boolean>(false);
  
  // Screen reader announcement function
  const announce = (message: string, politeness: "polite" | "assertive" = "polite") => {
    if (typeof window !== 'undefined' && window.announce) {
      window.announce(message, politeness);
    } else {
      console.log(`Screen reader announcement (${politeness}): ${message}`);
    }
  };
  
  // Function to play notification sounds
  const playNotificationSound = (type: "success" | "error" | "warning" | "info" | "notification" = "notification") => {
    if (!soundFeedback) return;
    
    try {
      const soundMap = {
        success: '/sounds/success.mp3',
        error: '/sounds/error.mp3',
        warning: '/sounds/warning.mp3',
        info: '/sounds/info.mp3',
        notification: '/sounds/notification.mp3'
      };
      
      const audio = new Audio(soundMap[type] || soundMap.notification);
      audio.volume = 0.2;
      audio.play().catch(err => console.error('Error playing sound:', err));
    } catch (error) {
      console.error('Error playing notification sound:', error);
    }
  };
  
  return {
    // Core features
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    
    // Text features
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide,
    
    // Color features
    colorBlindMode, setColorBlindMode,
    
    // Visual effects
    customCursor, setCustomCursor,
    invertColors, setInvertColors,
    monochrome, setMonochrome,
    
    // Text formatting
    dyslexiaFont, setDyslexiaFont,
    textSpacing, setTextSpacing,
    underlineLinks, setUnderlineLinks,
    
    // Sound feedback
    soundFeedback, setSoundFeedback,
    
    // Keyboard navigation
    keyboardNavigationVisible, setKeyboardNavigationVisible,
    
    // Helper functions
    announce,
    playNotificationSound
  };
}
