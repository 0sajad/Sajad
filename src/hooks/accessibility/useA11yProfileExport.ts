
import { TFunction } from 'i18next';
import { toast } from '@/components/ui/use-toast';

export interface A11yProfile {
  id: string;
  name: string;
  settings: any;
}

export function useA11yProfileExport() {
  // Export profile to a file
  const exportProfile = (profileToExport: A11yProfile, t: TFunction) => {
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
  };
  
  // Import profile from a file
  const importProfile = (jsonData: string, existingProfiles: A11yProfile[], t: TFunction): A11yProfile | null => {
    try {
      const importedProfile = JSON.parse(jsonData) as A11yProfile;
      
      // Validate imported profile
      if (!importedProfile.id || !importedProfile.settings) {
        throw new Error('Invalid profile format');
      }
      
      // Modify ID to avoid conflicts
      importedProfile.id = Date.now().toString();
      
      toast({
        title: t('accessibility.profileImported', 'Profile imported successfully'),
        description: importedProfile.name
      });
      
      return importedProfile;
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
  
  return {
    exportProfile,
    importProfile
  };
}
