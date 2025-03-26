
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";
import { Type, LineHeight, LetterSpacing, PencilRuler } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
  
  // الخطوط العربية المدعومة
  const arabicFonts = [
    { id: "default", name: t('accessibility.defaultFont', 'الخط الافتراضي') },
    { id: "traditional", name: t('accessibility.traditionalFont', 'الخط التقليدي') },
    { id: "naskh", name: "النسخ" },
    { id: "kufi", name: "الكوفي" },
    { id: "thuluth", name: "الثلث" },
    { id: "diwani", name: "الديواني" }
  ];

  // نص للعرض التوضيحي
  const previewText = "هذا مثال للنص باللغة العربية لمعاينة إعدادات تحسين النص العربي. يمكنك رؤية تأثير الإعدادات هنا.";

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <Type className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" aria-hidden="true" />
          {t('accessibility.arabicTextEnhancement', 'تحسين النص العربي')}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* اختيار الخط */}
        <div className="space-y-2">
          <Label htmlFor="fontFamily" className="text-sm">
            {t('accessibility.fontFamily', 'نوع الخط')}
          </Label>
          <Select value={fontFamily} onValueChange={setFontFamily}>
            <SelectTrigger id="fontFamily" className="w-full">
              <SelectValue placeholder={t('accessibility.selectFont', 'اختر الخط')} />
            </SelectTrigger>
            <SelectContent>
              {arabicFonts.map((font) => (
                <SelectItem key={font.id} value={font.id}>
                  {font.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* ارتفاع السطر */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="lineHeight" className="text-sm flex items-center">
              <LineHeight className="h-3.5 w-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0" aria-hidden="true" />
              {t('accessibility.lineHeight', 'ارتفاع السطر')}
            </Label>
            <span className="text-xs text-muted-foreground">{lineHeight.toFixed(1)}</span>
          </div>
          <Slider
            id="lineHeight"
            min={1}
            max={2.5}
            step={0.1}
            value={[lineHeight]}
            onValueChange={(values) => setLineHeight(values[0])}
          />
        </div>
        
        {/* تباعد الأحرف */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="letterSpacing" className="text-sm flex items-center">
              <LetterSpacing className="h-3.5 w-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0" aria-hidden="true" />
              {t('accessibility.letterSpacing', 'تباعد الأحرف')}
            </Label>
            <span className="text-xs text-muted-foreground">{letterSpacing.toFixed(1)}</span>
          </div>
          <Slider
            id="letterSpacing"
            min={0}
            max={2}
            step={0.1}
            value={[letterSpacing]}
            onValueChange={(values) => setLetterSpacing(values[0])}
          />
        </div>
        
        {/* تمكين الكشيدة */}
        <div className="flex items-center justify-between py-1">
          <Label htmlFor="kashida" className="text-sm flex items-center cursor-pointer">
            <PencilRuler className="h-3.5 w-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0" aria-hidden="true" />
            {t('accessibility.enableKashida', 'تمكين الكشيدة')}
          </Label>
          <Switch 
            id="kashida" 
            checked={kashidaEnabled}
            onCheckedChange={setKashidaEnabled}
          />
        </div>
        
        <Separator />
        
        {/* معاينة النص */}
        <div className="space-y-2">
          <Label className="text-sm">{t('accessibility.preview', 'معاينة')}</Label>
          <div 
            className={cn(
              "p-3 border rounded-md text-right", 
              fontFamily === "naskh" && "font-naskh",
              fontFamily === "kufi" && "font-kufi",
              fontFamily === "thuluth" && "font-thuluth",
              fontFamily === "diwani" && "font-diwani",
              fontFamily === "traditional" && "font-traditional"
            )}
            style={{ 
              lineHeight: lineHeight, 
              letterSpacing: `${letterSpacing}px`,
              textJustify: kashidaEnabled ? "kashida" : "auto",
            }}
            dir="rtl"
          >
            {previewText}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
