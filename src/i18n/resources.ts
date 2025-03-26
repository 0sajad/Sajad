
// Import all languages
import * as en from '../locales/en';
import * as ar from '../locales/ar';
import * as arIq from '../locales/ar-iq';
import * as fr from '../locales/fr';
import * as ja from '../locales/ja';
import * as zh from '../locales/zh';

// Define the resources object with all translations
export const resources = {
  en: {
    translation: en.translation || {},
    common: en.common || {},
    network: en.network || {},
    dashboard: en.dashboard || {},
    ai: en.ai || {},
    aiAssistant: en.aiAssistant || {},
    aiFeatures: en.aiFeatures || {},
    helpCenter: en.helpCenter || {},
    communicationTools: en.communicationTools || {},
    networkTools: en.networkTools || {},
    settings: en.settings || {},
    securityStatus: en.securityStatus || {}
  },
  ar: {
    translation: ar.translation || {},
    common: ar.common || {},
    network: ar.network || {},
    dashboard: ar.dashboard || {},
    ai: ar.ai || {},
    aiAssistant: ar.aiAssistant || {},
    aiFeatures: ar.aiFeatures || {},
    helpCenter: ar.helpCenter || {},
    communicationTools: ar.communicationTools || {},
    networkTools: ar.networkTools || {},
    settings: ar.settings || {},
    securityStatus: ar.securityStatus || {}
  },
  'ar-iq': {
    translation: arIq.translation || {},
    common: arIq.common || {},
    network: arIq.network || {},
    dashboard: arIq.dashboard || {},
    ai: arIq.ai || {},
    aiAssistant: arIq.aiAssistant || {},
    aiFeatures: arIq.aiFeatures || {},
    helpCenter: arIq.helpCenter || {},
    communicationTools: arIq.communicationTools || {},
    networkTools: arIq.networkTools || {},
    settings: arIq.settings || {},
    securityStatus: arIq.securityStatus || {}
  },
  fr: {
    translation: fr.translation || {},
    common: fr.common || {},
    network: fr.network || {},
    dashboard: fr.dashboard || {},
    ai: fr.ai || {},
    aiAssistant: fr.aiAssistant || {},
    networkTools: fr.networkTools || {},
    settings: fr.settings || {},
    // Add any other namespaces that exist in French
  },
  ja: {
    translation: ja.translation || {},
    common: ja.common || {},
    ai: ja.ai || {},
    aiAssistant: ja.aiAssistant || {},
    aiFeatures: ja.aiFeatures || {},
    config: ja.config || {},
    cta: ja.cta || {},
    footer: ja.footer || {},
    header: ja.header || {},
    helpCenter: ja.helpCenter || {},
    hero: ja.hero || {},
    mobileMenu: ja.mobileMenu || {},
    networkTools: ja.networkTools || {},
    securityStatus: ja.securityStatus || {},
    settings: ja.settings || {}
  },
  zh: {
    translation: zh.translation || {},
    common: zh.common || {},
    ai: zh.ai || {},
    aiAssistant: zh.aiAssistant || {},
    config: zh.config || {},
    cta: zh.cta || {},
    networkTools: zh.networkTools || {}
  }
};
