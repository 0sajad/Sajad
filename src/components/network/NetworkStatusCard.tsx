
import React from "react";
import { Activity } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { Progress } from "../ui/progress";

interface NetworkStatusCardProps {
  signalStrength: number;
}

export const NetworkStatusCard: React.FC<NetworkStatusCardProps> = ({ signalStrength }) => {
  return (
    <GlassCard className="p-4 animate-fade-in">
      <div className="flex items-center">
        <div className="p-3 rounded-xl mr-4 text-green-500 bg-green-50">
          <Activity size={20} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-tajawal">حالة الشبكة</p>
          <p className="text-xl font-semibold font-tajawal">نشطة</p>
        </div>
      </div>
      <Progress value={signalStrength} className="mt-2" />
    </GlassCard>
  );
};
