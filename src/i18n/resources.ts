
import { ResourceKey } from './config';

// English translations
import enCommon from '../locales/en/common.json';
import enConfig from '../locales/en/config.json';
import enSettings from '../locales/en/settings.json';
import enCta from '../locales/en/cta.json';
import enAccess from '../locales/en/access.json';
import enLicense from '../locales/en/license.json';
import enAi from '../locales/en/ai.json';
import enAiAssistant from '../locales/en/aiAssistant.json';
import enNetworkTools from '../locales/en/networkTools.json';
import enHelpCenter from '../locales/en/helpCenter.json';
import enDashboard from '../locales/en/dashboard.json';
import enSystemMonitor from '../locales/en/systemMonitor.json';
import enDeviceManager from '../locales/en/deviceManager.json';
import enSecurityDashboard from '../locales/en/securityDashboard.json';

// Arabic translations
import arCommon from '../locales/ar/common.json';
import arConfig from '../locales/ar/config.json';
import arLicense from '../locales/ar/license.json';
import arCta from '../locales/ar/cta.json';
import arAi from '../locales/ar/ai.json';
import arAiAssistant from '../locales/ar/aiAssistant.json';
import arNetworkTools from '../locales/ar/networkTools.json';
import arAccess from '../locales/ar/access.json';

// Iraqi Arabic translations
import arIqCommon from '../locales/ar-iq/common.json';
import arIqConfig from '../locales/ar-iq/config.json';
import arIqSettings from '../locales/ar-iq/settings.json';
import arIqCta from '../locales/ar-iq/cta.json';
import arIqFooter from '../locales/ar-iq/footer.json';
import arIqHeader from '../locales/ar-iq/header.json';
import arIqHero from '../locales/ar-iq/hero.json';
import arIqLicense from '../locales/ar-iq/license.json';
import arIqMobileMenu from '../locales/ar-iq/mobileMenu.json';
import arIqSecurityStatus from '../locales/ar-iq/securityStatus.json';
import arIqAccess from '../locales/ar-iq/access.json';
import arIqAiFeatures from '../locales/ar-iq/aiFeatures.json';
import arIqAiAssistant from '../locales/ar-iq/aiAssistant.json';
import arIqHelpCenter from '../locales/ar-iq/helpCenter.json';
import arIqNetworkTools from '../locales/ar-iq/networkTools.json';
import arIqDashboard from '../locales/ar-iq/dashboard.json';
import arIqSystemMonitor from '../locales/ar-iq/systemMonitor.json';
import arIqDeviceManager from '../locales/ar-iq/deviceManager.json';
import arIqSecurityDashboard from '../locales/ar-iq/securityDashboard.json';

// French translations
import frCommon from '../locales/fr/common.json';
import frConfig from '../locales/fr/config.json';
import frCta from '../locales/fr/cta.json';
import frNetworkTools from '../locales/fr/networkTools.json';
import frSettings from '../locales/fr/settings.json';
import frAi from '../locales/fr/ai.json';
import frAiAssistant from '../locales/fr/aiAssistant.json';

// Japanese translations
import jaCommon from '../locales/ja/common.json';
import jaConfig from '../locales/ja/config.json';
import jaCta from '../locales/ja/cta.json';
import jaAi from '../locales/ja/ai.json';
import jaAiAssistant from '../locales/ja/aiAssistant.json';
import jaNetworkTools from '../locales/ja/networkTools.json';
import jaSettings from '../locales/ja/settings.json';
import jaFooter from '../locales/ja/footer.json';
import jaHeader from '../locales/ja/header.json';
import jaHero from '../locales/ja/hero.json';
import jaHelpCenter from '../locales/ja/helpCenter.json';
import jaMobileMenu from '../locales/ja/mobileMenu.json';
import jaSecurityStatus from '../locales/ja/securityStatus.json';
import jaAiFeatures from '../locales/ja/aiFeatures.json';

// Chinese translations
import zhCommon from '../locales/zh/common.json';
import zhConfig from '../locales/zh/config.json';
import zhCta from '../locales/zh/cta.json';
import zhNetworkTools from '../locales/zh/networkTools.json';
import zhAi from '../locales/zh/ai.json';
import zhAiAssistant from '../locales/zh/aiAssistant.json';

// Define resources for i18next
export const resources: ResourceKey = {
  en: {
    common: enCommon,
    config: enConfig,
    settings: enSettings,
    cta: enCta,
    access: enAccess,
    license: enLicense,
    ai: enAi,
    aiAssistant: enAiAssistant,
    networkTools: enNetworkTools,
    helpCenter: enHelpCenter,
    dashboard: enDashboard,
    systemMonitor: enSystemMonitor,
    deviceManager: enDeviceManager,
    securityDashboard: enSecurityDashboard
  },
  ar: {
    common: arCommon,
    config: arConfig,
    license: arLicense,
    cta: arCta,
    ai: arAi,
    aiAssistant: arAiAssistant,
    networkTools: arNetworkTools,
    access: arAccess,
  },
  'ar-iq': {
    common: arIqCommon,
    config: arIqConfig,
    settings: arIqSettings,
    cta: arIqCta,
    footer: arIqFooter,
    header: arIqHeader,
    hero: arIqHero,
    license: arIqLicense,
    mobileMenu: arIqMobileMenu,
    securityStatus: arIqSecurityStatus,
    access: arIqAccess,
    aiFeatures: arIqAiFeatures,
    aiAssistant: arIqAiAssistant,
    helpCenter: arIqHelpCenter,
    networkTools: arIqNetworkTools,
    dashboard: arIqDashboard,
    systemMonitor: arIqSystemMonitor,
    deviceManager: arIqDeviceManager,
    securityDashboard: arIqSecurityDashboard
  },
  fr: {
    common: frCommon,
    config: frConfig,
    cta: frCta,
    networkTools: frNetworkTools,
    settings: frSettings,
    ai: frAi,
    aiAssistant: frAiAssistant
  },
  ja: {
    common: jaCommon,
    config: jaConfig,
    cta: jaCta,
    ai: jaAi,
    aiAssistant: jaAiAssistant,
    networkTools: jaNetworkTools,
    settings: jaSettings,
    footer: jaFooter,
    header: jaHeader,
    hero: jaHero,
    helpCenter: jaHelpCenter,
    mobileMenu: jaMobileMenu,
    securityStatus: jaSecurityStatus,
    aiFeatures: jaAiFeatures
  },
  zh: {
    common: zhCommon,
    config: zhConfig,
    cta: zhCta,
    networkTools: zhNetworkTools,
    ai: zhAi,
    aiAssistant: zhAiAssistant
  }
};
