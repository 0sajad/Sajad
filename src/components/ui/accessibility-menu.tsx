
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Accessibility, Type, ZoomIn, Eye, MousePointer2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { useA11y } from "@/hooks/useA11y";

export function AccessibilityMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  
  const { 
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode
  } = useA11y();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative" 
          aria-label={t('accessibility.a11ySettings', 'إعدادات إمكانية الوصول')}
        >
          <Accessibility className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center">
            <Accessibility className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            <h3 className="text-sm font-medium">
              {t('accessibility.title', 'إمكانية الوصول')}
            </h3>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="a11y-high-contrast" className="text-sm cursor-pointer">
                  {t('accessibility.highContrast', 'وضع التباين العالي')}
                </Label>
              </div>
              <Switch
                id="a11y-high-contrast"
                checked={highContrast}
                onCheckedChange={setHighContrast}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Type className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="a11y-large-text" className="text-sm cursor-pointer">
                  {t('accessibility.largeText', 'النص الكبير')}
                </Label>
              </div>
              <Switch
                id="a11y-large-text"
                checked={largeText}
                onCheckedChange={setLargeText}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <ZoomIn className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="a11y-reduced-motion" className="text-sm cursor-pointer">
                  {t('accessibility.reducedMotion', 'تقليل الحركة')}
                </Label>
              </div>
              <Switch
                id="a11y-reduced-motion"
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <MousePointer2 className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="a11y-focus-mode" className="text-sm cursor-pointer">
                  {t('accessibility.focusMode', 'وضع التركيز')}
                </Label>
              </div>
              <Switch
                id="a11y-focus-mode"
                checked={focusMode}
                onCheckedChange={setFocusMode}
              />
            </div>
          </div>
          
          <Button 
            variant="link" 
            size="sm" 
            className="w-full text-xs text-muted-foreground"
            onClick={() => {
              // يمكن إضافة التنقل إلى صفحة الإعدادات الكاملة هنا
              setOpen(false);
            }}
          >
            {t('settings.viewAllAccessibilitySettings', 'عرض كل إعدادات إمكانية الوصول')}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
