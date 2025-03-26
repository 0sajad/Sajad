
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/use-toast';
import { A11ySettings } from './types/accessibility';

interface A11yProfile {
  id: string;
  name: string;
  settings: A11ySettings;
}

// This hook manages accessibility profiles without depending on useA11y
export function useA11yProfiles(
  currentSettings?: A11ySettings,
  applySettings?: (settings: A11ySettings) => void
) {
  const { t } = useTranslation();
  
  const [profiles, setProfiles] = useState<A11yProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<string | null>(null);
  
  // Load saved profiles
  useEffect(() => {
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
    
    // Check for active profile
    const savedActiveProfile = localStorage.getItem('a11y-active-profile');
    if (savedActiveProfile) {
      setActiveProfile(savedActiveProfile);
    }
  }, [t]);
  
  // Save current settings as a profile
  const saveCurrentSettings = (name: string) => {
    if (!currentSettings) {
      console.error('No current settings provided to saveCurrentSettings');
      return '';
    }
    
    const id = Date.now().toString();
    const newProfile: A11yProfile = {
      id,
      name,
      settings: { ...currentSettings }
    };
    
    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem('a11y-profiles', JSON.stringify(updatedProfiles));
    
    setActiveProfile(id);
    localStorage.setItem('a11y-active-profile', id);
    
    toast({
      title: t('accessibility.profileSaved', 'Profile saved successfully'),
      description: name
    });
    
    return id;
  };
  
  // Apply a profile
  const applyProfile = (profileId: string) => {
    const profileToApply = profiles.find(profile => profile.id === profileId);
    
    if (profileToApply && applySettings) {
      applySettings(profileToApply.settings);
      
      setActiveProfile(profileId);
      localStorage.setItem('a11y-active-profile', profileId);
      
      toast({
        title: t('accessibility.profileLoaded', 'Profile loaded successfully'),
        description: profileToApply.name
      });
    }
  };
  
  // Delete a profile
  const deleteProfile = (profileId: string) => {
    if (profileId === 'default') {
      // Cannot delete default profile
      return false;
    }
    
    const updatedProfiles = profiles.filter(profile => profile.id !== profileId);
    setProfiles(updatedProfiles);
    localStorage.setItem('a11y-profiles', JSON.stringify(updatedProfiles));
    
    // If deleted profile was active, set default as active
    if (activeProfile === profileId) {
      setActiveProfile('default');
      localStorage.setItem('a11y-active-profile', 'default');
      
      // Apply default settings
      const defaultProfile = updatedProfiles.find(profile => profile.id === 'default');
      if (defaultProfile && applySettings) {
        applySettings(defaultProfile.settings);
      }
    }
    
    toast({
      title: t('accessibility.profileDeleted', 'Profile deleted successfully')
    });
    
    return true;
  };
  
  // Export a profile
  const exportProfile = (profileId: string) => {
    const profileToExport = profiles.find(profile => profile.id === profileId);
    
    if (profileToExport) {
      const dataStr = JSON.stringify(profileToExport, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `a11y-profile-${profileToExport.name.toLowerCase().replace(/\s+/g, '-')}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: t('accessibility.profileExported', 'Profile exported successfully')
      });
      
      return true;
    }
    
    return false;
  };
  
  // Import a profile
  const importProfile = (jsonData: string) => {
    try {
      const importedProfile = JSON.parse(jsonData) as A11yProfile;
      
      // Validate imported profile
      if (!importedProfile.id || !importedProfile.settings) {
        throw new Error('Invalid profile format');
      }
      
      // Modify ID to avoid conflicts
      importedProfile.id = Date.now().toString();
      
      // Add imported profile to list
      const updatedProfiles = [...profiles, importedProfile];
      setProfiles(updatedProfiles);
      localStorage.setItem('a11y-profiles', JSON.stringify(updatedProfiles));
      
      toast({
        title: t('accessibility.profileImported', 'Profile imported successfully'),
        description: importedProfile.name
      });
      
      return importedProfile.id;
    } catch (error) {
      console.error('Failed to import accessibility profile', error);
      
      toast({
        title: t('error', 'Error'),
        description: t('accessibility.invalidProfileFormat', 'Invalid profile format'),
        variant: 'destructive'
      });
      
      return null;
    }
  };
  
  // Reset to defaults
  const resetToDefaults = () => {
    if (applySettings) {
      const defaultSettings: A11ySettings = {
        highContrast: false,
        largeText: false,
        reducedMotion: false,
        focusMode: false,
        colorBlindMode: null,
        dyslexicFont: false,
        readingGuide: false,
        soundFeedback: false
      };
      
      applySettings(defaultSettings);
      
      setActiveProfile('default');
      localStorage.setItem('a11y-active-profile', 'default');
      
      toast({
        title: t('accessibility.resetToDefaults', 'Reset to defaults'),
        description: t('accessibility.settingsReset', 'All accessibility settings have been reset')
      });
    }
  };
  
  return {
    profiles,
    activeProfile,
    saveCurrentSettings,
    applyProfile,
    deleteProfile,
    exportProfile,
    importProfile,
    resetToDefaults
  };
}
