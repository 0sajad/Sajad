
import React, { useEffect, useState } from "react";
import { Zap, RefreshCcw, Shield, Search, BarChart, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface AIStatusIndicatorProps {
  status: "learning" | "processing" | "idle" | "protecting" | "analyzing" | "optimizing";
  progress: number;
}

export function AIStatusIndicator({ status, progress }: AIStatusIndicatorProps) {
  const { t } = useTranslation();
  const [prevStatus, setPrevStatus] = useState(status);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // إضافة تأثير انتقالي عند تغيير الحالة
  useEffect(() => {
    if (prevStatus !== status) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setPrevStatus(status);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [status, prevStatus]);
  
  const currentStatusText = () => {
    switch (status) {
      case "learning":
        return t('aiAssistant.learning', 'Learning...');
      case "processing":
        return t('aiAssistant.processing', 'Processing...');
      case "protecting":
        return t('aiAssistant.protecting', 'Protecting...');
      case "analyzing":
        return t('aiAssistant.analyzing', 'Analyzing...');
      case "optimizing":
        return t('aiAssistant.optimizing', 'Optimizing...');
      default:
        return t('aiAssistant.ready', 'Ready');
    }
  };
  
  const getStatusColor = () => {
    switch (status) {
      case "learning": return "text-amber-500";
      case "processing": return "text-blue-500";
      case "protecting": return "text-red-500";
      case "analyzing": return "text-cyan-500";
      case "optimizing": return "text-green-500";
      default: return "text-green-500";
    }
  };
  
  const StatusIcon = () => {
    const iconProps = {
      size: 16,
      className: `${getStatusColor()} mr-1 rtl:mr-0 rtl:ml-1`
    };
    
    const iconVariants = {
      hidden: { opacity: 0, scale: 0.8, y: 5 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: {
          duration: 0.2,
          ease: "easeOut"
        }
      },
      exit: { 
        opacity: 0, 
        scale: 0.8, 
        y: -5,
        transition: {
          duration: 0.2,
          ease: "easeIn"
        }
      }
    };
    
    switch (status) {
      case "learning":
        return (
          <motion.div
            key="learning"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={iconVariants}
          >
            <Zap {...iconProps} className={`${iconProps.className} animate-pulse`} />
          </motion.div>
        );
      case "processing":
        return (
          <motion.div
            key="processing"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={iconVariants}
          >
            <RefreshCcw {...iconProps} className={`${iconProps.className} animate-spin`} />
          </motion.div>
        );
      case "protecting":
        return (
          <motion.div
            key="protecting"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={iconVariants}
          >
            <Shield {...iconProps} className={`${iconProps.className} animate-pulse`} />
          </motion.div>
        );
      case "analyzing":
        return (
          <motion.div
            key="analyzing"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={iconVariants}
          >
            <Search {...iconProps} className={`${iconProps.className} animate-pulse`} />
          </motion.div>
        );
      case "optimizing":
        return (
          <motion.div
            key="optimizing"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={iconVariants}
          >
            <BarChart {...iconProps} className={`${iconProps.className} animate-pulse`} />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="idle"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={iconVariants}
          >
            <Cpu {...iconProps} />
          </motion.div>
        );
    }
  };
  
  const textVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };
  
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        <AnimatePresence mode="wait">
          <StatusIcon />
        </AnimatePresence>
        
        <AnimatePresence mode="wait">
          <motion.span
            key={status}
            className={`text-xs ${getStatusColor()}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textVariants}
            aria-live="polite"
          >
            {currentStatusText()}
          </motion.span>
        </AnimatePresence>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={`progress-${Math.floor(progress / 10)}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-xs text-muted-foreground"
          aria-label={`${progress}% ${t('aiAssistant.complete', 'complete')}`}
        >
          {progress}%
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
