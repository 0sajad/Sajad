
import React from "react";
import { BrainCircuit } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AIMinimizedButtonProps {
  onMaximize: () => void;
}

export function AIMinimizedButton({ onMaximize }: AIMinimizedButtonProps) {
  const { t } = useTranslation();

  return (
    <div 
      className="fixed bottom-4 right-4 rtl:right-auto rtl:left-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-3 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all z-50 animate-pulse hover:animate-none"
      onClick={onMaximize}
      aria-label={t('aiAssistant.maximize', 'فتح مساعد الذكاء الاصطناعي')}
      role="button"
    >
      <BrainCircuit size={24} className="animate-pulse" />
    </div>
  );
}
