
import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { AIFeatures } from "@/components/ai/AIFeatures";
import { useTranslation } from "react-i18next";

export const AISidebar = () => {
  const { t } = useTranslation();
  
  return (
    <GlassCard className="h-full p-0">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold text-lg">{t('aiFeatures.title', "قدرات الذكاء الاصطناعي")}</h3>
      </div>
      <AIFeatures />
    </GlassCard>
  );
};
