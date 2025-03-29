
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { NetworkToolsSection } from "@/components/tools/NetworkToolsSection";
import { Button } from "@/components/ui/button";
import { Sliders, WifiIcon, Shield, Wrench, BrainCircuit, Settings2 } from "lucide-react";
import Layout from "@/layouts/Layout";
import { FeatureProvider, useFeatureContext } from "@/context/FeatureContext";
import { NetworkSecuritySection } from "@/components/tools/NetworkSecuritySection";
import { AIToolsSection } from "@/components/tools/AIToolsSection";
import { UtilityToolsSection } from "@/components/tools/UtilityToolsSection";
import { DevModeToggle } from "@/components/tools/DevModeToggle";
import { OfflineSettings } from "@/components/ui/offline/OfflineSettings";
import { NetworkStatusIndicator } from "@/components/ui/NetworkStatusIndicator";
import { useOfflineSupport } from "@/hooks/useOfflineSupport";
import { ArabicTextEnhancer } from "@/components/text/ArabicTextEnhancer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';

/**
 * صفحة الأدوات - تجمع كل مجموعات الأدوات في واجهة منظمة
 */
function ToolsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("network");
  const { isOnline } = useOfflineSupport();
  const { isDevMode, features } = useFeatureContext();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <ArabicTextEnhancer>{t('tools.title', 'أدوات الشبكة')}</ArabicTextEnhancer>
          </h1>
          <p className="text-muted-foreground mt-2">
            <ArabicTextEnhancer>{t('tools.description', 'مجموعة شاملة من أدوات الشبكة والأمان للمساعدة في تحليل وتأمين بنيتك التحتية')}</ArabicTextEnhancer>
          </p>
        </div>
        
        <div className="space-x-2 rtl:space-x-reverse">
          <Button 
            variant="outline" 
            className="h-9"
            onClick={() => setActiveTab("settings")}
          >
            <Settings2 className="h-4 w-4 mr-2" />
            <ArabicTextEnhancer>{t('tools.settings', 'الإعدادات')}</ArabicTextEnhancer>
          </Button>
          <DevModeToggle />
        </div>
      </div>
      
      {!isOnline && (
        <Alert className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <InfoIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <AlertDescription>
            <ArabicTextEnhancer>
              {t('tools.offlineWarning', 'أنت حاليًا في وضع عدم الاتصال. بعض الأدوات قد لا تعمل بشكل صحيح.')}
            </ArabicTextEnhancer>
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-1">
          <TabsTrigger value="network" className="flex items-center">
            <WifiIcon className="h-4 w-4 mr-2" />
            <ArabicTextEnhancer>{t('tools.network', 'أدوات الشبكة')}</ArabicTextEnhancer>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            <ArabicTextEnhancer>{t('tools.security', 'الأمان')}</ArabicTextEnhancer>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center">
            <BrainCircuit className="h-4 w-4 mr-2" />
            <ArabicTextEnhancer>{t('tools.ai', 'الذكاء الاصطناعي')}</ArabicTextEnhancer>
          </TabsTrigger>
          <TabsTrigger value="utilities" className="flex items-center">
            <Wrench className="h-4 w-4 mr-2" />
            <ArabicTextEnhancer>{t('tools.utilities', 'أدوات متنوعة')}</ArabicTextEnhancer>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings2 className="h-4 w-4 mr-2" />
            <ArabicTextEnhancer>{t('tools.settings', 'الإعدادات')}</ArabicTextEnhancer>
          </TabsTrigger>
          {isDevMode && (
            <TabsTrigger value="dev" className="flex items-center">
              <Sliders className="h-4 w-4 mr-2" />
              <ArabicTextEnhancer>{t('tools.devMode', 'وضع المطور')}</ArabicTextEnhancer>
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="network" className="mt-4 space-y-8">
          <NetworkToolsSection />
        </TabsContent>
        
        <TabsContent value="security" className="mt-4 space-y-8">
          <NetworkSecuritySection />
        </TabsContent>
        
        <TabsContent value="ai" className="mt-4 space-y-8">
          <AIToolsSection />
        </TabsContent>
        
        <TabsContent value="utilities" className="mt-4 space-y-8">
          <UtilityToolsSection />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4 space-y-8">
          <OfflineSettings />
        </TabsContent>
        
        {isDevMode && (
          <TabsContent value="dev" className="mt-4 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>
                  <ArabicTextEnhancer>{t('tools.devTools', 'أدوات المطور')}</ArabicTextEnhancer>
                </CardTitle>
                <CardDescription>
                  <ArabicTextEnhancer>{t('tools.devToolsDesc', 'أدوات متقدمة للمطورين وإدارة الميزات')}</ArabicTextEnhancer>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map(feature => (
                    <div key={feature.id} className="border p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{feature.name}</div>
                        <Button 
                          variant={feature.enabled ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => feature.toggle()}
                        >
                          {feature.enabled ? t('common.enabled', 'مفعل') : t('common.disabled', 'معطل')}
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{feature.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
      
      <NetworkStatusIndicator />
    </div>
  );
}

/**
 * صفحة الأدوات مع مزود الميزات
 */
export default function Tools() {
  return (
    <Layout>
      <FeatureProvider>
        <ToolsPage />
      </FeatureProvider>
    </Layout>
  );
}
