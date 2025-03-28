
import { useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useAppState } from '../state/use-app-state';
import { DeviceTier } from './useDeviceDetection';

/**
 * خطاف لتطبيق تحسينات الأداء تلقائيًا بناءً على قدرات الجهاز
 */
export function usePerformanceOptimizations(deviceTier: DeviceTier, isLowEndDevice: boolean) {
  const { t } = useTranslation();
  const { setPreference } = useAppState();
  
  // تطبيق الإعدادات المحسنة للأجهزة ذات الأداء المنخفض
  const optimizeForLowEndDevice = useCallback(() => {
    // تطبيق التفضيلات المحسنة للأداء المنخفض
    setPreference('animations', false);
    setPreference('reducedMotion', true);
    setPreference('compactMode', true);
    
    // إضافة فئة CSS للتحكم في الرسوم المتحركة والتأثيرات
    document.body.classList.add('optimize-performance');
    
    // إضافة أنماط CSS للتحسين
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
    
    // إعلام المستخدم بتطبيق التحسينات
    toast.info(
      t('performance.optimized', 'تم تحسين الأداء تلقائيًا'),
      {
        description: t('performance.optimizedForDevice', 'تم تطبيق إعدادات منخفضة لتحسين الأداء على جهازك'),
        duration: 5000,
      }
    );
  }, [setPreference, t]);
  
  // تطبيق تحسينات الأداء عند التحميل
  useEffect(() => {
    if (isLowEndDevice) {
      optimizeForLowEndDevice();
    }
    
    // تطبيق متغيرات CSS للتحكم في زمن الرسوم المتحركة
    document.documentElement.style.setProperty(
      '--transition-speed',
      isLowEndDevice ? '0.1s' : '0.3s'
    );
    
    return () => {
      // تنظيف
      document.body.classList.remove('optimize-performance');
      const styleElement = document.getElementById('performance-optimizations');
      if (styleElement) styleElement.remove();
      document.documentElement.style.removeProperty('--transition-speed');
    };
  }, [isLowEndDevice, optimizeForLowEndDevice]);
  
  return {
    optimizeForLowEndDevice
  };
}
