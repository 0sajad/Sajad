
import { A11ySettings } from '../../types/accessibility';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';
import { Download, Upload, Check } from 'lucide-react';

/**
 * Hook for handling profile import and export functionality
 */
export function useProfileImportExport() {
  const { t } = useTranslation();
  
  /**
   * Export accessibility settings to a downloadable JSON file
   */
  const exportSettings = (settings: A11ySettings) => {
    try {
      // إضافة البيانات الوصفية للتصدير
      const exportData = {
        ...settings,
        exportedAt: new Date().toISOString(),
        schemaVersion: "1.1",
        platform: navigator.platform,
        appName: "OCTA-GRAM"
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/:/g, '-').substring(0, 19);
      a.href = url;
      a.download = `a11y-settings-${timestamp}.json`;
      a.click();
      
      URL.revokeObjectURL(url);
      
      // عرض إشعار نجاح التصدير
      toast({
        title: t('accessibility.exportSuccess', 'تم تصدير الإعدادات بنجاح'),
        description: t('accessibility.exportSuccessDescription', 'تم حفظ ملف الإعدادات على جهازك'),
        icon: <Download className="h-4 w-4 text-green-500" />
      });
      
      return true;
    } catch (error) {
      console.error('Failed to export settings:', error);
      
      // عرض إشعار فشل التصدير
      toast({
        title: t('accessibility.exportFailed', 'فشل تصدير الإعدادات'),
        description: t('accessibility.exportFailedDescription', 'حدث خطأ أثناء تصدير الإعدادات'),
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
      // عرض إشعار بدء الاستيراد
      toast({
        title: t('accessibility.importInProgress', 'جاري استيراد الإعدادات...'),
        description: t('accessibility.importInProgressDescription', 'يرجى الانتظار بينما يتم استيراد الإعدادات الخاصة بك')
      });
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          
          // التحقق من صحة البيانات المستوردة
          if (!validateImportedSettings(imported)) {
            throw new Error('Invalid settings format');
          }
          
          // إزالة البيانات الوصفية من البيانات المستوردة
          const { exportedAt, schemaVersion, platform, appName, ...settings } = imported;
          
          // عرض إشعار نجاح الاستيراد
          toast({
            title: t('accessibility.importSuccess', 'تم استيراد الإعدادات بنجاح'),
            description: t('accessibility.importSuccessDescription', 'تم تطبيق الإعدادات المستوردة'),
            icon: <Check className="h-4 w-4 text-green-500" />
          });
          
          resolve(settings as A11ySettings);
        } catch (error) {
          // عرض إشعار فشل الاستيراد
          toast({
            title: t('accessibility.importFailed', 'فشل استيراد الإعدادات'),
            description: t('accessibility.invalidFileFormat', 'تنسيق الملف غير صالح أو تالف'),
            variant: 'destructive'
          });
          
          reject(new Error('فشل قراءة الملف: تنسيق غير صالح'));
        }
      };
      
      reader.onerror = () => {
        // عرض إشعار فشل قراءة الملف
        toast({
          title: t('accessibility.importFailed', 'فشل استيراد الإعدادات'),
          description: t('accessibility.readError', 'فشل قراءة الملف المحدد'),
          variant: 'destructive'
        });
        
        reject(new Error('فشل قراءة الملف'));
      };
      
      reader.readAsText(file);
    });
  };
  
  /**
   * Validate imported settings structure
   */
  const validateImportedSettings = (data: any): boolean => {
    // التحقق من وجود الحقول الأساسية
    const requiredFields = ['highContrast', 'largeText', 'reducedMotion'];
    for (const field of requiredFields) {
      if (typeof data[field] !== 'boolean') {
        return false;
      }
    }
    
    // التحقق إذا كان الملف من إصدار قديم وإجراء ترقية البيانات
    if (!data.schemaVersion) {
      // إضافة الحقول الافتراضية إذا كانت مفقودة (للتوافق الخلفي)
      if (data.dyslexicFont === undefined) data.dyslexicFont = false;
      if (data.readingGuide === undefined) data.readingGuide = false;
      if (data.soundFeedback === undefined) data.soundFeedback = false;
    }
    
    return true;
  };
  
  /**
   * Show file picker dialog to import settings
   */
  const showImportDialog = (): Promise<File | null> => {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      input.onchange = (event) => {
        const files = (event.target as HTMLInputElement).files;
        if (files && files.length > 0) {
          resolve(files[0]);
        } else {
          resolve(null);
        }
      };
      
      // محاكاة النقر لفتح مربع حوار اختيار الملف
      input.click();
    });
  };
  
  return {
    exportSettings,
    importSettings,
    showImportDialog
  };
}
