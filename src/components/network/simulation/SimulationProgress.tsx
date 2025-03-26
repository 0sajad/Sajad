
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";

interface SimulationProgressProps {
  isRunning: boolean;
  progress: number;
}

export const SimulationProgress = ({ isRunning, progress }: SimulationProgressProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="mb-6">
      <div className="mb-2 flex justify-between items-center">
        <label className="text-sm font-medium">{t('networkTools.testEnvironment')}</label>
        <Badge variant={isRunning ? 'default' : 'secondary'}>
          {isRunning ? t('networkTools.running') : t('networkTools.ready')}
        </Badge>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
