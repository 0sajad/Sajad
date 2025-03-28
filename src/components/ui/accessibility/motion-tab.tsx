
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { AccessibilityToggle } from "./accessibility-toggle";
import { MousePointer, Pause, Focus } from "lucide-react";

interface MotionTabProps {
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
}

/**
 * تبويب الحركة لإعدادات إمكانية الوصول
 */
export function MotionTab({
  reducedMotion,
  setReducedMotion
}: MotionTabProps) {
  const { t } = useTranslation();
  
  return (
    <TabsContent value="motion" className="space-y-2 py-2">
      <AccessibilityToggle
        id="reduced-motion-toggle"
        label={t('accessibility.reducedMotion', 'تقليل الحركة')}
        description={t('accessibility.reducedMotionDesc', 'تقليل أو إزالة الرسوم المتحركة')}
        icon={Pause}
        checked={reducedMotion}
        onChange={setReducedMotion}
        shortcutKey="Alt+M"
      />
      
      <AccessibilityToggle
        id="focus-mode-toggle"
        label={t('accessibility.focusMode', 'وضع التركيز')}
        description={t('accessibility.focusModeDesc', 'تحسين التركيز بتخفيت العناصر غير الضرورية')}
        icon={Focus}
        checked={document.body.classList.contains('focus-mode')}
        onChange={(checked) => {
          if (checked) {
            document.body.classList.add('focus-mode');
            localStorage.setItem('focus-mode', 'enabled');
          } else {
            document.body.classList.remove('focus-mode');
            localStorage.removeItem('focus-mode');
          }
        }}
      />
      
      <AccessibilityToggle
        id="cursor-size-toggle"
        label={t('accessibility.largerCursor', 'مؤشر أكبر')}
        description={t('accessibility.largerCursorDesc', 'زيادة حجم مؤشر الماوس')}
        icon={MousePointer}
        checked={document.body.classList.contains('large-cursor')}
        onChange={(checked) => {
          if (checked) {
            document.body.classList.add('large-cursor');
            localStorage.setItem('large-cursor', 'enabled');
          } else {
            document.body.classList.remove('large-cursor');
            localStorage.removeItem('large-cursor');
          }
        }}
      />
    </TabsContent>
  );
}
