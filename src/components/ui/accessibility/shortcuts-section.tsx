
import React from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface ShortcutsSectionProps {
  className?: string;
}

/**
 * قسم يعرض اختصارات لوحة المفاتيح المتاحة في التطبيق
 */
export function ShortcutsSection({ className }: ShortcutsSectionProps) {
  const { t } = useTranslation();
  
  // قائمة اختصارات لوحة المفاتيح
  const shortcuts = [
    {
      key: "Alt + C",
      description: t('accessibility.shortcuts.highContrast', 'تفعيل/تعطيل التباين العالي')
    },
    {
      key: "Alt + T",
      description: t('accessibility.shortcuts.largeText', 'تفعيل/تعطيل النص الكبير')
    },
    {
      key: "Alt + M",
      description: t('accessibility.shortcuts.reducedMotion', 'تفعيل/تعطيل تقليل الحركة')
    },
    {
      key: "Alt + F",
      description: t('accessibility.shortcuts.focusMode', 'تفعيل/تعطيل وضع التركيز')
    },
    {
      key: "Alt + /",
      description: t('accessibility.shortcuts.showKeyboardNav', 'إظهار قائمة التنقل بلوحة المفاتيح')
    }
  ];
  
  return (
    <div className={cn("border-t pt-3", className)}>
      <h3 className="text-sm font-medium mb-2">
        {t('accessibility.shortcuts.title', 'اختصارات لوحة المفاتيح')}
      </h3>
      <ul className="text-xs space-y-1.5">
        {shortcuts.map((shortcut, index) => (
          <li key={index} className="flex justify-between">
            <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
              {shortcut.key}
            </kbd>
            <span className="text-muted-foreground">{shortcut.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
