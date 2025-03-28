
import { useState, useEffect, useCallback } from 'react';
import { useStore } from './state/useStore';

/**
 * خطاف لتحسين أداء التطبيق بناءً على قدرات الجهاز
 */
export function usePerformanceOptimization() {
  const { deviceTier: savedTier, setDeviceTier } = useStore();
  const [deviceTier, setLocalDeviceTier] = useState<'high' | 'medium' | 'low'>(savedTier || 'medium');
  const [isInitialized, setIsInitialized] = useState(false);
  
  // تقييم قدرة الجهاز
  useEffect(() => {
    if (isInitialized) return;
    
    const detectDeviceCapabilities = () => {
      // قياس معايير أداء الجهاز
      const memory = (navigator as any)?.deviceMemory || 4; // إذا لم يكن مدعومًا، نفترض 4GB
      const processor = navigator?.hardwareConcurrency || 4; // إذا لم يكن مدعومًا، نفترض 4 أنوية
      
      // تحقق من ميزات البطارية إذا كانت متوفرة
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      
      // تحديد مستوى الجهاز
      let tier: 'high' | 'medium' | 'low';
      if (memory <= 2 || processor <= 2 || (isMobile && memory <= 4)) {
        tier = 'low';
      } else if (memory >= 8 && processor >= 6 && !isMobile) {
        tier = 'high';
      } else {
        tier = 'medium';
      }
      
      // حفظ مستوى الجهاز
      setLocalDeviceTier(tier);
      setDeviceTier(tier);
      setIsInitialized(true);
    };
    
    detectDeviceCapabilities();
    
    // إعادة التقييم عند تغيير حجم الشاشة (محتمل تغيير في الجهاز)
    window.addEventListener('resize', detectDeviceCapabilities);
    
    return () => {
      window.removeEventListener('resize', detectDeviceCapabilities);
    };
  }, [isInitialized, setDeviceTier]);
  
  // تحسين مصدر الصورة
  const optimizeImageSrc = useCallback((src: string | undefined, width?: number, quality?: number): string => {
    // التحقق من وجود المصدر وأنه نص
    if (!src || typeof src !== 'string') return '';
    
    // لا نقوم بتحسين مصادر البيانات المضمنة
    if (src.startsWith('data:')) return src;
    
    try {
      const url = new URL(src, window.location.origin);
      
      // إضافة معامل العرض إذا كان محدداً
      if (width) {
        url.searchParams.set('w', width.toString());
      }
      
      // إضافة معامل الجودة حسب مستوى الجهاز إذا لم يتم تحديده
      if (!quality) {
        const deviceQuality = deviceTier === 'low' ? 60 : deviceTier === 'medium' ? 80 : 100;
        url.searchParams.set('q', deviceQuality.toString());
      } else {
        url.searchParams.set('q', quality.toString());
      }
      
      // إضافة معامل تنسيق الصورة
      if (deviceTier === 'low') {
        // استخدم تنسيق WebP للأجهزة منخفضة الأداء إذا كان المتصفح يدعمه
        const supportsWebP = document.createElement('canvas')
          .toDataURL('image/webp')
          .indexOf('data:image/webp') === 0;
        
        if (supportsWebP) {
          url.searchParams.set('fm', 'webp');
        }
      }
      
      return url.toString();
    } catch (error) {
      // في حالة حدوث خطأ، أعد المصدر الأصلي
      return src;
    }
  }, [deviceTier]);
  
  // تحديد ما إذا كان يجب استخدام التحميل الكسول
  const shouldUseLazyLoading = useCallback(() => {
    return true; // دائماً استخدم التحميل الكسول للتحسين
  }, []);
  
  // تحديد ما إذا كان يجب استخدام الرسوم المتحركة المتقدمة
  const shouldUseAdvancedAnimations = useCallback(() => {
    // عدم استخدام الرسوم المتحركة المتقدمة على الأجهزة منخفضة الأداء
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return !prefersReducedMotion && deviceTier !== 'low';
  }, [deviceTier]);
  
  // قائمة بالمكونات الثقيلة لتحميلها بكسل
  const getHeavyComponents = useCallback(() => {
    return [
      'AIFeatures',
      'RealTimeMonitoring',
      'DataVisualization',
      'MapComponent',
      'VideoPlayer',
      'ChartComponent'
    ];
  }, []);
  
  return {
    deviceTier,
    isLowPerformanceDevice: deviceTier === 'low',
    isMediumPerformanceDevice: deviceTier === 'medium',
    isHighPerformanceDevice: deviceTier === 'high',
    optimizeImageSrc,
    shouldUseLazyLoading,
    shouldUseAdvancedAnimations,
    getHeavyComponents
  };
}
