
import { useState, useEffect, useRef } from 'react';

interface PerformanceMetrics {
  fps: number;
  memory: {
    usedHeap: number;
    totalHeap: number;
    limit: number;
  } | null;
  ttfb: number;
  pageLoadTime: number;
  averageInteractionTime: number;
  longestInteraction: number;
}

// استخدام خطاف لمراقبة مقاييس الأداء
export function usePerformanceMetrics(isLowEndDevice: boolean = false) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: null,
    ttfb: 0,
    pageLoadTime: 0,
    averageInteractionTime: 0,
    longestInteraction: 0
  });
  
  const interactionsRef = useRef<number[]>([]);
  const fpsFramesRef = useRef<number[]>([]);
  const lastFrameTimeRef = useRef<number>(performance.now());
  const frameRequestRef = useRef<number | null>(null);
  
  // وظيفة لقياس وقت التفاعل (مثل النقر والدخلات الأخرى)
  const checkInteractionTime = (callback: () => void, name: string = 'interaction') => {
    const start = performance.now();
    callback();
    const end = performance.now();
    const duration = end - start;
    
    interactionsRef.current.push(duration);
    if (interactionsRef.current.length > 50) {
      interactionsRef.current.shift();
    }
    
    if (duration > 100) {
      console.warn(`تفاعل بطيء (${name}): ${duration.toFixed(1)}ms`);
    }
    
    // تحديث المقاييس
    const avg = interactionsRef.current.reduce((a, b) => a + b, 0) / interactionsRef.current.length;
    const longest = Math.max(...interactionsRef.current);
    
    setMetrics(prev => ({
      ...prev,
      averageInteractionTime: avg,
      longestInteraction: longest
    }));
    
    return duration;
  };
  
  // قياس وقت تحميل الصفحة
  useEffect(() => {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      
      const loadPage = () => {
        // التأكد من اكتمال تحميل الصفحة
        if (timing.loadEventEnd > 0) {
          const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
          const ttfb = timing.responseStart - timing.navigationStart;
          
          setMetrics(prev => ({
            ...prev,
            pageLoadTime,
            ttfb
          }));
        }
      };
      
      // محاولة قياس وقت التحميل
      if (document.readyState === 'complete') {
        loadPage();
      } else {
        window.addEventListener('load', loadPage);
        return () => window.removeEventListener('load', loadPage);
      }
    }
  }, []);
  
  // قياس معدل الإطارات (FPS) وذاكرة الجهاز
  useEffect(() => {
    // قياس معدل الإطارات فقط في الأجهزة ذات الأداء العالي
    // أو بوتيرة أقل في الأجهزة منخفضة الأداء لتوفير الموارد
    const sampleRate = isLowEndDevice ? 5 : 1; // نأخذ عينة كل X إطار
    let frameCount = 0;
    
    const measureFPS = () => {
      frameCount++;
      
      if (frameCount % sampleRate === 0) {
        const now = performance.now();
        const elapsed = now - lastFrameTimeRef.current;
        lastFrameTimeRef.current = now;
        
        if (elapsed > 0) {
          const currentFPS = 1000 / elapsed;
          fpsFramesRef.current.push(currentFPS);
          
          if (fpsFramesRef.current.length > 60) {
            fpsFramesRef.current.shift();
          }
          
          const averageFPS = fpsFramesRef.current.reduce((a, b) => a + b, 0) / fpsFramesRef.current.length;
          
          // قياس استخدام الذاكرة إذا كان متاحًا
          let memoryInfo = null;
          if ((performance as any).memory) {
            const memory = (performance as any).memory;
            memoryInfo = {
              usedHeap: memory.usedJSHeapSize / (1024 * 1024), // ميجابايت
              totalHeap: memory.totalJSHeapSize / (1024 * 1024),
              limit: memory.jsHeapSizeLimit / (1024 * 1024)
            };
          }
          
          setMetrics(prev => ({
            ...prev,
            fps: Math.min(60, Math.round(averageFPS)),
            memory: memoryInfo
          }));
        }
      }
      
      frameRequestRef.current = requestAnimationFrame(measureFPS);
    };
    
    // بدء قياس معدل الإطارات
    frameRequestRef.current = requestAnimationFrame(measureFPS);
    
    // تنظيف عند تفكيك المكون
    return () => {
      if (frameRequestRef.current !== null) {
        cancelAnimationFrame(frameRequestRef.current);
      }
    };
  }, [isLowEndDevice]);
  
  return { metrics, checkInteractionTime };
}
