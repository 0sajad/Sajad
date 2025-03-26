
import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { AIFeaturesList } from "./AIFeaturesList";

interface AIFeatureIndicatorProps {
  currentFeature: number;
}

export function AIFeatureIndicator({ currentFeature }: AIFeatureIndicatorProps) {
  const { t } = useTranslation();
  const currentFeatureData = AIFeaturesList[currentFeature];
  
  // تجهيز متغيرات الرسوم المتحركة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    exit: { 
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };
  
  return (
    <div className="mb-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFeature}
          className="flex items-center space-x-2 rtl:space-x-reverse bg-muted/20 p-2 rounded-md"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          aria-label={t(`aiAssistant.features.${currentFeatureData.id}`, currentFeatureData.id)}
        >
          <motion.div variants={itemVariants}>
            <div className={`p-1.5 rounded-full ${currentFeatureData.color} bg-opacity-20`}>
              <currentFeatureData.icon className={`h-4 w-4 ${currentFeatureData.color}`} />
            </div>
          </motion.div>
          
          <motion.div className="flex-1" variants={itemVariants}>
            <div className="text-xs font-medium">
              {t(`aiAssistant.features.${currentFeatureData.id}`, currentFeatureData.id)}
            </div>
            <motion.div 
              className="text-xs text-muted-foreground"
              variants={itemVariants}
            >
              {t(`aiAssistant.${currentFeatureData.id}Desc`, `AI ${currentFeatureData.id} feature`)}
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
