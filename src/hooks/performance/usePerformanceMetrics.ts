
import { useState, useEffect, useCallback } from 'react';

/**
 * مقاييس أداء التطبيق التي يتم رصدها
 */
export interface PerformanceMetrics {
  fpsCapped: boolean;
  memoryUsage: number;
  renderTime: number;
  interactionTime: number;
  lastChecked: Date | null;
}

/**
 * خطاف لرصد أداء التطبيق وإرجاع مقاييس الأداء
 */
export function usePerformanceMetrics(isLowEndDevice: boolean) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fpsCapped: false,
    memoryUsage: 0,
    renderTime: 0,
    interactionTime: 0,
    lastChecked: null
  });
  
  // مراقبة الأداء خلال استخدام التطبيق
  useEffect(() => {
    if (isLowEndDevice) {
      // لا تقم بإجراء قياسات كثيفة على الأجهزة منخفضة الأداء
      return;
    }
    
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
        fpsCapped: currentFps < 30,
        lastChecked: new Date()
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
    
    // قياس استخدام الذاكرة إذا كان مدعوماً
    const checkMemoryUsage = () => {
      if ((performance as any).memory) {
        const memoryInfo = (performance as any).memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit,
          lastChecked: new Date()
        }));
      }
    };
    
    // بدء القياس
    requestAnimationFrame(countFrame);
    fpsCheckInterval = window.setInterval(() => {
      checkFPS();
      checkMemoryUsage();
    }, 2000);
    
    // تنظيف
    return () => {
      clearInterval(fpsCheckInterval);
    };
  }, [isLowEndDevice]);
  
  const checkInteractionTime = useCallback((callback: () => void) => {
    const start = performance.now();
    callback();
    const end = performance.now();
    setMetrics(prev => ({
      ...prev,
      interactionTime: end - start,
      lastChecked: new Date()
    }));
  }, []);
  
  return { metrics, checkInteractionTime };
}
