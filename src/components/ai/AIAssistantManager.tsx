
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useA11y } from "@/hooks/useA11y";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { AIPerformanceOptimizer } from './AIPerformanceOptimizer';
import { Skeleton } from '@/components/ui/skeleton';

// تحسين التحميل البطيء للمساعد الذكي
const FloatingAIAssistant = lazy(() => import("@/components/FloatingAIAssistant").then(m => ({ default: m.FloatingAIAssistant })));

interface AIAssistantManagerProps {
  onMaximize: () => void;
}

/**
 * مكون لإدارة ظهور وسلوك المساعد الذكي
 */
export function AIAssistantManager({ onMaximize }: AIAssistantManagerProps) {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const { reducedMotion } = useA11y();
  const { deviceTier, isLowPerformanceDevice } = usePerformanceOptimization();
  
  // إظهار المساعد الذكي بعد فترة زمنية
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
    }, reducedMotion || isLowPerformanceDevice ? 1000 : 3000); // وقت أقصر إذا كان وضع تقليل الحركة مفعلاً أو الجهاز ضعيف
    
    return () => clearTimeout(timeout);
  }, [reducedMotion, isLowPerformanceDevice]);
  
  // تحديد الحد الأقصى لعدد المحاولات لتحميل المكون
  const [loadAttempts, setLoadAttempts] = useState(0);
  const maxLoadAttempts = 3;
  
  // إعادة المحاولة عند فشل التحميل
  const handleLoadError = () => {
    if (loadAttempts < maxLoadAttempts) {
      setLoadAttempts(prev => prev + 1);
      setTimeout(() => {
        setShowAIAssistant(true);
      }, 2000);
    }
  };
  
  // مكون التحميل المحسن للمساعد الذكي
  const AssistantLoader = () => (
    <div className="fixed bottom-4 right-4 rounded-full animate-pulse">
      <Skeleton className="h-12 w-12 rounded-full" />
    </div>
  );
  
  if (!showAIAssistant) {
    return null;
  }
  
  // تقديم نسخة مبسطة للأجهزة منخفضة الأداء
  if (deviceTier === 'low' && loadAttempts > 0) {
    return (
      <div 
        onClick={onMaximize}
        className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg cursor-pointer"
        role="button"
        aria-label="فتح المساعد الذكي"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a8 8 0 0 1 6.36 12.79C16.81 16.88 12 21.7 12 21.7s-4.81-4.82-6.36-6.91A8 8 0 0 1 12 2Zm0 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
        </svg>
      </div>
    );
  }
  
  return (
    <AIPerformanceOptimizer>
      <Suspense fallback={<AssistantLoader />}>
        <FloatingAIAssistant 
          show={showAIAssistant} 
          onMaximize={onMaximize} 
          onError={handleLoadError}
        />
      </Suspense>
    </AIPerformanceOptimizer>
  );
}

// Add default export for compatibility with React.lazy()
export default AIAssistantManager;
