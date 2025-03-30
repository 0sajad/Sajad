
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface NetworkQualityGaugeProps {
  qualityScore: number;
  latency?: number;
  packetLoss?: number;
  jitter?: number;
}

export const NetworkQualityGauge: React.FC<NetworkQualityGaugeProps> = ({
  qualityScore,
  latency = 24,
  packetLoss = 0.5,
  jitter = 1.2
}) => {
  const { t } = useTranslation();
  
  // Calculate the appropriate color based on the score
  const getScoreColor = () => {
    if (qualityScore >= 80) return "green";
    if (qualityScore >= 60) return "yellow";
    return "red";
  };
  
  // Calculate the stroke-dasharray value for the circle
  const radius = 70; // This should match the r value of the circle
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference * (1 - qualityScore / 100);
  
  return (
    <div className="flex justify-center items-center">
      <div className="relative w-60 h-60">
        {/* Background circle */}
        <svg className="w-full h-full transform rotate-90" viewBox="0 0 180 180">
          <circle 
            cx="90" 
            cy="90" 
            r="70" 
            fill="none" 
            stroke="#e6e6e6" 
            strokeWidth="12" 
          />
          
          {/* Progress circle */}
          <circle 
            cx="90" 
            cy="90" 
            r="70" 
            fill="none" 
            stroke={getScoreColor() === "green" ? "#22c55e" : getScoreColor() === "yellow" ? "#eab308" : "#ef4444"} 
            strokeWidth="12" 
            strokeDasharray={strokeDasharray} 
            strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round" 
          />
        </svg>
        
        {/* Score text in the center */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          aria-label={`جودة الشبكة: ${qualityScore}%`}
        >
          <span className="text-5xl font-bold">{qualityScore}</span>
          <span className="text-sm text-muted-foreground">
            {t('networkQuality.score', 'جودة الشبكة')}
          </span>
        </div>
      </div>
    </div>
  );
};
