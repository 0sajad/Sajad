
import { A11ySettings } from '../types/accessibility';

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
  // Save and import accessibility settings
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
    
    const profiles = JSON.parse(localStorage.getItem('a11yProfiles') || '{}');
    profiles[profileName] = profile;
    localStorage.setItem('a11yProfiles', JSON.stringify(profiles));
    
    return profileName;
  };
  
  const loadA11yProfile = (profileName: string) => {
    const profiles = JSON.parse(localStorage.getItem('a11yProfiles') || '{}');
    const profile = profiles[profileName];
    
    if (profile) {
      setHighContrast(profile.highContrast);
      setLargeText(profile.largeText);
      setReducedMotion(profile.reducedMotion);
      setFocusMode(profile.focusMode);
      setColorBlindMode(profile.colorBlindMode);
      setDyslexicFont(profile.dyslexicFont);
      setReadingGuide(profile.readingGuide);
      setSoundFeedback(profile.soundFeedback);
      
      return true;
    }
    
    return false;
  };
  
  const getA11yProfiles = () => {
    return JSON.parse(localStorage.getItem('a11yProfiles') || '{}');
  };
  
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
    
    const blob = new Blob([JSON.stringify(settings)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'a11y-settings.json';
    a.click();
    
    URL.revokeObjectURL(url);
  };
  
  const importA11ySettings = (file: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const settings: A11ySettings = JSON.parse(event.target?.result as string);
          
          setHighContrast(settings.highContrast);
          setLargeText(settings.largeText);
          setReducedMotion(settings.reducedMotion);
          setFocusMode(settings.focusMode);
          setColorBlindMode(settings.colorBlindMode);
          setDyslexicFont(settings.dyslexicFont);
          setReadingGuide(settings.readingGuide || false);
          setSoundFeedback(settings.soundFeedback || false);
          
          resolve(true);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('فشل قراءة الملف'));
      
      reader.readAsText(file);
    });
  };
  
  return {
    saveA11yProfile,
    loadA11yProfile,
    getA11yProfiles,
    exportA11ySettings,
    importA11ySettings
  };
}
