
import React from "react";
import { useTranslation } from "react-i18next";
import { RefreshCcw } from "lucide-react";

export function AnalyzingStateView() {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <RefreshCcw className="h-8 w-8 animate-spin text-primary mb-3" />
      <p>{t('predictiveAnalysis.analyzing')}</p>
    </div>
  );
}
