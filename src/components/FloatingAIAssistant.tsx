
import React from "react";
import { AIAssistant } from "./AIAssistant";

interface FloatingAIAssistantProps {
  show: boolean;
  onMaximize: () => void;
}

export function FloatingAIAssistant({ show, onMaximize }: FloatingAIAssistantProps) {
  if (!show) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 shadow-lg rounded-full">
      <AIAssistant 
        minimized={true} 
        onMaximize={onMaximize} 
      />
    </div>
  );
}
