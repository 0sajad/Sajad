
import React, { useState, useEffect } from "react";
import { useMode } from "@/context/ModeContext";
import { DeveloperPanel } from "@/components/developer/DeveloperPanel";
import { Header } from "@/components/Header";
import { useTranslation } from "react-i18next";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdvancedNetworkAnalytics } from "@/components/analytics/AdvancedNetworkAnalytics";
import { NetworkQualityGauge } from "@/components/analytics/NetworkQualityGauge";
import { RealTimeMonitoring } from "@/components/analytics/RealTimeMonitoring";
import { Button } from "@/components/ui/button";
import { FloatingAIAssistant } from "@/components/FloatingAIAssistant";
import { toast } from "@/components/ui/use-toast";
import { Shield, Tool, Zap, Activity, Server, Database, Network, Cpu } from "lucide-react";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemPerformanceMonitor } from "@/components/analytics/SystemPerformanceMonitor";
import { DeviceManager } from "@/components/network/DeviceManager";
import { SecurityDashboard } from "@/components/security/SecurityDashboard";

const Dashboard = () => {
  const { t } = useTranslation();
  const { isDeveloperMode } = useMode();
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [activeSystemTab, setActiveSystemTab] = useState("performance");
  const networkStats = useNetworkStats();
  
  // Show AI assistant after a delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const handleMaximizeAI = () => {
    return window.location.href = '/ai';
  };
  
  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 pb-20">
        <Header />
        
        {/* Show Developer Panel only in Developer Mode */}
        {isDeveloperMode && <DeveloperPanel />}
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">{t('dashboard.title', 'Dashboard')}</h1>
            <p className="text-muted-foreground">{t('dashboard.welcome', 'Welcome to OCTA-GRAM Dashboard')}</p>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 border-green-200 text-green-700"
              onClick={() => {
                toast({
                  title: t('dashboard.systemScan', 'System Scan'),
                  description: t('dashboard.scanStarted', 'Network scan started. Results will be available soon.')
                });
              }}
            >
              <Activity size={16} className="mr-2" />
              {t('dashboard.quickScan', 'Quick Scan')}
            </Button>
            
            <Button 
              size="sm" 
              variant="outline"
              className="bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-blue-200 text-blue-700"
              onClick={() => {
                toast({
                  title: t('dashboard.optimize', 'Optimize'),
                  description: t('dashboard.optimizeStarted', 'Network optimization started.')
                });
              }}
            >
              <Zap size={16} className="mr-2" />
              {t('dashboard.optimize', 'Optimize')}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="transform transition-all duration-300 hover:shadow-lg border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Server className="mr-2 h-5 w-5 text-green-500" />
                {t('dashboard.systemStatus', 'System Status')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.status', 'Status')}:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  {t('dashboard.active', 'Active')}
                </Badge>
              </div>
              <div className="mt-2 pt-2 border-t">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">{t('dashboard.uptime', 'Uptime')}:</p>
                    <p className="font-medium">99.9%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{t('dashboard.lastCheck', 'Last Check')}:</p>
                    <p className="font-medium">2 {t('dashboard.minutesAgo', 'minutes ago')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="transform transition-all duration-300 hover:shadow-lg border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Tool className="mr-2 h-5 w-5 text-blue-500" />
                {t('dashboard.quickActions', 'Quick Actions')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('dashboard.selectAction', 'Select action')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scan">{t('dashboard.actions.scan', 'Scan Network')}</SelectItem>
                  <SelectItem value="optimize">{t('dashboard.actions.optimize', 'Optimize Performance')}</SelectItem>
                  <SelectItem value="backup">{t('dashboard.actions.backup', 'Backup Settings')}</SelectItem>
                  <SelectItem value="security">{t('dashboard.actions.security', 'Security Check')}</SelectItem>
                  <SelectItem value="debug">{t('dashboard.actions.debug', 'Debug Connection')}</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  {t('dashboard.execute', 'Execute')}
                </Button>
                <Button variant="ghost" size="sm" className="mt-2 w-full">
                  {t('dashboard.schedule', 'Schedule')}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="transform transition-all duration-300 hover:shadow-lg border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Shield className="mr-2 h-5 w-5 text-purple-500" />
                {t('dashboard.latestUpdates', 'Latest Updates')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {t('dashboard.securityUpdate', 'Security update available')}
                  </p>
                </div>
                <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {t('dashboard.performanceOptimized', 'Performance optimized')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Network quality gauge and real-time monitoring */}
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
        
        {/* System Performance & Devices */}
        <div className="mb-8">
          <Tabs value={activeSystemTab} onValueChange={setActiveSystemTab}>
            <TabsList className="mb-4 grid grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="performance" className="flex items-center gap-1">
                <Cpu size={14} />
                <span>{t('dashboard.systemPerformance', 'System')}</span>
              </TabsTrigger>
              <TabsTrigger value="devices" className="flex items-center gap-1">
                <Network size={14} />
                <span>{t('dashboard.devices', 'Devices')}</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-1">
                <Shield size={14} />
                <span>{t('dashboard.security', 'Security')}</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance">
              <SystemPerformanceMonitor />
            </TabsContent>
            
            <TabsContent value="devices">
              <DeviceManager />
            </TabsContent>
            
            <TabsContent value="security">
              <SecurityDashboard />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Advanced Network Analytics */}
        <div className="mb-8">
          <AdvancedNetworkAnalytics />
        </div>
        
        {/* Floating AI Assistant */}
        <FloatingAIAssistant 
          show={showAIAssistant} 
          onMaximize={handleMaximizeAI} 
        />
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
