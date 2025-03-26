
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

// نوع لتمثيل اختصار لوحة المفاتيح
export type KeyboardShortcut = {
  key: string;        // زر أو مجموعة أزرار الاختصار
  description: string; // وصف الإجراء الذي يتم تنفيذه
  category?: string;   // فئة الاختصار (اختياري)
};

// الاختصارات الافتراضية لإمكانية الوصول
export const defaultA11yShortcuts: KeyboardShortcut[] = [
  { key: "Alt+C", description: "accessibility.toggleHighContrast", category: "display" },
  { key: "Alt+T", description: "accessibility.toggleLargeText", category: "display" },
  { key: "Alt+M", description: "accessibility.toggleReducedMotion", category: "motion" },
  { key: "Alt+F", description: "accessibility.toggleFocusMode", category: "display" },
  { key: "Alt+D", description: "accessibility.toggleDyslexicFont", category: "text" },
  { key: "Alt+R", description: "accessibility.toggleReadingGuide", category: "reading" },
  { key: "Alt+?", description: "accessibility.showKeyboardShortcuts", category: "help" }
];

interface KeyboardShortcutsListProps {
  shortcuts: KeyboardShortcut[]; // قائمة الاختصارات للعرض
  title?: string;               // عنوان اختياري
  description?: string;         // وصف اختياري
  enableHint?: boolean;         // عرض تلميح حول كيفية استخدام الاختصارات
  badgeVariant?: "default" | "secondary"; // نوع شارة الاختصار
}

/**
 * مكون لعرض قائمة اختصارات لوحة المفاتيح
 */
export function KeyboardShortcutsList({
  shortcuts,
  title,
  description,
  enableHint = true,
  badgeVariant = "default"
}: KeyboardShortcutsListProps) {
  const { t } = useTranslation();
  
  return (
    <Card className="w-full">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{t(title, title)}</CardTitle>}
          {description && <CardDescription>{t(description, description)}</CardDescription>}
        </CardHeader>
      )}
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{t(shortcut.description, shortcut.description)}</span>
              <Badge variant={badgeVariant} className="ml-2">
                {shortcut.key}
              </Badge>
            </div>
          ))}
        </div>
        
        {enableHint && (
          <p className="text-xs text-muted-foreground mt-4">
            {t('accessibility.keyboardShortcutsHint', 'اضغط على اختصار لوحة المفاتيح المطلوب لتنشيط الميزة المقابلة.')}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
