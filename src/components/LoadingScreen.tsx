
import React, { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // استخدام useMemo لتقليل عمليات الحساب المتكررة
  const progressStyle = useMemo(() => ({
    width: `${progress}%`
  }), [progress]);

  useEffect(() => {
    // تحسين شريط التقدم ليكون أسرع
    let startTime = performance.now();
    const duration = 400; // تقليل المدة من 500 إلى 400 مللي ثانية

    const updateProgress = () => {
      const elapsedTime = performance.now() - startTime;
      const newProgress = Math.min(100, (elapsedTime / duration) * 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // التأكد من أن شاشة التحميل تختفي عند اكتمال التقدم
        setTimeout(() => setIsVisible(false), 100);
      }
    };

    requestAnimationFrame(updateProgress);

    return () => {
      setIsVisible(false);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center">
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
        <h2 className="mt-4 text-2xl font-semibold text-foreground">OCTA-GRAM</h2>
        <p className="text-muted-foreground">جاري التحميل...</p>
        
        {/* شريط تقدم لإظهار حالة التحميل للمستخدم - تم تحسينه للأداء */}
        <div className="w-56 h-1.5 mt-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
            style={progressStyle}
          />
        </div>
      </div>
    </div>
  );
}
