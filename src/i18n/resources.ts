
// Import resources directly from JSON files instead of modules
import * as enTranslation from '../locales/en/translation.json';
import * as enCommon from '../locales/en/common.json';
import * as enNetwork from '../locales/en/network.json';
import * as enDashboard from '../locales/en/dashboard.json';
import * as enAi from '../locales/en/ai.json';
import * as enAiAssistant from '../locales/en/aiAssistant.json';
import * as enAiFeatures from '../locales/en/aiFeatures.json';
import * as enHelpCenter from '../locales/en/helpCenter.json';
import * as enCommunicationTools from '../locales/en/communicationTools.json';
import * as enNetworkTools from '../locales/en/networkTools.json';
import * as enSettings from '../locales/en/settings.json';
import * as enSecurityStatus from '../locales/en/securityStatus.json';

import * as arTranslation from '../locales/ar/translation.json';
import * as arCommon from '../locales/ar/common.json';
import * as arNetwork from '../locales/ar/network.json';
import * as arDashboard from '../locales/ar/dashboard.json';
import * as arAi from '../locales/ar/ai.json';
import * as arAiAssistant from '../locales/ar/aiAssistant.json';
import * as arAiFeatures from '../locales/ar/aiFeatures.json';
import * as arCommunicationTools from '../locales/ar/communicationTools.json';
import * as arNetworkTools from '../locales/ar/networkTools.json';
import * as arSecurityStatus from '../locales/ar/securityStatus.json';

import * as arIqTranslation from '../locales/ar-iq/translation.json';
import * as arIqCommon from '../locales/ar-iq/common.json';
import * as arIqNetwork from '../locales/ar-iq/network.json';
import * as arIqDashboard from '../locales/ar-iq/dashboard.json';
import * as arIqAi from '../locales/ar-iq/ai.json';
import * as arIqAiAssistant from '../locales/ar-iq/aiAssistant.json';
import * as arIqAiFeatures from '../locales/ar-iq/aiFeatures.json';
import * as arIqHelpCenter from '../locales/ar-iq/helpCenter.json';
import * as arIqCommunicationTools from '../locales/ar-iq/communicationTools.json';
import * as arIqNetworkTools from '../locales/ar-iq/networkTools.json';
import * as arIqSecurityStatus from '../locales/ar-iq/securityStatus.json';

import * as frAi from '../locales/fr/ai.json';
import * as frAiAssistant from '../locales/fr/aiAssistant.json';
import * as frCommon from '../locales/fr/common.json';
import * as frCta from '../locales/fr/cta.json';
import * as frNetworkTools from '../locales/fr/networkTools.json';
import * as frSettings from '../locales/fr/settings.json';

import * as jaAi from '../locales/ja/ai.json';
import * as jaAiAssistant from '../locales/ja/aiAssistant.json';
import * as jaAiFeatures from '../locales/ja/aiFeatures.json';
import * as jaCommon from '../locales/ja/common.json';
import * as jaCta from '../locales/ja/cta.json';
import * as jaFooter from '../locales/ja/footer.json';
import * as jaHeader from '../locales/ja/header.json';
import * as jaHelpCenter from '../locales/ja/helpCenter.json';
import * as jaHero from '../locales/ja/hero.json';
import * as jaMobileMenu from '../locales/ja/mobileMenu.json';
import * as jaNetworkTools from '../locales/ja/networkTools.json';
import * as jaSecurityStatus from '../locales/ja/securityStatus.json';
import * as jaSettings from '../locales/ja/settings.json';

import * as zhAi from '../locales/zh/ai.json';
import * as zhAiAssistant from '../locales/zh/aiAssistant.json';
import * as zhCommon from '../locales/zh/common.json';
import * as zhCta from '../locales/zh/cta.json';
import * as zhNetworkTools from '../locales/zh/networkTools.json';

// Define the resources object with all translations
export const resources = {
  en: {
    translation: enTranslation,
    common: enCommon,
    network: enNetwork,
    dashboard: enDashboard,
    ai: enAi,
    aiAssistant: enAiAssistant,
    aiFeatures: enAiFeatures,
    helpCenter: enHelpCenter,
    communicationTools: enCommunicationTools,
    networkTools: enNetworkTools,
    settings: enSettings,
    securityStatus: enSecurityStatus
  },
  ar: {
    translation: arTranslation,
    common: arCommon,
    network: arNetwork,
    dashboard: arDashboard,
    ai: arAi,
    aiAssistant: arAiAssistant,
    aiFeatures: arAiFeatures,
    communicationTools: arCommunicationTools,
    networkTools: arNetworkTools,
    securityStatus: arSecurityStatus
  },
  'ar-iq': {
    translation: arIqTranslation,
    common: arIqCommon,
    network: arIqNetwork,
    dashboard: arIqDashboard,
    ai: arIqAi,
    aiAssistant: arIqAiAssistant,
    aiFeatures: arIqAiFeatures,
    helpCenter: arIqHelpCenter,
    communicationTools: arIqCommunicationTools,
    networkTools: arIqNetworkTools,
    securityStatus: arIqSecurityStatus
  },
  fr: {
    translation: {},
    common: frCommon,
    ai: frAi,
    aiAssistant: frAiAssistant,
    networkTools: frNetworkTools,
    cta: frCta,
    settings: frSettings
  },
  ja: {
    translation: {},
    common: jaCommon,
    ai: jaAi,
    aiAssistant: jaAiAssistant,
    aiFeatures: jaAiFeatures,
    cta: jaCta,
    footer: jaFooter,
    header: jaHeader,
    helpCenter: jaHelpCenter,
    hero: jaHero,
    mobileMenu: jaMobileMenu,
    networkTools: jaNetworkTools,
    securityStatus: jaSecurityStatus,
    settings: jaSettings
  },
  zh: {
    translation: {},
    common: zhCommon,
    ai: zhAi,
    aiAssistant: zhAiAssistant,
    cta: zhCta,
    networkTools: zhNetworkTools
  }
};
