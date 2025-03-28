
import { useEffect } from 'react';
import { usePerformanceOptimization } from './usePerformanceOptimization';

/**
 * خطاف لتطبيق تحسينات واجهة المستخدم بناءً على قدرات الجهاز
 */
export function useUIOptimizations() {
  const { 
    deviceTier, 
    isLowPerformanceDevice, 
    shouldUseAdvancedAnimations 
  } = usePerformanceOptimization();
  
  // تطبيق تحسينات واجهة المستخدم استنادًا إلى أداء الجهاز
  useEffect(() => {
    // إضافة فئة CSS للجسم بناءً على مستوى الجهاز
    document.body.classList.remove('device-high', 'device-medium', 'device-low');
    document.body.classList.add(`device-${deviceTier}`);
    
    // إضافة فئة للأجهزة منخفضة الأداء
    if (isLowPerformanceDevice) {
      document.body.classList.add('optimize-performance');
      document.documentElement.style.setProperty('--animation-duration', '0.1');
    } else {
      document.body.classList.remove('optimize-performance');
      document.documentElement.style.removeProperty('--animation-duration');
    }
    
    // تعطيل الرسوم المتحركة المتقدمة إذا لزم الأمر
    if (!shouldUseAdvancedAnimations()) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
    
    return () => {
      // تنظيف الفئات عند إلغاء تحميل المكون
      document.body.classList.remove('device-high', 'device-medium', 'device-low', 'optimize-performance', 'reduced-motion');
      document.documentElement.style.removeProperty('--animation-duration');
    };
  }, [deviceTier, isLowPerformanceDevice, shouldUseAdvancedAnimations]);
  
  // إضافة موجه CSS للتحكم في جودة عرض الحدود والظلال
  useEffect(() => {
    if (isLowPerformanceDevice) {
      const styleElement = document.createElement('style');
      styleElement.id = 'performance-optimizations';
      styleElement.textContent = `
        .optimize-performance * {
          box-shadow: none !important;
          text-shadow: none !important;
          backdrop-filter: none !important;
          border-radius: 4px !important;
        }
        .optimize-performance .glass-effect {
          background-color: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: none !important;
        }
        .optimize-performance .shadow {
          box-shadow: none !important;
        }
      `;
      document.head.appendChild(styleElement);
      
      return () => {
        const element = document.getElementById('performance-optimizations');
        if (element) {
          element.remove();
        }
      };
    }
  }, [isLowPerformanceDevice]);
  
  return {
    deviceTier,
    isLowPerformanceDevice,
    shouldUseAdvancedAnimations,
  };
}
