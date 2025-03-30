
import { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/use-toast';
import { useAppState } from './state';

/**
 * خطاف مخصص لإدارة انتقالات تغيير اللغة بشكل سلس
 * يوفر تجربة مستخدم محسنة عند تغيير اللغة
 */
export const useLanguageTransition = () => {
  const { i18n } = useTranslation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousLanguage, setPreviousLanguage] = useState<string | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<string | null>(null);
  const setPreferences = useAppState(state => state.setPreferences);
  
  // تنفيذ تأثير التلاشي وإعادة الظهور عند تغيير اللغة
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);
  
  // حفظ اللغة المفضلة في التخزين المحلي وحالة التطبيق
  useEffect(() => {
    if (!isTransitioning && i18n.language) {
      localStorage.setItem('language', i18n.language);
      setPreferences({ language: i18n.language });
    }
  }, [isTransitioning, i18n.language, setPreferences]);
  
  // تغيير اللغة مع تأثيرات انتقالية
  const changeLanguage = useCallback(async (languageCode: string) => {
    if (!languageCode || languageCode === i18n.language) return;
    
    try {
      // بدء التأثير الانتقالي
      setPreviousLanguage(i18n.language);
      setTargetLanguage(languageCode);
      setIsTransitioning(true);
      
      // تأخير لإظهار التأثير
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // تغيير اللغة
      await i18n.changeLanguage(languageCode);
      
      // الإبلاغ بنجاح التغيير
      const languageName = new Intl.DisplayNames([languageCode], { type: 'language' }).of(languageCode);
      
      // عرض إشعار نجاح تغيير اللغة
      toast({
        title: i18n.t('language.changed', 'تم تغيير اللغة'),
        description: i18n.t('language.changedDescription', { language: languageName }),
      });
    } catch (error) {
      console.error('فشل في تغيير اللغة:', error);
      setIsTransitioning(false);
      
      // عرض إشعار خطأ
      toast({
        title: i18n.t('language.changeFailed', 'فشل تغيير اللغة'),
        description: i18n.t('language.tryAgain', 'يرجى المحاولة مرة أخرى'),
        variant: 'destructive',
      });
    }
  }, [i18n, toast]);
  
  // استرجاع اللغة المفضلة من التخزين المحلي عند التحميل
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && savedLanguage !== i18n.language) {
      changeLanguage(savedLanguage);
    }
  }, []);
  
  // وظيفة لاسترجاع اللغة السابقة
  const revertToPreviousLanguage = useCallback(() => {
    if (previousLanguage) {
      changeLanguage(previousLanguage);
    }
  }, [previousLanguage, changeLanguage]);
  
  return {
    isTransitioning,
    changeLanguage,
    previousLanguage,
    targetLanguage,
    revertToPreviousLanguage,
  };
};

export default useLanguageTransition;
