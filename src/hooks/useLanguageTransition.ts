
import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/components/ui/use-toast';
import { useA11y } from './useA11y';

export function useLanguageTransition() {
  const { i18n } = useTranslation();
  const { toast } = useToast();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { playSound, announce } = useA11y?.() || { playSound: undefined, announce: undefined };
  
  // إعداد اللغة مع تأثيرات انتقالية وإشعارات
  const changeLanguage = useCallback(async (language: string) => {
    if (!language || language === i18n.language) {
      return;
    }
    
    try {
      setIsTransitioning(true);
      
      // إضافة فئة CSS للانتقال
      document.documentElement.classList.add('language-transition');
      
      // محاكاة تحميل الترجمات
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // تطبيق اللغة الجديدة
      await i18n.changeLanguage(language);
      
      // حفظ اللغة المحددة في التخزين المحلي
      localStorage.setItem('language', language);
      
      // الحصول على اتجاه اللغة
      const isRTL = language === 'ar' || language === 'ar-iq';
      
      // تطبيق اتجاه RTL إذا لزم الأمر
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.body.classList.toggle('rtl-active', isRTL);
      
      // استخدام التعليق الصوتي إذا كان متاحًا
      if (announce) {
        announce(`تم تغيير اللغة إلى ${getLanguageNativeName(language)}`, 'polite');
      }
      
      // إشعار بتغيير اللغة
      const title = getLocalizedText(
        language,
        'تم تغيير اللغة',
        'Language Changed',
        'Langue Changée',
        '言語が変更されました',
        '语言已更改'
      );
      
      const description = getLocalizedText(
        language,
        `تم تعيين اللغة إلى ${getLanguageNativeName(language)}`,
        `Language set to ${getLanguageNativeName(language)}`,
        `Langue définie sur ${getLanguageNativeName(language)}`,
        `言語が${getLanguageNativeName(language)}に設定されました`,
        `语言设置为 ${getLanguageNativeName(language)}`
      );
      
      toast({
        title,
        description,
      });
      
      if (playSound) {
        playSound('info');
      }
      
    } catch (error) {
      console.error('Error changing language:', error);
    } finally {
      // إزالة فئة الانتقال
      setTimeout(() => {
        document.documentElement.classList.remove('language-transition');
        setIsTransitioning(false);
      }, 500);
    }
  }, [i18n, toast, announce, playSound]);
  
  // الحصول على اسم اللغة بلغتها الأصلية
  const getLanguageNativeName = (code: string): string => {
    const languageNames: Record<string, string> = {
      'ar': 'العربية',
      'ar-iq': 'العراقية',
      'en': 'English',
      'fr': 'Français',
      'ja': '日本語',
      'zh': '中文'
    };
    
    return languageNames[code] || code;
  };
  
  // الحصول على نص مترجم بناءً على اللغة
  const getLocalizedText = (
    language: string,
    arabic: string,
    english: string,
    french: string,
    japanese: string,
    chinese: string
  ): string => {
    if (language.startsWith('ar')) return arabic;
    if (language === 'fr') return french;
    if (language === 'ja') return japanese;
    if (language === 'zh') return chinese;
    return english; // الإنجليزية كلغة افتراضية
  };
  
  return {
    changeLanguage,
    isTransitioning,
    currentLanguage: i18n.language,
    getLanguageNativeName,
    getLocalizedText
  };
}
