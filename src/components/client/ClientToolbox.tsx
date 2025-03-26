
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, Wifi, Network, Server, Shield, Database, 
  Search, FileText, Cpu, Zap, Tool, Globe, Bot, 
  AlertTriangle, RefreshCw, Download
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const toolCategories = [
  { id: "diagnostic", icon: Search, color: "text-blue-500" },
  { id: "network", icon: Wifi, color: "text-green-500" },
  { id: "security", icon: Shield, color: "text-purple-500" },
  { id: "system", icon: Cpu, color: "text-amber-500" },
  { id: "utility", icon: Tool, color: "text-rose-500" },
];

export const ClientToolbox = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("diagnostic");
  
  // محاكاة تشغيل أداة
  const runTool = (toolId: string) => {
    toast({
      title: t('tools.running', 'جاري تشغيل الأداة'),
      description: t('tools.runDescription', 'جاري تشغيل: ') + toolId,
    });
    
    // هنا يمكن إضافة منطق حقيقي لتشغيل الأدوات المختلفة
    setTimeout(() => {
      toast({
        title: t('tools.completed', 'اكتملت العملية'),
        description: t('tools.completedDescription', 'تم تنفيذ العملية بنجاح'),
      });
    }, 1500);
  };
  
  // أدوات التشخيص
  const diagnosticTools = [
    { id: "networkScan", icon: Network, name: "tools.networkScan", description: "tools.networkScanDesc" },
    { id: "speedTest", icon: Activity, name: "tools.speedTest", description: "tools.speedTestDesc" },
    { id: "connectionTest", icon: Wifi, name: "tools.connectionTest", description: "tools.connectionTestDesc" },
    { id: "systemCheck", icon: Cpu, name: "tools.systemCheck", description: "tools.systemCheckDesc" },
    { id: "securityAudit", icon: Shield, name: "tools.securityAudit", description: "tools.securityAuditDesc" },
  ];
  
  // أدوات الشبكة
  const networkTools = [
    { id: "signalOptimizer", icon: Wifi, name: "tools.signalOptimizer", description: "tools.signalOptimizerDesc" },
    { id: "dnsOptimizer", icon: Globe, name: "tools.dnsOptimizer", description: "tools.dnsOptimizerDesc" },
    { id: "bandwidthManager", icon: Activity, name: "tools.bandwidthManager", description: "tools.bandwidthManagerDesc" },
    { id: "packetAnalyzer", icon: Database, name: "tools.packetAnalyzer", description: "tools.packetAnalyzerDesc" },
    { id: "connectionManager", icon: Server, name: "tools.connectionManager", description: "tools.connectionManagerDesc" },
  ];
  
  // أدوات الأمان
  const securityTools = [
    { id: "threatScan", icon: Shield, name: "tools.threatScan", description: "tools.threatScanDesc" },
    { id: "vulnerabilityScan", icon: AlertTriangle, name: "tools.vulnerabilityScan", description: "tools.vulnerabilityScanDesc" },
    { id: "encryptionCheck", icon: Lock, name: "tools.encryptionCheck", description: "tools.encryptionCheckDesc" },
    { id: "firewallManager", icon: Shield, name: "tools.firewallManager", description: "tools.firewallManagerDesc" },
    { id: "malwareRemoval", icon: Shield, name: "tools.malwareRemoval", description: "tools.malwareRemovalDesc" },
  ];
  
  // أدوات النظام
  const systemTools = [
    { id: "performanceOptimizer", icon: Zap, name: "tools.performanceOptimizer", description: "tools.performanceOptimizerDesc" },
    { id: "systemCleanup", icon: Cpu, name: "tools.systemCleanup", description: "tools.systemCleanupDesc" },
    { id: "tempMonitor", icon: ThermometerSun, name: "tools.tempMonitor", description: "tools.tempMonitorDesc" },
    { id: "resourceMonitor", icon: Activity, name: "tools.resourceMonitor", description: "tools.resourceMonitorDesc" },
    { id: "deviceManager", icon: ServerCrash, name: "tools.deviceManager", description: "tools.deviceManagerDesc" },
  ];
  
  // أدوات عامة
  const utilityTools = [
    { id: "aiAssistant", icon: Bot, name: "tools.aiAssistant", description: "tools.aiAssistantDesc" },
    { id: "fileAnalyzer", icon: FileText, name: "tools.fileAnalyzer", description: "tools.fileAnalyzerDesc" },
    { id: "softwareUpdater", icon: Download, name: "tools.softwareUpdater", description: "tools.softwareUpdaterDesc" },
    { id: "systemBackup", icon: Save, name: "tools.systemBackup", description: "tools.systemBackupDesc" },
    { id: "dataSynchronizer", icon: RefreshCw, name: "tools.dataSynchronizer", description: "tools.dataSynchronizerDesc" },
  ];
  
  // الحصول على قائمة الأدوات حسب الفئة المحددة
  const getToolsByCategory = () => {
    switch (activeCategory) {
      case "diagnostic": return diagnosticTools;
      case "network": return networkTools;
      case "security": return securityTools;
      case "system": return systemTools;
      case "utility": return utilityTools;
      default: return diagnosticTools;
    }
  };
  
  const filteredTools = searchQuery
    ? getToolsByCategory().filter(tool => 
        t(tool.name).toLowerCase().includes(searchQuery.toLowerCase()) ||
        t(tool.description).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : getToolsByCategory();
  
  return (
    <Card className="border-octaBlue-200">
      <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg">
        <CardTitle className="text-lg flex items-center">
          <Tool className="mr-2 h-5 w-5 text-octaBlue-600" />
          {t('dashboard.clientTools', 'أدوات العميل')}
        </CardTitle>
        <CardDescription>
          {t('dashboard.clientToolsDesc', 'مجموعة متنوعة من الأدوات لمساعدتك في إدارة وتحسين شبكتك ونظامك')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="p-4 pb-0">
          <Input
            placeholder={t('tools.searchTools', 'ابحث عن أداة...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
        </div>
        
        <Tabs defaultValue="diagnostic" value={activeCategory} onValueChange={setActiveCategory}>
          <div className="px-4">
            <TabsList className="grid grid-cols-5 mb-4">
              {toolCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="flex flex-col items-center py-2">
                  <category.icon className={`h-5 w-5 mb-1 ${category.color}`} />
                  <span className="text-xs">{t(`tools.categories.${category.id}`)}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value={activeCategory} className="m-0 px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-4">
              {filteredTools.map((tool) => (
                <div 
                  key={tool.id}
                  className="flex border rounded-md p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => runTool(tool.id)}
                >
                  <div className="mr-3 p-2 rounded-full bg-gray-100">
                    <tool.icon className="h-5 w-5 text-octaBlue-600" />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-sm">{t(tool.name)}</div>
                    <div className="text-xs text-muted-foreground">{t(tool.description)}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="bg-gray-50 border-t p-3 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {t('tools.total', 'إجمالي الأدوات المتاحة')}: {getToolsByCategory().length}
        </span>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          {t(`tools.categories.${activeCategory}`)}
        </Badge>
      </CardFooter>
    </Card>
  );
};
