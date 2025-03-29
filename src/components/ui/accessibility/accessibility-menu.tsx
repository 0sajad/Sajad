
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Accessibility, InfoIcon, Cog } from "lucide-react";
import { useA11yContext } from "@/hooks/accessibility/useA11yContext";
import { DisplayTab } from "./display-tab";
import { MotionTab } from "./motion-tab";
import { ColorTab } from "./color-tab";
import { ReadingTab } from "./reading-tab";
import { AudioTab } from "./audio-tab";
import { ArabicTextEnhancer } from "@/components/text/ArabicTextEnhancer";
import { useAppState } from '@/hooks/state/use-app-state';

/**
 * قائمة إمكانية الوصول - توفر واجهة لتغيير إعدادات إمكانية الوصول
 */
export function AccessibilityMenu() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("display");
  
  // استخدام خطاف إمكانية الوصول
  const a11y = useA11yContext();
  
  // استخدام حالة التطبيق لإمكانية الوصول
  const { 
    highContrast, 
    largeText, 
    reducedMotion,
    focusMode,
    readingGuide,
    dyslexicFont,
    colorBlindMode,
    soundFeedback,
    setHighContrast, 
    setLargeText, 
    setReducedMotion,
    setFocusMode,
    setReadingGuide,
    setDyslexicFont,
    setColorBlindMode,
    setSoundFeedback
  } = useAppState(state => state);
  
  // معالج لتبديل اللوحة
  const togglePanel = () => {
    setIsOpen(!isOpen);
    
    // إعلان لقارئات الشاشة
    if (!isOpen && a11y) {
      a11y.announce(t('accessibility.menuOpened', 'تم فتح قائمة إمكانية الوصول'), 'polite');
    }
  };
  
  // معالج لإعادة تعيين جميع الإعدادات
  const resetAllSettings = () => {
    setHighContrast(false);
    setLargeText(false);
    setReducedMotion(false);
    setFocusMode(false);
    setReadingGuide(false);
    setDyslexicFont(false);
    setColorBlindMode('none');
    setSoundFeedback(false);
    
    if (a11y) {
      a11y.announce(t('accessibility.settingsReset', 'تم إعادة تعيين إعدادات إمكانية الوصول'), 'polite');
      a11y.playSound('info');
    }
  };
  
  // التبديل بين التبويبات
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (a11y) {
      const tabNames: Record<string, string> = {
        display: t('accessibility.tabs.display', 'العرض'),
        motion: t('accessibility.tabs.motion', 'الحركة'),
        color: t('accessibility.tabs.color', 'الألوان'),
        reading: t('accessibility.tabs.reading', 'القراءة'),
        audio: t('accessibility.tabs.audio', 'الصوت')
      };
      
      a11y.announce(
        t('accessibility.tabSelected', 'تم تحديد تبويب') + ' ' + tabNames[value],
        'polite'
      );
    }
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 left-4 z-50 rounded-full shadow-md bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={togglePanel}
          aria-label={t('accessibility.openMenu', 'فتح قائمة إمكانية الوصول')}
        >
          <Accessibility className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-full md:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center">
              <Accessibility className="h-5 w-5 mr-2" />
              <ArabicTextEnhancer>{t('accessibility.title', 'إعدادات إمكانية الوصول')}</ArabicTextEnhancer>
            </div>
          </SheetTitle>
          <SheetDescription>
            <ArabicTextEnhancer>
              {t('accessibility.description', 'تخصيص تجربتك لتحسين إمكانية الوصول')}
            </ArabicTextEnhancer>
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="display" aria-label={t('accessibility.tabs.display', 'العرض')}>
                <ArabicTextEnhancer>{t('accessibility.tabs.display', 'العرض')}</ArabicTextEnhancer>
              </TabsTrigger>
              <TabsTrigger value="motion" aria-label={t('accessibility.tabs.motion', 'الحركة')}>
                <ArabicTextEnhancer>{t('accessibility.tabs.motion', 'الحركة')}</ArabicTextEnhancer>
              </TabsTrigger>
              <TabsTrigger value="color" aria-label={t('accessibility.tabs.color', 'الألوان')}>
                <ArabicTextEnhancer>{t('accessibility.tabs.color', 'الألوان')}</ArabicTextEnhancer>
              </TabsTrigger>
              <TabsTrigger value="reading" aria-label={t('accessibility.tabs.reading', 'القراءة')}>
                <ArabicTextEnhancer>{t('accessibility.tabs.reading', 'القراءة')}</ArabicTextEnhancer>
              </TabsTrigger>
              <TabsTrigger value="audio" aria-label={t('accessibility.tabs.audio', 'الصوت')}>
                <ArabicTextEnhancer>{t('accessibility.tabs.audio', 'الصوت')}</ArabicTextEnhancer>
              </TabsTrigger>
            </TabsList>
            
            <DisplayTab 
              highContrast={highContrast}
              largeText={largeText}
              setHighContrast={setHighContrast}
              setLargeText={setLargeText}
            />
            
            <MotionTab 
              reducedMotion={reducedMotion}
              setReducedMotion={setReducedMotion}
            />
            
            <ColorTab />
            
            <ReadingTab 
              focusMode={focusMode}
              dyslexicFont={dyslexicFont}
              readingGuide={readingGuide}
              setFocusMode={setFocusMode}
              setDyslexicFont={setDyslexicFont}
              setReadingGuide={setReadingGuide}
            />
            
            <AudioTab
              soundFeedback={soundFeedback}
              setSoundFeedback={setSoundFeedback}
            />
          </Tabs>
        </div>
        
        <div className="bg-muted/20 p-4 rounded-lg mt-4">
          <div className="flex items-start">
            <InfoIcon className="h-5 w-5 mr-2 mt-0.5 text-blue-500" />
            <div>
              <div className="font-medium">
                <ArabicTextEnhancer>{t('accessibility.keyboardShortcuts', 'اختصارات لوحة المفاتيح')}</ArabicTextEnhancer>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                <ArabicTextEnhancer>
                  {t('accessibility.keyboardShortcutsDesc', 'استخدم Alt+C للتباين العالي، و Alt+T للنص الكبير، و Alt+M لتقليل الحركة.')}
                </ArabicTextEnhancer>
              </div>
            </div>
          </div>
        </div>
        
        <SheetFooter className="mt-6 flex-row justify-between gap-3">
          <Button 
            type="submit" 
            variant="outline" 
            onClick={resetAllSettings}
            className="flex-1"
          >
            <ArabicTextEnhancer>{t('accessibility.resetAll', 'إعادة تعيين الكل')}</ArabicTextEnhancer>
          </Button>
          <SheetClose asChild>
            <Button 
              type="button" 
              variant="default" 
              className="flex-1"
              onClick={() => {
                if (a11y) {
                  a11y.announce(t('accessibility.settingsSaved', 'تم حفظ الإعدادات'), 'polite');
                }
              }}
            >
              <ArabicTextEnhancer>{t('common.done', 'تم')}</ArabicTextEnhancer>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
