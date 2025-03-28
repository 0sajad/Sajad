
import { useEffect, useState } from 'react';
import { usePerformanceOptimization } from './usePerformanceOptimization';
import { ToastManager } from '@/components/notifications/ToastManager';
import { useTranslation } from 'react-i18next';

/**
 * خطاف للتكيف التلقائي مع الأجهزة منخفضة الأداء
 */
export function useLowEndDeviceAdapter() {
  const { t } = useTranslation();
  const { 
    deviceTier, 
    optimizeImageSrc, 
    isLowPerformanceDevice, 
    shouldUseAdvancedAnimations 
  } = usePerformanceOptimization();
  
  const [hasAppliedOptimizations, setHasAppliedOptimizations] = useState(false);
  
  // تطبيق التحسينات تلقائيًا على الأجهزة منخفضة الأداء
  useEffect(() => {
    // التحسين فقط للأجهزة منخفضة الأداء ومرة واحدة
    if (isLowPerformanceDevice && !hasAppliedOptimizations) {
      // إضافة فئة CSS للجسم لتطبيق تحسينات الأداء
      document.body.classList.add('optimize-performance');
      
      // تقليل عدد العناصر المرئية
      const nonEssentialElements = document.querySelectorAll('.non-essential');
      nonEssentialElements.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });
      
      // تحميل الصور بجودة أقل
      const images = document.querySelectorAll('img:not(.essential-image)');
      images.forEach(img => {
        const imgEl = img as HTMLImageElement;
        if (imgEl.src && !imgEl.src.includes('data:')) {
          // استخدام وظيفة تحسين الصور لتقليل الجودة
          const width = imgEl.width || 300;
          imgEl.src = optimizeImageSrc(imgEl.src, width);
        }
      });
      
      // إظهار رسالة للمستخدم
      setTimeout(() => {
        ToastManager.info({
          title: t('performance.lowEndDevice', 'جهاز محدود الأداء'),
          description: t('performance.optimizationsApplied', 'تم تطبيق تحسينات الأداء تلقائيًا لتحسين تجربتك.'),
          duration: 8000,
        });
      }, 2000);
      
      setHasAppliedOptimizations(true);
    }
  }, [isLowPerformanceDevice, hasAppliedOptimizations, optimizeImageSrc, t]);
  
  // مساعد لتقرير ما إذا كان يجب تقديم محتوى ثقيل
  const shouldRenderHeavyContent = () => {
    return deviceTier !== 'low';
  };
  
  // مساعد للحصول على عدد العناصر المناسب للعرض بناءً على قدرة الجهاز
  const getOptimalItemCount = (defaultCount: number): number => {
    switch (deviceTier) {
      case 'low':
        return Math.max(3, Math.floor(defaultCount / 3));
      case 'medium':
        return Math.max(6, Math.floor(defaultCount / 1.5));
      case 'high':
        return defaultCount;
      default:
        return defaultCount;
    }
  };
  
  return {
    deviceTier,
    isLowPerformanceDevice,
    shouldUseAdvancedAnimations,
    shouldRenderHeavyContent,
    getOptimalItemCount,
    hasAppliedOptimizations,
  };
}
