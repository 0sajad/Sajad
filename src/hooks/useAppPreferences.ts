
import { useAppState } from './state/use-app-state';
import { useCallback, useEffect } from 'react';
import { useTheme } from './useTheme';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { AppPreferences } from './state/preferences-state';

/**
 * خطاف لإدارة تفضيلات التطبيق بشكل سهل
 */
export function useAppPreferences() {
  const { i18n } = useTranslation();
  const { setTheme } = useTheme();
  
  const preferences = useAppState(state => state.preferences);
  const setPreference = useAppState(state => state.setPreference);
  const resetPreferences = useAppState(state => state.resetPreferences);
  
  // تطبيق التفضيلات عند تحميل المكون
  useEffect(() => {
    // تطبيق السمة
    if (preferences.theme) {
      setTheme(preferences.theme);
    }
    
    // تطبيق اللغة
    if (preferences.language && i18n.language !== preferences.language) {
      i18n.changeLanguage(preferences.language);
    }
    
    // تطبيق التفضيلات الأخرى...
  }, [preferences.theme, preferences.language, setTheme, i18n]);
  
  // تحديث جميع التفضيلات في مرة واحدة
  const updatePreferences = useCallback((newPreferences: Partial<AppPreferences>) => {
    Object.entries(newPreferences).forEach(([key, value]) => {
      // التحقق من أن المفتاح موجود في التفضيلات قبل تحديثه
      if (key in preferences) {
        setPreference(key as keyof AppPreferences, value as any);
      }
    });
    
    // تطبيق التغييرات المباشرة
    if (newPreferences.theme && newPreferences.theme !== preferences.theme) {
      setTheme(newPreferences.theme);
    }
    
    if (newPreferences.language && newPreferences.language !== preferences.language) {
      i18n.changeLanguage(newPreferences.language);
    }
    
    toast.success('تم تحديث التفضيلات بنجاح');
  }, [preferences, setPreference, setTheme, i18n]);
  
  // تصدير التفضيلات إلى ملف
  const exportPreferences = useCallback(() => {
    try {
      const dataStr = JSON.stringify(preferences, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `octa-preferences-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('تم تصدير التفضيلات بنجاح');
    } catch (error) {
      console.error('Error exporting preferences:', error);
      toast.error('فشل تصدير التفضيلات');
    }
  }, [preferences]);
  
  // استيراد التفضيلات من ملف
  const importPreferences = useCallback((file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      try {
        const reader = new FileReader();
        
        reader.onload = (event) => {
          try {
            if (!event.target?.result) {
              toast.error('فشل قراءة الملف');
              resolve(false);
              return;
            }
            
            const importedPrefs = JSON.parse(event.target.result as string);
            
            // التحقق من صحة المحتوى المستورد
            if (!importedPrefs || typeof importedPrefs !== 'object') {
              toast.error('ملف تفضيلات غير صالح');
              resolve(false);
              return;
            }
            
            // تحديث التفضيلات
            updatePreferences(importedPrefs);
            toast.success('تم استيراد التفضيلات بنجاح');
            resolve(true);
          } catch (parseError) {
            console.error('Error parsing imported preferences:', parseError);
            toast.error('فشل تحليل ملف التفضيلات');
            resolve(false);
          }
        };
        
        reader.onerror = () => {
          toast.error('فشل قراءة الملف');
          resolve(false);
        };
        
        reader.readAsText(file);
      } catch (error) {
        console.error('Error importing preferences:', error);
        toast.error('فشل استيراد التفضيلات');
        resolve(false);
      }
    });
  }, [updatePreferences]);
  
  return {
    preferences,
    setPreference,
    resetPreferences,
    updatePreferences,
    exportPreferences,
    importPreferences
  };
}
