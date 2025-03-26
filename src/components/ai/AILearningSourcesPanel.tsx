
import React from "react";
import { useTranslation } from "react-i18next";

interface AILearningSourcesPanelProps {
  recentSources: string[];
}

export function AILearningSourcesPanel({ recentSources }: AILearningSourcesPanelProps) {
  const { t } = useTranslation();
  
  return (
    <div className="mb-4 p-2 bg-amber-50 rounded-md">
      <p className="text-xs font-medium text-amber-700 mb-1">{t('aiAssistant.learningSources', 'Learning From')}:</p>
      <ul className="space-y-1">
        {recentSources.map((source, index) => (
          <li key={index} className="text-xs text-amber-600 flex items-center">
            <div className="w-1 h-1 bg-amber-500 rounded-full mr-1"></div>
            {source}
          </li>
        ))}
      </ul>
    </div>
  );
}
