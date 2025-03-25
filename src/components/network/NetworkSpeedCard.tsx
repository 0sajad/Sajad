
import React from "react";
import { Zap } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { useTranslation } from "react-i18next";

interface NetworkSpeedCardProps {
  networkSpeed: string;
}

export const NetworkSpeedCard: React.FC<NetworkSpeedCardProps> = ({ networkSpeed }) => {
  const { t } = useTranslation();

  return (
    <GlassCard className="p-4 animate-fade-in">
      <div className="flex items-center">
        <div className="p-3 rounded-xl mr-4 text-amber-500 bg-amber-50">
          <Zap size={20} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{t('networkTools.internetSpeed')}</p>
          <p className="text-xl font-semibold">{networkSpeed}</p>
        </div>
      </div>
    </GlassCard>
  );
};
