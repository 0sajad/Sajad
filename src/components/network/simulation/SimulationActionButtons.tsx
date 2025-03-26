
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCw, Save } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SimulationActionButtonsProps {
  isRunning: boolean;
  progress: number;
  logs: any[];
  startSimulation: () => void;
  stopSimulation: () => void;
  resetSimulation: () => void;
}

export const SimulationActionButtons = ({
  isRunning,
  progress,
  logs,
  startSimulation,
  stopSimulation,
  resetSimulation
}: SimulationActionButtonsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex gap-2">
      {!isRunning ? (
        <Button onClick={startSimulation} className="flex-1">
          <Play size={16} className="mr-2" />
          {t('networkTools.testEnvironment')}
        </Button>
      ) : (
        <Button onClick={stopSimulation} variant="destructive" className="flex-1">
          <Pause size={16} className="mr-2" />
          {t('networkTools.networkTroubleshooting')}
        </Button>
      )}
      <Button variant="outline" onClick={resetSimulation} disabled={isRunning && progress < 100}>
        <RotateCw size={16} className="mr-2" />
        Reset
      </Button>
      <Button variant="outline" disabled={logs.length === 0}>
        <Save size={16} className="mr-2" />
        {t('footer.documentation')}
      </Button>
    </div>
  );
};
