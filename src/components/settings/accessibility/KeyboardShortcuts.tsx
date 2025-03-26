
import React from "react";
import { useTranslation } from "react-i18next";

export function KeyboardShortcuts() {
  const { t } = useTranslation();
  
  return (
    <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
      <p>{t('settings.accessibility.shortcutsTitle', 'اختصارات لوحة المفاتيح:')}</p>
      <ul className="mt-2 list-disc list-inside space-y-1">
        <li>Alt + C: {t('settings.accessibility.toggleHighContrast', 'تبديل وضع التباين العالي')}</li>
        <li>Alt + T: {t('settings.accessibility.toggleLargeText', 'تبديل النص الكبير')}</li>
        <li>Alt + M: {t('settings.accessibility.toggleReducedMotion', 'تبديل تقليل الحركة')}</li>
        <li>Alt + F: {t('settings.accessibility.toggleFocusMode', 'تبديل وضع التركيز')}</li>
      </ul>
    </div>
  );
}
