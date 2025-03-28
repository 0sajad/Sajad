
import { useAppState } from './use-app-state';

/**
 * خطاف مساعد للتعامل مع حالة الشبكة
 */
export function useNetworkStatus() {
  const { isOnline } = useAppState();
  
  return { isOnline };
}

/**
 * خطاف مساعد للتعامل مع تفضيلات التطبيق
 */
export function useAppPreferences() {
  const { preferences, setPreference } = useAppState();
  
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
