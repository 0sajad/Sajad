
import React from "react";
import { useTranslation } from "react-i18next";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

interface PredictiveHeaderProps {
  isAnalyzing: boolean;
  onRefresh: () => void;
}

export function PredictiveHeader({ isAnalyzing, onRefresh }: PredictiveHeaderProps) {
  const { t } = useTranslation();
  
  return (
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <CardTitle className="text-lg">
          {t('predictiveAnalysis.title')}
        </CardTitle>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={onRefresh}
          disabled={isAnalyzing}
          title={t('predictiveAnalysis.refresh')}
        >
          <RefreshCcw className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        {t('predictiveAnalysis.subtitle')}
      </p>
    </CardHeader>
  );
}
