
import React, { useState } from "react";
import { useMode } from "@/context/ModeContext";
import { DeveloperPanel } from "@/components/developer/DeveloperPanel";
import { Header } from "@/components/Header";
import { useTranslation } from "react-i18next";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Activity, AlertTriangle, BarChart2, Bot, BrainCircuit, 
  CheckCircle, Cpu, Database, Download, FileText, Gauge, 
  Globe, Info, Network, Search, Server, Settings, ShieldCheck, 
  Wrench, Wifi, Zap, Layers, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ClientToolbox } from "@/components/client/ClientToolbox";
import { NetworkStats } from "@/components/client/NetworkStats";
import { SystemMonitor } from "@/components/client/SystemMonitor";
import { FloatingAIAssistant } from "@/components/FloatingAIAssistant";
import { NetworkQualityGauge } from "@/components/analytics/NetworkQualityGauge";
import { RealTimeMonitoring } from "@/components/analytics/RealTimeMonitoring";
import { AdvancedNetworkAnalytics } from "@/components/analytics/AdvancedNetworkAnalytics";

const Dashboard = () => {
  const { t } = useTranslation();
  const { isDeveloperMode, features } = useMode();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
  const networkData = {
    uptime: 99.8,
    speed: 450,
    latency: 28,
    packetLoss: 0.02,
    connections: 42,
    trafficToday: 1.8,
    securityAlerts: features?.advancedSecurity ? 0 : 3,
  };
  
  const systemPerformance = Math.floor(Math.random() * 20) + 80; // 80-99%
  
  return (
    <TooltipProvider>
      <div className="container mx-auto p-4 md:p-6">
        <Header />
        
        {isDeveloperMode && <DeveloperPanel />}
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{t('dashboard.title', 'لوحة التحكم')}</h1>
            <p className="text-muted-foreground">{t('dashboard.welcome', 'مرحباً بك في لوحة تحكم OCTA-GRAM')}</p>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowAIAssistant(true)}>
              <BrainCircuit className="mr-2 h-4 w-4" />
              {t('dashboard.aiAssistant', 'المساعد الذكي')}
            </Button>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {t('dashboard.refreshData', 'تحديث البيانات')}
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 mb-4">
            <TabsTrigger value="overview">
              <Layers className="mr-2 h-4 w-4" />
              {t('dashboard.tabs.overview', 'نظرة عامة')}
            </TabsTrigger>
            <TabsTrigger value="network">
              <Network className="mr-2 h-4 w-4" />
              {t('dashboard.tabs.network', 'الشبكة')}
            </TabsTrigger>
            <TabsTrigger value="system">
              <Cpu className="mr-2 h-4 w-4" />
              {t('dashboard.tabs.system', 'النظام')}
            </TabsTrigger>
            <TabsTrigger value="security">
              <ShieldCheck className="mr-2 h-4 w-4" />
              {t('dashboard.tabs.security', 'الأمان')}
            </TabsTrigger>
            <TabsTrigger value="tools">
              <Wrench className="mr-2 h-4 w-4" />
              {t('dashboard.tabs.tools', 'الأدوات')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Gauge className="mr-2 h-5 w-5 text-blue-500" />
                    {t('dashboard.systemStatus', 'حالة النظام')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{t('dashboard.status', 'الحالة')}:</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        {t('dashboard.active', 'نشط')}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{t('dashboard.performance', 'الأداء')}:</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">{t('dashboard.uptime', 'وقت التشغيل')}:</span>
                        <span className="font-medium">99.8%</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">{t('dashboard.connections', 'الاتصالات')}:</span>
                        <span className="font-medium">42</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-purple-500" />
                    {t('dashboard.networkStatus', 'حالة الشبكة')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <div>
                        <div className="text-sm text-muted-foreground">{t('dashboard.speed', 'السرعة')}:</div>
                        <div className="font-medium">450 Mbps</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{t('dashboard.latency', 'زمن الاستجابة')}:</div>
                        <div className="font-medium">28 ms</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{t('dashboard.packetLoss', 'فقد البيانات')}:</div>
                        <div className="font-medium">0.02%</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{t('dashboard.usage', 'الاستخدام')}:</div>
                        <div className="font-medium">1.8 TB</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Wrench className="mr-2 h-5 w-5 text-blue-500" />
                    {t('dashboard.quickActions', 'إجراءات سريعة')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t('dashboard.selectAction', 'اختر إجراء')} />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="scan">{t('dashboard.actions.scan', 'فحص الشبكة')}</SelectItem>
                      <SelectItem value="optimize">{t('dashboard.actions.optimize', 'تحسين الأداء')}</SelectItem>
                      <SelectItem value="backup">{t('dashboard.actions.backup', 'نسخ احتياطي للإعدادات')}</SelectItem>
                      <SelectItem value="security">{t('dashboard.actions.security', 'فحص الأمان')}</SelectItem>
                      <SelectItem value="update">{t('dashboard.actions.update', 'تحديث النظام')}</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <NetworkQualityGauge 
                qualityScore={87} 
                latency={24} 
                packetLoss={0.5} 
                jitter={1.2} 
              />
              <div className="md:col-span-2">
                <RealTimeMonitoring />
              </div>
            </div>
            
            <div className="mb-8">
              <AdvancedNetworkAnalytics />
            </div>
          </TabsContent>
          
          <TabsContent value="network">
            <div className="grid grid-cols-1 gap-6">
              <NetworkStats />
            </div>
          </TabsContent>
          
          <TabsContent value="system">
            <div className="grid grid-cols-1 gap-6">
              <SystemMonitor />
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="border-octaBlue-200">
                <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg">
                  <CardTitle className="text-lg flex items-center">
                    <ShieldCheck className="mr-2 h-5 w-5 text-octaBlue-600" />
                    {t('dashboard.securityStatus', 'حالة الأمان')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative inline-flex items-center justify-center w-36 h-36 rounded-full">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-3xl font-bold text-green-600">95</span>
                          <span className="block text-xs text-muted-foreground">{t('dashboard.securityScore', 'درجة الأمان')}</span>
                        </div>
                      </div>
                      
                      <svg className="absolute inset-0 transform -rotate-90" width="144" height="144" viewBox="0 0 144 144">
                        <circle
                          cx="72"
                          cy="72"
                          r="64"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="12"
                        />
                        <circle
                          cx="72"
                          cy="72"
                          r="64"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="12"
                          strokeDasharray={`${95 * 4.02} 402`}
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-3 flex flex-col items-center">
                      <div className="p-2 rounded-full bg-green-50 mb-2">
                        <ShieldCheck className="h-6 w-6 text-green-600" />
                      </div>
                      <span className="text-sm font-medium">{t('dashboard.firewallStatus', 'جدار الحماية')}</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 mt-1">
                        {t('dashboard.active', 'نشط')}
                      </Badge>
                    </div>
                    
                    <div className="border rounded-md p-3 flex flex-col items-center">
                      <div className="p-2 rounded-full bg-blue-50 mb-2">
                        <Globe className="h-6 w-6 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium">{t('dashboard.encryptionStatus', 'التشفير')}</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 mt-1">
                        {t('dashboard.active', 'نشط')}
                      </Badge>
                    </div>
                    
                    <div className="border rounded-md p-3 flex flex-col items-center">
                      <div className="p-2 rounded-full bg-purple-50 mb-2">
                        <Search className="h-6 w-6 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium">{t('dashboard.scannerStatus', 'الماسح الأمني')}</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 mt-1">
                        {t('dashboard.active', 'نشط')}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-green-50 p-4 rounded-md">
                    <h3 className="text-sm font-medium flex items-center mb-2">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                      {t('dashboard.securitySummary', 'ملخص الأمان')}
                    </h3>
                    <p className="text-sm text-green-700">
                      {t('dashboard.securitySummaryText', 'جميع أنظمة الأمان تعمل بشكل صحيح. لم يتم اكتشاف أي تهديدات أو ثغرات أمنية في شبكتك خلال آخر 24 ساعة.')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tools">
            <div className="grid grid-cols-1 gap-6">
              <ClientToolbox />
            </div>
          </TabsContent>
        </Tabs>
        
        {showAIAssistant && (
          <FloatingAIAssistant
            show={showAIAssistant}
            onMaximize={() => window.location.href = '/ai'}
          />
        )}
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
