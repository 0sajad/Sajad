
import { A11ySettings } from '../../types/accessibility';

/**
 * Hook for handling accessibility profile storage operations
 */
export function useProfileStorage() {
  /**
   * Save an accessibility profile
   */
  const saveProfile = (profileName: string, settings: A11ySettings) => {
    const profiles = getProfiles();
    profiles[profileName] = settings;
    localStorage.setItem('a11yProfiles', JSON.stringify(profiles));
    return profileName;
  };
  
  /**
   * Get all saved accessibility profiles
   */
  const getProfiles = () => {
    return JSON.parse(localStorage.getItem('a11yProfiles') || '{}');
  };
  
  /**
   * Delete a profile by name
   */
  const deleteProfile = (profileName: string) => {
    const profiles = getProfiles();
    if (profiles[profileName]) {
      delete profiles[profileName];
      localStorage.setItem('a11yProfiles', JSON.stringify(profiles));
      return true;
    }
    return false;
  };
  
  return {
    saveProfile,
    getProfiles,
    deleteProfile
  };
}
