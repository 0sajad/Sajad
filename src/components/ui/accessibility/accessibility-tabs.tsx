
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Eye, MousePointer, Palette } from "lucide-react";

interface AccessibilityTabsProps {
  children?: React.ReactNode;
  defaultTab?: string;
}

/**
 * تبويبات لعرض فئات مختلفة من ميزات إمكانية الوصول
 */
export function AccessibilityTabs({ children, defaultTab = "display" }: AccessibilityTabsProps) {
  const { t } = useTranslation();
  
  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="display" className="flex items-center gap-1.5">
          <Eye className="h-3.5 w-3.5" />
          <span>{t('accessibility.tabs.display', 'العرض')}</span>
        </TabsTrigger>
        <TabsTrigger value="motion" className="flex items-center gap-1.5">
          <MousePointer className="h-3.5 w-3.5" />
          <span>{t('accessibility.tabs.motion', 'الحركة')}</span>
        </TabsTrigger>
        <TabsTrigger value="color" className="flex items-center gap-1.5">
          <Palette className="h-3.5 w-3.5" />
          <span>{t('accessibility.tabs.color', 'الألوان')}</span>
        </TabsTrigger>
      </TabsList>
      
      {children}
    </Tabs>
  );
}
