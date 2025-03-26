
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    // زيادة شريط التقدم تدريجياً بشكل أكثر سلاسة
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        // تباطؤ التقدم عندما يقترب من 100%
        const increment = prevProgress > 80 ? 1 : prevProgress > 60 ? 2 : 5;
        const newProgress = prevProgress + increment;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 40);

    // جدولة إخفاء شاشة التحميل عندما يكتمل التقدم
    const checkProgress = setInterval(() => {
      if (progress >= 100) {
        clearInterval(checkProgress);
        // إضافة تأخير قصير قبل إخفاء شاشة التحميل لإكمال التأثيرات المرئية
        setTimeout(() => {
          setIsVisible(false);
        }, 500);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(checkProgress);
    };
  }, [progress]);

  if (!isVisible) return null;

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-background z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center">
        <motion.div 
          className="relative w-20 h-20"
          animate={{ 
            rotate: 360 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "linear" 
          }}
        >
          <div className={cn(
            "absolute w-full h-full border-4 border-primary rounded-full",
            "animate-spin"
          )} />
          <div className={cn(
            "absolute w-full h-full border-4 border-transparent border-t-primary rounded-full",
            "animate-spin-slow"
          )} />
        </motion.div>
        
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
          transition={{ delay: 0.4 }}
        >
          {t('common.loading', 'Loading...')}
        </motion.p>
        
        {/* شريط تقدم محسن مع تأثيرات مرئية */}
        <motion.div 
          className="w-56 h-2 mt-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "14rem", opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{ width: `${progress}%` }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ 
              duration: 0.3, 
              ease: "easeOut"
            }}
          />
        </motion.div>
        
        <motion.div 
          className="mt-2 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {progress}%
        </motion.div>
      </div>
    </motion.div>
  );
}
