
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Accessibility } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { AccessibilityTabs } from "./accessibility-tabs";
import { ShortcutsSection } from "./shortcuts-section";

export function AccessibilityMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

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
          
          <AccessibilityTabs />
          
          <Separator />
          
          <ShortcutsSection />
          
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
