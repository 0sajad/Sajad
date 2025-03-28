
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Clock } from "lucide-react";

interface DateTimeDisplayProps {
  datetime: Date;
  showIcon?: boolean;
  className?: string;
}

export function DateTimeDisplay({ 
  datetime, 
  showIcon = true, 
  className = "" 
}: DateTimeDisplayProps) {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  // تنسيق التاريخ حسب اللغة
  const formattedDate = format(
    datetime,
    "PPP",
    { locale: isRTL ? ar : undefined }
  );
  
  // تنسيق الوقت حسب اللغة
  const formattedTime = format(
    datetime,
    "p",
    { locale: isRTL ? ar : undefined }
  );

  // نص وصفي للقارئ الشاشة
  const ariaLabel = isRTL 
    ? `التاريخ: ${formattedDate}, الوقت: ${formattedTime}`
    : `Date: ${formattedDate}, Time: ${formattedTime}`;

  return (
    <Card className={`overflow-hidden ${className}`} role="region" aria-label={ariaLabel}>
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">
              {isRTL ? "التاريخ والوقت" : "Date & Time"}
            </h3>
            {showIcon && <Clock className="h-5 w-5" aria-hidden="true" />}
          </div>
        </div>
        
        <div className="p-6 flex flex-col items-center space-y-2">
          <div 
            className="text-3xl font-bold" 
            aria-label={isRTL ? `الوقت: ${formattedTime}` : `Time: ${formattedTime}`}
          >
            {formattedTime}
          </div>
          <div 
            className="text-lg text-muted-foreground"
            aria-label={isRTL ? `التاريخ: ${formattedDate}` : `Date: ${formattedDate}`}
          >
            {formattedDate}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
