
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { PredictedIssue, possibleIssues } from "./issuesData";

export function usePredictiveAnalysis() {
  const { t } = useTranslation();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysisTime, setLastAnalysisTime] = useState<Date | null>(null);
  const [predictedIssues, setPredictedIssues] = useState<PredictedIssue[]>([]);
  
  // محاكاة تحليل الشبكة عند تحميل المكون
  useEffect(() => {
    performPredictiveAnalysis();
  }, []);
  
  // محاكاة تحليل تنبؤي للشبكة
  const performPredictiveAnalysis = () => {
    setIsAnalyzing(true);
    
    // محاكاة وقت التحليل
    setTimeout(() => {
      // اختيار مشاكل عشوائية من الممكن حدوثها
      const shouldShowIssues = Math.random() > 0.3; // 70% احتمالية وجود مشاكل
      
      if (shouldShowIssues) {
        // اختيار عدد عشوائي من المشاكل (1-3)
        const numberOfIssues = Math.floor(Math.random() * 3) + 1;
        const shuffledIssues = [...possibleIssues].sort(() => 0.5 - Math.random());
        const selectedIssues = shuffledIssues.slice(0, numberOfIssues);
        setPredictedIssues(selectedIssues);
        
        // إظهار إشعار بوجود مشاكل متوقعة
        toast.warning(t('predictiveAnalysis.alerts.newPrediction'));
      } else {
        setPredictedIssues([]);
      }
      
      setIsAnalyzing(false);
      setLastAnalysisTime(new Date());
    }, 2000);
  };
  
  // محاكاة تطبيق الإصلاح
  const handleApplyFix = (issueId: number) => {
    toast.success(t('predictiveAnalysis.alerts.issueResolved'));
    setPredictedIssues(prev => prev.filter(issue => issue.id !== issueId));
  };
  
  return {
    isAnalyzing,
    lastAnalysisTime,
    predictedIssues,
    performPredictiveAnalysis,
    handleApplyFix
  };
}
