
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function LoadingScreen() {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-4 relative w-16 h-16">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-primary"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M 10,50 Q 25,30 40,50 T 70,50 Q 85,30 95,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut", 
                repeat: Infinity, 
                repeatType: "loop" 
              }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.2"
            />
          </svg>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl font-medium"
        >
          OCTA-GRAM
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-sm text-muted-foreground"
        >
          {t('loadingApplication', 'Loading application...')}
        </motion.div>
      </div>
    </div>
  );
}
