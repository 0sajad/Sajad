
import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { useTranslation } from "react-i18next";

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

  useEffect(() => {
    // Scroll to bottom when messages change or when processing status changes
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isProcessing]);

  return (
    <ScrollArea 
      className="flex-1 p-4" 
      dir={isRTL ? "rtl" : "ltr"}
      ref={scrollAreaRef}
    >
      <div className="space-y-4" aria-live="polite">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
          />
        ))}
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground p-4">
            {isRTL ? "ابدأ محادثة جديدة..." : "Start a new conversation..."}
          </div>
        )}
        <div ref={messagesEndRef} />
        {isProcessing && <TypingIndicator />}
      </div>
    </ScrollArea>
  );
};
