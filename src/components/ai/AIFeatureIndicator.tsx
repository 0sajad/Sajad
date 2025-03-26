
import React from "react";
import { useTranslation } from "react-i18next";
import { AIFeaturesList } from "./AIFeaturesList";

interface AIFeatureIndicatorProps {
  currentFeature: number;
}

export function AIFeatureIndicator({ currentFeature }: AIFeatureIndicatorProps) {
  const { t } = useTranslation();
  
  const getCurrentFeature = () => {
    const feature = AIFeaturesList[currentFeature];
    const FeatureIcon = feature.icon;
    return (
      <div className="flex items-center">
        <FeatureIcon size={16} className={`${feature.color} mr-1 rtl:mr-0 rtl:ml-1`} />
        <span className="text-xs text-muted-foreground">
          {t(`aiAssistant.features.${feature.id}`, feature.id)}
        </span>
      </div>
    );
  };
  
  return (
    <div className="mb-4 text-xs text-muted-foreground">
      {getCurrentFeature()}
    </div>
  );
}
