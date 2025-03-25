
import React from "react";
import { Database } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { useTranslation } from "react-i18next";

interface DataTransferCardProps {
  dataTransfer: string;
}

export const DataTransferCard: React.FC<DataTransferCardProps> = ({ dataTransfer }) => {
  const { t } = useTranslation();

  return (
    <GlassCard className="p-4 animate-fade-in">
      <div className="flex items-center">
        <div className="p-3 rounded-xl mr-4 text-purple-500 bg-purple-50">
          <Database size={20} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{t('networkTools.dataTransmission')}</p>
          <p className="text-xl font-semibold">{dataTransfer}</p>
        </div>
      </div>
    </GlassCard>
  );
};
