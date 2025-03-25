
import React from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface ChatMessageProps {
  role: string;
  content: string;
  timestamp?: Date;
}

export const ChatMessage = ({ role, content, timestamp }: ChatMessageProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  const isUser = role === "user";
  
  const messageTime = timestamp 
    ? format(
        timestamp, 
        "p", 
        { locale: isRTL ? ar : undefined }
      ) 
    : "";

  return (
    <div
      className={cn(
        "flex w-full gap-2",
        isUser ? "justify-end" : "justify-start"
      )}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-lg p-3",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{content}</p>
        {timestamp && (
          <div className={cn(
            "mt-1 text-xs opacity-70 text-right",
            isRTL && "text-left"
          )}>
            {messageTime}
          </div>
        )}
      </div>
    </div>
  );
};
