
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { useA11y } from "@/hooks/useA11y";
import { AccessibilityToggle } from "./accessibility-toggle";
import { Palette, EyeOff, ScreenShare } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

/**
 * تبويب الألوان لإعدادات إمكانية الوصول
 */
export function ColorTab() {
  const { t } = useTranslation();
  const { colorBlindMode, setColorBlindMode } = useA11y();
  
  return (
    <TabsContent value="color" className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="color-blind-mode">
          {t('accessibility.colorBlindMode', 'وضع عمى الألوان')}
        </Label>
        <Select 
          value={colorBlindMode} 
          onValueChange={(value) => setColorBlindMode(value as any)}
        >
          <SelectTrigger id="color-blind-mode">
            <SelectValue placeholder={t('accessibility.selectMode', 'اختر الوضع')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">{t('accessibility.normal', 'طبيعي')}</SelectItem>
            <SelectItem value="protanopia">{t('accessibility.protanopia', 'عمى اللون الأحمر')}</SelectItem>
            <SelectItem value="deuteranopia">{t('accessibility.deuteranopia', 'عمى اللون الأخضر')}</SelectItem>
            <SelectItem value="tritanopia">{t('accessibility.tritanopia', 'عمى اللون الأزرق')}</SelectItem>
            <SelectItem value="achromatopsia">{t('accessibility.achromatopsia', 'عمى الألوان الكلي')}</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1">
          {t('accessibility.colorBlindModeDesc', 'تعديل الألوان للأشخاص الذين يعانون من عمى الألوان')}
        </p>
      </div>
      
      <AccessibilityToggle
        id="invert-colors-toggle"
        label={t('accessibility.invertColors', 'عكس الألوان')}
        description={t('accessibility.invertColorsDesc', 'عكس جميع الألوان في الصفحة')}
        icon={Palette}
        checked={document.body.classList.contains('invert-colors')}
        onChange={(checked) => {
          if (checked) {
            document.body.classList.add('invert-colors');
            localStorage.setItem('invert-colors', 'enabled');
          } else {
            document.body.classList.remove('invert-colors');
            localStorage.removeItem('invert-colors');
          }
        }}
      />
      
      <AccessibilityToggle
        id="monochrome-toggle"
        label={t('accessibility.monochrome', 'أحادي اللون')}
        description={t('accessibility.monochromeDesc', 'تحويل الصفحة إلى الأبيض والأسود')}
        icon={EyeOff}
        checked={document.body.classList.contains('monochrome')}
        onChange={(checked) => {
          if (checked) {
            document.body.classList.add('monochrome');
            localStorage.setItem('monochrome', 'enabled');
          } else {
            document.body.classList.remove('monochrome');
            localStorage.removeItem('monochrome');
          }
        }}
      />
    </TabsContent>
  );
}
