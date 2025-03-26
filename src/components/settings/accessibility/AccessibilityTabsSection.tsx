
import React from "react";
import { useTranslation } from "react-i18next";
import { User, Type, Volume, Keyboard, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AccessibilityTabsSectionProps {
  children: React.ReactNode;
  defaultTab?: string;
}

export function AccessibilityTabsSection({ 
  children, 
  defaultTab = "profiles" 
}: AccessibilityTabsSectionProps) {
  const { t } = useTranslation();
  
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid grid-cols-5 w-full md:w-auto">
        <TabsTrigger value="profiles">
          <User className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
          <span className="hidden sm:inline">{t('accessibility.profiles', 'الملفات الشخصية')}</span>
        </TabsTrigger>
        
        <TabsTrigger value="text">
          <Type className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
          <span className="hidden sm:inline">{t('accessibility.textSettings', 'إعدادات النص')}</span>
        </TabsTrigger>
        
        <TabsTrigger value="sound">
          <Volume className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
          <span className="hidden sm:inline">{t('accessibility.soundSettings', 'إعدادات الصوت')}</span>
        </TabsTrigger>
        
        <TabsTrigger value="keyboard">
          <Keyboard className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
          <span className="hidden sm:inline">{t('accessibility.keyboardSettings', 'اختصارات لوحة المفاتيح')}</span>
        </TabsTrigger>
        
        <TabsTrigger value="advanced">
          <Settings className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
          <span className="hidden sm:inline">{t('accessibility.advancedSettings', 'إعدادات متقدمة')}</span>
        </TabsTrigger>
      </TabsList>
      
      {children}
    </Tabs>
  );
}
