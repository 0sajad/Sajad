
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
    const duration = 300; // تقليل المدة من 400 إلى 300 مللي ثانية للتسريع

    const updateProgress = (timestamp: number) => {
      const elapsedTime = timestamp - startTimeRef.current;
      // استخدام easeOutExpo لانتقال أكثر سلاسة وسرعة
      const t = Math.min(1, elapsedTime / duration);
      const newProgress = 100 * (1 - Math.pow(2, -10 * t));
      
      setProgress(newProgress);

      if (newProgress < 100) {
        requestRef.current = requestAnimationFrame(updateProgress);
      } else {
        // التأكد من أن شاشة التحميل تختفي عند اكتمال التقدم
        setTimeout(() => setIsVisible(false), 50); // تقليل وقت الانتظار من 100 إلى 50
      }
    };

    requestRef.current = requestAnimationFrame(updateProgress);

    // تحميل مسبق للموارد الرئيسية
    const preloadResources = () => {
      // يمكن تنفيذ التحميل المسبق للصور والموارد الأخرى هنا
      // مثال: تحميل صور الواجهة الرئيسية
      const images = ["path_to_important_image.jpg"];
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(preloadResources);
    } else {
      setTimeout(preloadResources, 100);
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative w-20 h-20">
          <motion.div 
            className={cn(
              "absolute w-full h-full border-4 border-primary rounded-full",
            )}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 2,
              ease: "linear",
              repeat: Infinity
            }}
          />
          <motion.div 
            className={cn(
              "absolute w-full h-full border-4 border-transparent border-t-primary rounded-full",
            )}
            animate={{ rotate: -360 }}
            transition={{ 
              duration: 3,
              ease: "linear",
              repeat: Infinity
            }}
          />
        </div>
        <motion.h2 
          className="mt-4 text-2xl font-semibold text-foreground"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [1, 0.8, 1]
          }}
          transition={{ 
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity
          }}
        >
          OCTA-GRAM
        </motion.h2>
        <p className="text-muted-foreground">جاري التحميل...</p>
        
        {/* شريط تقدم لإظهار حالة التحميل للمستخدم - تم تحسينه للأداء */}
        <div className="w-56 h-1.5 mt-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary rounded-full"
            style={progressStyle}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
