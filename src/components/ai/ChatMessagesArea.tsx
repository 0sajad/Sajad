
import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isProcessing]);

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
        {isProcessing && <TypingIndicator />}
      </div>
    </ScrollArea>
  );
};
