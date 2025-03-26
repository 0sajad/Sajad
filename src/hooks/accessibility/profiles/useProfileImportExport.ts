
import { A11ySettings } from '../../types/accessibility';
import { saveAs } from 'file-saver';

/**
 * Functions for importing and exporting accessibility profiles
 */
export function useProfileImportExport() {
  /**
   * Export settings to JSON file
   */
  const exportSettings = (settings: A11ySettings): boolean => {
    try {
      // تحضير الملف للتصدير
      const dataStr = JSON.stringify(settings, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      
      // استخدام FileSaver.js لتنزيل الملف
      saveAs(blob, `accessibility-settings-${new Date().toISOString().slice(0, 10)}.json`);
      
      return true;
    } catch (error) {
      console.error('Failed to export settings:', error);
      return false;
    }
  };
  
  /**
   * Import settings from JSON file
   */
  const importSettings = (file: File): Promise<A11ySettings> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          if (!event.target?.result) {
            throw new Error('Failed to read file');
          }
          
          const settings = JSON.parse(event.target.result as string) as A11ySettings;
          
          // التحقق من صحة البيانات المستوردة
          if (!validateImportedSettings(settings)) {
            throw new Error('Invalid settings format');
          }
          
          resolve(settings);
        } catch (error) {
          console.error('Error parsing imported settings:', error);
          reject(error);
        }
      };
      
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        reject(error);
      };
      
      reader.readAsText(file);
    });
  };
  
  /**
   * Show file dialog to import settings
   */
  const showImportDialog = (): Promise<File | null> => {
    return new Promise((resolve) => {
      // إنشاء عنصر input لاختيار الملف
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        const files = target.files;
        
        if (files && files.length > 0) {
          resolve(files[0]);
        } else {
          resolve(null);
        }
      };
      
      // محاكاة النقر على زر اختيار الملف
      input.click();
    });
  };
  
  /**
   * Validate imported settings
   */
  const validateImportedSettings = (settings: any): settings is A11ySettings => {
    // التحقق من وجود بعض الحقول المتوقعة
    const expectedProps = ['highContrast', 'largeText', 'reducedMotion'];
    const hasProps = expectedProps.some(prop => Object.prototype.hasOwnProperty.call(settings, prop));
    
    return hasProps;
  };
  
  return {
    exportSettings,
    importSettings,
    showImportDialog
  };
}
