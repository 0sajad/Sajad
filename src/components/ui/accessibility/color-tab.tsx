
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useA11y } from "@/hooks/useA11y";

/**
 * تبويب خيارات الألوان في قائمة إمكانية الوصول
 */
export function ColorTab() {
  const { t } = useTranslation();
  const { colorBlindMode, setColorBlindMode } = useA11y();
  
  return (
    <TabsContent value="color" className="space-y-4">
      <div>
        <Label className="block mb-2">
          {t('accessibility.features.colorBlindMode', 'وضع عمى الألوان')}
        </Label>
        <p className="text-xs text-muted-foreground mb-3">
          {t('accessibility.features.colorBlindModeDescription', 'تعديل ألوان الموقع لمساعدة الأشخاص الذين يعانون من عمى الألوان')}
        </p>
        
        <RadioGroup
          value={colorBlindMode}
          onValueChange={(value) => setColorBlindMode(value as any)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem value="none" id="color-none" />
            <Label htmlFor="color-none" className="cursor-pointer">
              {t('accessibility.colorModes.none', 'بدون')}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem value="protanopia" id="color-protanopia" />
            <Label htmlFor="color-protanopia" className="cursor-pointer">
              {t('accessibility.colorModes.protanopia', 'عمى اللون الأحمر')}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem value="deuteranopia" id="color-deuteranopia" />
            <Label htmlFor="color-deuteranopia" className="cursor-pointer">
              {t('accessibility.colorModes.deuteranopia', 'عمى اللون الأخضر')}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem value="tritanopia" id="color-tritanopia" />
            <Label htmlFor="color-tritanopia" className="cursor-pointer">
              {t('accessibility.colorModes.tritanopia', 'عمى اللون الأزرق')}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem value="achromatopsia" id="color-achromatopsia" />
            <Label htmlFor="color-achromatopsia" className="cursor-pointer">
              {t('accessibility.colorModes.achromatopsia', 'عمى الألوان الكامل')}
            </Label>
          </div>
        </RadioGroup>
      </div>
    </TabsContent>
  );
}
