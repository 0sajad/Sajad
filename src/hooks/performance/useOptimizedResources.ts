
import { useMemo } from 'react';

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

// استخدام خطاف لتحسين الموارد مثل الصور والفيديو
export function useOptimizedResources(
  deviceTier: 'low' | 'medium' | 'high',
  metrics: PerformanceMetrics
) {
  const shouldUseAdvancedAnimations = useMemo(() => {
    // استخدام الرسوم المتحركة المتقدمة فقط في الأجهزة ذات الأداء العالي
    // أو في الأجهزة المتوسطة مع أداء جيد
    return deviceTier === 'high' || 
          (deviceTier === 'medium' && metrics.fps > 45 && (!metrics.memory || metrics.memory.usedHeap < metrics.memory.limit * 0.7));
  }, [deviceTier, metrics.fps, metrics.memory]);
  
  const shouldUseLazyLoading = useMemo(() => {
    // استخدام التحميل الكسول للصور دائمًا في الأجهزة منخفضة الأداء
    // وفي الأجهزة الأخرى عندما يكون الأداء منخفضًا
    return deviceTier === 'low' || 
          metrics.fps < 30 || 
          (metrics.memory && metrics.memory.usedHeap > metrics.memory.limit * 0.8);
  }, [deviceTier, metrics.fps, metrics.memory]);
  
  // تحسين مصادر الصور بناءً على قدرات الجهاز
  const optimizeImageSrc = (originalSrc: string, size: 'small' | 'medium' | 'large' = 'medium'): string => {
    // إذا كان المصدر الأصلي رابطًا خارجيًا، نحاول تحسينه باستخدام خدمة CDN
    if (originalSrc.startsWith('http') && !originalSrc.includes('data:')) {
      try {
        // إذا كانت الصورة من unsplash أو مصادر أخرى تدعم معلمات التحجيم
        if (originalSrc.includes('unsplash.com')) {
          const sizeParam = deviceTier === 'low' ? 'w=400' : 
                          deviceTier === 'medium' ? 'w=800' : 'w=1200';
          const qualityParam = deviceTier === 'low' ? 'q=60' : 
                             deviceTier === 'medium' ? 'q=80' : 'q=90';
          
          if (originalSrc.includes('?')) {
            return `${originalSrc}&${sizeParam}&${qualityParam}`;
          } else {
            return `${originalSrc}?${sizeParam}&${qualityParam}`;
          }
        }
      } catch (error) {
        console.error('خطأ أثناء محاولة تحسين مصدر الصورة:', error);
        return originalSrc;
      }
    }
    
    // استخدام إصدارات متعددة من الصور المحلية إذا كانت متاحة
    if (originalSrc.startsWith('/') && !originalSrc.includes('data:')) {
      try {
        const fileExtension = originalSrc.substring(originalSrc.lastIndexOf('.'));
        const fileNameWithoutExt = originalSrc.substring(0, originalSrc.lastIndexOf('.'));
        
        if (deviceTier === 'low') {
          const smallVersionSrc = `${fileNameWithoutExt}-small${fileExtension}`;
          // التحقق من وجود الصورة المصغرة (يمكن تحسينه بالتخزين المؤقت للنتائج)
          return smallVersionSrc;
        } else if (deviceTier === 'medium' && size === 'large') {
          const mediumVersionSrc = `${fileNameWithoutExt}-medium${fileExtension}`;
          return mediumVersionSrc;
        }
      } catch (error) {
        console.error('خطأ أثناء محاولة استخدام إصدار مختلف للصورة:', error);
        return originalSrc;
      }
    }
    
    return originalSrc;
  };
  
  return {
    optimizeImageSrc,
    shouldUseAdvancedAnimations,
    shouldUseLazyLoading
  };
}
