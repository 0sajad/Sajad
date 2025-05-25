
/**
 * كاشف بيئة التشغيل
 * يحدد إذا كان التطبيق يعمل في بيئة Electron أو المتصفح
 */

export const isElectron = (): boolean => {
  // فحص متغيرات النافذة الخاصة بـ Electron
  if (typeof window !== 'undefined') {
    return !!(window as any).electron || !!(window as any).electronAPI;
  }
  
  // فحص user agent
  if (typeof navigator !== 'undefined') {
    return navigator.userAgent.toLowerCase().includes('electron');
  }
  
  return false;
};

export const isGitHubPages = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.location.hostname.includes('github.io');
  }
  return false;
};

export const getPlatform = (): 'electron' | 'web' | 'github-pages' => {
  if (isElectron()) return 'electron';
  if (isGitHubPages()) return 'github-pages';
  return 'web';
};

// إعدادات مخصصة لكل بيئة
export const getEnvironmentConfig = () => {
  const platform = getPlatform();
  
  return {
    platform,
    canAccessFileSystem: platform === 'electron',
    canAccessNetwork: true,
    canShowNotifications: platform !== 'github-pages' || 'Notification' in window,
    hasFullNetworkAccess: platform === 'electron',
    baseURL: platform === 'github-pages' ? window.location.origin : '/'
  };
};
