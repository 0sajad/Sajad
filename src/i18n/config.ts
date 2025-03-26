
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './resources';

// تكوين ملف i18n
i18n
  // استخدام كاشف اللغة
  .use(LanguageDetector)
  // تمرير المثيل i18n إلى react-i18next
  .use(initReactI18next)
  // تهيئة i18n
  .init({
    resources,
    fallbackLng: 'ar',
    debug: false,

    // خيارات الاكتشاف اللغوي
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'language',
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false, // ليس ضروريًا لـ React حيث يتعامل مع الهروب
    },

    // السماح بتحميل قطع اللغة العميق
    keySeparator: '.',
    
    // معالجة اللغات من اليمين إلى اليسار
    supportedLngs: ['ar', 'ar-iq', 'en', 'fr', 'ja', 'zh'],
    react: {
      useSuspense: false,
    },
  });

// إضافة حدث حسب اللغة
i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng);
  const isRTL = lng === 'ar' || lng === 'ar-iq';
  document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  
  // إضافة متجر ملفات الخط العربي إذا كانت اللغة عربية
  if (isRTL) {
    document.body.classList.add('font-tajawal');
    document.documentElement.style.setProperty('--font-family', "'Tajawal', sans-serif");
  } else {
    document.body.classList.remove('font-tajawal');
    document.documentElement.style.removeProperty('--font-family');
  }
  
  // تخزين اللغة في التخزين المحلي
  localStorage.setItem('language', lng);
  
  // إطلاق حدث عندما يتم تغيير اللغة بالكامل
  setTimeout(() => {
    const event = new CustomEvent('languageFullyChanged', { detail: { language: lng } });
    document.dispatchEvent(event);
  }, 300);
});

// دالة مساعدة لتغيير اللغة
export const changeLanguage = (language: string) => {
  return i18n.changeLanguage(language);
};

// دالة للتحقق مما إذا كانت اللغة الحالية هي من اليمين إلى اليسار
export const isRTL = () => {
  const currentLang = i18n.language;
  return currentLang === 'ar' || currentLang === 'ar-iq';
};

// دالة للحصول على لغات الواجهة المدعومة
export const getSupportedUILanguages = () => {
  // تحويل إلى نوع string بدلاً من readonly string[]
  return (i18n.options.supportedLngs as unknown) as string[];
};

export default i18n;
