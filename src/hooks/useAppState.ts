
/**
 * هذا الملف مخصص للتوافق الخلفي
 * يستورد ويصدر الوظائف من الهيكل الجديد
 */

// توحيد التصدير من مستودعات الحالة
export { 
  useAppState,
} from './state/use-app-state';

export { 
  useNetworkStatus,
} from './state/network-state';

export { 
  useAppPreferences 
} from './state';

// For backward compatibility
export const useDataLoading = () => {
  return {
    isLoading: false,
    lastUpdated: null,
    error: null
  };
};

// تصدير مستودع useStore للتوافق الخلفي
export { useStore } from './state/useStore';

// تصدير أنواع الحالة
export type { 
  AppState, 
  UserState, 
  UIState, 
  NetworkState, 
  PerformanceState,
  AppStatusState,
  PreferencesState,
  AccessibilityState,
  CacheState,
  StoreState
} from './state/types';
