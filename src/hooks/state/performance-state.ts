
import { StateCreator } from 'zustand';
import { AppState, PerformanceState } from './types';

/**
 * مخزن حالة الأداء
 * يحتوي على الوظائف المتعلقة بإدارة أداء التطبيق وتحسينه
 */
export const createPerformanceSlice: StateCreator<
  AppState,
  [],
  [],
  PerformanceState
> = (set, get, _store) => ({
  // حالة الأداء
  deviceTier: 'medium',
  isLowEndDevice: false,
  
  // وظائف تعديل الحالة
  setDeviceTier: (tier) => set({ 
    deviceTier: tier,
    isLowEndDevice: tier === 'low'
  }),
  
  // تحسين التطبيق للأجهزة ذات الأداء المنخفض
  optimizeForLowEndDevice: () => {
    set({ 
      deviceTier: 'low',
      isLowEndDevice: true
    });
    
    // تطبيق التفضيلات المحسنة للأداء المنخفض
    const { setPreference } = get();
    setPreference('animations', false);
    setPreference('reducedMotion', true);
    setPreference('compactMode', true);
  },
  
  // استعادة إعدادات الأداء الافتراضية
  restoreDefaultPerformance: () => {
    set({ 
      deviceTier: 'medium',
      isLowEndDevice: false
    });
  }
});
