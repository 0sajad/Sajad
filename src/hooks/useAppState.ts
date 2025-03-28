
/**
 * هذا الملف مخصص للتوافق الخلفي
 * يستورد ويصدر الوظائف من الهيكل الجديد
 */

// توحيد التصدير من مستودعات الحالة
export { 
  useAppState,
  useNetworkStatus,
  useAppPreferences,
  useDataLoading
} from './state';

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
