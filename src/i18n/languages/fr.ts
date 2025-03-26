
// استيراد ملفات الفرنسية
import frCommon from '../../locales/fr/common.json';
import frConfig from '../../locales/fr/config.json';
import frAi from '../../locales/fr/ai.json';
import frAiAssistant from '../../locales/fr/aiAssistant.json';
import frCta from '../../locales/fr/cta.json';
import frSettings from '../../locales/fr/settings.json';
import frNetworkTools from '../../locales/fr/networkTools.json';

export function loadFrenchResources() {
  return {
    common: {
      ...frCommon,
      ai: frAi,
      aiAssistant: frAiAssistant,
      cta: frCta,
      networkTools: frNetworkTools,
      ...frConfig
    },
    license: {},
    access: {},
    settings: frSettings
  };
}
