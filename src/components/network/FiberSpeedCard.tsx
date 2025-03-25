
import React from "react";
import { Zap } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { Progress } from "../ui/progress";

interface FiberSpeedCardProps {
  fiberSpeed: number;
  fiberQuality: number;
}

export const FiberSpeedCard: React.FC<FiberSpeedCardProps> = ({ fiberSpeed, fiberQuality }) => {
  // تحديد لون الحالة بناءً على جودة الإشارة
  const getStatusColor = () => {
    if (fiberQuality >= 80) return "text-green-500 bg-green-50";
    if (fiberQuality >= 50) return "text-amber-500 bg-amber-50";
    return "text-red-500 bg-red-50";
  };

  return (
    <GlassCard className="p-4 animate-fade-in">
      <div className="flex items-center">
        <div className={`p-3 rounded-xl mr-4 ${getStatusColor()}`}>
          <Zap size={20} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-tajawal">سرعة الألياف الضوئية</p>
          <p className="text-xl font-semibold">{fiberSpeed} Gbps</p>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-tajawal">جودة الإشارة</span>
          <span>{fiberQuality}%</span>
        </div>
        <Progress 
          value={fiberQuality} 
          className="h-2"
          style={{ 
            backgroundColor: fiberQuality < 50 ? '#FEE2E2' : '#F3F4F6',
            color: fiberQuality >= 80 ? '#10B981' : fiberQuality >= 50 ? '#F59E0B' : '#EF4444'
          }}
        />
      </div>
    </GlassCard>
  );
};
