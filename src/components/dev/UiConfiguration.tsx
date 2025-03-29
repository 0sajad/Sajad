
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useTranslation } from "react-i18next";

export function UiConfiguration() {
  const { t } = useTranslation();
  
  // حالة إعدادات الواجهة
  const [darkModeDefault, setDarkModeDefault] = useState("system");
  const [fontSizeDefault, setFontSizeDefault] = useState("normal");
  const [enabledAnimations, setEnabledAnimations] = useState(true);
  const [borderRadius, setBorderRadius] = useState(8);
  const [fullWidthLayout, setFullWidthLayout] = useState(false);
  const [rtlDefault, setRtlDefault] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>{t('developer.ui.theme.title', 'السمة الافتراضية')}</Label>
            <Select
              value={darkModeDefault}
              onValueChange={setDarkModeDefault}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('developer.ui.theme.select', 'اختر السمة الافتراضية')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{t('developer.ui.theme.light', 'فاتح')}</SelectItem>
                <SelectItem value="dark">{t('developer.ui.theme.dark', 'داكن')}</SelectItem>
                <SelectItem value="system">{t('developer.ui.theme.system', 'حسب النظام')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>{t('developer.ui.fontSize.title', 'حجم الخط الافتراضي')}</Label>
            <Select
              value={fontSizeDefault}
              onValueChange={setFontSizeDefault}
            >
              <SelectTrigger>
                <SelectValue placeholder={t('developer.ui.fontSize.select', 'اختر حجم الخط')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">{t('developer.ui.fontSize.small', 'صغير')}</SelectItem>
                <SelectItem value="normal">{t('developer.ui.fontSize.normal', 'عادي')}</SelectItem>
                <SelectItem value="large">{t('developer.ui.fontSize.large', 'كبير')}</SelectItem>
                <SelectItem value="x-large">{t('developer.ui.fontSize.xlarge', 'كبير جدًا')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>{t('developer.ui.rtl.title', 'اتجاه من اليمين إلى اليسار افتراضيًا')}</Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.ui.rtl.desc', 'يتم تطبيقه عند تحديد اللغة العربية')}
              </p>
            </div>
            <Switch
              checked={rtlDefault}
              onCheckedChange={setRtlDefault}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>{t('developer.ui.animations.title', 'تفعيل الرسوم المتحركة')}</Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.ui.animations.desc', 'تحسين تجربة المستخدم بالرسوم المتحركة')}
              </p>
            </div>
            <Switch
              checked={enabledAnimations}
              onCheckedChange={setEnabledAnimations}
            />
          </div>
          
          {enabledAnimations && (
            <div className="space-y-2">
              <Label>{t('developer.ui.animations.speed', 'سرعة الرسوم المتحركة')}</Label>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <span className="text-sm">{t('developer.ui.animations.slow', 'بطيء')}</span>
                <Slider
                  value={[animationSpeed]}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onValueChange={(value) => setAnimationSpeed(value[0])}
                  className="flex-1"
                />
                <span className="text-sm">{t('developer.ui.animations.fast', 'سريع')}</span>
              </div>
              <p className="text-xs text-muted-foreground font-tajawal text-center">
                {animationSpeed.toFixed(1)}x
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            <Label>{t('developer.ui.borderRadius.title', 'نصف قطر الحواف')}</Label>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-sm">{t('developer.ui.borderRadius.sharp', 'حاد')}</span>
              <Slider
                value={[borderRadius]}
                min={0}
                max={16}
                step={1}
                onValueChange={(value) => setBorderRadius(value[0])}
                className="flex-1"
              />
              <span className="text-sm">{t('developer.ui.borderRadius.round', 'دائري')}</span>
            </div>
            <p className="text-xs text-muted-foreground font-tajawal text-center">
              {borderRadius}px
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>{t('developer.ui.fullWidth.title', 'عرض كامل')}</Label>
              <p className="text-sm text-muted-foreground font-tajawal">
                {t('developer.ui.fullWidth.desc', 'استخدام عرض الشاشة كاملًا')}
              </p>
            </div>
            <Switch
              checked={fullWidthLayout}
              onCheckedChange={setFullWidthLayout}
            />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <Label>{t('developer.ui.brandColors.title', 'ألوان العلامة التجارية')}</Label>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-xs">{t('developer.ui.brandColors.primary', 'اللون الأساسي')}</Label>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-octaBlue-600 rounded" />
              <Input defaultValue="#3b82f6" className="w-28" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs">{t('developer.ui.brandColors.secondary', 'اللون الثانوي')}</Label>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-octaBlue-300 rounded" />
              <Input defaultValue="#93c5fd" className="w-28" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs">{t('developer.ui.brandColors.accent', 'لون التأكيد')}</Label>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-8 h-8 bg-green-500 rounded" />
              <Input defaultValue="#22c55e" className="w-28" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
