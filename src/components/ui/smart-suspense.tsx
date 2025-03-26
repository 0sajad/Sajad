
import React, { Suspense, useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useA11y } from "@/hooks/useA11y";
import { ErrorBoundary } from "./error-boundary";

interface SmartSuspenseProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minLoadTime?: number;
  maxLoadTime?: number;
  onLoad?: () => void;
  errorFallback?: React.ReactNode;
}

export function SmartSuspense({
  children,
  fallback,
  minLoadTime = 300, // الحد الأدنى لوقت العرض للفالباك
  maxLoadTime = 5000, // الحد الأقصى للانتظار قبل عرض المحتوى بغض النظر عن التحميل
  onLoad,
  errorFallback,
}: SmartSuspenseProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { reducedMotion } = useA11y();
  
  useEffect(() => {
    // ضمان عرض Fallback لمدة minLoadTime على الأقل لتجنب الوميض
    const minTimer = setTimeout(() => {
      setIsLoading(false);
      if (onLoad) onLoad();
    }, minLoadTime);
    
    // تعيين الحد الأقصى للانتظار
    const maxTimer = setTimeout(() => {
      setIsLoading(false);
      if (onLoad) onLoad();
    }, maxLoadTime);
    
    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
    };
  }, [minLoadTime, maxLoadTime, onLoad]);
  
  const defaultFallback = (
    <div className="flex justify-center items-center w-full h-40">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: reducedMotion ? 0 : 1.5
        }}
      >
        <Loader2 className="h-8 w-8 text-primary" />
      </motion.div>
    </div>
  );
  
  return (
    <ErrorBoundary fallback={errorFallback || <div className="p-4 text-center">حدث خطأ في تحميل المحتوى. يرجى تحديث الصفحة.</div>}>
      <Suspense fallback={fallback || defaultFallback}>
        {!isLoading ? children : (fallback || defaultFallback)}
      </Suspense>
    </ErrorBoundary>
  );
}
