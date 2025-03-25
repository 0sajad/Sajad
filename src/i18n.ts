
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// استيراد ملفات الترجمة
import arCommon from './locales/ar/common.json';
import enCommon from './locales/en/common.json';
import zhCommon from './locales/zh/common.json';
import frCommon from './locales/fr/common.json';

// استيراد ملفات ترجمة التراخيص
import enLicense from './locales/en/license.json';
import arLicense from './locales/ar/license.json';

// استيراد ملفات ترجمة الوصول
import enAccess from './locales/en/access.json';
import arAccess from './locales/ar/access.json';

// استيراد ملفات ar-iq المقسمة
import arIqHeader from './locales/ar-iq/header.json';
import arIqMobileMenu from './locales/ar-iq/mobileMenu.json';
import arIqHero from './locales/ar-iq/hero.json';
import arIqSettings from './locales/ar-iq/settings.json';
import arIqCta from './locales/ar-iq/cta.json';
import arIqFooter from './locales/ar-iq/footer.json';
import arIqAiFeatures from './locales/ar-iq/aiFeatures.json';
import arIqSecurityStatus from './locales/ar-iq/securityStatus.json';
import arIqNetworkTools from './locales/ar-iq/networkTools.json';
import arIqHelpCenter from './locales/ar-iq/helpCenter.json';
import arIqAi from './locales/ar-iq/ai.json';
import arIqAiAssistant from './locales/ar-iq/aiAssistant.json';
import arIqConfig from './locales/ar-iq/config.json';

// استيراد ملفات اليابانية المقسمة
import jaHeader from './locales/ja/header.json';
import jaMobileMenu from './locales/ja/mobileMenu.json';
import jaHero from './locales/ja/hero.json';
import jaSettings from './locales/ja/settings.json';
import jaCta from './locales/ja/cta.json';
import jaFooter from './locales/ja/footer.json';
import jaAiFeatures from './locales/ja/aiFeatures.json';
import jaSecurityStatus from './locales/ja/securityStatus.json';
import jaNetworkTools from './locales/ja/networkTools.json';
import jaHelpCenter from './locales/ja/helpCenter.json';
import jaAi from './locales/ja/ai.json';
import jaAiAssistant from './locales/ja/aiAssistant.json';
import jaConfig from './locales/ja/config.json';

// دمج ملفات ar-iq في كائن واحد
const arIqCommon = {
  ...arIqHeader,
  mobileMenu: arIqMobileMenu,
  hero: arIqHero,
  settings: arIqSettings,
  cta: arIqCta,
  footer: arIqFooter,
  aiFeatures: arIqAiFeatures,
  securityStatus: arIqSecurityStatus,
  networkTools: arIqNetworkTools,
  helpCenter: arIqHelpCenter,
  ai: arIqAi,
  aiAssistant: arIqAiAssistant,
  ...arIqConfig
};

// دمج ملفات اليابانية في كائن واحد
const jaCommon = {
  header: jaHeader,
  mobileMenu: jaMobileMenu,
  hero: jaHero,
  settings: jaSettings,
  cta: jaCta,
  footer: jaFooter,
  aiFeatures: jaAiFeatures,
  securityStatus: jaSecurityStatus,
  networkTools: jaNetworkTools,
  helpCenter: jaHelpCenter,
  ai: jaAi,
  aiAssistant: jaAiAssistant,
  ...jaConfig
};

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
