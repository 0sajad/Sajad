
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { AlertTriangle, Shield } from "lucide-react";
import { PredictedIssueItem } from "./PredictedIssueItem";
import { PredictedIssue } from "./issuesData";

interface AnalyzedStateViewProps {
  predictedIssues: PredictedIssue[];
  onApplyFix: (issueId: number) => void;
}

/**
 * عرض نتائج التحليل التنبؤي
 * تم تحسينه بواسطة memo لمنع إعادة التصيير غير الضرورية
 */
export const AnalyzedStateView = memo(function AnalyzedStateView({ 
  predictedIssues, 
  onApplyFix 
}: AnalyzedStateViewProps) {
  const { t } = useTranslation();
  
  // التحقق من وجود البيانات المطلوبة
  if (!Array.isArray(predictedIssues)) {
    console.error("Invalid predictedIssues provided to AnalyzedStateView");
    return null;
  }
  
  return (
    <div className="space-y-4" data-testid="analyzed-state-view">
      <div className="font-semibold flex items-center text-amber-600 dark:text-amber-500">
        <AlertTriangle className="h-5 w-5 mr-1 rtl:ml-1 rtl:mr-0" />
        <h3 className="flex items-center">
          {t('predictiveAnalysis.predictedIssues')}
          <span className="ml-2 text-sm bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
            {predictedIssues.length}
          </span>
        </h3>
      </div>
      
      <div className="space-y-3">
        {predictedIssues.map((issue) => (
          <PredictedIssueItem 
            key={issue.id} 
            issue={issue} 
            onApplyFix={onApplyFix} 
          />
        ))}
      </div>
      
      {predictedIssues.length > 0 && (
        <div className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center">
          <Shield className="h-3 w-3 mr-1" />
          {t('predictiveAnalysis.poweredBy')}
        </div>
      )}
    </div>
  );
});
