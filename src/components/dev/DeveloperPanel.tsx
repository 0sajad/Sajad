
import React, { useState } from "react";
import { useMode } from "@/context/ModeContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FeatureManagement } from "./FeatureManagement";
import { UiConfiguration } from "./UiConfiguration";
import { NetworkControls } from "./NetworkControls";
import { SecuritySettings } from "./SecuritySettings";
import { LanguageTools } from "./LanguageTools";
import { AIToolsManagement } from "./AIToolsManagement";
import { TranslationManager } from "./TranslationManager";

export function DeveloperPanel() {
  const { isDeveloperMode } = useMode();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("features");
  
  if (!isDeveloperMode) {
    return null;
  }
  
  return (
    <Card className="border-octaBlue-200 shadow-md mb-6 animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-tajawal text-octaBlue-800">
              {t('developer.panel.title', 'لوحة تحكم المطور')}
            </CardTitle>
            <CardDescription className="font-tajawal">
              {t('developer.panel.description', 'تحكم شامل في كافة جوانب التطبيق - التغييرات ستؤثر تلقائيًا على وضع العميل')}
            </CardDescription>
          </div>
          <div className="bg-octaBlue-600 text-white text-xs px-3 py-1 rounded-full">
            {t('developer.panel.version', 'الإصدار')} 2.5.0
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-md p-3 mb-4 flex items-start">
          <AlertTriangle className="text-amber-500 mr-2 mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm">
            {t('developer.panel.warning', 'تأكد من اختبار أي تعديلات قبل تطبيقها. استخدم زر "تطبيق" لنقل التغييرات إلى وضع العميل.')}
          </p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="w-full justify-start grid grid-cols-7 mb-6">
            <TabsTrigger value="features" className="font-tajawal">
              {t('developer.tabs.features', 'الميزات')}
            </TabsTrigger>
            <TabsTrigger value="ui" className="font-tajawal">
              {t('developer.tabs.ui', 'الواجهة')}
            </TabsTrigger>
            <TabsTrigger value="network" className="font-tajawal">
              {t('developer.tabs.network', 'الشبكة')}
            </TabsTrigger>
            <TabsTrigger value="ai-tools" className="font-tajawal">
              الأدوات
            </TabsTrigger>
            <TabsTrigger value="security" className="font-tajawal">
              {t('developer.tabs.security', 'الأمان')}
            </TabsTrigger>
            <TabsTrigger value="languages" className="font-tajawal">
              {t('developer.tabs.languages', 'اللغات')}
            </TabsTrigger>
            <TabsTrigger value="translations" className="font-tajawal">
              الترجمات
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="features">
            <FeatureManagement />
          </TabsContent>
          
          <TabsContent value="ui">
            <UiConfiguration />
          </TabsContent>
          
          <TabsContent value="network">
            <NetworkControls />
          </TabsContent>

          <TabsContent value="ai-tools">
            <AIToolsManagement />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="languages">
            <LanguageTools />
          </TabsContent>

          <TabsContent value="translations">
            <TranslationManager />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
