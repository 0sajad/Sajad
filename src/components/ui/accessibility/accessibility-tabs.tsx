
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTranslation } from "react-i18next";
import { useA11y } from "@/hooks/useA11y";
import { Eye, Type, ZoomIn, MousePointer2, Volume2, Sun, Palette } from "lucide-react";
import { motion } from "framer-motion";
import { ColorBlindFilter } from "./color-blind-filter";

/**
 * مكون علامات التبويب لإعدادات إمكانية الوصول المحسّن
 * يوفر واجهة مستخدم بديهية لإعدادات إمكانية الوصول المختلفة
 */
export function AccessibilityTabs() {
  const { t, i18n } = useTranslation();
  const { 
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide,
    colorBlindMode, setColorBlindMode,
    soundFeedback, setSoundFeedback,
    announce,
    playNotificationSound
  } = useA11y();
  
  const [activeTab, setActiveTab] = useState("display");
  
  // المساعدة في الإعلان عن تغييرات إمكانية الوصول
  const announceChange = (feature: string, state: boolean) => {
    const featureName = t(`accessibility.${feature}`);
    const stateText = state ? t('accessibility.enabled') : t('accessibility.disabled');
    
    announce(`${featureName} ${stateText}`, "polite");
    
    if (soundFeedback) {
      playNotificationSound(state ? "success" : "info");
    }
  };
  
  return (
    <Tabs 
      defaultValue="display" 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid grid-cols-3 w-full rtl-reverse-grid">
        <TabsTrigger 
          value="display" 
          aria-label={t('accessibility.tabDisplay')}
          className="flex items-center gap-1.5"
        >
          <Eye className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{t('accessibility.tabDisplay')}</span>
        </TabsTrigger>
        <TabsTrigger 
          value="motion" 
          aria-label={t('accessibility.tabMotion')}
          className="flex items-center gap-1.5"
        >
          <ZoomIn className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{t('accessibility.tabMotion')}</span>
        </TabsTrigger>
        <TabsTrigger 
          value="color" 
          aria-label={t('accessibility.tabColor')}
          className="flex items-center gap-1.5"
        >
          <Palette className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">{t('accessibility.tabColor')}</span>
        </TabsTrigger>
      </TabsList>
      
      {/* محتوى تبويب العرض */}
      <TabsContent value="display" className="space-y-4 pt-2">
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label htmlFor="high-contrast" className="font-medium">
                {t('accessibility.highContrast')}
              </Label>
              <span className="text-xs text-muted-foreground">
                {t('accessibility.highContrastDescription')}
              </span>
            </div>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={(checked) => {
                setHighContrast(checked);
                announceChange('highContrast', checked);
              }}
              aria-label={t('accessibility.highContrast')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label htmlFor="large-text" className="font-medium">
                {t('accessibility.largeText')}
              </Label>
              <span className="text-xs text-muted-foreground">
                {t('accessibility.largeTextDescription')}
              </span>
            </div>
            <Switch
              id="large-text"
              checked={largeText}
              onCheckedChange={(checked) => {
                setLargeText(checked);
                announceChange('largeText', checked);
              }}
              aria-label={t('accessibility.largeText')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label htmlFor="dyslexic-font" className="font-medium">
                {t('accessibility.dyslexicFont')}
              </Label>
              <span className="text-xs text-muted-foreground">
                {t('accessibility.dyslexicFontDescription')}
              </span>
            </div>
            <Switch
              id="dyslexic-font"
              checked={dyslexicFont}
              onCheckedChange={(checked) => {
                setDyslexicFont(checked);
                announceChange('dyslexicFont', checked);
              }}
              aria-label={t('accessibility.dyslexicFont')}
            />
          </div>
        </motion.div>
      </TabsContent>
      
      {/* محتوى تبويب الحركة */}
      <TabsContent value="motion" className="space-y-4 pt-2">
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label htmlFor="reduced-motion" className="font-medium">
                {t('accessibility.reducedMotion')}
              </Label>
              <span className="text-xs text-muted-foreground">
                {t('accessibility.reducedMotionDescription')}
              </span>
            </div>
            <Switch
              id="reduced-motion"
              checked={reducedMotion}
              onCheckedChange={(checked) => {
                setReducedMotion(checked);
                announceChange('reducedMotion', checked);
              }}
              aria-label={t('accessibility.reducedMotion')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label htmlFor="focus-mode" className="font-medium">
                {t('accessibility.focusMode')}
              </Label>
              <span className="text-xs text-muted-foreground">
                {t('accessibility.focusModeDescription')}
              </span>
            </div>
            <Switch
              id="focus-mode"
              checked={focusMode}
              onCheckedChange={(checked) => {
                setFocusMode(checked);
                announceChange('focusMode', checked);
              }}
              aria-label={t('accessibility.focusMode')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label htmlFor="reading-guide" className="font-medium">
                {t('accessibility.readingGuide')}
              </Label>
              <span className="text-xs text-muted-foreground">
                {t('accessibility.readingGuideDescription')}
              </span>
            </div>
            <Switch
              id="reading-guide"
              checked={readingGuide}
              onCheckedChange={(checked) => {
                setReadingGuide(checked);
                announceChange('readingGuide', checked);
              }}
              aria-label={t('accessibility.readingGuide')}
            />
          </div>
        </motion.div>
      </TabsContent>
      
      {/* محتوى تبويب الألوان */}
      <TabsContent value="color" className="space-y-4 pt-2">
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label className="font-medium">
              {t('accessibility.colorBlindMode')}
            </Label>
            <ColorBlindFilter
              value={colorBlindMode}
              onChange={(value) => {
                setColorBlindMode(value);
                const modeTranslationKey = value === 'none' ? 'normalVision' : value;
                announce(t(`accessibility.${modeTranslationKey}`), "polite");
                if (soundFeedback) {
                  playNotificationSound("info");
                }
              }}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label htmlFor="sound-feedback" className="font-medium">
                {t('accessibility.soundFeedback')}
              </Label>
              <span className="text-xs text-muted-foreground">
                {t('accessibility.soundFeedbackDescription')}
              </span>
            </div>
            <Switch
              id="sound-feedback"
              checked={soundFeedback}
              onCheckedChange={(checked) => {
                setSoundFeedback(checked);
                announceChange('soundFeedback', checked);
                if (checked) {
                  playNotificationSound("success");
                }
              }}
              aria-label={t('accessibility.soundFeedback')}
            />
          </div>
        </motion.div>
      </TabsContent>
    </Tabs>
  );
}

