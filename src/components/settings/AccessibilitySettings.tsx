
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, Type, ZoomIn, MousePointer2 } from "lucide-react";
import { useTranslation } from "react-i18next";
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
        {/* خيار التباين العالي */}
        <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="high-contrast" className="flex flex-col space-y-1">
              <span>{t('settings.accessibility.highContrast', 'وضع التباين العالي')}</span>
              <span className="font-normal text-xs text-muted-foreground">
                {t('settings.accessibility.highContrastDescription', 'تحسين التباين للأشخاص الذين يعانون من ضعف البصر')}
              </span>
            </Label>
          </div>
          <Switch
            id="high-contrast"
            checked={highContrast}
            onCheckedChange={setHighContrast}
            aria-label={t('settings.accessibility.highContrast', 'وضع التباين العالي')}
          />
        </div>
        
        <Separator />
        
        {/* خيار النص الكبير */}
        <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Type className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="large-text" className="flex flex-col space-y-1">
              <span>{t('settings.accessibility.largeText', 'النص الكبير')}</span>
              <span className="font-normal text-xs text-muted-foreground">
                {t('settings.accessibility.largeTextDescription', 'زيادة حجم النص لتسهيل القراءة')}
              </span>
            </Label>
          </div>
          <Switch
            id="large-text"
            checked={largeText}
            onCheckedChange={setLargeText}
            aria-label={t('settings.accessibility.largeText', 'النص الكبير')}
          />
        </div>
        
        <Separator />
        
        {/* خيار تقليل الحركة */}
        <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <ZoomIn className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="reduced-motion" className="flex flex-col space-y-1">
              <span>{t('settings.accessibility.reducedMotion', 'تقليل الحركة')}</span>
              <span className="font-normal text-xs text-muted-foreground">
                {t('settings.accessibility.reducedMotionDescription', 'تقليل أو إزالة الرسوم المتحركة في الواجهة')}
              </span>
            </Label>
          </div>
          <Switch
            id="reduced-motion"
            checked={reducedMotion}
            onCheckedChange={setReducedMotion}
            aria-label={t('settings.accessibility.reducedMotion', 'تقليل الحركة')}
          />
        </div>
        
        <Separator />
        
        {/* خيار وضع التركيز */}
        <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <MousePointer2 className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="focus-mode" className="flex flex-col space-y-1">
              <span>{t('settings.accessibility.focusMode', 'وضع التركيز')}</span>
              <span className="font-normal text-xs text-muted-foreground">
                {t('settings.accessibility.focusModeDescription', 'تقليل التشتت من خلال إبراز العنصر الحالي فقط')}
              </span>
            </Label>
          </div>
          <Switch
            id="focus-mode"
            checked={focusMode}
            onCheckedChange={setFocusMode}
            aria-label={t('settings.accessibility.focusMode', 'وضع التركيز')}
          />
        </div>
        
        <Separator />
        
        <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
          <p>{t('settings.accessibility.shortcutsTitle', 'اختصارات لوحة المفاتيح:')}</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            <li>Alt + C: {t('settings.accessibility.toggleHighContrast', 'تبديل وضع التباين العالي')}</li>
            <li>Alt + T: {t('settings.accessibility.toggleLargeText', 'تبديل النص الكبير')}</li>
            <li>Alt + M: {t('settings.accessibility.toggleReducedMotion', 'تبديل تقليل الحركة')}</li>
            <li>Alt + F: {t('settings.accessibility.toggleFocusMode', 'تبديل وضع التركيز')}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
