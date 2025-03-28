
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-background z-50"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" } 
          }}
        >
          <motion.div 
            className="flex flex-col items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-20 h-20">
              <motion.div 
                className={cn(
                  "absolute w-full h-full border-4 border-primary rounded-full"
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
                  "absolute w-full h-full border-4 border-transparent border-t-primary rounded-full"
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
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              OCTA-GRAM
            </motion.h2>
            
            <motion.p 
              className="text-muted-foreground"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Loading...
            </motion.p>
            
            {/* شريط تقدم لإظهار حالة التحميل للمستخدم */}
            <div className="w-56 h-1.5 mt-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
