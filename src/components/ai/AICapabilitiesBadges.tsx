
import React from "react";
import { Badge } from "../ui/badge";
import { useTranslation } from "react-i18next";
import { AIFeaturesList } from "./AIFeaturesList";

export function AICapabilitiesBadges() {
  const { t } = useTranslation();
  
  return (
    <div className="mt-4 p-2 bg-blue-50 rounded-md">
      <p className="text-xs font-medium text-blue-700 mb-1">{t('aiAssistant.aiCapabilities', 'AI Capabilities')}:</p>
      <div className="flex flex-wrap gap-1">
        {AIFeaturesList.map((feature, index) => {
          const FeatureIcon = feature.icon;
          return (
            <Badge key={index} variant="outline" className="bg-white text-xs flex items-center gap-1 py-0.5">
              <FeatureIcon size={10} className={feature.color} />
              <span>{t(`aiAssistant.features.${feature.id}`, feature.id)}</span>
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
