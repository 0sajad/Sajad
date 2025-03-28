
import { useDeviceDetection } from './performance/useDeviceDetection';
import { usePerformanceMetrics } from './performance/usePerformanceMetrics';
import { useOptimizedResources } from './performance/useOptimizedResources';
import { usePerformanceOptimizations } from './performance/usePerformanceOptimizations';

/**
 * خطاف لتحسين أداء التطبيق وفقًا لقدرات الجهاز
 * تم إعادة هيكلته لتحسين قابلية الصيانة وتقليل التعقيد
 */
export function usePerformanceOptimization() {
  // التعرف على قدرات الجهاز
  const { deviceTier, isLowEndDevice, isHighEndDevice } = useDeviceDetection();
  
  // قياس أداء التطبيق
  const { metrics, checkInteractionTime } = usePerformanceMetrics(isLowEndDevice);
  
  // تحسين الموارد (الصور، الفيديو، إلخ)
  const { optimizeImageSrc, shouldUseAdvancedAnimations, shouldUseLazyLoading } = 
    useOptimizedResources(deviceTier, metrics);
  
  // تطبيق تحسينات الأداء
  const { optimizeForLowEndDevice } = usePerformanceOptimizations(deviceTier, isLowEndDevice);
  
  return {
    // معلومات الجهاز
    deviceTier,
    isLowPerformanceDevice: isLowEndDevice,
    isHighPerformanceDevice: isHighEndDevice,
    
    // قياسات الأداء
    metrics,
    checkInteractionTime,
    
    // تحسين الموارد
    optimizeImageSrc,
    shouldUseAdvancedAnimations,
    shouldUseLazyLoading,
    
    // تحسينات الأداء
    optimizeForLowEndDevice
  };
}
