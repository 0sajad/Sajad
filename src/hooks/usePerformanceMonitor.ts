
import { useEffect, useRef } from 'react';
import performanceMonitor from '@/utils/performance/PerformanceMonitor';
import { useAppState } from './state/use-app-state';

/**
 * خواص خطاف مراقبة الأداء
 */
interface UsePerformanceMonitorProps {
  /**
   * معرف المكون الذي سيتم قياس أدائه
   */
  componentId: string;
  
  /**
   * تحديد ما إذا كان سيتم قياس معدل الإطارات في الثانية
   */
  trackFPS?: boolean;
  
  /**
   * تحديد ما إذا كان سيتم قياس استخدام الذاكرة
   */
  trackMemory?: boolean;
  
  /**
   * الفاصل الزمني بين قياسات الذاكرة بالمللي ثانية
   */
  memoryInterval?: number;
  
  /**
   * تمكين التسجيل التلقائي للتقارير في وحدة التحكم
   */
  autoLog?: boolean;
  
  /**
   * الفاصل الزمني للتسجيل التلقائي بالمللي ثانية
   */
  autoLogInterval?: number;
}

/**
 * خطاف لمراقبة أداء المكونات والتطبيق
 */
export function usePerformanceMonitor({
  componentId,
  trackFPS = false,
  trackMemory = false,
  memoryInterval = 5000,
  autoLog = false,
  autoLogInterval = 30000
}: UsePerformanceMonitorProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDeveloperMode = useAppState(state => state.preferences.developerMode);
  
  // بدء وإيقاف القياسات عند تحميل وتفكيك المكون
  useEffect(() => {
    if (!isDeveloperMode) return;
    
    // بدء قياس وقت التصيير
    const endRenderMeasurement = performanceMonitor.startRenderTimer(componentId);
    
    // بدء قياس معدل الإطارات في الثانية إذا كان مطلوبًا
    if (trackFPS) {
      performanceMonitor.startTrackingFPS();
    }
    
    // بدء قياس استخدام الذاكرة إذا كان مطلوبًا
    if (trackMemory) {
      performanceMonitor.startMemoryMeasurement(memoryInterval);
    }
    
    // إعداد التسجيل التلقائي إذا كان مطلوبًا
    if (autoLog) {
      intervalRef.current = setInterval(() => {
        performanceMonitor.logPerformanceReport();
      }, autoLogInterval);
    }
    
    // تنظيف عند تفكيك المكون
    return () => {
      // إنهاء قياس وقت التصيير
      endRenderMeasurement();
      
      // إيقاف قياسات أخرى إذا كانت هذه آخر مكون يستخدم الخطاف
      if (trackFPS) {
        performanceMonitor.stopTrackingFPS();
      }
      
      if (trackMemory) {
        performanceMonitor.stopMemoryMeasurement();
      }
      
      // إلغاء التسجيل التلقائي
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [componentId, trackFPS, trackMemory, memoryInterval, autoLog, autoLogInterval, isDeveloperMode]);
  
  /**
   * قياس زمن تنفيذ معالج الحدث
   * @param eventName اسم الحدث
   * @param callback دالة معالجة الحدث
   */
  const measureEventHandler = <T extends any[], R>(
    eventName: string,
    callback: (...args: T) => R
  ): ((...args: T) => R) => {
    if (!isDeveloperMode) {
      return callback;
    }
    return performanceMonitor.measureEventHandler(eventName, callback);
  };
  
  /**
   * قياس زمن استدعاء API
   * @param apiName اسم الـ API
   * @param promise الوعد الذي سيتم قياسه
   */
  const measureApiCall = <T>(apiName: string, promise: Promise<T>): Promise<T> => {
    if (!isDeveloperMode) {
      return promise;
    }
    return performanceMonitor.measureApiCall(apiName, promise);
  };
  
  /**
   * الحصول على تقرير أداء مفصل
   */
  const getPerformanceReport = () => {
    return performanceMonitor.getPerformanceReport();
  };
  
  /**
   * تسجيل تقرير الأداء في وحدة التحكم
   */
  const logPerformanceReport = () => {
    if (!isDeveloperMode) return;
    performanceMonitor.logPerformanceReport();
  };
  
  /**
   * إعادة تعيين جميع قياسات الأداء
   */
  const resetPerformanceMonitor = () => {
    if (!isDeveloperMode) return;
    performanceMonitor.reset();
  };
  
  return {
    measureEventHandler,
    measureApiCall,
    getPerformanceReport,
    logPerformanceReport,
    resetPerformanceMonitor
  };
}
