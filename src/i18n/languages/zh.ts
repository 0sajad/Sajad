// Chinese language resources
export function loadChineseResources() {
  return {
    translation: { /* Chinese translations will be added here */ },
    common: require('../../locales/zh/common.json'),
    ai: require('../../locales/zh/ai.json'),
    aiAssistant: require('../../locales/zh/aiAssistant.json'),
    cta: require('../../locales/zh/cta.json'),
    networkTools: require('../../locales/zh/networkTools.json'),
    config: require('../../locales/zh/config.json')
  };
}
