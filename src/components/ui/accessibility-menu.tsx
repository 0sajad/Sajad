
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Accessibility, Type, ZoomIn, Eye, MousePointer2, Keyboard, Palette, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { useA11y } from "@/hooks/useA11y";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AccessibilityMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  
  const { 
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    colorBlindMode, setColorBlindMode,
    dyslexicFont, setDyslexicFont
  } = useA11y();

  // الحصول على تسمية اختصار لوحة المفاتيح مع التنسيق المناسب
  const getKeyboardShortcut = (shortcut: string) => {
    return (
      <kbd className="px-2 py-0.5 text-xs bg-muted rounded border border-border">
        {shortcut}
      </kbd>
    );
  };

  // إعلان التغييرات لقارئات الشاشة
  const announceChange = (feature: string, state: boolean) => {
    const featureName = t(`accessibility.${feature}`);
    const stateText = state ? t('accessibility.enabled') : t('accessibility.disabled');
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = t('accessibility.ariaLiveAnnouncement', { 
      feature: featureName, 
      state: stateText 
    });
    document.body.appendChild(announcement);
    
    // إزالة الإعلان بعد قراءته
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 3000);
  };

  // وظائف التبديل المحسنة مع الإعلانات
  const handleToggleHighContrast = (checked: boolean) => {
    setHighContrast(checked);
    announceChange('highContrast', checked);
  };

  const handleToggleLargeText = (checked: boolean) => {
    setLargeText(checked);
    announceChange('largeText', checked);
  };

  const handleToggleReducedMotion = (checked: boolean) => {
    setReducedMotion(checked);
    announceChange('reducedMotion', checked);
  };

  const handleToggleFocusMode = (checked: boolean) => {
    setFocusMode(checked);
    announceChange('focusMode', checked);
  };
  
  const handleToggleColorBlindMode = (mode: string | null) => {
    setColorBlindMode(mode);
    announceChange('colorBlindMode', Boolean(mode));
  };
  
  const handleToggleDyslexicFont = (checked: boolean) => {
    setDyslexicFont(checked);
    announceChange('dyslexicFont', checked);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative sr-only" 
          aria-label={t('accessibility.a11ySettings')}
          tabIndex={-1}
        >
          <Accessibility className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 md:w-96" 
        align="end" 
        sideOffset={16} 
        aria-label={t('accessibility.title')}
        role="dialog"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Accessibility className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" aria-hidden="true" />
              <h3 className="text-sm font-medium" id="a11y-menu-title">
                {t('accessibility.title')}
              </h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => setOpen(false)}
              aria-label={t('accessibility.closeBtnLabel')}
            >
              <span aria-hidden="true">×</span>
            </Button>
          </div>
          
          <Separator />
          
          <Tabs defaultValue="display" className="w-full">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="display" className="text-xs">
                <Eye className="h-3 w-3 mr-1" />
                {t('accessibility.tabDisplay')}
              </TabsTrigger>
              <TabsTrigger value="motion" className="text-xs">
                <ZoomIn className="h-3 w-3 mr-1" />
                {t('accessibility.tabMotion')}
              </TabsTrigger>
              <TabsTrigger value="color" className="text-xs">
                <Palette className="h-3 w-3 mr-1" />
                {t('accessibility.tabColor')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="display" className="space-y-4 mt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Type className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <Label 
                    htmlFor="a11y-large-text" 
                    className="text-sm cursor-pointer"
                    id="large-text-label"
                  >
                    {t('accessibility.largeText')}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  {getKeyboardShortcut("Alt+T")}
                  <Switch
                    id="a11y-large-text"
                    checked={largeText}
                    onCheckedChange={handleToggleLargeText}
                    aria-checked={largeText}
                    aria-labelledby="large-text-label"
                    aria-describedby="large-text-desc"
                  />
                </div>
              </div>
              <p id="large-text-desc" className="sr-only">{t('accessibility.largeTextDescription')}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <MousePointer2 className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <Label 
                    htmlFor="a11y-focus-mode" 
                    className="text-sm cursor-pointer"
                    id="focus-mode-label"
                  >
                    {t('accessibility.focusMode')}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  {getKeyboardShortcut("Alt+F")}
                  <Switch
                    id="a11y-focus-mode"
                    checked={focusMode}
                    onCheckedChange={handleToggleFocusMode}
                    aria-checked={focusMode}
                    aria-labelledby="focus-mode-label"
                    aria-describedby="focus-mode-desc"
                  />
                </div>
              </div>
              <p id="focus-mode-desc" className="sr-only">{t('accessibility.focusModeDescription')}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Type className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <Label 
                    htmlFor="a11y-dyslexic-font" 
                    className="text-sm cursor-pointer"
                    id="dyslexic-font-label"
                  >
                    {t('accessibility.dyslexicFont')}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  {getKeyboardShortcut("Alt+D")}
                  <Switch
                    id="a11y-dyslexic-font"
                    checked={dyslexicFont}
                    onCheckedChange={handleToggleDyslexicFont}
                    aria-checked={dyslexicFont}
                    aria-labelledby="dyslexic-font-label"
                    aria-describedby="dyslexic-font-desc"
                  />
                </div>
              </div>
              <p id="dyslexic-font-desc" className="sr-only">{t('accessibility.dyslexicFontDescription')}</p>
            </TabsContent>
            
            <TabsContent value="motion" className="space-y-4 mt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <ZoomIn className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <Label 
                    htmlFor="a11y-reduced-motion" 
                    className="text-sm cursor-pointer"
                    id="reduced-motion-label"
                  >
                    {t('accessibility.reducedMotion')}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  {getKeyboardShortcut("Alt+M")}
                  <Switch
                    id="a11y-reduced-motion"
                    checked={reducedMotion}
                    onCheckedChange={handleToggleReducedMotion}
                    aria-checked={reducedMotion}
                    aria-labelledby="reduced-motion-label"
                    aria-describedby="reduced-motion-desc"
                  />
                </div>
              </div>
              <p id="reduced-motion-desc" className="sr-only">{t('accessibility.reducedMotionDescription')}</p>
              
              <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
                <p>{t('accessibility.reducedMotionHint')}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="color" className="space-y-4 mt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Eye className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <Label 
                    htmlFor="a11y-high-contrast" 
                    className="text-sm cursor-pointer"
                    id="high-contrast-label"
                  >
                    {t('accessibility.highContrast')}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  {getKeyboardShortcut("Alt+C")}
                  <Switch
                    id="a11y-high-contrast"
                    checked={highContrast}
                    onCheckedChange={handleToggleHighContrast}
                    aria-checked={highContrast}
                    aria-labelledby="high-contrast-label"
                    aria-describedby="high-contrast-desc"
                  />
                </div>
              </div>
              <p id="high-contrast-desc" className="sr-only">{t('accessibility.highContrastDescription')}</p>
              
              <div className="space-y-2">
                <Label className="text-sm">{t('accessibility.colorBlindMode')}</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["protanopia", "deuteranopia", "tritanopia", null].map((mode) => (
                    <Button
                      key={mode || "normal"}
                      variant="outline"
                      size="sm"
                      className={cn(
                        "flex items-center justify-between",
                        colorBlindMode === mode && "border-primary"
                      )}
                      onClick={() => handleToggleColorBlindMode(mode)}
                    >
                      <span>
                        {mode ? t(`accessibility.${mode}`) : t('accessibility.normalVision')}
                      </span>
                      {colorBlindMode === mode && <Check className="h-3 w-3 ml-2" />}
                    </Button>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Keyboard className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <h4 className="text-sm font-medium" id="shortcuts-heading">
                {t('accessibility.keyboardShortcuts')}
              </h4>
            </div>
            <p 
              className="text-xs text-muted-foreground"
              aria-labelledby="shortcuts-heading"
            >
              {t('accessibility.keyboardShortcutsDescription')}
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 ml-6 rtl:mr-6 rtl:ml-0" aria-labelledby="shortcuts-heading">
              <li>{t('accessibility.altC')}</li>
              <li>{t('accessibility.altT')}</li>
              <li>{t('accessibility.altM')}</li>
              <li>{t('accessibility.altF')}</li>
              <li>{t('accessibility.altD')}</li>
            </ul>
          </div>
          
          <Button 
            variant="link" 
            size="sm" 
            className="w-full text-xs text-muted-foreground"
            onClick={() => {
              setOpen(false);
              // التنقل إلى صفحة إعدادات إمكانية الوصول
              window.location.href = "/settings/accessibility";
            }}
          >
            {t('settings.viewAllAccessibilitySettings', 'عرض كل إعدادات إمكانية الوصول')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
