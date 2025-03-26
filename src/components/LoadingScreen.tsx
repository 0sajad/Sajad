
import React, { useEffect, useState, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>(performance.now());

  // استخدام useMemo لتقليل عمليات الحساب المتكررة
  const progressStyle = useMemo(() => ({
    width: `${progress}%`
  }), [progress]);

  useEffect(() => {
    // تحسين شريط التقدم ليكون أسرع وأكثر سلاسة
    startTimeRef.current = performance.now();
    const duration = 250; // تقليل المدة لتسريع تجربة المستخدم

    const updateProgress = (timestamp: number) => {
      const elapsedTime = timestamp - startTimeRef.current;
      // استخدام easeOutQuint لانتقال أكثر سلاسة وسرعة
      const t = Math.min(1, elapsedTime / duration);
      const newProgress = 100 * (1 - Math.pow(1 - t, 5));
      
      setProgress(newProgress);

      if (newProgress < 100) {
        requestRef.current = requestAnimationFrame(updateProgress);
      } else {
        // التأكد من أن شاشة التحميل تختفي عند اكتمال التقدم
        setTimeout(() => setIsVisible(false), 30); // تقليل وقت الانتظار لتسريع التجربة
      }
    };

    requestRef.current = requestAnimationFrame(updateProgress);

    // تحميل مسبق للموارد الرئيسية
    const preloadResources = () => {
      // تحسين تقنية التحميل المسبق للموارد
      const criticalImages = [
        "/logo.png", 
        "/icon-dashboard.svg", 
        "/icon-settings.svg"
      ];
      
      criticalImages.forEach(src => {
        try {
          const img = new Image();
          img.src = src;
        } catch (e) {
          console.warn("Failed to preload image:", src);
        }
      });
      
      // تحميل مسبق للأنماط الرئيسية - محاكاة
      const preloadCSS = () => {
        console.log("Preloading essential CSS");
      };
      
      preloadCSS();
    };

    // استخدام requestIdleCallback للتحميل المسبق أثناء فترات الخمول
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(preloadResources, { timeout: 500 });
    } else {
      setTimeout(preloadResources, 50);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      setIsVisible(false);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="relative w-20 h-20">
          <motion.div 
            className={cn(
              "absolute w-full h-full border-4 border-primary rounded-full",
            )}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1.5,
              ease: "linear",
              repeat: Infinity
            }}
          />
          <motion.div 
            className={cn(
              "absolute w-full h-full border-4 border-transparent border-t-primary/70 rounded-full",
            )}
            animate={{ rotate: -360 }}
            transition={{ 
              duration: 2,
              ease: "linear",
              repeat: Infinity
            }}
          />
        </div>
        <motion.h2 
          className="mt-4 text-2xl font-semibold text-foreground"
          animate={{ 
            scale: [1, 1.03, 1],
            opacity: [1, 0.85, 1]
          }}
          transition={{ 
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity
          }}
        >
          OCTA-GRAM
        </motion.h2>
        <p className="text-muted-foreground">جاري التحميل...</p>
        
        {/* شريط تقدم محسن لإظهار حالة التحميل للمستخدم */}
        <div className="w-56 h-1.5 mt-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary rounded-full origin-left"
            style={progressStyle}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </motion.div>
    </div>
  );
}
