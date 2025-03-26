
import { useA11yCore } from './accessibility/useA11yCore';
import { useA11yColor } from './accessibility/useA11yColor';
import { useA11yText } from './accessibility/useA11yText';
import { useA11ySound } from './accessibility/useA11ySound';
import { useSystemPreferences } from './accessibility/useA11yPreferences';
import { useA11yKeyboard } from './accessibility/useA11yKeyboard';
import { useA11yProfiles } from './useA11yProfiles';
import { A11ySettings } from './types/accessibility';

/**
 * هوك مساعد لتحسين إمكانية الوصول في التطبيق
 */
export function useA11y() {
  // Core accessibility settings
  const {
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode
  } = useA11yCore();
  
  // Color-related accessibility settings
  const { colorBlindMode, setColorBlindMode } = useA11yColor();
  
  // Text-related accessibility settings
  const { 
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide
  } = useA11yText();
  
  // Sound-related accessibility settings
  const { soundFeedback, setSoundFeedback, playNotificationSound } = useA11ySound();
  
  // Monitor system preferences
  useSystemPreferences(setReducedMotion);
  
  // Setup keyboard shortcuts
  useA11yKeyboard(
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide
  );
  
  // Get current settings
  const getCurrentSettings = (): A11ySettings => {
    return {
      highContrast,
      largeText, 
      reducedMotion, 
      focusMode,
      colorBlindMode, 
      dyslexicFont, 
      readingGuide, 
      soundFeedback
    };
  };
  
  // Apply settings
  const applySettings = (settings: A11ySettings) => {
    if (settings.highContrast !== undefined) setHighContrast(settings.highContrast);
    if (settings.largeText !== undefined) setLargeText(settings.largeText);
    if (settings.reducedMotion !== undefined) setReducedMotion(settings.reducedMotion);
    if (settings.focusMode !== undefined) setFocusMode(settings.focusMode);
    if (settings.colorBlindMode !== undefined) setColorBlindMode(settings.colorBlindMode);
    if (settings.dyslexicFont !== undefined) setDyslexicFont(settings.dyslexicFont);
    if (settings.readingGuide !== undefined) setReadingGuide(settings.readingGuide);
    if (settings.soundFeedback !== undefined) setSoundFeedback(settings.soundFeedback);
  };
  
  // Profile management functions
  const profileManager = useA11yProfiles(getCurrentSettings(), applySettings);

  // Function to announce messages to screen readers
  const announce = (message: string, level: "polite" | "assertive" = "polite") => {
    if (typeof window !== 'undefined' && window.announce) {
      window.announce(message, level);
    }
  };

  return {
    // Current settings
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    colorBlindMode, setColorBlindMode,
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide,
    soundFeedback, setSoundFeedback,
    playNotificationSound,
    
    // Add announce function
    announce,
    
    // Profile management functions
    saveA11yProfile: profileManager.saveCurrentSettings,
    loadA11yProfile: profileManager.applyProfile,
    getA11yProfiles: () => profileManager.profiles,
    exportA11ySettings: profileManager.exportProfile,
    importA11ySettings: profileManager.importProfile
  };
}
