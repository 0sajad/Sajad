
import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Accessibility, Keyboard, Eye, Type, ZoomIn, MousePointer2 } from "lucide-react";
import { AccessibilityToggle } from "./accessibility-toggle";
import { useA11y } from "@/hooks/useA11y";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function MobileA11yDrawer() {
  const { t, i18n } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = useState(false);
  
  // الميزات من hook useA11y
  const {
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide,
    announce
  } = useA11y();
  
  // إعلان التغييرات لقارئات الشاشة
  const announceChange = (feature: string, state: boolean) => {
    const featureName = t(`accessibility.${feature}`);
    const stateText = state ? t('accessibility.enabled') : t('accessibility.disabled');
    announce(t('accessibility.ariaLiveAnnouncement', { 
      feature: featureName, 
      state: stateText 
    }), state ? "polite" : "assertive");
  };
  
  // مواكبة التغييرات في حجم الشاشة
  useEffect(() => {
    if (!isMobile && open) {
      setOpen(false);
    }
  }, [isMobile, open]);
  
  // الحصول على التسميات المناسبة حسب اللغة
  const getLabel = (key: string) => {
    if (i18n.language === 'ar-iq') {
      const iraqiLabels: Record<string, string> = {
        highContrast: "تباين عالي",
        largeText: "خط كبير",
        reducedMotion: "تقليل الحركة",
        focusMode: "وضع التركيز",
        dyslexicFont: "خط عسر القراءة",
        readingGuide: "دليل القراءة"
      };
      return iraqiLabels[key] || key;
    }
    return t(`accessibility.${key}`);
  };
  
  // الحصول على الوصف المناسب حسب اللغة
  const getDescription = (key: string) => {
    if (i18n.language === 'ar-iq') {
      const iraqiDescriptions: Record<string, string> = {
        highContrastDescription: "زيادة التباين عشان تشوف أحسن",
        largeTextDescription: "زيادة حجم الخط عشان تقرأ أسهل",
        reducedMotionDescription: "تقليل أو إلغاء الحركات بالصفحة",
        focusModeDescription: "تقليل التشتت من خلال إبراز العناصر المهمة بس",
        dyslexicFontDescription: "خط خاص يساعد إلي عندهم عسر قراءة",
        readingGuideDescription: "خط يساعدك على متابعة القراءة"
      };
      return iraqiDescriptions[`${key}Description`] || "";
    }
    return t(`accessibility.${key}Description`);
  };
  
  // إذا لم يكن الجهاز جوالًا، لا نعرض هذا المكون
  if (!isMobile) return null;
  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 left-4 z-40 h-10 w-10 rounded-full shadow-lg bg-background rtl:left-auto rtl:right-4"
          aria-label={t('accessibility.a11ySettings')}
        >
          <Accessibility className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="focus:outline-none">
        <DrawerHeader>
          <DrawerTitle>{t('accessibility.a11ySettings')}</DrawerTitle>
          <DrawerDescription>
            {t('accessibility.menuDescription')}
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="p-4 space-y-6">
          <AccessibilityToggle
            id="mobile-a11y-high-contrast"
            label={getLabel("highContrast")}
            icon={Eye}
            checked={highContrast}
            onChange={(checked) => {
              setHighContrast(checked);
              announceChange('highContrast', checked);
            }}
            shortcutKey="Alt+C"
            description={getDescription("highContrastDescription")}
          />
          
          <AccessibilityToggle
            id="mobile-a11y-large-text"
            label={getLabel("largeText")}
            icon={Type}
            checked={largeText}
            onChange={(checked) => {
              setLargeText(checked);
              announceChange('largeText', checked);
            }}
            shortcutKey="Alt+T"
            description={getDescription("largeTextDescription")}
          />
          
          <AccessibilityToggle
            id="mobile-a11y-reduced-motion"
            label={getLabel("reducedMotion")}
            icon={ZoomIn}
            checked={reducedMotion}
            onChange={(checked) => {
              setReducedMotion(checked);
              announceChange('reducedMotion', checked);
            }}
            shortcutKey="Alt+M"
            description={getDescription("reducedMotionDescription")}
          />
          
          <AccessibilityToggle
            id="mobile-a11y-focus-mode"
            label={getLabel("focusMode")}
            icon={MousePointer2}
            checked={focusMode}
            onChange={(checked) => {
              setFocusMode(checked);
              announceChange('focusMode', checked);
            }}
            shortcutKey="Alt+F"
            description={getDescription("focusModeDescription")}
          />
          
          <AccessibilityToggle
            id="mobile-a11y-dyslexic-font"
            label={getLabel("dyslexicFont")}
            icon={Type}
            checked={dyslexicFont}
            onChange={(checked) => {
              setDyslexicFont(checked);
              announceChange('dyslexicFont', checked);
            }}
            shortcutKey="Alt+D"
            description={getDescription("dyslexicFontDescription")}
          />
          
          <AccessibilityToggle
            id="mobile-a11y-reading-guide"
            label={getLabel("readingGuide")}
            icon={MousePointer2}
            checked={readingGuide}
            onChange={(checked) => {
              setReadingGuide(checked);
              announceChange('readingGuide', checked);
            }}
            shortcutKey="Alt+R"
            description={getDescription("readingGuideDescription")}
          />
        </div>
        
        <DrawerFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t('common.close')}
          </Button>
          <DrawerClose asChild>
            <Button className="sr-only">{t('common.close')}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
