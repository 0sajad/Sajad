
// استيراد ملفات اليابانية المقسمة
import jaHeader from '../../locales/ja/header.json';
import jaMobileMenu from '../../locales/ja/mobileMenu.json';
import jaHero from '../../locales/ja/hero.json';
import jaSettings from '../../locales/ja/settings.json';
import jaCta from '../../locales/ja/cta.json';
import jaFooter from '../../locales/ja/footer.json';
import jaAiFeatures from '../../locales/ja/aiFeatures.json';
import jaSecurityStatus from '../../locales/ja/securityStatus.json';
import jaNetworkTools from '../../locales/ja/networkTools.json';
import jaHelpCenter from '../../locales/ja/helpCenter.json';
import jaAi from '../../locales/ja/ai.json';
import jaAiAssistant from '../../locales/ja/aiAssistant.json';
import jaConfig from '../../locales/ja/config.json';
import jaCommonExtra from '../../locales/ja/common.json';

export function loadJapaneseResources() {
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

  return {
    common: jaCommon
  };
}
