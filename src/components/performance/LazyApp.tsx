
import React, { lazy, Suspense, useEffect } from 'react';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface LazyAppProps {
  children: React.ReactNode;
}

/**
 * مكون رئيسي لتطبيق تحسينات الأداء على مستوى التطبيق
 */
export function LazyApp({ children }: LazyAppProps) {
  const { deviceTier, isLowPerformanceDevice } = usePerformanceOptimization();
  const { t } = useTranslation();
  
  // تطبيق تحسينات الأداء عند التحميل
  useEffect(() => {
    if (isLowPerformanceDevice) {
      // إعلام المستخدم بتطبيق تحسينات الأداء
      setTimeout(() => {
        toast.info(
          t('performance.optimized', 'تم تحسين الأداء تلقائيًا'),
          {
            description: t('performance.optimizedForDevice', 'تم تحسين التطبيق ليعمل بشكل أفضل على جهازك'),
            duration: 5000,
          }
        );
      }, 2000);
      
      // إضافة فئة CSS للتعامل مع تحسينات الأداء
      document.body.classList.add('optimize-performance');
      
      // تطبيق تحسينات CSS للأجهزة منخفضة الأداء
      const styleElement = document.createElement('style');
      styleElement.id = 'performance-optimizations';
      styleElement.textContent = `
        .optimize-performance .animation-heavy {
          animation: none !important;
          transition: none !important;
        }
        .optimize-performance .parallax-effect {
          transform: none !important;
        }
        .optimize-performance .blur-effect {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
        .optimize-performance .shadow-effect {
          box-shadow: none !important;
        }
      `;
      document.head.appendChild(styleElement);
    }
    
    // تطبيق متغيرات CSS للتحكم في زمن الرسوم المتحركة
    document.documentElement.style.setProperty(
      '--transition-speed',
      isLowPerformanceDevice ? '0.1s' : '0.3s'
    );
    
    return () => {
      // تنظيف
      document.body.classList.remove('optimize-performance');
      const styleElement = document.getElementById('performance-optimizations');
      if (styleElement) styleElement.remove();
      document.documentElement.style.removeProperty('--transition-speed');
    };
  }, [isLowPerformanceDevice, t]);
  
  return (
    <div className={`app-container device-${deviceTier}`}>
      {children}
    </div>
  );
}

/**
 * وظيفة لتحميل المكونات بشكل كسول مع احتياطي
 */
export function createLazyComponent(importFn: () => Promise<any>, fallback: React.ReactNode = null) {
  const LazyComponent = lazy(importFn);
  
  return function LazyWrapper(props: any) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}
