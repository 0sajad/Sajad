
import { useMemo, useEffect } from 'react';

// استخدام خطاف لتطبيق تحسينات الأداء
export function usePerformanceOptimizations(
  deviceTier: 'low' | 'medium' | 'high',
  isLowEndDevice: boolean
) {
  // تطبيق تحسينات للأجهزة منخفضة الأداء
  useEffect(() => {
    if (isLowEndDevice || deviceTier === 'low') {
      // إضافة فئة CSS عامة لتحسين الأداء
      document.body.classList.add('optimize-performance');
      document.body.classList.add(`device-${deviceTier}`);
      
      // تعطيل الرسوم المتحركة غير الضرورية
      const style = document.createElement('style');
      style.id = 'performance-optimizations';
      style.innerHTML = `
        @media (prefers-reduced-motion: no-preference) {
          .optimize-performance .animated-bg,
          .optimize-performance .parallax,
          .optimize-performance .hover-effect {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.body.classList.remove('optimize-performance');
        document.body.classList.remove(`device-${deviceTier}`);
        const styleElement = document.getElementById('performance-optimizations');
        if (styleElement) {
          styleElement.remove();
        }
      };
    }
  }, [isLowEndDevice, deviceTier]);
  
  // وظائف التحسين المختلفة للاستخدام في المكونات
  const optimizeForLowEndDevice = useMemo(() => {
    return {
      // تقليل عدد العناصر المعروضة في القوائم
      limitListItems: (items: any[], maxItems: number = 10) => {
        if (isLowEndDevice || deviceTier === 'low') {
          return items.slice(0, maxItems);
        }
        if (deviceTier === 'medium') {
          return items.slice(0, maxItems * 2);
        }
        return items;
      },
      
      // تقليل عمق التصيير المتداخل
      shouldRenderComplexComponent: (depth: number = 1) => {
        if (isLowEndDevice && depth > 2) {
          return false;
        }
        if (deviceTier === 'low' && depth > 3) {
          return false;
        }
        if (deviceTier === 'medium' && depth > 5) {
          return false;
        }
        return true;
      },
      
      // تقليل جودة الصور
      getImageQuality: () => {
        if (isLowEndDevice || deviceTier === 'low') {
          return 'low'; // يمكن استخدامها لتحميل صور منخفضة الجودة
        }
        if (deviceTier === 'medium') {
          return 'medium';
        }
        return 'high';
      },
      
      // تحديد ما إذا كان ينبغي استخدام ظلال وتأثيرات متقدمة
      shouldUseAdvancedEffects: () => {
        return !isLowEndDevice && deviceTier !== 'low';
      },
      
      // تحديد ما إذا كان ينبغي استخدام تأثيرات الضبابية (Blur)
      shouldUseBlurEffects: () => {
        return deviceTier === 'high';
      }
    };
  }, [isLowEndDevice, deviceTier]);
  
  return {
    optimizeForLowEndDevice
  };
}
