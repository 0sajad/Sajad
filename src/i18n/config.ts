
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './resources';

// تهيئة i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'ar', // اللغة الافتراضية
    fallbackLng: {
      'ar-iq': ['ar'],
      'default': ['ar']
    },
    debug: process.env.NODE_ENV === 'development',
    ns: ['common', 'license', 'access'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span']
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
    load: 'languageOnly',
    returnEmptyString: false,
    keySeparator: '.',
    pluralSeparator: '_',
    contextSeparator: '_',
    saveMissing: process.env.NODE_ENV === 'development'
  });

// تطبيق اتجاه اللغة الصحيح عند تغيير اللغة
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
  
  // تحديث اتجاه العناصر المطلقة
  const rtlElements = document.querySelectorAll('[data-rtl-aware]');
  rtlElements.forEach((el) => {
    const element = el as HTMLElement;
    if (element.style.left) element.style.left = '';
    if (element.style.right) element.style.right = '';
    
    if (isRTL) {
      element.style.right = element.dataset.rtlPosition || '0';
    } else {
      element.style.left = element.dataset.ltrPosition || '0';
    }
  });
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
