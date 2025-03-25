
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// استيراد ملفات الترجمة
import arCommon from './locales/ar/common.json';
import enCommon from './locales/en/common.json';

// تهيئة i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        common: arCommon
      },
      en: {
        common: enCommon
      }
    },
    lng: 'ar', // اللغة الافتراضية
    fallbackLng: 'ar',
    debug: false,
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false // عدم هروب من HTML
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
