
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { useMode } from "@/context/ModeContext";
import { useTheme } from "next-themes";

export function UiConfiguration() {
  const { t } = useTranslation();
  const { isDeveloperMode } = useMode();
  const { theme, setTheme } = useTheme();
  
  // إعدادات واجهة المستخدم
  const [uiDensity, setUiDensity] = useState(1); // 0 = مدمج، 1 = متوسط، 2 = متباعد
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [rtlForAllLanguages, setRtlForAllLanguages] = useState(false);
  const [fontScale, setFontScale] = useState(100);
  const [interfaceColor, setInterfaceColor] = useState("default");
  
  // تطبيق كثافة الواجهة
  const applyUiDensity = (value: number) => {
    setUiDensity(value);
    // تطبيق كثافة الواجهة على الـ DOM
    const root = document.documentElement;
    if (value === 0) {
      root.style.setProperty('--content-spacing', '0.5rem');
      root.style.setProperty('--element-spacing', '0.25rem');
    } else if (value === 1) {
      root.style.setProperty('--content-spacing', '1rem');
      root.style.setProperty('--element-spacing', '0.5rem');
    } else {
      root.style.setProperty('--content-spacing', '1.5rem');
      root.style.setProperty('--element-spacing', '0.75rem');
    }
  };
  
  // تطبيق حجم الخط
  const applyFontScale = (value: number[]) => {
    const scale = value[0];
    setFontScale(scale);
    document.documentElement.style.setProperty('--font-scale', `${scale / 100}`);
  };
  
  // تطبيق اتجاه RTL على جميع اللغات
  const toggleRtlForAll = () => {
    setRtlForAllLanguages(!rtlForAllLanguages);
    if (!rtlForAllLanguages) {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl-active');
    } else {
      // إرجاع الاتجاه الافتراضي حسب اللغة
      const { i18n } = require('i18next');
      const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
      if (!isRTL) {
        document.body.classList.remove('rtl-active');
      }
    }
  };
  
  // تطبيق لون الواجهة
  const handleInterfaceColorChange = (value: string) => {
    setInterfaceColor(value);
    
    const root = document.documentElement;
    switch (value) {
      case "blue":
        root.style.setProperty('--primary-color', '#1E88E5');
        root.style.setProperty('--primary-light', '#E3F2FD');
        break;
      case "green":
        root.style.setProperty('--primary-color', '#43A047');
        root.style.setProperty('--primary-light', '#E8F5E9');
        break;
      case "purple":
        root.style.setProperty('--primary-color', '#8E24AA');
        root.style.setProperty('--primary-light', '#F3E5F5');
        break;
      default:
        root.style.setProperty('--primary-color', '#2196F3');
        root.style.setProperty('--primary-light', '#E3F2FD');
        break;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg font-tajawal">
            {t('developer.ui.theme.title', 'السمة والمظهر')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label className="font-tajawal">
                {t('developer.ui.theme.mode', 'وضع العرض')}
              </Label>
              <RadioGroup
                defaultValue={theme}
                className="flex space-x-4 rtl:space-x-reverse"
                onValueChange={setTheme}
              >
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="font-tajawal cursor-pointer">
                    {t('developer.ui.theme.light', 'فاتح')}
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="font-tajawal cursor-pointer">
                    {t('developer.ui.theme.dark', 'داكن')}
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system" className="font-tajawal cursor-pointer">
                    {t('developer.ui.theme.system', 'النظام')}
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label className="font-tajawal">
                {t('developer.ui.theme.color', 'لون الواجهة')}
              </Label>
              <Select value={interfaceColor} onValueChange={handleInterfaceColorChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('developer.ui.theme.selectColor', 'اختر لونًا')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">{t('developer.ui.theme.colors.default', 'افتراضي')}</SelectItem>
                  <SelectItem value="blue">{t('developer.ui.theme.colors.blue', 'أزرق')}</SelectItem>
                  <SelectItem value="green">{t('developer.ui.theme.colors.green', 'أخضر')}</SelectItem>
                  <SelectItem value="purple">{t('developer.ui.theme.colors.purple', 'بنفسجي')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg font-tajawal">
            {t('developer.ui.layout.title', 'تخطيط الواجهة')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="font-tajawal">
                {t('developer.ui.layout.density', 'كثافة عناصر الواجهة')}
              </Label>
              <span className="text-sm text-muted-foreground">
                {uiDensity === 0 
                  ? t('developer.ui.layout.compact', 'مدمج') 
                  : uiDensity === 1 
                    ? t('developer.ui.layout.default', 'متوسط') 
                    : t('developer.ui.layout.comfortable', 'متباعد')}
              </span>
            </div>
            <RadioGroup
              value={String(uiDensity)}
              className="flex justify-between"
              onValueChange={(value) => applyUiDensity(Number(value))}
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="0" id="compact" />
                <Label htmlFor="compact" className="font-tajawal cursor-pointer">
                  {t('developer.ui.layout.compact', 'مدمج')}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="1" id="default" />
                <Label htmlFor="default" className="font-tajawal cursor-pointer">
                  {t('developer.ui.layout.default', 'متوسط')}
                </Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="2" id="comfortable" />
                <Label htmlFor="comfortable" className="font-tajawal cursor-pointer">
                  {t('developer.ui.layout.comfortable', 'متباعد')}
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="font-tajawal">
                {t('developer.ui.layout.fontSize', 'حجم الخط')}
              </Label>
              <span className="text-sm text-muted-foreground">{fontScale}%</span>
            </div>
            <Slider
              value={[fontScale]}
              min={70}
              max={130}
              step={5}
              onValueChange={applyFontScale}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="font-tajawal">
              {t('developer.ui.layout.animations', 'تفعيل الرسوم المتحركة')}
            </Label>
            <Switch
              checked={animationsEnabled}
              onCheckedChange={setAnimationsEnabled}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="font-tajawal">
              {t('developer.ui.layout.rtlForAll', 'استخدام RTL لكل اللغات')}
            </Label>
            <Switch
              checked={rtlForAllLanguages}
              onCheckedChange={toggleRtlForAll}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
