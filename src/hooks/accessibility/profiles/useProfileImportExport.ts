
import { saveAs } from 'file-saver';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { A11ySettings } from '../../types/accessibility';

/**
 * Hook for import/export of accessibility profiles
 */
export function useProfileImportExport() {
  const { t } = useTranslation();
  
  /**
   * Export accessibility settings to a JSON file
   */
  const exportSettings = (settings: A11ySettings) => {
    try {
      const dataStr = JSON.stringify(settings, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      // Create filename with date
      const date = new Date();
      const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      const filename = `a11y-settings-${dateStr}.json`;
      
      // Save file
      saveAs(dataBlob, filename);
      
      // Show success toast
      toast({
        title: t('accessibility.exportSuccess', 'تم تصدير الإعدادات بنجاح'),
        description: t('accessibility.exportSuccessDescription', 'تم حفظ إعدادات إمكانية الوصول الخاصة بك إلى ملف'),
        variant: 'default'
      });
      
      // Announce to screen readers
      if (window.announce) {
        window.announce(t('accessibility.exportSuccessAnnouncement', 'تم تصدير إعدادات إمكانية الوصول بنجاح'), 'polite');
      }
      
      return true;
    } catch (error) {
      console.error('Failed to export settings:', error);
      
      // Show error toast
      toast({
        title: t('accessibility.exportError', 'فشل تصدير الإعدادات'),
        description: t('accessibility.exportErrorDescription', 'حدث خطأ أثناء محاولة تصدير الإعدادات'),
        variant: 'destructive'
      });
      
      return false;
    }
  };
  
  /**
   * Import accessibility settings from a JSON file
   */
  const importSettings = (file: File): Promise<A11ySettings> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          if (!event.target || typeof event.target.result !== 'string') {
            throw new Error('Failed to read file');
          }
          
          const settings = JSON.parse(event.target.result) as A11ySettings;
          
          // Validate imported settings
          if (!isValidSettings(settings)) {
            throw new Error('Invalid settings format');
          }
          
          // Show success toast
          toast({
            title: t('accessibility.importSuccess', 'تم استيراد الإعدادات بنجاح'),
            description: t('accessibility.importSuccessDescription', 'تم تطبيق إعدادات إمكانية الوصول الجديدة'),
            variant: 'default'
          });
          
          // Announce to screen readers
          if (window.announce) {
            window.announce(t('accessibility.importSuccessAnnouncement', 'تم استيراد إعدادات إمكانية الوصول بنجاح'), 'polite');
          }
          
          resolve(settings);
        } catch (error) {
          console.error('Failed to import settings:', error);
          
          // Show error toast
          toast({
            title: t('accessibility.importError', 'فشل استيراد الإعدادات'),
            description: t('accessibility.importErrorDescription', 'الملف المحدد ليس بتنسيق صالح'),
            variant: 'destructive'
          });
          
          reject(error);
        }
      };
      
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        
        toast({
          title: t('accessibility.importError', 'فشل استيراد الإعدادات'),
          description: t('accessibility.importErrorDescription', 'حدث خطأ أثناء قراءة الملف'),
          variant: 'destructive'
        });
        
        reject(error);
      };
      
      reader.readAsText(file);
    });
  };
  
  /**
   * Validate imported settings
   */
  const isValidSettings = (settings: any): settings is A11ySettings => {
    return (
      typeof settings === 'object' &&
      settings !== null &&
      (typeof settings.highContrast === 'boolean' || settings.highContrast === undefined) &&
      (typeof settings.largeText === 'boolean' || settings.largeText === undefined) &&
      (typeof settings.reducedMotion === 'boolean' || settings.reducedMotion === undefined) &&
      (typeof settings.focusMode === 'boolean' || settings.focusMode === undefined) &&
      (typeof settings.dyslexicFont === 'boolean' || settings.dyslexicFont === undefined) &&
      (typeof settings.readingGuide === 'boolean' || settings.readingGuide === undefined) &&
      (typeof settings.soundFeedback === 'boolean' || settings.soundFeedback === undefined) &&
      (typeof settings.colorBlindMode === 'string' || settings.colorBlindMode === null || settings.colorBlindMode === undefined)
    );
  };
  
  return {
    exportSettings,
    importSettings
  };
}
