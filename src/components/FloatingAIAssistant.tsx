
import React from "react";
import { AIAssistant } from "./AIAssistant";
import { toast } from "./ui/use-toast";

interface FloatingAIAssistantProps {
  show: boolean;
  onMaximize: () => void;
}

export function FloatingAIAssistant({ show, onMaximize }: FloatingAIAssistantProps) {
  const handleMaximize = () => {
    toast({
      title: "جاري الانتقال إلى المساعد الذكي",
      description: "سيتم فتح صفحة المساعد الذكي الآن..."
    });
    onMaximize();
  };
  
  if (!show) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 shadow-lg rounded-full animate-fade-in hover:scale-105 transition-transform duration-200">
      <AIAssistant 
        minimized={true} 
        onMaximize={handleMaximize} 
      />
    </div>
  );
}
