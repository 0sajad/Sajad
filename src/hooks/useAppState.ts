
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
} from './state/helpers';

export { 
  usePreferences,
  useAppPreferences 
} from './state';

// خطاف استخدام تحميل البيانات للتوافق الخلفي
export const useDataLoading = () => {
  const { useDataLoading } = require('./state/data-state');
  return useDataLoading();
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
