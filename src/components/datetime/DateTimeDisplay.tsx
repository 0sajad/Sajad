
import React from "react";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { ar, fr, ja, zhCN } from "date-fns/locale";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DateTimeDisplayProps {
  datetime: Date;
  showIcon?: boolean;
  className?: string;
  titleOverride?: string;
}

export function DateTimeDisplay({ 
  datetime, 
  showIcon = true, 
  className = "",
  titleOverride
}: DateTimeDisplayProps) {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  // Get the appropriate locale for date formatting
  const getLocale = () => {
    switch (i18n.language) {
      case 'ar':
      case 'ar-iq':
        return ar;
      case 'fr':
        return fr;
      case 'ja':
        return ja;
      case 'zh':
        return zhCN;
      default:
        return undefined;
    }
  };
  
  // Format the date according to locale
  const formattedDate = format(
    datetime,
    "PPP",
    { locale: getLocale() }
  );
  
  // Format the time according to locale
  const formattedTime = format(
    datetime,
    "p",
    { locale: getLocale() }
  );

  // Descriptive text for screen readers
  const ariaLabel = isRTL 
    ? `التاريخ: ${formattedDate}, الوقت: ${formattedTime}`
    : `Date: ${formattedDate}, Time: ${formattedTime}`;

  // Component title (can be overridden via props)
  const cardTitle = titleOverride || (isRTL ? "التاريخ والوقت" : "Date & Time");

  return (
    <Card 
      className={`overflow-hidden ${className}`} 
      role="region" 
      aria-label={ariaLabel}
    >
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">
              {cardTitle}
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
