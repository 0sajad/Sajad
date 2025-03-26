
import React, { useRef, useEffect, memo, useMemo } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useA11y } from "@/hooks/useA11y";

type Message = {
  role: string;
  content: string;
  timestamp?: Date;
};

interface ChatMessagesAreaProps {
  messages: Message[];
  isProcessing: boolean;
}

export const ChatMessagesArea = memo(({ messages, isProcessing }: ChatMessagesAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useA11y();
  
  // استخدام useMemo لتحسين الأداء وتقليل إعادة الترسيم
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.1,
        delayChildren: reducedMotion ? 0 : 0.05
      }
    }
  }), [reducedMotion]);
  
  const messageVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: reducedMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: reducedMotion ? 0.1 : 0.3 
      } 
    }
  }), [reducedMotion]);
  
  useEffect(() => {
    // تحسين طريقة التمرير عند إضافة رسائل جديدة
    if (messagesEndRef.current) {
      const smoothScroll = () => {
        messagesEndRef.current?.scrollIntoView({ 
          behavior: reducedMotion ? "auto" : "smooth", 
          block: "end" 
        });
      };
      
      // إضافة تأخير قصير لضمان اكتمال الترسيم
      setTimeout(smoothScroll, 50);
    }
  }, [messages, isProcessing, reducedMotion]);
  
  // استخدام تقنية الفهرسة الافتراضية لتحسين الأداء عند وجود عدد كبير من الرسائل
  const virtualizedMessages = useMemo(() => {
    if (messages.length <= 50) return messages;
    
    // عرض آخر 50 رسالة فقط للحفاظ على الأداء
    return messages.slice(Math.max(0, messages.length - 50));
  }, [messages]);
  
  return (
    <ScrollArea 
      className="flex-1 p-4" 
      dir={isRTL ? "rtl" : "ltr"}
      ref={scrollAreaRef}
    >
      <motion.div 
        className="space-y-4" 
        aria-live="polite"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence initial={false}>
          {virtualizedMessages.length === 0 ? (
            <motion.div 
              className="text-center text-muted-foreground p-4"
              variants={messageVariants}
              key="empty-state"
            >
              {isRTL ? "ابدأ محادثة جديدة..." : "Start a new conversation..."}
            </motion.div>
          ) : (
            virtualizedMessages.map((msg, index) => (
              <motion.div 
                key={`msg-${index}`}
                variants={messageVariants}
                layout={!reducedMotion}
              >
                <ChatMessage
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.timestamp}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
        
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <TypingIndicator />
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </motion.div>
    </ScrollArea>
  );
});

ChatMessagesArea.displayName = "ChatMessagesArea";
