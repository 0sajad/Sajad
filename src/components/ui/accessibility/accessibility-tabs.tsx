
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Eye, ZoomIn, Palette } from "lucide-react";
import { DisplayTab } from "./tabs/DisplayTab";
import { MotionTab } from "./tabs/MotionTab";
import { ColorTab } from "./tabs/ColorTab";
import { useA11y } from "@/hooks/useA11y";

/**
 * مكون علامات التبويب لإعدادات إمكانية الوصول المحسّن
 * يوفر واجهة مستخدم بديهية لإعدادات إمكانية الوصول المختلفة
 */
export function AccessibilityTabs() {
  const { t } = useTranslation();
  const { reducedMotion } = useA11y();
  const [activeTab, setActiveTab] = useState("display");
  
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
        <DisplayTab />
      </TabsContent>
      
      {/* محتوى تبويب الحركة */}
      <TabsContent value="motion" className="space-y-4 pt-2">
        <MotionTab />
      </TabsContent>
      
      {/* محتوى تبويب الألوان */}
      <TabsContent value="color" className="space-y-4 pt-2">
        <ColorTab />
      </TabsContent>
    </Tabs>
  );
}
