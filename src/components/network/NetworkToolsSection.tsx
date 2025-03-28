
import React from "react";
import { AIChatbot } from "../ai/AIChatbot";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NetworkMonitoring } from "./NetworkMonitoring";
import { NetworkSimulation } from "./NetworkSimulation";
import { NetworkManagement } from "./NetworkManagement";
import { ErrorBoundary } from "../ui/error/ErrorBoundary";
import { useOfflineMode } from "@/hooks/useOfflineMode";
import { ErrorMessage } from "../ui/error/ErrorMessage";

export function NetworkToolsSection() {
  const { t } = useTranslation();
  const { isOnline } = useOfflineMode();
  
  // عرض رسالة الخطأ عندما يكون المستخدم غير متصل بالإنترنت
  if (!isOnline) {
    return (
      <section id="network-tools" className="py-20 px-6" aria-labelledby="network-tools-heading">
        <div className="max-w-7xl mx-auto">
          <ErrorMessage 
            title={t('networkTools.offline.title', 'أدوات الشبكة غير متاحة')}
            message={t('networkTools.offline.message', 'لا يمكن استخدام أدوات الشبكة بدون اتصال بالإنترنت')}
            showDetailsDialog={false}
          />
        </div>
      </section>
    );
  }
  
  return (
    <ErrorBoundary>
      <section id="network-tools" className="py-20 px-6" aria-labelledby="network-tools-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 id="network-tools-heading" className="text-3xl md:text-4xl font-bold mb-4">
              {t('networkTools.title', 'أدوات الشبكة')}
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              {t('networkTools.qualityMonitoring', 'مراقبة جودة الشبكة')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="monitoring" className="w-full">
                <TabsList className="w-full mb-4" aria-label={t('networkTools.tabsLabel', 'أدوات إدارة الشبكة')}>
                  <TabsTrigger value="monitoring" className="flex-1">
                    {t('networkTools.qualityMonitoring', 'مراقبة الجودة')}
                  </TabsTrigger>
                  <TabsTrigger value="management" className="flex-1">
                    {t('networkTools.networkManagement', 'إدارة الشبكة')}
                  </TabsTrigger>
                  <TabsTrigger value="simulation" className="flex-1">
                    {t('networkTools.simulationSystems', 'أنظمة المحاكاة')}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="monitoring" className="mt-0">
                  <ErrorBoundary>
                    <NetworkMonitoring />
                  </ErrorBoundary>
                </TabsContent>
                
                <TabsContent value="management" className="mt-0">
                  <ErrorBoundary>
                    <NetworkManagement />
                  </ErrorBoundary>
                </TabsContent>
                
                <TabsContent value="simulation" className="mt-0">
                  <ErrorBoundary>
                    <NetworkSimulation />
                  </ErrorBoundary>
                </TabsContent>
              </Tabs>
            </div>
            
            <ErrorBoundary>
              <AIChatbot />
            </ErrorBoundary>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}

// Add default export for compatibility with React.lazy()
export default NetworkToolsSection;
