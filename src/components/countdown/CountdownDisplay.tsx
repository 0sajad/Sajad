
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { CountdownTimer } from "./CountdownTimer";
import { Timer } from "lucide-react";

interface CountdownDisplayProps {
  targetDate: Date;
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  className?: string;
}

export function CountdownDisplay({ 
  targetDate, 
  timeRemaining,
  className = ""
}: CountdownDisplayProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  const title = isRTL ? "العد التنازلي" : "Countdown";
  
  // Format full date for screen readers
  const targetDateString = targetDate.toLocaleString(i18n.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const ariaLabel = isRTL 
    ? `العد التنازلي للتاريخ: ${targetDateString}`
    : `Countdown to: ${targetDateString}`;
  
  return (
    <Card 
      className={`overflow-hidden ${className}`}
      role="timer"
      aria-label={ariaLabel}
    >
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">{title}</h3>
            <Timer className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
        
        <div className="p-6">
          <CountdownTimer 
            days={timeRemaining.days}
            hours={timeRemaining.hours}
            minutes={timeRemaining.minutes}
            seconds={timeRemaining.seconds}
          />
        </div>
      </CardContent>
    </Card>
  );
}
