
import React, { Suspense, useState, useEffect } from "react";
import { useMode } from "@/context/ModeContext";
import { DeveloperPanel } from "@/components/developer/DeveloperPanel";
import { useTranslation } from "react-i18next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdvancedNetworkAnalytics } from "@/components/analytics/AdvancedNetworkAnalytics";
import { NetworkQualityGauge } from "@/components/analytics/NetworkQualityGauge";
import { RealTimeMonitoring } from "@/components/analytics/RealTimeMonitoring";
import { FloatingAIAssistant } from "@/components/FloatingAIAssistant";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const Dashboard = () => {
  const { t } = useTranslation();
  const { isDeveloperMode } = useMode();
  const [showAIAssistant, setShowAIAssistant] = useState(false);
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
        {/* Show Developer Panel only in Developer Mode */}
        {isDeveloperMode && <DeveloperPanel />}
        
        {/* Status Cards Row - 3 cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Latest Updates - Left Card with Purple Accent */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center">
                  <span className="text-purple-500 ml-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </span>
                  <span className="mr-2">{t('dashboard.latestUpdates', 'آخر التحديثات')}</span>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
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

          {/* Quick Actions - Middle Card with Blue Accent */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center">
                  <span className="text-blue-500 ml-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </span>
                  <span className="mr-2">{t('dashboard.quickActions', 'إجراءات سريعة')}</span>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('dashboard.selectAction', 'اختر إجراء')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scan">{t('dashboard.actions.scan', 'فحص الشبكة')}</SelectItem>
                  <SelectItem value="optimize">{t('dashboard.actions.optimize', 'تحسين الأداء')}</SelectItem>
                  <SelectItem value="backup">{t('dashboard.actions.backup', 'نسخ الإعدادات احتياطياً')}</SelectItem>
                  <SelectItem value="security">{t('dashboard.actions.security', 'التحقق من الأمان')}</SelectItem>
                  <SelectItem value="debug">{t('dashboard.actions.debug', 'تصحيح الاتصال')}</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  {t('dashboard.schedule', 'Schedule')}
                </Button>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  {t('dashboard.execute', 'Execute')}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* System Status - Right Card with Green Accent */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center">
                  <span className="text-green-500 ml-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="mr-2">{t('dashboard.systemStatus', 'حالة النظام')}</span>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t('dashboard.status', 'الحالة')}:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  {t('dashboard.active', 'نشط')}
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
                    <p className="font-medium">2 {t('dashboard.minutesAgo', 'دقائق')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Network monitoring and quality sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Real-time monitoring */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <span className="text-octaBlue-500 ml-1">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13H10.5L12.5 8L14.5 17L16.5 11L18 13H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
                <span className="mr-2">{t('dashboard.realTimeMonitoring', 'مراقبة الشبكة في الوقت الفعلي')}</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">قياس سرعة ومستوى أداء الشبكة بشكل مباشر</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-2">
                <div className="bg-amber-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-amber-700 mb-1">زمن الاستجابة</p>
                  <p className="text-2xl font-bold flex items-center justify-center">
                    <span>ms 29</span>
                    <span className="text-amber-500 ml-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-green-700 mb-1">سرعة الرفع</p>
                  <p className="text-2xl font-bold flex items-center justify-center">
                    <span>Mbps 53</span>
                    <span className="text-green-500 ml-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 20V4M5 11L12 4L19 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-blue-700 mb-1">سرعة التنزيل</p>
                  <p className="text-2xl font-bold flex items-center justify-center">
                    <span>Mbps 113</span>
                    <span className="text-blue-500 ml-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4V20M19 13L12 20L5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </p>
                </div>
              </div>
              <div className="text-sm text-right text-muted-foreground">سرعة التنزيل والرفع</div>
              <Button variant="outline" size="sm" className="mt-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                  <path d="M21 8.5V13.5M8 16.5H16M12 12.5V20.5M3.2 14.2V8.2C3.2 7.76 3.2 7.54 3.273 7.362C3.338 7.205 3.445 7.072 3.586 6.973C3.744 6.862 3.957 6.819 4.384 6.734L18.384 3.134C18.734 3.065 18.909 3.03 19.059 3.062C19.191 3.091 19.310 3.156 19.402 3.253C19.506 3.363 19.56 3.517 19.669 3.827L20.799 7.227C20.884 7.457 20.927 7.571 20.918 7.673C20.909 7.762 20.877 7.846 20.825 7.917C20.767 7.998 20.669 8.052 20.473 8.16L4.473 16.16C4.157 16.325 3.998 16.408 3.856 16.404C3.73 16.401 3.611 16.354 3.52 16.276C3.417 16.187 3.36 16.033 3.246 15.724L3 15"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                تحديث
              </Button>
            </CardContent>
          </Card>
          
          {/* Network quality gauge */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <span className="text-octaBlue-500 ml-1">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 9.4V4L9 4V9.4L2 20H22L15 9.4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 20L9 9.4V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="mr-2">{t('dashboard.networkQuality', 'مؤشر جودة الشبكة')}</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground">تحليل مفصل لحالة وأداء الشبكة الحالية</p>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <NetworkQualityGauge 
                qualityScore={87} 
                latency={24} 
                packetLoss={0.5} 
                jitter={1.2} 
              />
            </CardContent>
          </Card>
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
