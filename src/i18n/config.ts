
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './resources';
import translationKeyDetector from './utils/TranslationKeyDetector';

// تهيئة i18next بإعدادات محسنة
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(translationKeyDetector as any)
  .init({
    resources: resources,
    lng: localStorage.getItem('language') || 'ar',
    fallbackLng: {
      'ar-iq': ['ar'],
      'ja': ['en'],
      'zh': ['en'],
      'fr': ['en'],
      'default': ['ar', 'en']
    },
    debug: process.env.NODE_ENV === 'development',
    ns: ['common', 'license', 'access', 'settings', 'aiFeatures', 'helpCenter', 'communicationTools'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span', 'a', 'ul', 'ol', 'li']
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
    saveMissing: process.env.NODE_ENV === 'development',
    parseMissingKeyHandler: (key) => {
      return key.trim();
    },
    appendNamespaceToMissingKey: true,
    partialBundledLanguages: true,
    // تحسين المعالجة المتزامنة للترجمات
    initImmediate: false
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
  
  // حل مشكلة النصوص التي لا تتغير عند تبديل اللغة
  // استخدام حدث مخصص لإعلام المكونات بتغيير اللغة بدلاً من إعادة تحميل الصفحة
  setTimeout(() => {
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lng } }));
  }, 0);
  
  // تأخير إضافي للتأكد من تطبيق جميع التغييرات
  setTimeout(() => {
    document.dispatchEvent(new CustomEvent('languageFullyChanged', { detail: { language: lng } }));
  }, 300);
  
  // تحسين أسلوب تنظيف ذاكرة التخزين المؤقت للمفاتيح عند تغيير اللغة
  if (translationKeyDetector) {
    setTimeout(() => {
      translationKeyDetector.resetMissingKeys();
    }, 100);
  }
});

// تهيئة اتجاه اللغة عند بدء التشغيل
const currentLng = i18n.language;
const isRTL = currentLng === "ar" || currentLng === "ar-iq";
document.documentElement.setAttribute("lang", currentLng);
document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
document.documentElement.style.textAlign = isRTL ? "right" : "left";

// تطبيق أنماط CSS للغات RTL عند بدء التشغيل
if (isRTL) {
  document.body.classList.add('rtl-active');
}

// تحسين إدارة الأخطاء
i18n.on('failedLoading', (lng, ns, msg) => {
  console.error(`فشل تحميل ملف الترجمة: ${lng}/${ns} - ${msg}`);
  // محاولة إعادة تحميل الملف
  setTimeout(() => {
    i18n.reloadResources([lng], [ns]);
  }, 1000);
});

// إضافة تعامل أفضل مع المفاتيح المفقودة
i18n.on('missingKey', (lng, ns, key) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`مفتاح ترجمة مفقود: ${key} في مجال: ${ns} للغة: ${lng}`);
  }
  
  // محاولة استخدام مفتاح من لغة أخرى
  const fallbacks = i18n.options.fallbackLng;
  if (typeof fallbacks === 'object' && fallbacks) {
    // تحويل fallbacks إلى نوع معروف لـ TypeScript
    const fallbackLngsObject = fallbacks as Record<string, string[] | string>;
    const lngStr = lng as string;
    
    // التحقق مما إذا كانت اللغة موجودة في كائن اللغات الاحتياطية
    if (lngStr in fallbackLngsObject) {
      const fallbackLngs = fallbackLngsObject[lngStr];
      
      // معالجة المصفوفات بشكل صحيح
      if (Array.isArray(fallbackLngs)) {
        for (const fallbackLng of fallbackLngs) {
          if (i18n.exists(key, { lng: fallbackLng, ns })) {
            return i18n.t(key, { lng: fallbackLng, ns });
          }
        }
      } else if (typeof fallbackLngs === 'string') {
        // معالجة حالة القيمة المفردة
        if (i18n.exists(key, { lng: fallbackLngs, ns })) {
          return i18n.t(key, { lng: fallbackLngs, ns });
        }
      }
    }
    
    // إذا لم نجد في اللغات الاحتياطية المحددة، جرب اللغات الاحتياطية الافتراضية
    if ('default' in fallbackLngsObject) {
      const defaultFallbacks = fallbackLngsObject['default'];
      if (Array.isArray(defaultFallbacks)) {
        for (const fallbackLng of defaultFallbacks) {
          if (i18n.exists(key, { lng: fallbackLng, ns })) {
            return i18n.t(key, { lng: fallbackLng, ns });
          }
        }
      } else if (typeof defaultFallbacks === 'string') {
        if (i18n.exists(key, { lng: defaultFallbacks, ns })) {
          return i18n.t(key, { lng: defaultFallbacks, ns });
        }
      }
    }
  }
  
  // إذا لم يتم العثور على المفتاح في اللغات الاحتياطية، عرض المفتاح نفسه
  return key;
});

export default i18n;
