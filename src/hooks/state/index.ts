
/**
 * هذا الملف مخصص لإعادة تصدير جميع مكونات حالة التطبيق من موقع واحد
 */

// تصدير واجهات برمجة التطبيقات المتعلقة بالحالة
export { useAppState } from './use-app-state';
export { usePreferences } from './use-app-state';
export { useStore } from './useStore';

// تصدير واجهات برمجة الحالة الفرعية
export { useNetworkStatus } from './helpers';
export { useAppPreferences } from './helpers';
export { useDataLoading } from './helpers';

// تصدير الأنواع
export type { AppState } from './types';

