
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  showSpinner?: boolean;
}

export function LoadingScreen({ showSpinner = true }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // زيادة شريط التقدم تدريجياً لإعطاء المستخدم مؤشراً بصرياً أن التطبيق يتم تحميله
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 5;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 50);

    // التأكد من أن شاشة التحميل تظهر لمدة لا تقل عن 500 مللي ثانية
    const visibilityTimer = setTimeout(() => {
      if (progress >= 100) {
        setIsVisible(false);
      }
    }, 500);

    return () => {
      clearInterval(interval);
      clearTimeout(visibilityTimer);
    };
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center">
        {showSpinner && (
          <div className="relative w-20 h-20">
            <div className={cn(
              "absolute w-full h-full border-4 border-primary rounded-full",
              "animate-spin"
            )} />
            <div className={cn(
              "absolute w-full h-full border-4 border-transparent border-t-primary rounded-full",
              "animate-spin-slow"
            )} />
          </div>
        )}
        <h2 className="mt-4 text-2xl font-semibold text-foreground">OCTA-GRAM</h2>
        <p className="text-muted-foreground">جاري التحميل...</p>
        
        {/* شريط تقدم لإظهار حالة التحميل للمستخدم */}
        <div className="w-56 h-1.5 mt-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
