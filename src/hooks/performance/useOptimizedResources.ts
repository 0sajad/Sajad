
import { useCallback } from 'react';
import { DeviceTier } from './useDeviceDetection';

export interface OptimizeImageOptions {
  width?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
}

/**
 * خطاف لتحسين الموارد (الصور، الفيديو، إلخ) بناءً على قدرات الجهاز
 */
export function useOptimizedResources(deviceTier: DeviceTier, metrics: { fpsCapped: boolean }) {
  // تحسين مصادر الصور
  const optimizeImageSrc = useCallback((src: string, width?: number, quality?: number) => {
    if (!src) return src;
    
    // تجاهل الصور المضمنة
    if (src.startsWith('data:')) return src;
    
    // إذا كان المصدر URL كاملاً
    try {
      const url = new URL(src);
      
      // تطبيق معايير مختلفة بناءً على مستوى الجهاز
      if (deviceTier === 'low') {
        // استخدام جودة منخفضة للأجهزة منخفضة الأداء
        url.searchParams.set('q', String(quality || 60));
        if (width) {
          url.searchParams.set('w', String(Math.round(width * 0.8)));
        }
        // تفضيل تنسيق WEBP للأجهزة منخفضة الأداء
        url.searchParams.set('fm', 'webp');
        return url.toString();
      } else if (deviceTier === 'medium') {
        // جودة متوسطة
        url.searchParams.set('q', String(quality || 80));
        if (width) {
          url.searchParams.set('w', String(width));
        }
        return url.toString();
      }
      
      // للأجهزة عالية الأداء، استخدم الجودة العالية
      if (quality) {
        url.searchParams.set('q', String(quality));
      }
      if (width) {
        url.searchParams.set('w', String(width));
      }
      
      return url.toString();
    } catch (e) {
      // إذا لم يكن URL صالحًا، أعد المصدر كما هو
      return src;
    }
  }, [deviceTier]);
  
  // تحديد ما إذا كان يجب استخدام الرسوم المتحركة المتقدمة
  const shouldUseAdvancedAnimations = useCallback(() => {
    // استخدام الرسوم المتحركة فقط للأجهزة متوسطة وعالية الأداء
    // وأيضًا مراعاة تفضيلات المستخدم لتقليل الحركة
    return (
      deviceTier !== 'low' && 
      !metrics.fpsCapped && 
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, [deviceTier, metrics.fpsCapped]);
  
  // تحديد ما إذا كان يجب استخدام التحميل الكسول
  const shouldUseLazyLoading = useCallback(() => {
    return true; // دائمًا استخدم التحميل الكسول، حتى للأجهزة عالية الأداء
  }, []);
  
  return {
    optimizeImageSrc,
    shouldUseAdvancedAnimations,
    shouldUseLazyLoading
  };
}
