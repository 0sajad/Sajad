
import React, { useState, useEffect } from "react";
import { AIAssistant } from "./AIAssistant";
import { toast } from "./ui/use-toast";
import { useTranslation } from "react-i18next";
import { BrainCircuit, MessageSquare } from "lucide-react";

interface FloatingAIAssistantProps {
  show: boolean;
  onMaximize: () => void;
  onError?: () => void; // Added optional onError prop
}

export function FloatingAIAssistant({ show, onMaximize, onError }: FloatingAIAssistantProps) {
  const { t } = useTranslation();
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  
  // رسائل تلقائية يظهرها المساعد (مع استخدام الترجمة)
  const messages = [
    'aiAssistant.bubbleMessages.help',
    'aiAssistant.bubbleMessages.newTools',
    'aiAssistant.bubbleMessages.security',
    'aiAssistant.bubbleMessages.optimization'
  ];
  
  // أظهر فقاعة رسالة كل فترة زمنية
  useEffect(() => {
    if (!show) return;
    
    // أظهر فقاعة رسالة بعد 10 ثوانٍ من ظهور المساعد
    const timeout = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 10000);
    
    // تغيير الرسالة كل 15 ثانية
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 15000);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [show, messages.length]);
  
  const handleMaximize = () => {
    toast({
      title: t('aiAssistant.navigating'),
      description: t('aiAssistant.openingPage')
    });
    onMaximize();
  };
  
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
            onClick={() => setShowSpeechBubble(false)}
          >
            ×
          </button>
        </div>
      )}
      
      <div 
        className="shadow-lg rounded-full hover:scale-105 transition-transform duration-200 cursor-pointer"
        onClick={handleMaximize}
      >
        <AIAssistant 
          minimized={true} 
          onMaximize={handleMaximize} 
        />
      </div>
    </div>
  );
}
