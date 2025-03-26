
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
  | 'hero';

export interface TranslationResources {
  [key: string]: {
    [namespace in ResourceKey]?: Record<string, any>;
  };
}
