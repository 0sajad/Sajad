
import React from "react";
import { useTranslation } from "react-i18next";

export const TypingIndicator = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  return (
    <div 
      className="flex w-full gap-2 justify-start" 
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-[80%] rounded-lg p-3 bg-muted text-muted-foreground">
        <div className="flex items-center gap-1">
          <span>{t("aiAssistant.processing", "معالجة...")}</span>
          <span className="flex">
            <span className="animate-bounce mr-0.5 ml-0.5">.</span>
            <span className="animate-bounce animation-delay-200 mr-0.5 ml-0.5">.</span>
            <span className="animate-bounce animation-delay-400 mr-0.5 ml-0.5">.</span>
          </span>
        </div>
      </div>
    </div>
  );
};
