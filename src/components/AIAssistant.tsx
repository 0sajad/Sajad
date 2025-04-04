
import React from "react";
import { AIAssistantMain } from "./ai/AIAssistantMain";
import { EnhancedAIChat } from "./ai/EnhancedAIChat";

interface AIAssistantProps {
  minimized?: boolean;
  onMaximize?: () => void;
}

export function AIAssistant({ minimized = false, onMaximize }: AIAssistantProps) {
  const initialMessages = [
    { 
      role: "assistant", 
      content: "مرحباً! أنا مساعد OCTA-GRAM الذكي. كيف يمكنني مساعدتك في مجال الشبكات والاتصالات؟",
      timestamp: new Date()
    }
  ];
  
  if (minimized) {
    return <AIAssistantMain minimized={true} onMaximize={onMaximize} />;
  }
  
  return (
    <div className="w-full h-full">
      <EnhancedAIChat initialMessages={initialMessages} useLocalModel={true} />
    </div>
  );
}
