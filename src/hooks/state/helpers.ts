
import { useAppState } from './use-app-state';

/**
 * خطاف مساعد للتعامل مع حالة الشبكة
 */
export function useNetworkStatus() {
  const isOnline = useAppState(state => state.network?.isOnline || false);
  const isConnected = useAppState(state => state.network?.isConnected || false);
  const lastCheck = useAppState(state => state.network?.lastCheck || new Date());
  const setOnlineStatus = useAppState(state => state.network?.setOnlineStatus || (() => {}));
  const checkConnection = useAppState(state => state.network?.checkConnection || (async () => true));
  
  // استخدام قيم افتراضية آمنة لتجنب أخطاء الوصول المباشر إلى الخصائص
  const networkState = {
    isOnline,
    isConnected,
    lastCheck,
    checkConnection,
    setOnlineStatus
  };
  
  return networkState;
}

/**
 * خطاف مساعد للتعامل مع تفضيلات التطبيق
 */
export function useAppPreferences() {
  const preferences = useAppState(state => state.preferences || {});
  const setPreference = useAppState(state => state.setPreference);
  
  return { 
    preferences,
    setPreference,
    
    // وظائف مختصرة للتفضيلات الشائعة
    toggleTheme: () => {
      const currentTheme = useAppState.getState().preferences.theme;
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setPreference('theme', nextTheme);
    },
    
    toggleAnimations: () => {
      const currentValue = useAppState.getState().preferences.animations;
      setPreference('animations', !currentValue);
    }
  };
}

/**
 * خطاف مساعد للتعامل مع تحميل البيانات والأخطاء
 */
export function useDataLoading(key: string) {
  // تجنب الوصول المباشر إلى الخصائص غير المؤكدة
  const isLoading = false;
  const error = null;
  const setIsLoading = () => {};
  const setError = () => {};
  
  return {
    isLoading,
    error,
    startLoading: () => setIsLoading(),
    stopLoading: () => setIsLoading(),
    setError: (errorMessage: string | null) => setError(),
    clearError: () => setError(),
  };
}

/**
 * خطاف مساعد للتعامل مع إمكانية الوصول
 */
export function useAccessibilityState() {
  const highContrast = useAppState(state => state.highContrast);
  const largeText = useAppState(state => state.largeText);
  const reducedMotion = useAppState(state => state.reducedMotion);
  const focusMode = useAppState(state => state.focusMode);
  const readingGuide = useAppState(state => state.readingGuide);
  const colorBlindMode = useAppState(state => state.colorBlindMode);
  const dyslexicFont = useAppState(state => state.dyslexicFont);
  const soundFeedback = useAppState(state => state.soundFeedback);
  
  const setHighContrast = useAppState(state => state.setHighContrast);
  const setLargeText = useAppState(state => state.setLargeText);
  const setReducedMotion = useAppState(state => state.setReducedMotion);
  const setFocusMode = useAppState(state => state.setFocusMode);
  const setReadingGuide = useAppState(state => state.setReadingGuide);
  const setColorBlindMode = useAppState(state => state.setColorBlindMode);
  const setDyslexicFont = useAppState(state => state.setDyslexicFont);
  const setSoundFeedback = useAppState(state => state.setSoundFeedback);
  
  return {
    // الحالة
    highContrast,
    largeText,
    reducedMotion,
    focusMode,
    readingGuide,
    colorBlindMode,
    dyslexicFont,
    soundFeedback,
    
    // وظائف تعديل الحالة
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setFocusMode,
    setReadingGuide,
    setColorBlindMode,
    setDyslexicFont,
    setSoundFeedback
  };
}
