
import React, { Suspense, lazy, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { PredictiveHeader } from "./predictive/PredictiveHeader";
import { AnalyzingStateView } from "./predictive/AnalyzingStateView";
import { NoIssuesView } from "./predictive/NoIssuesView";
import { usePredictiveAnalysis } from "./predictive/usePredictiveAnalysis";
import { usePerformanceMonitor } from "@/hooks/usePerformanceMonitor";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

// استخدام التحميل البطيء للمكونات الثقيلة لتحسين الأداء
const AnalyzedStateView = lazy(() => import('./predictive/AnalyzedStateView').then(
  module => ({ default: module.AnalyzedStateView })
));

/**
 * مكون التحليل التنبؤي للشبكة
 * يستخدم محركات الذكاء الاصطناعي لتوقع المشاكل قبل حدوثها
 */
export function PredictiveAnalysis() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  // مراقبة أداء المكون
  const { measureEventHandler } = usePerformanceMonitor({
    componentId: 'predictive-analysis',
    trackFPS: true
  });
  
  const {
    isAnalyzing,
    lastAnalysisTime,
    predictedIssues,
    performPredictiveAnalysis,
    handleApplyFix
  } = usePredictiveAnalysis();
  
  // الكشف عن تغيير اللغة وإعادة التحليل
  useEffect(() => {
    if (lastAnalysisTime) {
      const timeSinceLastAnalysis = Date.now() - lastAnalysisTime.getTime();
      // إذا مر أكثر من 5 دقائق منذ آخر تحليل
      if (timeSinceLastAnalysis > 5 * 60 * 1000) {
        performPredictiveAnalysis();
      }
    }
  }, [i18n.language, lastAnalysisTime, performPredictiveAnalysis]);
  
  // تحديث التحليل يدويًا
  const handleRefreshAnalysis = measureEventHandler('refresh-analysis', () => {
    toast.info(t('predictiveAnalysis.analyzing'));
    performPredictiveAnalysis();
  });
  
  return (
    <ErrorBoundary>
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
            <Suspense fallback={<AnalyzingStateView />}>
              <AnalyzedStateView 
                predictedIssues={predictedIssues} 
                onApplyFix={handleApplyFix} 
              />
            </Suspense>
          )}
          
          {lastAnalysisTime && !isAnalyzing && (
            <div 
              className="text-xs text-muted-foreground mt-4 pt-2 border-t text-center"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {t('predictiveAnalysis.lastUpdate')}: {lastAnalysisTime.toLocaleTimeString()}
            </div>
          )}
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
}
