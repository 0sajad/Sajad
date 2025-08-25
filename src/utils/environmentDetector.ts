
/**
 * كاشف بيئة التشغيل - إصدار الويب فقط
 * يحدد نوع البيئة المستخدمة (GitHub Pages أو موقع عادي)
 */

export const isWebVersion = (): boolean => {
  return true; // دائماً نسخة ويب
};

export const isGitHubPages = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.location.hostname.includes('github.io') || 
           window.location.hostname.includes('github.com');
  }
  return false;
};

export const getWebPlatform = (): 'github-pages' | 'web' => {
  if (isGitHubPages()) return 'github-pages';
  return 'web';
};

// إعدادات مخصصة لبيئة الويب
export const getWebEnvironmentConfig = () => {
  const platform = getWebPlatform();
  
  return {
    platform,
    isWebVersion: true,
    canAccessNetwork: true,
    canShowNotifications: 'Notification' in window,
    hasNetworkAccess: true,
    baseURL: platform === 'github-pages' ? window.location.origin : '/',
    supportedFeatures: {
      networkMonitoring: true,
      aiAssistant: true,
      fiberOptics: true,
      simulation: true
    }
  };
};
