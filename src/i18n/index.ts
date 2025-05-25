
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        fiberOptic: 'الألياف البصرية',
        tools: 'الأدوات',
        ai: 'الذكاء الاصطناعي'
      },
      common: {
        language: 'اللغة',
        selectLanguage: 'تغيير اللغة'
      },
      network: {
        online: 'متصل',
        offline: 'غير متصل',
        syncing: 'جاري المزامنة...',
        syncPending: 'مزامنة معلقة',
        offlineMode: 'وضع عدم الاتصال',
        clickToSync: 'انقر للمزامنة الآن',
        clickToReconnect: 'انقر لمحاولة إعادة الاتصال'
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        fiberOptic: 'Fiber Optic',
        tools: 'Tools',
        ai: 'AI Assistant'
      },
      common: {
        language: 'Language',
        selectLanguage: 'Select Language'
      },
      network: {
        online: 'Online',
        offline: 'Offline',
        syncing: 'Syncing...',
        syncPending: 'Sync Pending',
        offlineMode: 'Offline Mode',
        clickToSync: 'Click to sync now',
        clickToReconnect: 'Click to reconnect'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
