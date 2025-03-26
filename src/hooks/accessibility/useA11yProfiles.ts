
import { useState, useEffect } from 'react';
import { AccessibilityProfile } from '../types/accessibility';

/**
 * Hook for managing accessibility profiles
 */
export function useAccessibilityProfiles() {
  const [savedProfiles, setSavedProfiles] = useState<AccessibilityProfile[]>([]);
  
  // Load saved profiles
  useEffect(() => {
    const savedProfilesJson = localStorage.getItem('a11yProfiles');
    if (savedProfilesJson) {
      try {
        const profiles = JSON.parse(savedProfilesJson);
        setSavedProfiles(profiles);
      } catch (error) {
        console.error('Failed to parse saved accessibility profiles:', error);
      }
    }
  }, []);
  
  // Save a profile
  const saveProfile = (name: string, profileData: Omit<AccessibilityProfile, 'name'>) => {
    const newProfile: AccessibilityProfile = {
      name,
      ...profileData
    };
    
    const updatedProfiles = [...savedProfiles.filter(p => p.name !== name), newProfile];
    setSavedProfiles(updatedProfiles);
    localStorage.setItem('a11yProfiles', JSON.stringify(updatedProfiles));
    
    return newProfile;
  };
  
  // Delete a profile
  const deleteProfile = (name: string) => {
    const updatedProfiles = savedProfiles.filter(p => p.name !== name);
    setSavedProfiles(updatedProfiles);
    localStorage.setItem('a11yProfiles', JSON.stringify(updatedProfiles));
  };
  
  return {
    savedProfiles,
    saveProfile,
    deleteProfile
  };
}
