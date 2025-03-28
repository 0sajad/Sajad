
import { useState, useEffect, useCallback } from 'react';
import { useAppState } from './state/use-app-state';

interface PerformanceMetrics {
  fpsCapped: boolean;
  memoryUsage: number;
  renderTime: number;
  interactionTime: number;
}

/**
 * خطاف لتحسين أداء التطبيق وفقًا لقدرات الجهاز
 */
export function usePerformanceOptimization() {
  const { deviceTier, setDeviceTier, isLowEndDevice, optimizeForLowEndDevice } = useAppState();
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fpsCapped: false,
    memoryUsage: 0,
    renderTime: 0,
    interactionTime: 0
  });
  
  // التعرف على قدرات الجهاز
  useEffect(() => {
    const detectDeviceCapabilities = async () => {
      // سلسلة من الاختبارات لتحديد مستوى أداء الجهاز
      let tier: 'low' | 'medium' | 'high' = 'medium';
      
      // 1. فحص إذا كان وضع توفير البطارية مفعلاً (إذا كان متاحًا)
      const isBatteryOptimized = 'getBattery' in navigator && 
        await navigator.getBattery().then(battery => battery.charging === false && battery.level < 0.15);
      
      // 2. فحص عدد النوى المنطقية للمعالج (إذا كان متاحًا)
      const cpuCores = navigator.hardwareConcurrency || 0;
      
      // 3. فحص نوع الجهاز (موبايل، تابلت، سطح مكتب)
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // 4. فحص حجم الذاكرة (إذا كان متاحًا)
      const hasLimitedMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
      
      // 5. اختبار أساسي للأداء
      const performanceTestStart = performance.now();
      let counter = 0;
      for (let i = 0; i < 1000000; i++) {
        counter++;
      }
      const performanceTestDuration = performance.now() - performanceTestStart;
      
      // تحديد مستوى الجهاز بناءً على المعايير
      if (
        (isMobile && (hasLimitedMemory || cpuCores <= 4)) || 
        isBatteryOptimized || 
        performanceTestDuration > 50 || 
        (navigator as any).connection?.saveData
      ) {
        tier = 'low';
      } else if (
        cpuCores >= 8 && 
        !isMobile && 
        performanceTestDuration < 15
      ) {
        tier = 'high';
      }
      
      // تعيين مستوى الجهاز في الحالة
      setDeviceTier(tier);
      
      // تطبيق التحسينات للأجهزة منخفضة الأداء
      if (tier === 'low') {
        optimizeForLowEndDevice();
      }
      
      // حفظ نتيجة الاختبار في التخزين المحلي لتجنب تكرار الاختبار
      localStorage.setItem('device-tier', tier);
      localStorage.setItem('device-benchmark-date', new Date().toISOString());
    };
    
    // التحقق مما إذا كان هناك اختبار سابق وما إذا كان لا يزال صالحًا
    const storedTier = localStorage.getItem('device-tier');
    const benchmarkDate = localStorage.getItem('device-benchmark-date');
    const benchmarkAge = benchmarkDate 
      ? (new Date().getTime() - new Date(benchmarkDate).getTime()) / (1000 * 60 * 60 * 24)
      : 9999;
    
    // إعادة الاختبار كل 7 أيام أو إذا لم يكن هناك اختبار سابق
    if (!storedTier || benchmarkAge > 7) {
      detectDeviceCapabilities();
    } else {
      // استخدام القيمة المخزنة
      setDeviceTier(storedTier as 'low' | 'medium' | 'high');
      if (storedTier === 'low') {
        optimizeForLowEndDevice();
      }
    }
  }, [setDeviceTier, optimizeForLowEndDevice]);
  
  // مراقبة الأداء خلال استخدام التطبيق
  useEffect(() => {
    let frameCount = 0;
    let lastFrameTime = performance.now();
    let fpsCheckInterval: number;
    
    // قياس عدد الإطارات في الثانية (FPS)
    const checkFPS = () => {
      const now = performance.now();
      const elapsed = now - lastFrameTime;
      const currentFps = frameCount / (elapsed / 1000);
      
      // تحديث المقاييس
      setMetrics(prev => ({
        ...prev,
        fpsCapped: currentFps < 30
      }));
      
      // إعادة ضبط القياس
      frameCount = 0;
      lastFrameTime = now;
    };
    
    // تسجيل عدد الإطارات
    const countFrame = () => {
      frameCount++;
      requestAnimationFrame(countFrame);
    };
    
    // بدء القياس
    if (!isLowEndDevice) {
      requestAnimationFrame(countFrame);
      fpsCheckInterval = window.setInterval(checkFPS, 2000);
    }
    
    // تنظيف
    return () => {
      clearInterval(fpsCheckInterval);
    };
  }, [isLowEndDevice]);
  
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
        return url.toString();
      } else if (deviceTier === 'medium') {
        // جودة متوسطة
        url.searchParams.set('q', String(quality || 80));
        if (width) {
          url.searchParams.set('w', String(width));
        }
        return url.toString();
      }
      
      // لا تغيير للأجهزة عالية الأداء
      return src;
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
    deviceTier,
    isLowPerformanceDevice: deviceTier === 'low',
    metrics,
    optimizeImageSrc,
    shouldUseAdvancedAnimations,
    shouldUseLazyLoading
  };
}
