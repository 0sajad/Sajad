
import { A11ySettings } from '../../types/accessibility';

/**
 * Hook for handling profile activation and application
 */
export function useProfileActivation(
  setHighContrast: (value: boolean) => void,
  setLargeText: (value: boolean) => void,
  setReducedMotion: (value: boolean) => void,
  setFocusMode: (value: boolean) => void,
  setColorBlindMode: (value: string | null) => void,
  setDyslexicFont: (value: boolean) => void,
  setReadingGuide: (value: boolean) => void,
  setSoundFeedback: (value: boolean) => void
) {
  /**
   * Apply settings from a profile to the current accessibility state
   */
  const applySettings = (settings: A11ySettings): boolean => {
    if (!settings) return false;
    
    setHighContrast(settings.highContrast);
    setLargeText(settings.largeText);
    setReducedMotion(settings.reducedMotion);
    setFocusMode(settings.focusMode);
    setColorBlindMode(settings.colorBlindMode);
    setDyslexicFont(settings.dyslexicFont);
    
    // Handle optional properties that might not exist in older profiles
    if (typeof settings.readingGuide === 'boolean') {
      setReadingGuide(settings.readingGuide);
    }
    
    if (typeof settings.soundFeedback === 'boolean') {
      setSoundFeedback(settings.soundFeedback);
    }
    
    return true;
  };
  
  /**
   * Load and apply a profile by name from storage
   */
  const loadProfile = (profileName: string, getProfiles: () => Record<string, A11ySettings>): boolean => {
    const profiles = getProfiles();
    const profile = profiles[profileName];
    
    if (profile) {
      return applySettings(profile);
    }
    
    return false;
  };
  
  return {
    applySettings,
    loadProfile
  };
}
