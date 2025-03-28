
import React, { useState, useEffect } from 'react';
import { Suspense, lazy } from "react";
import { useA11y } from "@/hooks/useA11y";

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
  
  // إظهار المساعد الذكي بعد فترة زمنية
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
    }, reducedMotion ? 1000 : 3000); // وقت أقصر إذا كان وضع تقليل الحركة مفعلاً
    
    return () => clearTimeout(timeout);
  }, [reducedMotion]);
  
  if (!showAIAssistant) {
    return null;
  }
  
  return (
    <Suspense fallback={null}>
      <FloatingAIAssistant 
        show={showAIAssistant} 
        onMaximize={onMaximize} 
      />
    </Suspense>
  );
}
