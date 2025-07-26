
import React, { useState } from "react";
import { AIChatbot } from "../ai/AIChatbot";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NetworkMonitoring } from "./NetworkMonitoring";
import { NetworkSimulation } from "./NetworkSimulation";
import { NetworkManagement } from "./NetworkManagement";
import { ErrorBoundary } from "../ui/error/ErrorBoundary";
import { useOfflineMode } from "@/hooks/useOfflineMode";
import { ErrorMessage } from "../ui/error/ErrorMessage";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { 
  Database, 
  Network, 
  BrainCircuit, 
  BarChart, 
  Search,
  Cpu
} from "lucide-react";
import { useMode } from "@/context/ModeContext";

export function NetworkToolsSection() {
  const { t } = useTranslation();
  const { isOnline } = useOfflineMode();
  const { features } = useMode();
  const [activeToolsTab, setActiveToolsTab] = useState("network-tools");
  
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
            
            <div className="flex flex-col gap-6">
              <ErrorBoundary>
                <AIChatbot />
              </ErrorBoundary>
              
              <ErrorBoundary>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>أدوات التحليل المتوفرة</span>
                      <Badge variant="outline">
                        {features?.find(f => f.id === 'advancedSecurity')?.enabled ? 'متقدم' : 'أساسي'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeToolsTab} onValueChange={setActiveToolsTab}>
                      <TabsList className="w-full mb-3">
                        <TabsTrigger value="network-tools">
                          <Network className="w-3 h-3 mr-1" />
                          الشبكة
                        </TabsTrigger>
                        <TabsTrigger value="ai-tools">
                          <BrainCircuit className="w-3 h-3 mr-1" />
                          الذكاء الاصطناعي
                        </TabsTrigger>
                        <TabsTrigger value="data-tools">
                          <Database className="w-3 h-3 mr-1" />
                          البيانات
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="network-tools" className="space-y-2">
                        <ToolItem 
                          name="Wireshark/TShark" 
                          status="متصل" 
                          icon={<Network className="w-3.5 h-3.5" />} 
                          enabled={true}
                        />
                        <ToolItem 
                          name="NetFlow Analyzer" 
                          status="متصل" 
                          icon={<BarChart className="w-3.5 h-3.5" />} 
                          enabled={true}
                        />
                        <ToolItem 
                          name="ntopng" 
                          status="غير متصل" 
                          icon={<Network className="w-3.5 h-3.5" />} 
                          enabled={features?.find(f => f.id === 'advancedSecurity')?.enabled || false}
                        />
                      </TabsContent>
                      
                      <TabsContent value="ai-tools" className="space-y-2">
                        <ToolItem 
                          name="TensorFlow" 
                          status="متصل" 
                          icon={<BrainCircuit className="w-3.5 h-3.5" />} 
                          enabled={features?.find(f => f.id === 'aiAssistant')?.enabled || false}
                        />
                        <ToolItem 
                          name="Scikit-learn" 
                          status="متصل" 
                          icon={<BrainCircuit className="w-3.5 h-3.5" />} 
                          enabled={true}
                        />
                        <ToolItem 
                          name="AWS SageMaker" 
                          status="جاري التحميل" 
                          icon={<Cpu className="w-3.5 h-3.5" />} 
                          enabled={features?.find(f => f.id === 'advancedSecurity')?.enabled || false}
                        />
                      </TabsContent>
                      
                      <TabsContent value="data-tools" className="space-y-2">
                        <ToolItem 
                          name="Elasticsearch" 
                          status="متصل" 
                          icon={<Search className="w-3.5 h-3.5" />} 
                          enabled={true}
                        />
                        <ToolItem 
                          name="InfluxDB" 
                          status="متصل" 
                          icon={<Database className="w-3.5 h-3.5" />} 
                          enabled={true}
                        />
                        <ToolItem 
                          name="Apache Kafka" 
                          status="متصل" 
                          icon={<Cpu className="w-3.5 h-3.5" />} 
                          enabled={features?.find(f => f.id === 'dnsOptimization')?.enabled || false}
                        />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}

// Component for individual tool item
function ToolItem({ 
  name, 
  status, 
  icon, 
  enabled 
}: { 
  name: string; 
  status: string; 
  icon: React.ReactNode; 
  enabled: boolean;
}) {
  return (
    <div className={`rounded-md p-2 flex items-center justify-between ${
      enabled ? 'bg-gray-50 dark:bg-gray-800/40' : 'bg-gray-100/50 dark:bg-gray-800/20 opacity-60'
    }`}>
      <div className="flex items-center">
        <div className={`p-1.5 rounded-md mr-2 ${
          enabled ? 'bg-octaBlue-100 dark:bg-octaBlue-900/20' : 'bg-gray-200 dark:bg-gray-700'
        }`}>
          {icon}
        </div>
        <span className="text-sm font-medium">{name}</span>
      </div>
      <Badge variant={
        status === 'متصل' ? 'outline' : 
        status === 'جاري التحميل' ? 'secondary' : 'destructive'
      } className="text-xs">
        {status}
      </Badge>
    </div>
  );
}

// Add default export for compatibility with React.lazy()
export default NetworkToolsSection;
