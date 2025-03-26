
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { AccessibilityOption } from "./accessibility/AccessibilityOption";
import { KeyboardShortcuts } from "./accessibility/KeyboardShortcuts";
import { useA11y } from "@/hooks/useA11y";

export function AccessibilitySettings() {
  const { t } = useTranslation();
  const { 
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode
  } = useA11y();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.accessibility.title', 'إمكانية الوصول')}</CardTitle>
        <CardDescription>
          {t('settings.accessibility.description', 'تخصيص إعدادات إمكانية الوصول لتحسين تجربة الاستخدام')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AccessibilityOption 
          id="high-contrast"
          icon="eye"
          title={t('settings.accessibility.highContrast', 'وضع التباين العالي')}
          description={t('settings.accessibility.highContrastDescription', 'تحسين التباين للأشخاص الذين يعانون من ضعف البصر')}
          checked={highContrast}
          onCheckedChange={setHighContrast}
        />
        
        <Separator />
        
        <AccessibilityOption 
          id="large-text"
          icon="type"
          title={t('settings.accessibility.largeText', 'النص الكبير')}
          description={t('settings.accessibility.largeTextDescription', 'زيادة حجم النص لتسهيل القراءة')}
          checked={largeText}
          onCheckedChange={setLargeText}
        />
        
        <Separator />
        
        <AccessibilityOption 
          id="reduced-motion"
          icon="zoomIn"
          title={t('settings.accessibility.reducedMotion', 'تقليل الحركة')}
          description={t('settings.accessibility.reducedMotionDescription', 'تقليل أو إزالة الرسوم المتحركة في الواجهة')}
          checked={reducedMotion}
          onCheckedChange={setReducedMotion}
        />
        
        <Separator />
        
        <AccessibilityOption 
          id="focus-mode"
          icon="mousePointer2"
          title={t('settings.accessibility.focusMode', 'وضع التركيز')}
          description={t('settings.accessibility.focusModeDescription', 'تقليل التشتت من خلال إبراز العنصر الحالي فقط')}
          checked={focusMode}
          onCheckedChange={setFocusMode}
        />
        
        <Separator />
        
        <KeyboardShortcuts />
      </CardContent>
    </Card>
  );
}
