
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// استيراد ملفات الترجمة
import arCommon from './locales/ar/common.json';
import enCommon from './locales/en/common.json';
import arIqCommon from './locales/ar-iq/common.json';
import jaCommon from './locales/ja/common.json';
import zhCommon from './locales/zh/common.json';
import frCommon from './locales/fr/common.json';

// استيراد ملفات ترجمة التراخيص
import enLicense from './locales/en/license.json';
import arLicense from './locales/ar/license.json';

// استيراد ملفات ترجمة الوصول
import enAccess from './locales/en/access.json';
import arAccess from './locales/ar/access.json';

// تهيئة i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        common: arCommon,
        license: arLicense,
        access: arAccess
      },
      en: {
        common: enCommon,
        license: enLicense,
        access: enAccess
      },
      'ar-iq': {
        common: arIqCommon
      },
      ja: {
        common: jaCommon
      },
      zh: {
        common: zhCommon
      },
      fr: {
        common: frCommon
      }
    },
    lng: localStorage.getItem('language') || 'ar', // اللغة الافتراضية
    fallbackLng: 'ar',
    debug: process.env.NODE_ENV === 'development',
    ns: ['common', 'license', 'access'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false // عدم هروب من HTML
    },
    react: {
      useSuspense: false
    }
  });

export default i18n;
