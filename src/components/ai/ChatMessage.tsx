
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
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div 
        className={`max-w-[80%] p-3 rounded-lg ${
          role === "user" 
            ? "bg-octaBlue-600 text-white" 
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <div className="mb-1">{content}</div>
        {timestamp && (
          <div className="text-xs opacity-70 text-right">
            {formatTime(timestamp)}
          </div>
        )}
      </div>
    </div>
  );
};
