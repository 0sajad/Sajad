
import React from "react";
import { AIAssistant } from "./AIAssistant";
import { toast } from "./ui/use-toast";
import { useTranslation } from "react-i18next";

interface FloatingAIAssistantProps {
  show: boolean;
  onMaximize: () => void;
}

export function FloatingAIAssistant({ show, onMaximize }: FloatingAIAssistantProps) {
  const { t } = useTranslation();
  
  const handleMaximize = () => {
    toast({
      title: t('aiAssistant.navigating'),
      description: t('aiAssistant.openingPage')
    });
    onMaximize();
  };
  
  if (!show) return null;
  
  return (
    <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-50 shadow-lg rounded-full animate-fade-in hover:scale-105 transition-transform duration-200">
      <AIAssistant 
        minimized={true} 
        onMaximize={handleMaximize} 
      />
    </div>
  );
}
