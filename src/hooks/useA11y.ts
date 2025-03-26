
import { useA11yCore } from './accessibility/useA11yCore';
import { useA11yColor } from './accessibility/useA11yColor';
import { useA11yText } from './accessibility/useA11yText';
import { useA11ySound } from './accessibility/useA11ySound';
import { useSystemPreferences } from './accessibility/useA11yPreferences';
import { useA11yKeyboard } from './accessibility/useA11yKeyboard';
import { useA11yProfiles } from './accessibility/useA11yProfiles';

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
  const { soundFeedback, setSoundFeedback } = useA11ySound();
  
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
  
  // Profile management functions
  const {
    saveA11yProfile,
    loadA11yProfile,
    getA11yProfiles,
    exportA11ySettings,
    importA11ySettings
  } = useA11yProfiles(
    highContrast, largeText, reducedMotion, focusMode,
    colorBlindMode, dyslexicFont, readingGuide, soundFeedback,
    setHighContrast, setLargeText, setReducedMotion, setFocusMode,
    setColorBlindMode, setDyslexicFont, setReadingGuide, setSoundFeedback
  );

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
    
    // Profile management functions
    saveA11yProfile,
    loadA11yProfile,
    getA11yProfiles,
    exportA11ySettings,
    importA11ySettings
  };
}
