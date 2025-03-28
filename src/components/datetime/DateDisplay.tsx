
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { ar, fr, ja, zhCN } from "date-fns/locale";

interface DateDisplayProps {
  datetime: Date;
  className?: string;
  titleOverride?: string;
}

export function DateDisplay({ 
  datetime, 
  className = "",
  titleOverride
}: DateDisplayProps) {
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
  
  // Descriptive text for screen readers
  const ariaLabel = isRTL 
    ? `التاريخ: ${formattedDate}`
    : `Date: ${formattedDate}`;

  // Component title (can be overridden via props)
  const cardTitle = titleOverride || (isRTL ? "التاريخ" : "Date");

  return (
    <div className={`${className}`} aria-label={ariaLabel}>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
            <h3 className="font-medium text-lg">{cardTitle}</h3>
          </div>
          <div className="p-6 flex flex-col items-center">
            <div 
              className="text-lg text-muted-foreground"
              aria-label={isRTL ? `التاريخ: ${formattedDate}` : `Date: ${formattedDate}`}
            >
              {formattedDate}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
