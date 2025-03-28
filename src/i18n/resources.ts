
export type ResourceKey = 
  | 'common'
  | 'securityDashboard'
  | 'networkTools'
  | 'ai'
  | 'aiAssistant'
  | 'cta'
  | 'access'
  | 'license'
  | 'dashboard'
  | 'deviceManager'
  | 'settings'
  | 'systemMonitor'
  | 'aiFeatures'
  | 'helpCenter'
  | 'securityStatus'
  | 'footer'
  | 'hero'
  | 'header'
  | 'mobileMenu'
  | 'accessibility'; // إضافة نمط جديد للترجمات المتعلقة بإمكانية الوصول

export interface TranslationResources {
  [key: string]: {
    [namespace in ResourceKey]?: Record<string, any>;
  };
}
