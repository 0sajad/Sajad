
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { PredictedIssue, possibleIssues } from "./issuesData";

/**
 * خطاف لتحليل الشبكة بشكل تنبؤي
 * يستخدم التحليل الاحصائي لتوقع المشاكل المحتملة
 */
export function usePredictiveAnalysis() {
  const { t } = useTranslation();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalysisTime, setLastAnalysisTime] = useState<Date | null>(null);
  const [predictedIssues, setPredictedIssues] = useState<PredictedIssue[]>([]);
  
  // تحسين الأداء باستخدام useCallback
  const performPredictiveAnalysis = useCallback(() => {
    if (isAnalyzing) return; // منع التحليل المتزامن إذا كان هناك تحليل جارٍ
    
    setIsAnalyzing(true);
    
    // محاكاة وقت التحليل
    const timeoutId = setTimeout(() => {
      try {
        // اختيار مشاكل عشوائية من الممكن حدوثها
        const shouldShowIssues = Math.random() > 0.3; // 70% احتمالية وجود مشاكل
        
        if (shouldShowIssues) {
          // اختيار عدد عشوائي من المشاكل (1-3)
          const numberOfIssues = Math.floor(Math.random() * 3) + 1;
          // استخدام نسخة من المصفوفة لتجنب تعديل المصفوفة الأصلية
          const shuffledIssues = [...possibleIssues].sort(() => 0.5 - Math.random());
          const selectedIssues = shuffledIssues.slice(0, numberOfIssues);
          setPredictedIssues(selectedIssues);
          
          // إظهار إشعار بوجود مشاكل متوقعة
          toast.warning(t('predictiveAnalysis.alerts.newPrediction'));
        } else {
          setPredictedIssues([]);
        }
      } catch (error) {
        console.error("Error during predictive analysis:", error);
        toast.error(t('common.errors.analysis', 'حدث خطأ أثناء التحليل'));
        setPredictedIssues([]);
      } finally {
        setIsAnalyzing(false);
        setLastAnalysisTime(new Date());
      }
    }, 2000);
    
    // منع تسرب الذاكرة عن طريق تنظيف المؤقتات عند إلغاء التثبيت
    return () => clearTimeout(timeoutId);
  }, [isAnalyzing, t]);
  
  // محاكاة تحليل الشبكة عند تحميل المكون
  useEffect(() => {
    const analyze = performPredictiveAnalysis();
    
    // التنظيف عند إلغاء التثبيت
    return () => {
      if (typeof analyze === 'function') {
        analyze();
      }
    };
  }, [performPredictiveAnalysis]);
  
  // محاكاة تطبيق الإصلاح مع تحسين الأمان
  const handleApplyFix = useCallback((issueId: number) => {
    if (!issueId) {
      console.warn("Invalid issueId provided to handleApplyFix");
      return;
    }
    
    toast.success(t('predictiveAnalysis.alerts.issueResolved'));
    
    // تحديث القائمة بطريقة آمنة باستخدام الحالة السابقة
    setPredictedIssues(prev => prev.filter(issue => issue.id !== issueId));
  }, [t]);
  
  return {
    isAnalyzing,
    lastAnalysisTime,
    predictedIssues,
    performPredictiveAnalysis,
    handleApplyFix
  };
}
