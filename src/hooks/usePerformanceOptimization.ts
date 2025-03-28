
import { useEffect, useState, useCallback } from 'react';

interface PerformanceConfig {
  enableLazyLoading: boolean;
  enableImageOptimization: boolean;
  minimalAnimations: boolean;
  reducedJSExecutions: boolean;
  cacheStaticAssets: boolean;
}

/**
 * خطاف لتحسين أداء التطبيق بناءً على قدرات الجهاز
 */
export function usePerformanceOptimization() {
  // تحديد مستوى الجهاز بناءً على معايير الأداء
  const [deviceTier, setDeviceTier] = useState<'high' | 'medium' | 'low'>('medium');
  const [config, setConfig] = useState<PerformanceConfig>({
    enableLazyLoading: true,
    enableImageOptimization: true,
    minimalAnimations: false,
    reducedJSExecutions: false,
    cacheStaticAssets: true,
  });
  
  // تقييم أداء الجهاز
  useEffect(() => {
    const detectDeviceCapabilities = () => {
      // قياس معايير أداء الجهاز
      const memory = (navigator as any)?.deviceMemory || 4; // إذا لم يكن مدعومًا، نفترض 4GB
      const processor = navigator?.hardwareConcurrency || 4; // إذا لم يكن مدعومًا، نفترض 4 أنوية
      const isLowEndDevice = memory <= 2 || processor <= 2;
      const isHighEndDevice = memory >= 8 && processor >= 6;
      
      // وضع "حفظ البطارية" على الأجهزة المحمولة
      const isBatteryMode = 'getBattery' in navigator && (navigator as any).getBattery 
        ? true 
        : false;
      
      // تحديد مستوى الجهاز
      let tier: 'high' | 'medium' | 'low';
      if (isLowEndDevice || (isBatteryMode && window.matchMedia('(max-width: 768px)').matches)) {
        tier = 'low';
      } else if (isHighEndDevice) {
        tier = 'high';
      } else {
        tier = 'medium';
      }
      
      setDeviceTier(tier);
      
      // ضبط التكوين بناءً على مستوى الجهاز
      setConfig({
        enableLazyLoading: true, // دائمًا مفعّل
        enableImageOptimization: true, // دائمًا مفعّل
        minimalAnimations: tier === 'low',
        reducedJSExecutions: tier === 'low',
        cacheStaticAssets: tier !== 'low', // لا نريد استنفاد مساحة التخزين على الأجهزة المنخفضة
      });
    };
    
    detectDeviceCapabilities();
    
    // إعادة التقييم عند تغيير توجه الشاشة (محتمل تغيير في أولويات الأداء)
    window.addEventListener('orientationchange', detectDeviceCapabilities);
    
    return () => {
      window.removeEventListener('orientationchange', detectDeviceCapabilities);
    };
  }, []);
  
  // وظيفة تعيد قيمة بوليانية تشير إلى ما إذا كان يجب استخدام التحميل البطيء
  const shouldUseLazyLoading = useCallback(() => {
    return config.enableLazyLoading;
  }, [config.enableLazyLoading]);
  
  // وظيفة تعيد قيمة بوليانية تشير إلى ما إذا كان يجب استخدام الرسوم المتحركة المتقدمة
  const shouldUseAdvancedAnimations = useCallback(() => {
    return !config.minimalAnimations;
  }, [config.minimalAnimations]);
  
  // وظيفة لتحسين الصور
  const optimizeImageSrc = useCallback((src: string, width?: number): string => {
    if (!config.enableImageOptimization) return src;
    
    // تنفيذ تحسين الصور فقط للصور المستضافة (تجنب API خارجية)
    if (src.startsWith('http') && !src.includes(window.location.hostname)) {
      return src;
    }
    
    // إضافة معلمات التحسين
    const url = new URL(src, window.location.origin);
    if (width) {
      url.searchParams.append('w', width.toString());
    }
    
    // إضافة معلمة الجودة للأجهزة المنخفضة
    if (deviceTier === 'low') {
      url.searchParams.append('q', '70'); // جودة منخفضة للأجهزة الضعيفة
    }
    
    return url.toString();
  }, [config.enableImageOptimization, deviceTier]);
  
  return {
    deviceTier,
    shouldUseLazyLoading,
    shouldUseAdvancedAnimations,
    optimizeImageSrc,
    isLowPerformanceDevice: deviceTier === 'low',
    isMediumPerformanceDevice: deviceTier === 'medium',
    isHighPerformanceDevice: deviceTier === 'high',
  };
}
