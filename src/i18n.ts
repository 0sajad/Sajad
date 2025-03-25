
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
import jaCommonExtra from './locales/ja/common.json';

// استيراد ملفات الفرنسية المقسمة
import frAi from './locales/fr/ai.json';
import frAiAssistant from './locales/fr/aiAssistant.json';
import frConfig from './locales/fr/config.json';

// استيراد ملفات الصينية المقسمة
import zhAi from './locales/zh/ai.json';
import zhAiAssistant from './locales/zh/aiAssistant.json';
import zhConfig from './locales/zh/config.json';

// استيراد ملفات العربية الإضافية
import arAi from './locales/ar/ai.json';
import arAiAssistant from './locales/ar/aiAssistant.json';
import arConfig from './locales/ar/config.json';
import arCta from './locales/ar/cta.json';

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
  ...jaConfig,
  ...jaCommonExtra
};

// دمج ملفات الفرنسية في كائن واحد
const frCombined = {
  ...frCommon,
  ai: frAi,
  aiAssistant: frAiAssistant,
  ...frConfig
};

// دمج ملفات الصينية في كائن واحد
const zhCombined = {
  ...zhCommon,
  ai: zhAi,
  aiAssistant: zhAiAssistant,
  ...zhConfig
};

// دمج ملفات العربية في كائن واحد
const arCombined = {
  ...arCommon,
  ai: arAi,
  aiAssistant: arAiAssistant,
  cta: arCta,
  ...arConfig
};

// تهيئة i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: {
        common: arCombined,
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
        common: zhCombined
      },
      fr: {
        common: frCombined
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
