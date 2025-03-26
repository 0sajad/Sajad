
import { useState } from 'react';
import { TFunction } from 'i18next';

export interface A11yProfile {
  id: string;
  name: string;
  settings: any;
}

export function useA11yProfileStorage() {
  const [profiles, setProfiles] = useState<A11yProfile[]>([]);
  
  // Load profiles from localStorage
  const loadProfiles = (t: TFunction) => {
    const savedProfiles = localStorage.getItem('a11y-profiles');
    if (savedProfiles) {
      try {
        const parsedProfiles = JSON.parse(savedProfiles);
        setProfiles(parsedProfiles);
      } catch (error) {
        console.error('Failed to parse saved accessibility profiles', error);
      }
    } else {
      // Create default profile if no profiles are saved
      const defaultProfile: A11yProfile = {
        id: 'default',
        name: t('accessibility.defaultProfileName', 'Default Profile'),
        settings: {
          highContrast: false,
          largeText: false,
          reducedMotion: false,
          focusMode: false,
          colorBlindMode: null,
          dyslexicFont: false,
          readingGuide: false,
          soundFeedback: false
        }
      };
      
      setProfiles([defaultProfile]);
      localStorage.setItem('a11y-profiles', JSON.stringify([defaultProfile]));
    }
  };
  
  // Save profiles to localStorage
  const saveProfiles = (profilesData: A11yProfile[]) => {
    localStorage.setItem('a11y-profiles', JSON.stringify(profilesData));
  };
  
  return { 
    profiles, 
    setProfiles,
    loadProfiles,
    saveProfiles
  };
}
