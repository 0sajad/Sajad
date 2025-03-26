
import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { AIAssistant } from "./AIAssistant";
import { toast } from "./ui/use-toast";
import { useTranslation } from "react-i18next";
import { BrainCircuit, MessageSquare } from "lucide-react";

interface FloatingAIAssistantProps {
  show: boolean;
  onMaximize: () => void;
}

// استخدام memo لتحسين الأداء
export const FloatingAIAssistant = memo(({ show, onMaximize }: FloatingAIAssistantProps) => {
  const { t } = useTranslation();
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const timeoutRef = useRef<number>();
  const intervalRef = useRef<number>();
  
  // تحسين الأداء باستخدام useMemo للرسائل الثابتة
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
  
  // أظهر فقاعة رسالة كل فترة زمنية - تم تحسينه لاستخدام أقل للموارد
  useEffect(() => {
    if (!show) {
      // إلغاء المؤقتات عند إخفاء المساعد
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    
    // أظهر فقاعة رسالة بعد 8 ثوانٍ من ظهور المساعد (بدلاً من 10 ثوانٍ)
    timeoutRef.current = window.setTimeout(showBubble, 8000);
    
    // تغيير الرسالة كل 12 ثانية (بدلاً من 15 ثانية)
    intervalRef.current = window.setInterval(changeBubbleMessage, 12000);
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [show, showBubble, changeBubbleMessage]);
  
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
  
  if (!show) return null;
  
  return (
    <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 animate-fade-in">
      {showSpeechBubble && (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg mb-3 max-w-xs relative animate-fade-in">
          <div className="absolute bottom-[-8px] right-4 rtl:right-auto rtl:left-4 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45"></div>
          <div className="flex items-start gap-2">
            <MessageSquare size={16} className="text-octaBlue-600 mt-0.5" />
            <p className="text-sm">{t(messages[messageIndex])}</p>
          </div>
          <button 
            className="absolute top-1 right-1 rtl:right-auto rtl:left-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={hideBubble}
          >
            ×
          </button>
        </div>
      )}
      
      <div 
        className="shadow-lg rounded-full hover:scale-105 transition-transform duration-200 cursor-pointer will-change-transform"
        onClick={handleMaximize}
      >
        <AIAssistant 
          minimized={true} 
          onMaximize={handleMaximize} 
        />
      </div>
    </div>
  );
});

// إضافة اسم عرض للمكون لتحسين أدوات التطوير
FloatingAIAssistant.displayName = 'FloatingAIAssistant';
