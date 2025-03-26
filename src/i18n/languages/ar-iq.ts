
// استيراد ملفات ar-iq المقسمة
import arIqHeader from '../../locales/ar-iq/header.json';
import arIqMobileMenu from '../../locales/ar-iq/mobileMenu.json';
import arIqHero from '../../locales/ar-iq/hero.json';
import arIqSettings from '../../locales/ar-iq/settings.json';
import arIqCta from '../../locales/ar-iq/cta.json';
import arIqFooter from '../../locales/ar-iq/footer.json';
import arIqAiFeatures from '../../locales/ar-iq/aiFeatures.json';
import arIqSecurityStatus from '../../locales/ar-iq/securityStatus.json';
import arIqNetworkTools from '../../locales/ar-iq/networkTools.json';
import arIqHelpCenter from '../../locales/ar-iq/helpCenter.json';
import arIqAi from '../../locales/ar-iq/ai.json';
import arIqAiAssistant from '../../locales/ar-iq/aiAssistant.json';
import arIqConfig from '../../locales/ar-iq/config.json';

export function loadIraqiArabicResources() {
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

  return {
    common: arIqCommon
  };
}
