
import { useAppState } from './use-app-state';

/**
 * خطاف مساعد للتعامل مع حالة الشبكة
 */
export function useNetworkStatus() {
  const isOnline = useAppState(state => state.isOnline);
  const isConnected = useAppState(state => state.isConnected);
  const lastCheck = useAppState(state => state.lastCheck);
  const checkConnection = useAppState(state => state.checkConnection);
  
  return { 
    isOnline,
    isConnected,
    lastCheck,
    checkConnection
  };
}

/**
 * خطاف مساعد للتعامل مع تفضيلات التطبيق
 */
export function useAppPreferences() {
  const preferences = useAppState(state => state.preferences);
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
export function useDataLoading(key: string = 'global') {
  const isLoading = useAppState(state => state.isLoading[key] || false);
  const error = useAppState(state => state.errors[key] || null);
  const setIsLoading = useAppState(state => state.setIsLoading);
  const setError = useAppState(state => state.setError);
  
  return {
    isLoading,
    error,
    startLoading: () => setIsLoading(key, true),
    stopLoading: () => setIsLoading(key, false),
    setError: (errorMessage: string | null) => setError(key, errorMessage),
    clearError: () => setError(key, null),
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
    setSoundFeedback,
    
    // وظائف مساعدة
    toggleHighContrast: () => setHighContrast(!highContrast),
    toggleLargeText: () => setLargeText(!largeText),
    toggleReducedMotion: () => setReducedMotion(!reducedMotion),
    toggleFocusMode: () => setFocusMode(!focusMode),
    toggleReadingGuide: () => setReadingGuide(!readingGuide),
    toggleDyslexicFont: () => setDyslexicFont(!dyslexicFont),
    toggleSoundFeedback: () => setSoundFeedback(!soundFeedback),
  };
}

/**
 * خطاف مساعد للتعامل مع أداء التطبيق
 */
export function usePerformanceState() {
  const deviceTier = useAppState(state => state.deviceTier);
  const isLowEndDevice = useAppState(state => state.isLowEndDevice);
  const setDeviceTier = useAppState(state => state.setDeviceTier);
  const optimizeForLowEndDevice = useAppState(state => state.optimizeForLowEndDevice);
  const restoreDefaultPerformance = useAppState(state => state.restoreDefaultPerformance);
  
  return {
    deviceTier,
    isLowEndDevice,
    setDeviceTier,
    optimizeForLowEndDevice,
    restoreDefaultPerformance,
  };
}
