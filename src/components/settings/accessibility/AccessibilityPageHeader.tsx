
import React from "react";
import { useTranslation } from "react-i18next";
import { AccessibilityIcon } from "lucide-react";

export function AccessibilityPageHeader() {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center space-x-4 rtl:space-x-reverse">
      <AccessibilityIcon className="h-10 w-10 text-primary" />
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('accessibility.title', 'إعدادات إمكانية الوصول')}</h1>
        <p className="text-muted-foreground">
          {t('accessibility.description', 'تخصيص إعدادات إمكانية الوصول لتحسين تجربتك')}
        </p>
      </div>
    </div>
  );
}
