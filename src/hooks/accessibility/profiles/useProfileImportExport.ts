
import { A11ySettings } from '../../types/accessibility';

/**
 * Hook for handling profile import and export functionality
 */
export function useProfileImportExport() {
  /**
   * Export accessibility settings to a downloadable JSON file
   */
  const exportSettings = (settings: A11ySettings) => {
    const blob = new Blob([JSON.stringify(settings)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'a11y-settings.json';
    a.click();
    
    URL.revokeObjectURL(url);
  };
  
  /**
   * Import accessibility settings from a JSON file
   */
  const importSettings = (file: File): Promise<A11ySettings> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const settings: A11ySettings = JSON.parse(event.target?.result as string);
          resolve(settings);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('فشل قراءة الملف'));
      
      reader.readAsText(file);
    });
  };
  
  return {
    exportSettings,
    importSettings
  };
}
