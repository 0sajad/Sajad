
import React from "react";
import { DateTimeDisplay } from "@/components/ui/datetime-display";

export function SpecificDateTimeDisplay() {
  // إنشاء كائن تاريخ لـ 28 مارس 2025 الساعة 02:10
  const specificDateTime = new Date(2025, 2, 28, 2, 10); // شهر مارس هو الشهر 2 (الأشهر تبدأ من 0)
  
  return (
    <div className="w-full max-w-md mx-auto my-8">
      <DateTimeDisplay 
        datetime={specificDateTime} 
        className="shadow-lg hover:shadow-xl transition-shadow duration-300"
      />
    </div>
  );
}
