
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Calendar } from "lucide-react";
import { CountdownUnit } from "./CountdownUnit";
import { Time } from "@/types/time";

interface CountdownDisplayProps {
  targetDate: Date;
  timeRemaining: Time;
  className?: string;
}

export function CountdownDisplay({ targetDate, timeRemaining, className = "" }: CountdownDisplayProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  // تنسيق التاريخ المستهدف حسب اللغة
  const formatTargetDate = () => {
    switch (i18n.language) {
      case 'ar':
      case 'ar-iq':
        return "العد التنازلي لتاريخ 28 مارس 2025 الساعة 02:10";
      case 'fr':
        return "Compte à rebours jusqu'au 28 mars 2025 à 02:10";
      case 'ja':
        return "2025年3月28日02:10までのカウントダウン";
      case 'zh':
        return "倒计时至2025年3月28日02:10";
      default:
        return "Countdown to March 28, 2025 at 02:10 AM";
    }
  };

  return (
    <Card className={`overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 ${className}`}>
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">
              {isRTL ? "العد التنازلي للموعد" : "Countdown to Date"}
            </h3>
            <Calendar className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
        
        <div className="p-6">
          <div 
            className={`grid grid-cols-4 gap-4 text-center ${isRTL ? "dir-rtl" : ""}`}
            role="timer"
            aria-label={isRTL ? "العد التنازلي للموعد المحدد" : "Countdown to specified date"}
          >
            <CountdownUnit 
              value={timeRemaining.days} 
              unit="days"
            />
            
            <CountdownUnit 
              value={timeRemaining.hours} 
              unit="hours"
            />
            
            <CountdownUnit 
              value={timeRemaining.minutes} 
              unit="minutes"
            />
            
            <CountdownUnit 
              value={timeRemaining.seconds} 
              unit="seconds"
            />
          </div>
          
          <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
            {formatTargetDate()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
