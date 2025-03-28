
import React from "react";
import { useTranslation } from "react-i18next";

interface CountdownTimerProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ days, hours, minutes, seconds }: CountdownTimerProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  const timeUnits = [
    {
      value: days,
      label: isRTL ? "يوم" : "day",
      labelPlural: isRTL ? "أيام" : "days",
      ariaLabel: isRTL ? `${days} ${days === 1 ? "يوم" : "أيام"}` : `${days} ${days === 1 ? "day" : "days"}`
    },
    {
      value: hours,
      label: isRTL ? "ساعة" : "hour",
      labelPlural: isRTL ? "ساعات" : "hours",
      ariaLabel: isRTL ? `${hours} ${hours === 1 ? "ساعة" : "ساعات"}` : `${hours} ${hours === 1 ? "hour" : "hours"}`
    },
    {
      value: minutes,
      label: isRTL ? "دقيقة" : "minute",
      labelPlural: isRTL ? "دقائق" : "minutes",
      ariaLabel: isRTL ? `${minutes} ${minutes === 1 ? "دقيقة" : "دقائق"}` : `${minutes} ${minutes === 1 ? "minute" : "minutes"}`
    },
    {
      value: seconds,
      label: isRTL ? "ثانية" : "second",
      labelPlural: isRTL ? "ثواني" : "seconds",
      ariaLabel: isRTL ? `${seconds} ${seconds === 1 ? "ثانية" : "ثواني"}` : `${seconds} ${seconds === 1 ? "second" : "seconds"}`
    }
  ];
  
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {timeUnits.map((unit, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center"
          aria-label={unit.ariaLabel}
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg">
            {unit.value < 10 ? `0${unit.value}` : unit.value}
          </div>
          <div className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300">
            {unit.value === 1 ? unit.label : unit.labelPlural}
          </div>
        </div>
      ))}
    </div>
  );
}
