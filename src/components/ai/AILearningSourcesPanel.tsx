
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

interface AILearningSourcesPanelProps {
  recentSources: string[];
}

export function AILearningSourcesPanel({ recentSources }: AILearningSourcesPanelProps) {
  const { t } = useTranslation();
  
  // تعريف متغيرات الرسوم المتحركة
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      } 
    }
  };
  
  return (
    <motion.div 
      className="mb-4 p-2 bg-amber-50 dark:bg-amber-950/30 rounded-md border border-amber-100 dark:border-amber-900/30"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      aria-label={t('aiAssistant.learningSources', 'Sources being studied')}
    >
      <div className="flex items-center text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">
        <BookOpen size={12} className="mr-1 rtl:mr-0 rtl:ml-1" />
        <span>{t('aiAssistant.learningSources', 'Learning From')}:</span>
      </div>
      <ul className="space-y-1">
        {recentSources.map((source, index) => (
          <motion.li 
            key={`${source}-${index}`} 
            className="text-xs text-amber-600 dark:text-amber-300 flex items-center"
            variants={itemVariants}
            custom={index}
          >
            <div className="w-1 h-1 bg-amber-500 dark:bg-amber-400 rounded-full mr-1 rtl:mr-0 rtl:ml-1"></div>
            {source}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
