
// استيراد ملفات الصينية
import zhCommon from '../../locales/zh/common.json';
import zhConfig from '../../locales/zh/config.json';
import zhAi from '../../locales/zh/ai.json';
import zhAiAssistant from '../../locales/zh/aiAssistant.json';
import zhCta from '../../locales/zh/cta.json';
import zhNetworkTools from '../../locales/zh/networkTools.json';

export function loadChineseResources() {
  return {
    common: {
      ...zhCommon,
      ai: zhAi,
      aiAssistant: zhAiAssistant,
      cta: zhCta,
      networkTools: zhNetworkTools,
      ...zhConfig
    },
    license: {},
    access: {},
    settings: {}
  };
}
