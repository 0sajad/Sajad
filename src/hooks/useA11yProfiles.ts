
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/use-toast';
import { A11ySettings } from './types/accessibility';
import { useA11yProfileStorage } from './accessibility/useA11yProfileStorage';
import { useA11yProfileExport } from './accessibility/useA11yProfileExport';

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
  const [activeProfile, setActiveProfile] = useState<string | null>(null);
  
  // Use the storage hook to manage profiles
  const { profiles, setProfiles, loadProfiles, saveProfiles } = useA11yProfileStorage();
  
  // Use the export/import hook
  const { exportProfile: exportProfileToFile, importProfile: importProfileFromFile } = useA11yProfileExport();
  
  // Load saved profiles
  useEffect(() => {
    loadProfiles(t);
    
    // Check for active profile
    const savedActiveProfile = localStorage.getItem('a11y-active-profile');
    if (savedActiveProfile) {
      setActiveProfile(savedActiveProfile);
    }
  }, [t, loadProfiles]);
  
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
    saveProfiles(updatedProfiles);
    
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
    saveProfiles(updatedProfiles);
    
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
      exportProfileToFile(profileToExport, t);
      return true;
    }
    
    return false;
  };
  
  // Import a profile
  const importProfile = (jsonData: string) => {
    try {
      const importedProfile = importProfileFromFile(jsonData, profiles, t);
      
      if (importedProfile) {
        // Add imported profile to list
        const updatedProfiles = [...profiles, importedProfile];
        setProfiles(updatedProfiles);
        saveProfiles(updatedProfiles);
        
        return importedProfile.id;
      }
      
      return null;
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
