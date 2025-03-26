
import { A11ySettings } from '../types/accessibility';
import { useProfileStorage } from './profiles/useProfileStorage';
import { useProfileImportExport } from './profiles/useProfileImportExport';
import { useProfileActivation } from './profiles/useProfileActivation';

/**
 * Functions to manage accessibility profiles
 */
export function useA11yProfiles(
  highContrast: boolean,
  largeText: boolean,
  reducedMotion: boolean,
  focusMode: boolean,
  colorBlindMode: string | null,
  dyslexicFont: boolean,
  readingGuide: boolean,
  soundFeedback: boolean,
  setHighContrast: (value: boolean) => void,
  setLargeText: (value: boolean) => void,
  setReducedMotion: (value: boolean) => void,
  setFocusMode: (value: boolean) => void,
  setColorBlindMode: (value: string | null) => void,
  setDyslexicFont: (value: boolean) => void,
  setReadingGuide: (value: boolean) => void,
  setSoundFeedback: (value: boolean) => void
) {
  // Storage operations
  const { saveProfile, getProfiles, deleteProfile } = useProfileStorage();
  
  // Import/Export operations
  const { exportSettings, importSettings } = useProfileImportExport();
  
  // Profile activation
  const { loadProfile } = useProfileActivation(
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setFocusMode,
    setColorBlindMode,
    setDyslexicFont,
    setReadingGuide,
    setSoundFeedback
  );
  
  // Save current settings as a profile
  const saveA11yProfile = (profileName: string) => {
    const profile: A11ySettings = {
      highContrast,
      largeText,
      reducedMotion,
      focusMode,
      colorBlindMode,
      dyslexicFont,
      readingGuide,
      soundFeedback
    };
    
    return saveProfile(profileName, profile);
  };
  
  // Load a profile by name
  const loadA11yProfile = (profileName: string) => {
    return loadProfile(profileName, getProfiles);
  };
  
  // Get all saved profiles
  const getA11yProfiles = () => {
    return getProfiles();
  };
  
  // Export current settings
  const exportA11ySettings = () => {
    const settings: A11ySettings = {
      highContrast,
      largeText,
      reducedMotion,
      focusMode,
      colorBlindMode,
      dyslexicFont,
      readingGuide,
      soundFeedback
    };
    
    exportSettings(settings);
  };
  
  // Import settings from a file
  const importA11ySettings = async (file: File): Promise<boolean> => {
    try {
      const settings = await importSettings(file);
      
      setHighContrast(settings.highContrast);
      setLargeText(settings.largeText);
      setReducedMotion(settings.reducedMotion);
      setFocusMode(settings.focusMode);
      setColorBlindMode(settings.colorBlindMode);
      setDyslexicFont(settings.dyslexicFont);
      setReadingGuide(settings.readingGuide || false);
      setSoundFeedback(settings.soundFeedback || false);
      
      return true;
    } catch (error) {
      console.error('Failed to import settings:', error);
      return false;
    }
  };
  
  return {
    saveA11yProfile,
    loadA11yProfile,
    getA11yProfiles,
    exportA11ySettings,
    importA11ySettings
  };
}
