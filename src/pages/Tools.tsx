
import React, { Suspense } from "react";
import { Header } from "@/components/Header";
import { NetworkToolsSection } from "@/components/network/NetworkToolsSection";
import { ErrorBoundary } from "@/components/ui/error/ErrorBoundary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { Network, Database, Server, AlertCircle, BrainCircuit, Settings } from "lucide-react";
import { useMode } from "@/context/ModeContext";
import { Skeleton } from "@/components/ui/skeleton";

// استخدام التحميل الكسول للمكونات الكبيرة
const DataAnalysisTools = React.lazy(() => import('@/components/tools/DataAnalysisTools'));

const Tools = () => {
  const { t } = useTranslation();
  const { features } = useMode();
  
  return (
    <div className="container mx-auto p-6 pb-20">
      <Header />
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4 font-tajawal">{t('tools.title')}</h1>
        <p className="text-muted-foreground">{t('tools.description')}</p>
      </div>
      
      <Tabs defaultValue="network" className="space-y-8">
        <TabsList className="w-full justify-start grid grid-cols-2 md:grid-cols-6 mb-6">
          <TabsTrigger value="network" className="flex items-center">
            <Network size={18} className="mr-1.5" />
            <span>{t('networkTools.title')}</span>
          </TabsTrigger>
          
          <TabsTrigger value="data-analysis" className="flex items-center">
            <Database size={18} className="mr-1.5" />
            <span>{t('tools.title')}</span>
          </TabsTrigger>
          
          {features?.dnsOptimization && (
            <TabsTrigger value="dns" className="flex items-center">
              <Server size={18} className="mr-1.5" />
              <span>DNS</span>
            </TabsTrigger>
          )}
          
          {features?.networkMonitoring && (
            <TabsTrigger value="monitor" className="flex items-center">
              <AlertCircle size={18} className="mr-1.5" />
              <span>{t('mobileMenu.network')}</span>
            </TabsTrigger>
          )}
          
          {features?.aiAssistant && (
            <TabsTrigger value="ai-tools" className="flex items-center">
              <BrainCircuit size={18} className="mr-1.5" />
              <span>{t('aiAssistant.title')}</span>
            </TabsTrigger>
          )}
          
          <TabsTrigger value="settings" className="flex items-center">
            <Settings size={18} className="mr-1.5" />
            <span>{t('mobileMenu.settings')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="network">
          <ErrorBoundary>
            <NetworkToolsSection />
          </ErrorBoundary>
        </TabsContent>
        
        <TabsContent value="data-analysis">
          <ErrorBoundary>
            <Suspense fallback={
              <div className="space-y-6">
                <Skeleton className="h-[400px] w-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            }>
              <DataAnalysisTools />
            </Suspense>
          </ErrorBoundary>
        </TabsContent>
        
        <TabsContent value="dns">
          <div className="p-10 text-center text-muted-foreground">
            <Server size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">DNS تحسين وإدارة</h3>
            <p>أدوات تحسين وإدارة DNS متوفرة في الإصدار القادم</p>
          </div>
        </TabsContent>
        
        <TabsContent value="monitor">
          <div className="p-10 text-center text-muted-foreground">
            <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">أدوات مراقبة الشبكة</h3>
            <p>قريبًا - أدوات متقدمة لمراقبة وتحليل أداء الشبكة</p>
          </div>
        </TabsContent>
        
        <TabsContent value="ai-tools">
          <div className="p-10 text-center text-muted-foreground">
            <BrainCircuit size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">أدوات الذكاء الاصطناعي</h3>
            <p>قريبًا - تحليلات متقدمة تعتمد على الذكاء الاصطناعي</p>
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="p-10 text-center text-muted-foreground">
            <Settings size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">إعدادات الأدوات</h3>
            <p>قريبًا - تخصيص وإدارة إعدادات جميع الأدوات</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tools;
