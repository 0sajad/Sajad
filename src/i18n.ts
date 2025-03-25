
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
    },
    missingKeyHandler: (lng, ns, key) => {
      console.warn(`Missing translation key: ${key} in namespace: ${ns} for language: ${lng}`);
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    load: 'languageOnly', // Improve performance by loading only the language code (e.g., 'en' instead of 'en-US')
    returnEmptyString: false // Prevent returning empty strings for missing keys
  });

// تأكد من تطبيق اتجاه اللغة الصحيح عند تغيير اللغة
i18n.on('languageChanged', (lng) => {
  const isRTL = lng === "ar" || lng === "ar-iq";
  document.documentElement.setAttribute("lang", lng);
  document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  document.documentElement.style.textAlign = isRTL ? "right" : "left";
  localStorage.setItem('language', lng);
});

// تهيئة اتجاه اللغة عند بدء التشغيل
const currentLng = i18n.language;
const isRTL = currentLng === "ar" || currentLng === "ar-iq";
document.documentElement.setAttribute("lang", currentLng);
document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
document.documentElement.style.textAlign = isRTL ? "right" : "left";

export default i18n;
