
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
    debug: false, // تعطيل وضع التصحيح في الإنتاج لتحسين الأداء
    ns: ['common', 'license', 'access'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false // عدم هروب من HTML
    },
    react: {
      useSuspense: false
    },
    missingKeyHandler: (lng, ns, key) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Missing translation key: ${key} in namespace: ${ns} for language: ${lng}`);
      }
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'language'
    },
    load: 'languageOnly', // تحسين الأداء عن طريق تحميل رمز اللغة فقط
    returnEmptyString: false, // منع إرجاع سلاسل فارغة للمفاتيح المفقودة
    keySeparator: '.',
    pluralSeparator: '_',
    contextSeparator: '_',
    saveMissing: false
  });

// تأكد من تطبيق اتجاه اللغة الصحيح عند تغيير اللغة
i18n.on('languageChanged', (lng) => {
  const isRTL = lng === "ar" || lng === "ar-iq";
  document.documentElement.setAttribute("lang", lng);
  document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  document.documentElement.style.textAlign = isRTL ? "right" : "left";
  localStorage.setItem('language', lng);
  
  // تطبيق أنماط CSS إضافية للغات RTL
  if (isRTL) {
    document.body.classList.add('rtl-active');
  } else {
    document.body.classList.remove('rtl-active');
  }
});

// تهيئة اتجاه اللغة عند بدء التشغيل
const currentLng = i18n.language;
const isRTL = currentLng === "ar" || currentLng === "ar-iq";
document.documentElement.setAttribute("lang", currentLng);
document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
document.documentElement.style.textAlign = isRTL ? "right" : "left";

// تطبيق أنماط CSS إضافية للغات RTL عند بدء التشغيل
if (isRTL) {
  document.body.classList.add('rtl-active');
}

export default i18n;
