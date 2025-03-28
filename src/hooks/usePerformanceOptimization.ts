
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useStore } from '@/hooks/state/useStore';

// أنواع تصنيف أداء الأجهزة
type DeviceTier = 'low' | 'medium' | 'high';

/**
 * هذا الخطاف يوفر وظائف لتحسين الأداء استنادًا إلى قدرات الجهاز
 */
export function usePerformanceOptimization() {
  const { t } = useTranslation();
  const [deviceTier, setDeviceTier] = useState<DeviceTier>('medium');
  const [isLowPerformanceDevice, setIsLowPerformanceDevice] = useState(false);
  
  // استخدام مخزن الحالة العام إذا كان متوفرًا
  const storeDeviceTier = useStore(state => state.deviceTier);
  const setStoreDeviceTier = useStore(state => state.setDeviceTier);
  
  // اكتشاف قدرات الجهاز عند التحميل
  useEffect(() => {
    // استخدم القيمة المخزنة إذا كانت موجودة
    if (storeDeviceTier) {
      setDeviceTier(storeDeviceTier as DeviceTier);
      setIsLowPerformanceDevice(storeDeviceTier === 'low');
      return;
    }
    
    // تحديد قدرة الجهاز
    const detectDeviceCapabilities = () => {
      // عدد أنوية المعالج (افتراضي 4 إذا لم يتم دعمه)
      const cpuCores = navigator.hardwareConcurrency || 4;
      
      // تحديد أداء الجهاز بناءً على عدة عوامل
      const isLowEnd = 
        cpuCores <= 2 || 
        /Android [4-6]/.test(navigator.userAgent) || 
        /iPhone OS [7-9]_/.test(navigator.userAgent) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      const isHighEnd =
        cpuCores >= 6 &&
        !(/Android/.test(navigator.userAgent) || /iPhone OS/.test(navigator.userAgent)) &&
        window.matchMedia('(min-device-pixel-ratio: 2)').matches;
      
      // تعيين مستوى قدرة الجهاز
      const tier: DeviceTier = isLowEnd ? 'low' : isHighEnd ? 'high' : 'medium';
      setDeviceTier(tier);
      setIsLowPerformanceDevice(tier === 'low');
      
      // حفظ في مخزن الحالة إذا كان متاحًا
      if (setStoreDeviceTier) {
        setStoreDeviceTier(tier);
      }
      
      // إظهار إشعار للمستخدم إذا كان الجهاز منخفض الأداء
      if (tier === 'low') {
        setTimeout(() => {
          toast.info(
            t('performance.optimized', 'تم تحسين الأداء'),
            {
              description: t('performance.optimizedForDevice', 'تم تحسين التطبيق ليعمل بشكل أفضل على جهازك'),
              duration: 5000,
            }
          );
          
          // إضافة فئة CSS لتطبيق تحسينات الأداء
          document.documentElement.classList.add('optimize-performance');
        }, 2000);
      }
    };
    
    // استدعاء وظيفة الكشف
    detectDeviceCapabilities();
    
    // تنظيف
    return () => {
      if (isLowPerformanceDevice) {
        document.documentElement.classList.remove('optimize-performance');
      }
    };
  }, [storeDeviceTier, setStoreDeviceTier, isLowPerformanceDevice, t]);
  
  /**
   * تحسين مصدر الصورة استنادًا إلى قدرات الجهاز
   * تعديل حجم الصورة وضبط جودتها تلقائيًا
   */
  const optimizeImageSrc = useCallback((src: string, width?: number): string => {
    // التعامل مع الصور الخارجية فقط
    if (!src.startsWith('http') || src.includes('data:image')) {
      return src;
    }
    
    // تعديل حجم الصورة اعتمادًا على قدرة الجهاز
    let quality = deviceTier === 'low' ? 60 : deviceTier === 'medium' ? 80 : 90;
    let targetWidth = width;
    
    // إذا لم يتم تحديد العرض، فاستخدم قيم افتراضية حسب نوع الجهاز
    if (!targetWidth) {
      targetWidth = deviceTier === 'low' ? 800 : deviceTier === 'medium' ? 1200 : 1600;
    }
    
    // إذا كانت الصورة من Unsplash أو Cloudinary أو مصادر تدعم معلمات التحجيم
    if (src.includes('unsplash.com')) {
      return src.includes('?') 
        ? `${src}&w=${targetWidth}&q=${quality}&auto=format` 
        : `${src}?w=${targetWidth}&q=${quality}&auto=format`;
    }
    
    // إذا كانت الصورة من Cloudinary
    if (src.includes('cloudinary.com')) {
      return src.replace('/upload/', `/upload/w_${targetWidth},q_${quality},f_auto/`);
    }
    
    // عودة بالمصدر الأصلي إذا لم يكن يدعم التحسين
    return src;
  }, [deviceTier]);
  
  /**
   * تحديد ما إذا كان يجب استخدام التحميل الكسول بناءً على قدرات الجهاز
   */
  const shouldUseLazyLoading = useCallback(() => {
    return !window.matchMedia('(prefers-reduced-data: reduce)').matches;
  }, []);
  
  return {
    deviceTier,
    isLowPerformanceDevice,
    optimizeImageSrc,
    shouldUseLazyLoading
  };
}
