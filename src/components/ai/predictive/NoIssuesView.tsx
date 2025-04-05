
import React from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";

export function NoIssuesView() {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <CheckCircle2 className="h-8 w-8 text-green-500 mb-3" />
      <h3 className="font-semibold mb-1">{t('predictiveAnalysis.noIssues')}</h3>
      <p className="text-sm text-muted-foreground">
        {t('predictiveAnalysis.networkHealthy')}
      </p>
    </div>
  );
}
