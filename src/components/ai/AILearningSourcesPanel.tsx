
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { BookOpen, RefreshCw, Clock } from "lucide-react";
import { useAppState } from "@/hooks/state/use-app-state";

interface AILearningSourcesPanelProps {
  recentSources?: string[];
  isCompact?: boolean;
  maxItems?: number;
}

export function AILearningSourcesPanel({ 
  recentSources = [
    "Network Security Documentation",
    "AI Model Training Data",
    "System Performance Analytics",
    "User Interaction Patterns"
  ], 
  isCompact = false,
  maxItems = 4
}: AILearningSourcesPanelProps) {
  const { t } = useTranslation();
  const deviceTier = useAppState(state => state.performance?.deviceTier || 'medium');
  const [sources, setSources] = useState<string[]>(recentSources);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // تحديد عدد العناصر المعروضة بناءً على أداء الجهاز
  const getOptimalItemCount = () => {
    if (deviceTier === 'low') {
      return Math.min(3, maxItems);
    }
    return maxItems;
  };
  
  const displayedSources = sources.slice(0, getOptimalItemCount());
  
  // محاكاة تحديث المصادر
  const refreshSources = () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    setTimeout(() => {
      // تحديث المصادر (يمكن استبدال هذا بطلب API حقيقي)
      setSources([...sources].sort(() => Math.random() - 0.5));
      setIsRefreshing(false);
    }, 1000);
  };
  
  // تحديث الوقت منذ آخر تحديث
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [timeAgo, setTimeAgo] = useState<string>("");
  
  useEffect(() => {
    const updateTimeAgo = () => {
      const now = new Date();
      const diffMs = now.getTime() - lastUpdateTime.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      
      if (diffMins < 1) {
        setTimeAgo(t('common.justNow', 'الآن'));
      } else if (diffMins < 60) {
        // Fixed: correctly handle translation with count parameter
        setTimeAgo(t('common.minsAgo', { defaultValue: '{{count}} دقيقة مضت', count: diffMins }));
      } else {
        const diffHours = Math.floor(diffMins / 60);
        // Fixed: correctly handle translation with count parameter
        setTimeAgo(t('common.hoursAgo', { defaultValue: '{{count}} ساعة مضت', count: diffHours }));
      }
    };
    
    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 60000);
    
    return () => clearInterval(interval);
  }, [lastUpdateTime, t]);
  
  // تحديث وقت آخر تحديث عند تغيير المصادر
  useEffect(() => {
    setLastUpdateTime(new Date());
  }, [sources]);
  
  // Define animation variants
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
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center text-amber-700 dark:text-amber-400 font-medium">
          <BookOpen size={isCompact ? 12 : 14} className="mr-1 rtl:mr-0 rtl:ml-1" />
          <span>{t('aiAssistant.learningSources', 'يتعلم من')}:</span>
        </div>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-xs text-muted-foreground flex items-center">
            <Clock size={isCompact ? 10 : 12} className="mr-1 rtl:mr-0 rtl:ml-1" />
            {timeAgo}
          </span>
          
          <button 
            onClick={refreshSources}
            disabled={isRefreshing}
            className="p-1 rounded-full text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
            aria-label={t('common.refresh', 'تحديث')}
          >
            <RefreshCw 
              size={isCompact ? 12 : 14} 
              className={isRefreshing ? "animate-spin" : ""} 
            />
          </button>
        </div>
      </div>
      
      <motion.div 
        className={`p-2 bg-amber-50 dark:bg-amber-950/30 rounded-md border border-amber-100 dark:border-amber-900/30 ${isCompact ? 'text-sm' : ''}`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        aria-label={t('aiAssistant.learningSources', 'Sources being studied')}
      >
        <ul className="space-y-1">
          {displayedSources.map((source, index) => (
            <motion.li 
              key={`${source}-${index}`} 
              className={`${isCompact ? 'text-xs' : 'text-sm'} text-amber-600 dark:text-amber-300 flex items-center`}
              variants={itemVariants}
              custom={index}
            >
              <div className="w-1 h-1 bg-amber-500 dark:bg-amber-400 rounded-full mr-1 rtl:mr-0 rtl:ml-1"></div>
              {source}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
