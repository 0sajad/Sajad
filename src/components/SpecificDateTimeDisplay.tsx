
import React from "react";
import { DateTimeDisplay } from "@/components/ui/datetime-display";
import { CountdownDisplay } from "@/components/countdown/CountdownDisplay";
import { useTranslation } from "react-i18next";
import { useCountdown } from "@/hooks/useCountdown";
import { toast } from "sonner";
import { useA11y } from "@/hooks/useA11y";

export function SpecificDateTimeDisplay() {
  const { t, i18n } = useTranslation();
  const { announce } = useA11y();
  
  // إنشاء كائن تاريخ لـ 28 مارس 2025 الساعة 02:10
  const specificDateTime = new Date(2025, 2, 28, 2, 10); // شهر مارس هو الشهر 2 (الأشهر تبدأ من 0)
  
  // استخدام hook العد التنازلي
  const { timeRemaining } = useCountdown({
    targetDate: specificDateTime,
    onComplete: () => {
      // عند اكتمال العد التنازلي
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
