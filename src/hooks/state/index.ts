
/**
 * هذا الملف مخصص لإعادة تصدير جميع مكونات حالة التطبيق من موقع واحد
 */

// تصدير واجهات برمجة التطبيقات المتعلقة بالحالة
export { useAppState } from './use-app-state';
export { usePreferences } from './preferences-state';
export { useStore } from './useStore';
export { createPreferencesSlice } from './preferences-state';

// تصدير واجهات برمجة الحالة الفرعية
export { useNetworkStatus } from './network-state';
export { useAppPreferences } from '../useAppPreferences';
export { useDataLoading } from './data-state';

// تصدير الأنواع
export type { AppState } from './types';
export type { StoreState } from './types';
