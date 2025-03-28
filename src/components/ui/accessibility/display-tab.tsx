
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useA11y } from "@/hooks/useA11y";

interface DisplayTabProps {
  highContrast: boolean;
  largeText: boolean;
  setHighContrast: (value: boolean) => void;
  setLargeText: (value: boolean) => void;
}

/**
 * تبويب خيارات العرض في قائمة إمكانية الوصول
 */
export function DisplayTab({
  highContrast,
  largeText,
  setHighContrast,
  setLargeText
}: DisplayTabProps) {
  const { t } = useTranslation();
  const { dyslexicFont, setDyslexicFont } = useA11y();
  
  return (
    <TabsContent value="display" className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="high-contrast" className="cursor-pointer">
            {t('accessibility.features.highContrast', 'تباين عالي')}
          </Label>
          <Switch
            id="high-contrast"
            checked={highContrast}
            onCheckedChange={setHighContrast}
            aria-label={t('accessibility.features.highContrast', 'تباين عالي')}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {t('accessibility.features.highContrastDescription', 'زيادة تباين النص والعناصر لتحسين القراءة')}
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="large-text" className="cursor-pointer">
            {t('accessibility.features.largeText', 'نص كبير')}
          </Label>
          <Switch
            id="large-text"
            checked={largeText}
            onCheckedChange={setLargeText}
            aria-label={t('accessibility.features.largeText', 'نص كبير')}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {t('accessibility.features.largeTextDescription', 'زيادة حجم النص لتسهيل القراءة')}
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="dyslexic-font" className="cursor-pointer">
            {t('accessibility.features.dyslexicFont', 'خط عسر القراءة')}
          </Label>
          <Switch
            id="dyslexic-font"
            checked={dyslexicFont}
            onCheckedChange={setDyslexicFont}
            aria-label={t('accessibility.features.dyslexicFont', 'خط عسر القراءة')}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {t('accessibility.features.dyslexicFontDescription', 'استخدام خط خاص لمساعدة الأشخاص الذين يعانون من عسر القراءة')}
        </p>
      </div>
    </TabsContent>
  );
}
