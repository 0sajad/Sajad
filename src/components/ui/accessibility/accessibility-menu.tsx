
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

export function AccessibilityMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full"
          aria-label={t('accessibility.menuLabel')}
        >
          <Settings className="h-4 w-4" />
          <span className="sr-only">{t('accessibility.menuLabel')}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">{t('accessibility.title')}</h3>
            <p className="text-muted-foreground text-sm">
              {t('accessibility.description')}
            </p>
          </div>
          
          <AccessibilityTabs />
          <ShortcutsSection />
        </div>
      </PopoverContent>
    </Popover>
  );
}
