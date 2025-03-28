
import React from "react";
import { DateTimeDisplay } from "@/components/datetime/DateTimeDisplay";
import { CountdownDisplay } from "@/components/countdown/CountdownDisplay";
import { useTranslation } from "react-i18next";
import { useCountdown } from "@/hooks/useCountdown";
import { toast } from "sonner";
import { useA11y } from "@/hooks/useA11y";

export function SpecificDateTimeDisplay() {
  const { t, i18n } = useTranslation();
  const { announce } = useA11y();
  
  // Create a date object for March 28, 2025 at 02:10
  const specificDateTime = new Date(2025, 2, 28, 2, 10); // March is month 2 (months start at 0)
  
  // Use the countdown hook
  const { timeRemaining } = useCountdown({
    targetDate: specificDateTime,
    onComplete: () => {
      // When countdown completes
      const message = i18n.language.startsWith('ar') 
        ? "انتهى العد التنازلي!"
        : "Countdown completed!";
      
      toast.success(message);
      announce(message, "assertive");
    }
  });
  
  return (
    <div className="w-full max-w-4xl mx-auto my-8 space-y-6" aria-live="polite">
      <DateTimeDisplay 
        datetime={specificDateTime} 
        className="shadow-lg hover:shadow-xl transition-shadow duration-300"
        titleOverride={i18n.language.startsWith('ar') ? "التاريخ المستهدف" : "Target Date"}
      />
      
      <CountdownDisplay 
        targetDate={specificDateTime} 
        timeRemaining={timeRemaining} 
        className="shadow-lg hover:shadow-xl transition-shadow duration-300"
      />
    </div>
  );
}
