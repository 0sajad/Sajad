
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { AIAssistant } from "./AIAssistant";
import { toast } from "./ui/use-toast";
import { useTranslation } from "react-i18next";
import { BrainCircuit, MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingAIAssistantProps {
  show: boolean;
  onMaximize: () => void;
}

// استخدام memo لتحسين الأداء
export const FloatingAIAssistant = memo(({ show, onMaximize }: FloatingAIAssistantProps) => {
  const { t } = useTranslation();
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const intervalRef = useRef<ReturnType<typeof setTimeout>>();
  
  // استخدام مصفوفة ثابتة للرسائل
  const messages = [
    'aiAssistant.bubbleMessages.help',
    'aiAssistant.bubbleMessages.newTools',
    'aiAssistant.bubbleMessages.security',
    'aiAssistant.bubbleMessages.optimization'
  ];
  
  // استخدام useCallback لتحسين الأداء
  const showBubble = useCallback(() => {
    setShowSpeechBubble(true);
  }, []);
  
  const changeBubbleMessage = useCallback(() => {
    setMessageIndex(prev => (prev + 1) % messages.length);
  }, [messages.length]);
  
  const startPulsing = useCallback(() => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 2000);
  }, []);
  
  // أظهر فقاعة رسالة كل فترة زمنية - تم تحسينه لاستخدام أقل للموارد
  useEffect(() => {
    if (!show) {
      // إلغاء المؤقتات عند إخفاء المساعد
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearTimeout(intervalRef.current);
      return;
    }
    
    // بدء نبض الزر لجذب الانتباه بعد فترة قصيرة
    const pulsingTimeout = setTimeout(startPulsing, 4000);
    
    // أظهر فقاعة رسالة بعد فترة من ظهور المساعد
    timeoutRef.current = setTimeout(showBubble, 6000);
    
    // تغيير الرسالة كل 10 ثوانٍ
    intervalRef.current = setInterval(changeBubbleMessage, 10000);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearTimeout(intervalRef.current);
      clearTimeout(pulsingTimeout);
    };
  }, [show, showBubble, changeBubbleMessage, startPulsing]);
  
  // استخدام useCallback لتحسين الأداء
  const hideBubble = useCallback(() => {
    setShowSpeechBubble(false);
  }, []);
  
  const handleMaximize = useCallback(() => {
    toast({
      title: t('aiAssistant.navigating'),
      description: t('aiAssistant.openingPage')
    });
    onMaximize();
  }, [t, onMaximize]);
  
  // استخدام AnimatePresence لتحسين التأثيرات البصرية
  
  if (!show) return null;
  
  return (
    <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50">
      <AnimatePresence>
        {showSpeechBubble && (
          <motion.div 
            className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg mb-3 max-w-xs relative"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="absolute bottom-[-8px] right-4 rtl:right-auto rtl:left-4 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45"></div>
            <div className="flex items-start gap-2">
              <MessageSquare size={16} className="text-octaBlue-600 mt-0.5 shrink-0" />
              <p className="text-sm">{t(messages[messageIndex])}</p>
            </div>
            <button 
              className="absolute top-1 right-1 rtl:right-auto rtl:left-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={hideBubble}
              aria-label={t('common.close')}
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className={`shadow-lg rounded-full cursor-pointer will-change-transform ${isPulsing ? 'animate-pulse' : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleMaximize}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <AIAssistant 
          minimized={true} 
          onMaximize={handleMaximize} 
        />
      </motion.div>
    </div>
  );
});

// إضافة اسم عرض للمكون لتحسين أدوات التطوير
FloatingAIAssistant.displayName = 'FloatingAIAssistant';
