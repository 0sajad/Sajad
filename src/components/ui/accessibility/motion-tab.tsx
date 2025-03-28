
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useA11y } from "@/hooks/useA11y";

interface MotionTabProps {
  reducedMotion: boolean;
  setReducedMotion: (value: boolean) => void;
}

/**
 * تبويب خيارات الحركة في قائمة إمكانية الوصول
 */
export function MotionTab({
  reducedMotion,
  setReducedMotion
}: MotionTabProps) {
  const { t } = useTranslation();
  const { readingGuide, setReadingGuide, focusMode, setFocusMode } = useA11y();
  
  return (
    <TabsContent value="motion" className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="reduced-motion" className="cursor-pointer">
            {t('accessibility.features.reducedMotion', 'تقليل الحركة')}
          </Label>
          <Switch
            id="reduced-motion"
            checked={reducedMotion}
            onCheckedChange={setReducedMotion}
            aria-label={t('accessibility.features.reducedMotion', 'تقليل الحركة')}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {t('accessibility.features.reducedMotionDescription', 'تقليل أو إزالة الحركات والتأثيرات البصرية')}
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="reading-guide" className="cursor-pointer">
            {t('accessibility.features.readingGuide', 'دليل القراءة')}
          </Label>
          <Switch
            id="reading-guide"
            checked={readingGuide}
            onCheckedChange={setReadingGuide}
            aria-label={t('accessibility.features.readingGuide', 'دليل القراءة')}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {t('accessibility.features.readingGuideDescription', 'إضافة خط مرئي يتبع مؤشر الماوس لمساعدتك على القراءة')}
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="focus-mode" className="cursor-pointer">
            {t('accessibility.features.focusMode', 'وضع التركيز')}
          </Label>
          <Switch
            id="focus-mode"
            checked={focusMode}
            onCheckedChange={setFocusMode}
            aria-label={t('accessibility.features.focusMode', 'وضع التركيز')}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {t('accessibility.features.focusModeDescription', 'تبسيط الواجهة وتقليل العناصر المشتتة للانتباه')}
        </p>
      </div>
    </TabsContent>
  );
}
