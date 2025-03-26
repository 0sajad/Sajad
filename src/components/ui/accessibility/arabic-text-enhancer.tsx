
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { 
  Type, 
  Baseline,
  AlignJustify 
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface ArabicTextEnhancerProps {
  fontFamily: string;
  setFontFamily: (value: string) => void;
  lineHeight: number;
  setLineHeight: (value: number) => void;
  letterSpacing: number;
  setLetterSpacing: (value: number) => void;
  kashidaEnabled: boolean;
  setKashidaEnabled: (value: boolean) => void;
}

/**
 * مكون لتحسين عرض النص العربي
 */
export function ArabicTextEnhancer({
  fontFamily,
  setFontFamily,
  lineHeight,
  setLineHeight,
  letterSpacing,
  setLetterSpacing,
  kashidaEnabled,
  setKashidaEnabled
}: ArabicTextEnhancerProps) {
  const { t } = useTranslation();
  
  const fontOptions = [
    { value: "default", label: "النص الافتراضي" },
    { value: "traditional", label: "الخط التقليدي" },
    { value: "modern", label: "الخط الحديث" },
    { value: "simplified", label: "الخط المبسط" }
  ];
  
  // نص مثال للعرض
  const sampleText = "هذا مثال على كيف سيظهر النص العربي بالإعدادات الحالية. يمكنك ضبط الإعدادات لتحسين قراءة النص حسب تفضيلاتك.";
  
  // حساب نمط CSS للنص المثال
  const sampleTextStyle = {
    fontFamily: getFontFamilyValue(fontFamily),
    lineHeight: lineHeight,
    letterSpacing: `${letterSpacing}px`,
    textAlign: kashidaEnabled ? "justify" : "start",
    textJustify: kashidaEnabled ? "auto" : undefined
  };
  
  // الحصول على قيمة خاصية الخط
  function getFontFamilyValue(value: string): string {
    switch (value) {
      case "traditional":
        return "'Amiri', 'Scheherazade New', serif";
      case "modern":
        return "'Tajawal', 'IBM Plex Sans Arabic', sans-serif";
      case "simplified":
        return "'Noto Sans Arabic', 'Cairo', sans-serif";
      default:
        return "inherit";
    }
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('accessibility.arabicTextEnhancer', 'تحسين النص العربي')}</CardTitle>
        <CardDescription>
          {t('accessibility.arabicTextEnhancerDescription', 'ضبط إعدادات عرض النص العربي لتحسين القراءة والوضوح')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* عرض مثال النص */}
        <div 
          className="p-4 border rounded-md bg-background" 
          style={sampleTextStyle as React.CSSProperties}
          dir="rtl"
        >
          {sampleText}
        </div>
        
        {/* اختيار نوع الخط */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Type className="h-4 w-4 text-muted-foreground" />
            <Label>{t('accessibility.fontFamily', 'نوع الخط')}</Label>
          </div>
          
          <RadioGroup 
            value={fontFamily} 
            onValueChange={setFontFamily}
            className="flex flex-col space-y-1"
          >
            {fontOptions.map(option => (
              <div key={option.value} className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value={option.value} id={`font-${option.value}`} />
                <Label 
                  htmlFor={`font-${option.value}`}
                  style={{ fontFamily: getFontFamilyValue(option.value) }}
                >
                  {t(`accessibility.font.${option.value}`, option.label)}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        {/* ضبط المسافة بين السطور */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Baseline className="h-4 w-4 text-muted-foreground" />
            <Label>{t('accessibility.lineHeight', 'المسافة بين السطور')}</Label>
            <span className="ml-auto text-xs text-muted-foreground">{lineHeight.toFixed(1)}</span>
          </div>
          
          <Slider
            value={[lineHeight]}
            onValueChange={(values) => setLineHeight(values[0])}
            min={1.0}
            max={2.5}
            step={0.1}
          />
        </div>
        
        {/* ضبط المسافة بين الحروف */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <Type className="h-4 w-4 text-muted-foreground" />
            <Label>{t('accessibility.letterSpacing', 'المسافة بين الحروف')}</Label>
            <span className="ml-auto text-xs text-muted-foreground">{letterSpacing.toFixed(1)} px</span>
          </div>
          
          <Slider
            value={[letterSpacing]}
            onValueChange={(values) => setLetterSpacing(values[0])}
            min={0}
            max={2}
            step={0.1}
          />
        </div>
        
        {/* تفعيل الكشيدة (التنسيق المضبوط) */}
        <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <AlignJustify className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="kashida" className="flex flex-col space-y-1">
              <span>{t('accessibility.kashidaEnabled', 'تفعيل الكشيدة')}</span>
              <span className="font-normal text-xs text-muted-foreground">
                {t('accessibility.kashidaDescription', 'ضبط النص لملء عرض السطر بتمديد الكلمات')}
              </span>
            </Label>
          </div>
          <Switch
            id="kashida"
            checked={kashidaEnabled}
            onCheckedChange={setKashidaEnabled}
          />
        </div>
      </CardContent>
    </Card>
  );
}
