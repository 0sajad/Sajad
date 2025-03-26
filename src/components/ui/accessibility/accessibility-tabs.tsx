
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, ZoomIn, Palette } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DisplayTab } from "./display-tab";
import { MotionTab } from "./motion-tab";
import { ColorTab } from "./color-tab";

export function AccessibilityTabs() {
  const { t } = useTranslation();
  
  return (
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
        <DisplayTab />
      </TabsContent>
      
      <TabsContent value="motion" className="space-y-4 mt-0">
        <MotionTab />
      </TabsContent>
      
      <TabsContent value="color" className="space-y-4 mt-0">
        <ColorTab />
      </TabsContent>
    </Tabs>
  );
}
