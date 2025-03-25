
import React from "react";
import { AIAssistant } from "./AIAssistant";

interface FloatingAIAssistantProps {
  show: boolean;
  onMaximize: () => void;
}

export function FloatingAIAssistant({ show, onMaximize }: FloatingAIAssistantProps) {
  if (!show) return null;
  
  return (
    <AIAssistant 
      minimized={true} 
      onMaximize={onMaximize} 
    />
  );
}
