
import React from "react";
import { useTranslation } from "react-i18next";

type MessageProps = {
  role: string;
  content: string;
  timestamp?: Date;
};

export const ChatMessage = ({ role, content, timestamp }: MessageProps) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"} mb-4`}>
      <div 
        className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
          role === "user" 
            ? "bg-octaBlue-600 text-white" 
            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
        }`}
      >
        <div className="mb-1 whitespace-pre-wrap">{content}</div>
        {timestamp && (
          <div className="text-xs opacity-70 text-right">
            {formatTime(timestamp)}
          </div>
        )}
      </div>
    </div>
  );
};
