
import React from "react";
import { useTranslation } from "react-i18next";

interface ShortcutsSectionProps {
  className?: string;
}

/**
 * قسم اختصارات لوحة المفاتيح في قائمة إمكانية الوصول
 */
export function ShortcutsSection({ className = "" }: ShortcutsSectionProps) {
  const { t } = useTranslation();
  
  const shortcuts = [
    { key: "Alt+C", description: t('accessibility.toggleHighContrast', 'تبديل التباين العالي') },
    { key: "Alt+T", description: t('accessibility.toggleLargeText', 'تبديل النص الكبير') },
    { key: "Alt+M", description: t('accessibility.toggleReducedMotion', 'تبديل تقليل الحركة') },
    { key: "Alt+F", description: t('accessibility.toggleFocusMode', 'تبديل وضع التركيز') },
  ];
  
  return (
    <div className={`rounded-md border p-3 bg-muted/40 ${className}`}>
      <h3 className="text-sm font-medium">
        {t('accessibility.keyboardShortcuts', 'اختصارات لوحة المفاتيح')}
      </h3>
      <div className="mt-2 grid gap-1">
        {shortcuts.map((shortcut) => (
          <div key={shortcut.key} className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{shortcut.description}</span>
            <kbd className="px-1.5 py-0.5 bg-background border rounded text-xs">
              {shortcut.key}
            </kbd>
          </div>
        ))}
      </div>
    </div>
  );
}
