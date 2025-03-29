
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { NetworkScanner } from "./network/NetworkScanner";
import { PortScanner } from "./network/PortScanner";
import { DNSLookup } from "./network/DNSLookup";
import { TracerouteVisualizer } from "./network/TracerouteVisualizer";
import { NetworkSpeed } from "./network/NetworkSpeed";
import { PingTool } from "./network/PingTool";
import { ConnectionAnalyzer } from "./network/ConnectionAnalyzer";
import { SecurityChecker } from "./network/SecurityChecker";
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { useRTLSupport } from '@/hooks/useRTLSupport';
import { ArabicTextEnhancer } from '../text/ArabicTextEnhancer';

/**
 * قسم أدوات الشبكة - واجهة مقسمة لعرض مختلف أدوات تحليل الشبكة
 */
export function NetworkToolsSection() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("scan");
  const { deviceTier } = usePerformanceOptimization();
  const { isRTL, reverseIfRTL } = useRTLSupport();
  
  // إعداد علامات التبويب مع الترجمة
  const tabs = [
    { id: "scan", label: t('networkTools.tabs.scan', 'مسح الشبكة') },
    { id: "ports", label: t('networkTools.tabs.ports', 'فحص المنافذ') },
    { id: "dns", label: t('networkTools.tabs.dns', 'DNS') },
    { id: "route", label: t('networkTools.tabs.trace', 'تتبع المسار') },
    { id: "speed", label: t('networkTools.tabs.speed', 'سرعة الشبكة') },
    { id: "ping", label: t('networkTools.tabs.ping', 'Ping') },
    { id: "analyze", label: t('networkTools.tabs.analyze', 'تحليل الاتصال') },
    { id: "security", label: t('networkTools.tabs.security', 'فحص الأمان') }
  ];
  
  // تطبيق نظام RTL إذا كان مطلوبًا
  const tabsOrdered = isRTL ? reverseIfRTL(tabs) : tabs;
  
  // تقليل عدد الأدوات المتزامنة على الأجهزة منخفضة الأداء
  const shouldLimitTools = deviceTier === 'low';
  
  return (
    <Card className="shadow-md border-blue-100 dark:border-blue-900">
      <CardHeader className="pb-3">
        <CardTitle>
          <ArabicTextEnhancer>
            {t('networkTools.title', 'أدوات تحليل الشبكة')}
          </ArabicTextEnhancer>
        </CardTitle>
        <CardDescription>
          <ArabicTextEnhancer>
            {t('networkTools.description', 'مجموعة أدوات شاملة لتحليل ومراقبة الشبكة')}
          </ArabicTextEnhancer>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-6">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className={`${isRTL ? 'rtl-tabs' : ''} space-y-4`}
        >
          <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-0.5">
            {tabsOrdered.map(tab => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="min-w-max px-3"
              >
                <ArabicTextEnhancer>{tab.label}</ArabicTextEnhancer>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {/* محتوى علامات التبويب - تحميل بكسل للأدوات الغير نشطة */}
          <TabsContent value="scan" className="pt-4 space-y-4">
            <NetworkScanner />
          </TabsContent>
          
          <TabsContent value="ports" className="pt-4 space-y-4">
            <PortScanner />
          </TabsContent>
          
          <TabsContent value="dns" className="pt-4 space-y-4">
            <DNSLookup />
          </TabsContent>
          
          <TabsContent value="route" className="pt-4 space-y-4">
            {shouldLimitTools && activeTab !== "route" ? null : <TracerouteVisualizer />}
          </TabsContent>
          
          <TabsContent value="speed" className="pt-4 space-y-4">
            {shouldLimitTools && activeTab !== "speed" ? null : <NetworkSpeed />}
          </TabsContent>
          
          <TabsContent value="ping" className="pt-4 space-y-4">
            <PingTool />
          </TabsContent>
          
          <TabsContent value="analyze" className="pt-4 space-y-4">
            {shouldLimitTools && activeTab !== "analyze" ? null : <ConnectionAnalyzer />}
          </TabsContent>
          
          <TabsContent value="security" className="pt-4 space-y-4">
            {shouldLimitTools && activeTab !== "security" ? null : <SecurityChecker />}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
