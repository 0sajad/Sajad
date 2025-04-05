
import React from "react";
import { useTranslation } from "react-i18next";
import { AlertTriangle } from "lucide-react";
import { PredictedIssueItem } from "./PredictedIssueItem";
import { PredictedIssue } from "./issuesData";

interface AnalyzedStateViewProps {
  predictedIssues: PredictedIssue[];
  onApplyFix: (issueId: number) => void;
}

export function AnalyzedStateView({ predictedIssues, onApplyFix }: AnalyzedStateViewProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold flex items-center text-amber-600 dark:text-amber-500">
        <AlertTriangle className="h-5 w-5 mr-1 rtl:ml-1 rtl:mr-0" />
        {t('predictiveAnalysis.predictedIssues')}
      </h3>
      
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
        <div className="text-xs text-muted-foreground text-center mt-4">
          {t('predictiveAnalysis.poweredBy')}
        </div>
      )}
    </div>
  );
}
