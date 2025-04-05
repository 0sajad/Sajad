
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { PredictiveHeader } from "./predictive/PredictiveHeader";
import { AnalyzingStateView } from "./predictive/AnalyzingStateView";
import { NoIssuesView } from "./predictive/NoIssuesView";
import { AnalyzedStateView } from "./predictive/AnalyzedStateView";
import { usePredictiveAnalysis } from "./predictive/usePredictiveAnalysis";

export function PredictiveAnalysis() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  const {
    isAnalyzing,
    lastAnalysisTime,
    predictedIssues,
    performPredictiveAnalysis,
    handleApplyFix
  } = usePredictiveAnalysis();
  
  // تحديث التحليل يدويًا
  const handleRefreshAnalysis = () => {
    toast.info(t('predictiveAnalysis.analyzing'));
    performPredictiveAnalysis();
  };
  
  return (
    <Card className="w-full h-full shadow-sm">
      <PredictiveHeader 
        isAnalyzing={isAnalyzing} 
        onRefresh={handleRefreshAnalysis} 
      />
      
      <CardContent className="pt-0">
        {isAnalyzing ? (
          <AnalyzingStateView />
        ) : predictedIssues.length === 0 ? (
          <NoIssuesView />
        ) : (
          <AnalyzedStateView 
            predictedIssues={predictedIssues} 
            onApplyFix={handleApplyFix} 
          />
        )}
        
        {lastAnalysisTime && !isAnalyzing && (
          <div className="text-xs text-muted-foreground mt-4 pt-2 border-t text-center">
            {t('predictiveAnalysis.lastUpdate')}: {lastAnalysisTime.toLocaleTimeString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
