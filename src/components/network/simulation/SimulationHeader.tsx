
import React from "react";
import { useTranslation } from "react-i18next";

export const SimulationHeader = () => {
  const { t } = useTranslation();
  
  return (
    <div className="p-4 border-b border-gray-100 dark:border-gray-800">
      <h3 className="font-semibold">{t('networkTools.simulationSystems')}</h3>
      <p className="text-sm text-muted-foreground">{t('networkTools.dataTransmission')}</p>
    </div>
  );
};
