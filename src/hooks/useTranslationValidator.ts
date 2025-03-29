
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MissingTranslationDetector, MissingTranslationStats } from '@/utils/i18n/MissingTranslationDetector';
import { useAppState } from './state/use-app-state';
import { useToast } from '@/components/ui/use-toast';

/**
 * خطاف للتحقق من صحة الترجمات وتسجيل المفاتيح المفقودة
 * يستخدم في وضع التطوير فقط
 */
export function useTranslationValidator() {
  const { i18n } = useTranslation();
  const { toast } = useToast();
  const isDeveloperMode = useAppState(state => state.preferences?.developerMode);
  const [missingKeys, setMissingKeys] = useState<Record<string, string[]>>({});
  const [stats, setStats] = useState<MissingTranslationStats>({
    totalCount: 0,
    languageCounts: {},
    lastUpdated: null
  });
  
  // تهيئة كاشف الترجمات المفقودة
  useEffect(() => {
    if (!isDeveloperMode) return;
    
    MissingTranslationDetector.init();
    
    // تحديث المفاتيح المفقودة بشكل دوري
    const updateMissingKeys = () => {
      const keys = MissingTranslationDetector.getMissingKeys();
      const currentStats = MissingTranslationDetector.getStats();
      setMissingKeys(keys);
      setStats(currentStats);
    };
    
    // تحديث أولي
    updateMissingKeys();
    
    // تسجيل الترجمات المفقودة
    const handleMissingKey = (lng: string, ns: string, key: string) => {
      MissingTranslationDetector.addMissingKey(lng, key);
      console.debug(`[i18n] Missing translation detected: ${lng}:${ns}:${key}`);
      updateMissingKeys();
    };
    
    // إضافة مستمع للتقاط المفاتيح المفقودة
    i18n.on('missingKey', handleMissingKey);
    
    // تحديث المفاتيح المفقودة كل 5 ثوانٍ
    const interval = setInterval(updateMissingKeys, 5000);
    
    return () => {
      i18n.off('missingKey', handleMissingKey);
      clearInterval(interval);
    };
  }, [i18n, isDeveloperMode]);
  
  /**
   * التحقق من وجود ترجمة لمفتاح معين
   * @param key مفتاح الترجمة
   * @param fallback النص الاحتياطي إذا لم يتم العثور على الترجمة
   */
  const validateKey = useCallback((key: string, fallback?: string): boolean => {
    if (!i18n.exists(key)) {
      const currentLanguage = i18n.language;
      if (isDeveloperMode && currentLanguage) {
        MissingTranslationDetector.addMissingKey(currentLanguage, key);
        setMissingKeys(MissingTranslationDetector.getMissingKeys());
        setStats(MissingTranslationDetector.getStats());
      }
      return false;
    }
    return true;
  }, [i18n, isDeveloperMode]);
  
  /**
   * مسح جميع المفاتيح المفقودة المسجلة
   */
  const clearMissingKeys = useCallback((language?: string) => {
    if (isDeveloperMode) {
      MissingTranslationDetector.clearMissingKeys(language);
      setMissingKeys(MissingTranslationDetector.getMissingKeys());
      setStats(MissingTranslationDetector.getStats());
      
      toast({
        title: "تم مسح المفاتيح المفقودة",
        description: language 
          ? `تم مسح المفاتيح المفقودة للغة ${language}` 
          : "تم مسح جميع المفاتيح المفقودة",
      });
    }
  }, [isDeveloperMode, toast]);
  
  /**
   * تصدير المفاتيح المفقودة كملف JSON
   */
  const exportMissingKeys = useCallback(() => {
    const exportedData = MissingTranslationDetector.exportMissingKeys();
    
    // إنشاء ملف للتنزيل
    const blob = new Blob([exportedData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `missing-translations-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "تصدير المفاتيح المفقودة",
      description: "تم تصدير المفاتيح المفقودة بنجاح"
    });
  }, [toast]);
  
  return {
    validateKey,
    clearMissingKeys,
    exportMissingKeys,
    missingKeys,
    stats
  };
}
