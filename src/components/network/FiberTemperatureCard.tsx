
import React from "react";
import { Thermometer } from "lucide-react";
import { GlassCard } from "../ui/glass-card";

interface FiberTemperatureCardProps {
  temperature: number;
}

export const FiberTemperatureCard: React.FC<FiberTemperatureCardProps> = ({ temperature }) => {
  // تحديد لون الحالة بناءً على درجة الحرارة
  const getStatusColor = () => {
    if (temperature <= 30) return "text-green-500 bg-green-50";
    if (temperature <= 40) return "text-amber-500 bg-amber-50";
    return "text-red-500 bg-red-50";
  };

  const getStatusText = () => {
    if (temperature <= 30) return "طبيعية";
    if (temperature <= 40) return "مرتفعة";
    return "خطر";
  };

  return (
    <GlassCard className="p-4 animate-fade-in">
      <div className="flex items-center">
        <div className={`p-3 rounded-xl mr-4 ${getStatusColor()}`}>
          <Thermometer size={20} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-tajawal">درجة حرارة الألياف</p>
          <p className="text-xl font-semibold">{temperature}°C</p>
        </div>
      </div>
      <div className="mt-2 text-xs font-tajawal">
        <span className={temperature > 40 ? "text-red-500 font-medium" : "text-muted-foreground"}>
          الحالة: {getStatusText()}
        </span>
      </div>
    </GlassCard>
  );
};
