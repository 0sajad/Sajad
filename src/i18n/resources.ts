
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

export interface AccessibilityTranslations {
  title: string;
  description: string;
  a11ySettings: string;
  clickToCustomize: string;
  closeBtnLabel: string;
  menuDescription: string;
  highContrast: string;
  highContrastDescription: string;
  largeText: string;
  largeTextDescription: string;
  reducedMotion: string;
  reducedMotionDescription: string;
  reducedMotionHint: string;
  focusMode: string;
  focusModeDescription: string;
  noFeaturesActive: string;
  activeFeatures: string;
  keyboardShortcuts: string;
  keyboardShortcutsDescription: string;
  enabled: string;
  disabled: string;
  ariaLiveAnnouncement: string;
  skipToContent: string;
  textSettings: string;
  soundSettings: string;
  keyboardSettings: string;
  advancedSettings: string;
  profiles: string;
  saveProfile: string;
  loadProfile: string;
  profileName: string;
  [key: string]: string;
}
