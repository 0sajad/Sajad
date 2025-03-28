
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { 
  Settings,
  Eye,
  ZoomIn,
  Volume2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { AccessibilityTabs } from "./accessibility-tabs";
import { ShortcutsSection } from "./shortcuts-section";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function AccessibilityMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={t('accessibility.menuLabel', 'إعدادات إمكانية الوصول')}
        >
          <Settings className="h-4 w-4" />
          <span className="sr-only">{t('accessibility.menuLabel', 'إعدادات إمكانية الوصول')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        align="end" 
        className={`${isMobile ? 'w-[calc(100vw-2rem)] max-w-[320px]' : 'w-80'} p-4`}
        sideOffset={isMobile ? 5 : 8}
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">{t('accessibility.title', 'إعدادات إمكانية الوصول')}</h3>
            <p className="text-muted-foreground text-sm">
              {t('accessibility.description', 'تخصيص تجربتك لجعل التطبيق أكثر سهولة للوصول')}
            </p>
          </div>
          
          <AccessibilityTabs />
          <ShortcutsSection />
        </div>
      </PopoverContent>
    </Popover>
  );
}
