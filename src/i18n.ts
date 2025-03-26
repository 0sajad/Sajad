
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './i18n/resources';

const getLanguageDirection = (language: string): 'rtl' | 'ltr' => {
  return ['ar', 'ar-iq'].includes(language) ? 'rtl' : 'ltr';
};

// إنشاء كاشف اللغة المخصص
const languageDetector = new LanguageDetector();
languageDetector.addDetector({
  name: 'customDetector',
  lookup: () => {
    console.log("Looking up language...");
    // البحث عن اللغة المحفوظة أولاً
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      console.log("Found saved language:", savedLanguage);
      return savedLanguage;
    }
    
    // استخدام لغة المتصفح
    const browserLanguage = navigator.language;
    console.log("Browser language:", browserLanguage);
    
    if (browserLanguage.startsWith('ar')) {
      // التحقق إذا كانت لهجة عراقية
      if (browserLanguage.includes('iq')) {
        console.log("Detected Iraqi Arabic dialect");
        return 'ar-iq';
      }
      // لغة عربية قياسية
      console.log("Detected Standard Arabic");
      return 'ar';
    }
    
    // الافتراضي للغة الإنجليزية
    console.log("Using default language: English");
    return 'en';
  }
});

// تهيئة i18next
console.log("Initializing i18next...");
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: localStorage.getItem('language') || 'en',
    debug: true, // تفعيل وضع التصحيح للمساعدة في اكتشاف الأخطاء
    ns: [
      'translation',
      'common',
      'network',
      'dashboard',
      'ai',
      'aiAssistant',
      'aiFeatures',
      'helpCenter',
      'communicationTools',
      'networkTools',
      'settings',
      'securityStatus'
    ],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: true
    }
  }).then(() => {
    console.log("i18next initialized successfully");
    console.log("Current language:", i18n.language);
    console.log("Available languages:", Object.keys(resources));
    
    // تعيين اتجاه اللغة
    const dir = getLanguageDirection(i18n.language);
    console.log("Setting language direction:", dir);
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', i18n.language);
    
    // تطبيق فئات CSS للغات RTL
    if (dir === 'rtl') {
      document.body.classList.add('rtl-active');
    } else {
      document.body.classList.remove('rtl-active');
    }
    
    // إطلاق حدث تغيير اللغة
    document.dispatchEvent(
      new CustomEvent('languageFullyChanged', {
        detail: { language: i18n.language }
      })
    );
  }).catch(error => {
    console.error("Failed to initialize i18next:", error);
  });

// الاستماع لتغييرات اللغة
i18n.on('languageChanged', (language) => {
  console.log("Language changed to:", language);
  
  const dir = getLanguageDirection(language);
  console.log("Updating language direction to:", dir);
  
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', language);

  // تطبيق فئات CSS للغات RTL
  if (dir === 'rtl') {
    document.body.classList.add('rtl-active');
  } else {
    document.body.classList.remove('rtl-active');
  }

  // إطلاق حدث عند تغيير اللغة بالكامل
  document.dispatchEvent(
    new CustomEvent('languageFullyChanged', {
      detail: { language }
    })
  );
});

export default i18n;
