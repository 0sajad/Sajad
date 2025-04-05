
import React from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PredictedIssue } from "./issuesData";

interface PredictedIssueProps {
  issue: PredictedIssue;
  onApplyFix: (issueId: number) => void;
}

export function PredictedIssueItem({ issue, onApplyFix }: PredictedIssueProps) {
  const { t } = useTranslation();
  
  return (
    <div key={issue.id} className="border rounded-lg p-3 relative">
      <div className="flex justify-between">
        <div>
          <h4 className="font-medium">
            {t(`predictiveAnalysis.issues.${issue.type}`)}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            {t(`predictiveAnalysis.issues.${issue.type}Desc`)}
          </p>
        </div>
        <Badge className={
          issue.probability > 0.8 ? 'bg-red-500' : 
          issue.probability > 0.7 ? 'bg-amber-500' : 
          'bg-yellow-500'
        }>
          {Math.round(issue.probability * 100)}%
        </Badge>
      </div>
      
      <div className="mt-3 border-t pt-2 text-sm flex justify-between items-center flex-wrap">
        <div className="space-x-2 rtl:space-x-reverse">
          <Badge variant="secondary">
            {t(`predictiveAnalysis.confidence.${issue.confidence}`)}
          </Badge>
          <Badge variant="secondary">
            {t(`predictiveAnalysis.timeFrames.${issue.timeFrame}`)}
          </Badge>
        </div>
        
        <div className="flex space-x-2 rtl:space-x-reverse mt-2 sm:mt-0">
          <Button 
            size="sm" 
            variant="default" 
            className="text-xs h-7"
            onClick={() => onApplyFix(issue.id)}
          >
            {t('predictiveAnalysis.actions.applyFix')}
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-xs h-7"
          >
            {t('predictiveAnalysis.actions.moreInfo')}
          </Button>
        </div>
      </div>
      
      <div className="mt-2 text-sm">
        <strong>{t('predictiveAnalysis.recommendedSolution')}: </strong>
        {t(`predictiveAnalysis.issues.${issue.type}Solution`)}
      </div>
    </div>
  );
}
