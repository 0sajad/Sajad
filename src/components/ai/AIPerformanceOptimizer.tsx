
import React, { useEffect, useState } from "react";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { useAppState } from "@/hooks/state/use-app-state";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface AIPerformanceOptimizerProps {
  children: React.ReactNode;
}

/**
 * مكون لتحسين أداء مكونات الذكاء الاصطناعي بشكل تلقائي
 * يقوم بتطبيق استراتيجيات مختلفة حسب قدرة الجهاز
 */
export function AIPerformanceOptimizer({ children }: AIPerformanceOptimizerProps) {
  const { t } = useTranslation();
  const { deviceTier, isLowPerformanceDevice } = usePerformanceOptimization();
  const { setPreference } = useAppState();
  const [isOptimized, setIsOptimized] = useState(false);
  
  // تطبيق استراتيجيات التحسين تلقائيًا للأجهزة منخفضة الأداء
  useEffect(() => {
    if (isLowPerformanceDevice && !isOptimized) {
      // تطبيق الإعدادات المحسّنة للأجهزة الضعيفة
      setPreference('animations', false);
      setPreference('reducedMotion', true);
      setPreference('compactMode', true);
      
      // إعلام المستخدم
      setTimeout(() => {
        toast.info(
          t('ai.performanceOptimized', 'تم تحسين أداء المساعد الذكي تلقائيًا لجهازك'),
          {
            description: t(
              'ai.performanceOptimizedDescription',
              'لتغيير هذا الإعداد، انتقل إلى إعدادات الأداء'
            ),
            duration: 5000,
          }
        );
      }, 2000);
      
      setIsOptimized(true);
    }
  }, [isLowPerformanceDevice, isOptimized, setPreference, t]);
  
  // إضافة الخصائص المناسبة للغلاف بناءً على مستوى أداء الجهاز
  const getWrapperProps = () => {
    switch (deviceTier) {
      case 'low':
        return { className: "optimize-ai-performance" };
      case 'medium':
        return { className: "standard-ai-performance" };
      case 'high':
        return { className: "enhanced-ai-performance" };
      default:
        return {};
    }
  };
  
  // إنشاء CSS المناسب لتحسين الأداء
  useEffect(() => {
    if (isLowPerformanceDevice) {
      const styleElement = document.createElement('style');
      styleElement.id = 'ai-performance-optimizations';
      styleElement.textContent = `
        .optimize-ai-performance .animated-element {
          animation: none !important;
          transition: none !important;
        }
        .optimize-ai-performance .decorative-element {
          display: none !important;
        }
        .optimize-ai-performance .heavy-effect {
          background: rgba(255, 255, 255, 0.8) !important;
          backdrop-filter: none !important;
        }
      `;
      document.head.appendChild(styleElement);
      
      return () => {
        const element = document.getElementById('ai-performance-optimizations');
        if (element) {
          element.remove();
        }
      };
    }
  }, [isLowPerformanceDevice]);
  
  return <div {...getWrapperProps()}>{children}</div>;
}
