
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { AccessibilityToggle } from "./accessibility-toggle";
import { BookOpen, Eye, FileSpreadsheet } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useA11yContext } from "@/hooks/accessibility/useA11yContext";
import { ArabicTextEnhancer } from "@/components/text/ArabicTextEnhancer";

interface ReadingTabProps {
  focusMode: boolean;
  dyslexicFont: boolean;
  readingGuide: boolean;
  setFocusMode: (value: boolean) => void;
  setDyslexicFont: (value: boolean) => void;
  setReadingGuide: (value: boolean) => void;
}

/**
 * تبويب القراءة لإعدادات إمكانية الوصول
 */
export function ReadingTab({
  focusMode,
  dyslexicFont,
  readingGuide,
  setFocusMode,
  setDyslexicFont,
  setReadingGuide
}: ReadingTabProps) {
  const { t } = useTranslation();
  const a11y = useA11yContext();
  const [lineHeight, setLineHeight] = React.useState(1.5);
  const [letterSpacing, setLetterSpacing] = React.useState(0);
  const [fontFamily, setFontFamily] = React.useState('default');
  
  // معالج تغيير الخط
  const handleFontFamilyChange = (value: string) => {
    setFontFamily(value);
    
    // تطبيق تغييرات الخط على المستند
    document.documentElement.style.setProperty('--font-family', getFontFamilyValue(value));
    
    if (a11y) {
      a11y.announce(
        t('accessibility.fontChanged', 'تم تغيير الخط إلى') + ' ' + 
        t(`accessibility.fonts.${value}`, value),
        'polite'
      );
    }
  };
  
  // الحصول على قيمة خاصية الخط
  const getFontFamilyValue = (fontName: string) => {
    switch(fontName) {
      case 'openDyslexic':
        return '"OpenDyslexic", sans-serif';
      case 'arial':
        return 'Arial, sans-serif';
      case 'verdana':
        return 'Verdana, sans-serif';
      case 'tajawal':
        return 'Tajawal, sans-serif';
      default:
        return 'var(--font-sans)';
    }
  };
  
  // معالج تغيير ارتفاع السطر
  const handleLineHeightChange = (value: number[]) => {
    const newValue = value[0];
    setLineHeight(newValue);
    document.documentElement.style.setProperty('--line-height', newValue.toString());
  };
  
  // معالج تغيير تباعد الحروف
  const handleLetterSpacingChange = (value: number[]) => {
    const newValue = value[0];
    setLetterSpacing(newValue);
    document.documentElement.style.setProperty('--letter-spacing', `${newValue}px`);
  };
  
  return (
    <TabsContent value="reading" className="space-y-4 py-2">
      <AccessibilityToggle
        id="focus-mode-toggle"
        label={t('accessibility.focusMode', 'وضع التركيز')}
        description={t('accessibility.focusModeDesc', 'تخفيت العناصر غير الأساسية لتحسين التركيز')}
        icon={Eye}
        checked={focusMode}
        onChange={setFocusMode}
        shortcutKey="Alt+F"
      />
      
      <AccessibilityToggle
        id="dyslexic-font-toggle"
        label={t('accessibility.dyslexicFont', 'خط عسر القراءة')}
        description={t('accessibility.dyslexicFontDesc', 'استخدام خط مصمم لمساعدة الأشخاص المصابين بعسر القراءة')}
        icon={BookOpen}
        checked={dyslexicFont}
        onChange={setDyslexicFont}
      />
      
      <AccessibilityToggle
        id="reading-guide-toggle"
        label={t('accessibility.readingGuide', 'دليل القراءة')}
        description={t('accessibility.readingGuideDesc', 'إظهار شريط أفقي يتتبع المؤشر للمساعدة في تتبع النص')}
        icon={FileSpreadsheet}
        checked={readingGuide}
        onChange={setReadingGuide}
      />
      
      <div className="space-y-2 pt-2">
        <Label htmlFor="font-family">
          <ArabicTextEnhancer>{t('accessibility.fontFamily', 'عائلة الخط')}</ArabicTextEnhancer>
        </Label>
        <Select
          value={fontFamily}
          onValueChange={handleFontFamilyChange}
        >
          <SelectTrigger id="font-family">
            <SelectValue placeholder={t('accessibility.selectFont', 'اختر الخط')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">
              <ArabicTextEnhancer>{t('accessibility.fonts.default', 'افتراضي')}</ArabicTextEnhancer>
            </SelectItem>
            <SelectItem value="openDyslexic">
              <ArabicTextEnhancer>{t('accessibility.fonts.openDyslexic', 'خط عسر القراءة')}</ArabicTextEnhancer>
            </SelectItem>
            <SelectItem value="arial">
              <ArabicTextEnhancer>{t('accessibility.fonts.arial', 'Arial')}</ArabicTextEnhancer>
            </SelectItem>
            <SelectItem value="verdana">
              <ArabicTextEnhancer>{t('accessibility.fonts.verdana', 'Verdana')}</ArabicTextEnhancer>
            </SelectItem>
            <SelectItem value="tajawal">
              <ArabicTextEnhancer>{t('accessibility.fonts.tajawal', 'Tajawal')}</ArabicTextEnhancer>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="line-height">
            <ArabicTextEnhancer>{t('accessibility.lineHeight', 'ارتفاع السطر')}</ArabicTextEnhancer>
          </Label>
          <span className="text-sm">{lineHeight.toFixed(1)}</span>
        </div>
        <Slider
          id="line-height"
          defaultValue={[lineHeight]}
          max={3}
          min={1}
          step={0.1}
          onValueChange={handleLineHeightChange}
          aria-label={t('accessibility.lineHeight', 'ارتفاع السطر')}
        />
      </div>
      
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="letter-spacing">
            <ArabicTextEnhancer>{t('accessibility.letterSpacing', 'تباعد الحروف')}</ArabicTextEnhancer>
          </Label>
          <span className="text-sm">{letterSpacing}px</span>
        </div>
        <Slider
          id="letter-spacing"
          defaultValue={[letterSpacing]}
          max={10}
          min={0}
          step={0.5}
          onValueChange={handleLetterSpacingChange}
          aria-label={t('accessibility.letterSpacing', 'تباعد الحروف')}
        />
      </div>
      
      <div className="mt-4 border-t pt-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <InfoIcon className="h-4 w-4" />
          <ArabicTextEnhancer>
            {t('accessibility.readingTip', 'نصيحة: زيادة تباعد الأسطر والحروف يمكن أن يحسن قابلية القراءة بشكل كبير.')}
          </ArabicTextEnhancer>
        </div>
      </div>
    </TabsContent>
  );
}

// استيراد أيقونة المعلومات
import { InfoIcon } from "lucide-react";
