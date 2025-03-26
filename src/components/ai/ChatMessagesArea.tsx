
import React, { useRef, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronUp, ChevronDown } from "lucide-react";

type Message = {
  role: string;
  content: string;
  timestamp?: Date;
};

interface ChatMessagesAreaProps {
  messages: Message[];
  isProcessing: boolean;
}

export const ChatMessagesArea = ({ messages, isProcessing }: ChatMessagesAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Scroll to bottom when messages change or when processing status changes
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isProcessing]);

  const toggleCollapse = (index: number) => {
    setIsCollapsed(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <ScrollArea 
      className="flex-1 p-4" 
      dir={isRTL ? "rtl" : "ltr"}
      ref={scrollAreaRef}
    >
      <div className="space-y-4" aria-live="polite">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {msg.content.length > 200 ? (
                <Collapsible 
                  open={!isCollapsed[index]} 
                  onOpenChange={() => toggleCollapse(index)}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="p-4 bg-muted/20">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">
                        {msg.role === 'user' ? (isRTL ? 'أنت' : 'You') : (isRTL ? 'المساعد' : 'Assistant')}
                      </div>
                      <CollapsibleTrigger asChild>
                        <button className="p-2 hover:bg-muted rounded-full">
                          {isCollapsed[index] ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                        </button>
                      </CollapsibleTrigger>
                    </div>
                    
                    {isCollapsed[index] && (
                      <p className="mt-2 text-sm opacity-70 line-clamp-2">
                        {msg.content.substring(0, 150)}...
                      </p>
                    )}
                  </div>
                  
                  <CollapsibleContent>
                    <div className="p-4 pt-0">
                      <ChatMessage
                        role={msg.role}
                        content={msg.content}
                        timestamp={msg.timestamp}
                      />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <ChatMessage
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.timestamp}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {messages.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground p-4"
          >
            {isRTL ? "ابدأ محادثة جديدة..." : "Start a new conversation..."}
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
        
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <TypingIndicator />
          </motion.div>
        )}
      </div>
    </ScrollArea>
  );
};
