
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { AccessibilityToggle } from "./accessibility-toggle";
import { EyeIcon, Contrast, PaintBucket } from "lucide-react";

interface DisplayTabProps {
  highContrast: boolean;
  largeText: boolean;
  setHighContrast: (value: boolean) => void;
  setLargeText: (value: boolean) => void;
}

/**
 * تبويب العرض لإعدادات إمكانية الوصول
 */
export function DisplayTab({
  highContrast,
  largeText,
  setHighContrast,
  setLargeText
}: DisplayTabProps) {
  const { t } = useTranslation();
  
  return (
    <TabsContent value="display" className="space-y-2 py-2">
      <AccessibilityToggle
        id="high-contrast-toggle"
        label={t('accessibility.highContrast', 'تباين عالي')}
        description={t('accessibility.highContrastDesc', 'زيادة التباين بين العناصر')}
        icon={Contrast}
        checked={highContrast}
        onChange={setHighContrast}
        shortcutKey="Alt+C"
      />
      
      <AccessibilityToggle
        id="large-text-toggle"
        label={t('accessibility.largeText', 'نص كبير')}
        description={t('accessibility.largeTextDesc', 'زيادة حجم النص للقراءة الأسهل')}
        icon={EyeIcon}
        checked={largeText}
        onChange={setLargeText}
        shortcutKey="Alt+T"
      />
      
      <AccessibilityToggle
        id="dark-mode-toggle"
        label={t('accessibility.darkMode', 'الوضع الداكن')}
        description={t('accessibility.darkModeDesc', 'تبديل بين السمة الفاتحة والداكنة')}
        icon={PaintBucket}
        checked={document.documentElement.classList.contains('dark')}
        onChange={(checked) => {
          if (checked) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
          } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
          }
        }}
      />
    </TabsContent>
  );
}
