
import { useState, useEffect, useCallback } from 'react';
import { useAppState } from './useAppState';

/**
 * خطاف (hook) لتحسين أداء التطبيق على الأجهزة المختلفة
 * يوفر استراتيجيات مختلفة لتحسين الأداء بناءً على قدرات الجهاز
 */
export function usePerformanceOptimization() {
  const [deviceTier, setDeviceTier] = useState<'low' | 'medium' | 'high'>('high');
  const [lastFrameTime, setLastFrameTime] = useState(0);
  const [frameRate, setFrameRate] = useState(60);
  const [memoryUsage, setMemoryUsage] = useState<number | null>(null);
  const { preferences } = useAppState();
  
  // تحديد قدرات الجهاز عند بدء التشغيل
  useEffect(() => {
    detectDeviceCapabilities();
    
    // تحقق مما إذا كان هناك تفضيل محدد مسبقًا للأداء
    const savedPerformanceMode = localStorage.getItem('performance-mode');
    if (savedPerformanceMode && ['low', 'medium', 'high'].includes(savedPerformanceMode)) {
      setDeviceTier(savedPerformanceMode as 'low' | 'medium' | 'high');
    }
    
    // قياس معدل الإطارات (frame rate)
    let frameCount = 0;
    let lastTimestamp = performance.now();
    
    const measureFrameRate = () => {
      frameCount++;
      const now = performance.now();
      setLastFrameTime(now - lastTimestamp);
      lastTimestamp = now;
      
      if (frameCount % 60 === 0) {
        const elapsed = now - lastTimestamp;
        const currentFPS = Math.round(1000 / (elapsed / 60));
        setFrameRate(currentFPS);
        
        // ضبط مستوى الجهاز بناءً على معدل الإطارات
        if (currentFPS < 30 && deviceTier !== 'low') {
          setDeviceTier('low');
        } else if (currentFPS >= 30 && currentFPS < 50 && deviceTier !== 'medium') {
          setDeviceTier('medium');
        }
      }
      
      requestAnimationFrame(measureFrameRate);
    };
    
    const frameId = requestAnimationFrame(measureFrameRate);
    
    // قياس استخدام الذاكرة إذا كان متاحًا
    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory;
      setMemoryUsage(memoryInfo?.usedJSHeapSize || null);
      
      const memoryInterval = setInterval(() => {
        setMemoryUsage((performance as any).memory?.usedJSHeapSize || null);
      }, 10000);
      
      return () => {
        clearInterval(memoryInterval);
        cancelAnimationFrame(frameId);
      };
    }
    
    return () => cancelAnimationFrame(frameId);
  }, []);
  
  // تحديد قدرات الجهاز
  const detectDeviceCapabilities = () => {
    // تحقق من عدد النوى (إذا كان متاحًا)
    const cpuCores = navigator.hardwareConcurrency || 4;
    
    // تحقق من دقة الشاشة
    const pixelRatio = window.devicePixelRatio || 1;
    const screenWidth = window.screen.width * pixelRatio;
    const screenHeight = window.screen.height * pixelRatio;
    const totalPixels = screenWidth * screenHeight;
    
    // تقييم مستوى الجهاز بناءً على المعلومات المتاحة
    if (cpuCores <= 2 || totalPixels < 1000000) {
      setDeviceTier('low');
    } else if (cpuCores <= 4 || totalPixels < 2000000) {
      setDeviceTier('medium');
    } else {
      setDeviceTier('high');
    }
    
    // تحقق من بعض الإمكانيات الأخرى
    const touchSupported = 'ontouchstart' in window;
    const batteryApiSupported = 'getBattery' in navigator;
    
    // ضبط مستوى الأداء التلقائي للأجهزة المحمولة
    if (touchSupported && window.innerWidth < 768) {
      setDeviceTier('medium');
    }
    
    // ضبط مستوى الأداء بناءً على دعم البطارية
    if (batteryApiSupported) {
      (navigator as any).getBattery().then((battery: any) => {
        if (battery.charging === false && battery.level < 0.2) {
          // إذا كان مستوى البطارية منخفضًا وغير متصل بالشاحن، قم بتقليل الأداء
          setDeviceTier(prev => prev === 'high' ? 'medium' : prev);
        }
      });
    }
  };
  
  // تحديد ما إذا كان يجب استخدام تأثيرات الحركة المتقدمة
  const shouldUseAdvancedAnimations = useCallback(() => {
    // استخدم تفضيلات المستخدم أولاً
    if (preferences.reducedMotion) {
      return false;
    }
    
    // ثم تحقق من مستوى الجهاز
    return deviceTier !== 'low';
  }, [deviceTier, preferences.reducedMotion]);
  
  // تحديد ما إذا كان يجب استخدام التأثيرات البصرية المتقدمة
  const shouldUseAdvancedVisualEffects = useCallback(() => {
    return deviceTier === 'high' && !preferences.reducedMotion;
  }, [deviceTier, preferences.reducedMotion]);
  
  // تحديد ما إذا كان يجب استخدام التحميل البطيء للمكونات
  const shouldUseLazyLoading = useCallback(() => {
    return true; // دائمًا استخدم التحميل البطيء لتحسين الأداء
  }, []);
  
  // تحديد عدد العناصر التي يجب عرضها في القوائم
  const getOptimalItemCount = useCallback(() => {
    if (deviceTier === 'low') {
      return 10;
    } else if (deviceTier === 'medium') {
      return 20;
    } else {
      return 50;
    }
  }, [deviceTier]);
  
  return {
    deviceTier,
    setDeviceTier,
    frameRate,
    memoryUsage,
    shouldUseAdvancedAnimations,
    shouldUseAdvancedVisualEffects,
    shouldUseLazyLoading,
    getOptimalItemCount,
    
    // معلومات إضافية للمطورين
    isLowEndDevice: deviceTier === 'low',
    isMidRangeDevice: deviceTier === 'medium',
    isHighEndDevice: deviceTier === 'high'
  };
}
