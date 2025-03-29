
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Wifi, 
  Share2, 
  Globe, 
  Server, 
  Clock, 
  BarChart2, 
  Download,
  UploadCloud,
  Zap,
  Shield
} from "lucide-react";
import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";
import { LatencyChart } from '@/components/analytics/monitoring/LatencyChart';
import { SpeedChart } from '@/components/analytics/monitoring/SpeedChart';

// Sample data for charts
const sampleData = [
  { time: "12:00", download: 45, upload: 22, latency: 15 },
  { time: "12:05", download: 52, upload: 24, latency: 12 },
  { time: "12:10", download: 48, upload: 20, latency: 14 },
  { time: "12:15", download: 58, upload: 25, latency: 10 },
  { time: "12:20", download: 35, upload: 18, latency: 25 },
  { time: "12:25", download: 42, upload: 22, latency: 18 },
  { time: "12:30", download: 50, upload: 24, latency: 12 },
];

export function ConnectionAnalyzer() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  // Simulated connection details
  const connectionDetails = {
    type: "Ethernet",
    speed: "1 Gbps",
    ipAddress: "192.168.1.105",
    gateway: "192.168.1.1",
    dns1: "8.8.8.8",
    dns2: "8.8.4.4",
    downloadSpeed: 85.4,
    uploadSpeed: 42.2,
    latency: 18,
    packetLoss: 0.2,
  };
  
  // Speed quality calculation
  const getSpeedQuality = (speed: number) => {
    if (speed > 100) return { text: t('speedTest.excellent'), color: "text-green-600" };
    if (speed > 50) return { text: t('speedTest.good'), color: "text-blue-600" };
    if (speed > 25) return { text: t('speedTest.fair'), color: "text-yellow-600" };
    if (speed > 10) return { text: t('speedTest.poor'), color: "text-orange-600" };
    return { text: t('speedTest.veryPoor'), color: "text-red-600" };
  };
  
  // Latency quality calculation
  const getLatencyQuality = (latency: number) => {
    if (latency < 20) return { text: t('speedTest.excellent'), color: "text-green-600" };
    if (latency < 50) return { text: t('speedTest.good'), color: "text-blue-600" };
    if (latency < 100) return { text: t('speedTest.fair'), color: "text-yellow-600" };
    if (latency < 150) return { text: t('speedTest.poor'), color: "text-orange-600" };
    return { text: t('speedTest.veryPoor'), color: "text-red-600" };
  };
  
  // Simulate connection analysis
  const startAnalysis = () => {
    setAnalyzing(true);
    setProgress(0);
    setAnalysisComplete(false);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setAnalyzing(false);
          setAnalysisComplete(true);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-500" />
            {t('tools.connectionAnalyzer', 'محلل الاتصال')}
          </CardTitle>
          <Badge>{connectionDetails.type}</Badge>
        </div>
        <CardDescription>
          {t('tools.analyzerDescription', 'تحليل شامل لجودة واستقرار اتصال الشبكة')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!analysisComplete ? (
          <div className="space-y-6">
            {analyzing ? (
              <div className="space-y-4">
                <div className="text-center text-sm font-medium">
                  {t('tools.analyzing', 'جاري تحليل الاتصال...')}
                </div>
                <Progress value={progress} className="h-2" />
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div>
                    <div className={cn("font-medium", progress >= 25 ? "text-blue-600" : "text-muted-foreground")}>
                      {t('tools.testingLatency', 'قياس زمن الاستجابة')}
                    </div>
                    {progress >= 25 && <Zap className="h-4 w-4 mx-auto mt-1 text-blue-500" />}
                  </div>
                  <div>
                    <div className={cn("font-medium", progress >= 50 ? "text-green-600" : "text-muted-foreground")}>
                      {t('tools.testingDownload', 'سرعة التنزيل')}
                    </div>
                    {progress >= 50 && <Download className="h-4 w-4 mx-auto mt-1 text-green-500" />}
                  </div>
                  <div>
                    <div className={cn("font-medium", progress >= 75 ? "text-purple-600" : "text-muted-foreground")}>
                      {t('tools.testingUpload', 'سرعة الرفع')}
                    </div>
                    {progress >= 75 && <UploadCloud className="h-4 w-4 mx-auto mt-1 text-purple-500" />}
                  </div>
                  <div>
                    <div className={cn("font-medium", progress >= 100 ? "text-amber-600" : "text-muted-foreground")}>
                      {t('tools.testingStability', 'الاستقرار')}
                    </div>
                    {progress >= 100 && <Shield className="h-4 w-4 mx-auto mt-1 text-amber-500" />}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Wifi className="h-12 w-12 mx-auto mb-4 text-blue-500 opacity-80" />
                <h3 className="text-lg font-medium mb-2">
                  {t('tools.readyToAnalyze', 'جاهز للتحليل')}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('tools.analyzePurpose', 'سيتم تقييم سرعة واستقرار اتصالك الحالي')}
                </p>
                <Button onClick={startAnalysis} className="mx-auto">
                  {t('tools.startAnalysis', 'بدء التحليل')}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="overview">{t('tools.overview', 'نظرة عامة')}</TabsTrigger>
                <TabsTrigger value="details">{t('tools.details', 'التفاصيل')}</TabsTrigger>
                <TabsTrigger value="charts">{t('tools.charts', 'الرسوم البيانية')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          {t('tools.downloadSpeed', 'سرعة التنزيل')}
                        </div>
                        <Download className="h-4 w-4 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold mb-1">
                        {connectionDetails.downloadSpeed} <span className="text-sm font-normal">Mbps</span>
                      </div>
                      <div className={`text-xs ${getSpeedQuality(connectionDetails.downloadSpeed).color}`}>
                        {getSpeedQuality(connectionDetails.downloadSpeed).text}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          {t('tools.uploadSpeed', 'سرعة الرفع')}
                        </div>
                        <UploadCloud className="h-4 w-4 text-purple-500" />
                      </div>
                      <div className="text-2xl font-bold mb-1">
                        {connectionDetails.uploadSpeed} <span className="text-sm font-normal">Mbps</span>
                      </div>
                      <div className={`text-xs ${getSpeedQuality(connectionDetails.uploadSpeed).color}`}>
                        {getSpeedQuality(connectionDetails.uploadSpeed).text}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          {t('tools.latency', 'زمن الاستجابة')}
                        </div>
                        <Clock className="h-4 w-4 text-blue-500" />
                      </div>
                      <div className="text-2xl font-bold mb-1">
                        {connectionDetails.latency} <span className="text-sm font-normal">ms</span>
                      </div>
                      <div className={`text-xs ${getLatencyQuality(connectionDetails.latency).color}`}>
                        {getLatencyQuality(connectionDetails.latency).text}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          {t('tools.packetLoss', 'فقدان الحزم')}
                        </div>
                        <Share2 className="h-4 w-4 text-amber-500" />
                      </div>
                      <div className="text-2xl font-bold mb-1">
                        {connectionDetails.packetLoss}%
                      </div>
                      <div className="text-xs text-green-600">
                        {connectionDetails.packetLoss < 1 ? t('tools.excellent', 'ممتاز') : t('tools.poor', 'ضعيف')}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{t('tools.overallQuality', 'الجودة الإجمالية')}</div>
                    <Badge variant="default" className="bg-blue-500">
                      {t('tools.good', 'جيد')}
                    </Badge>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </TabsContent>
              
              <TabsContent value="details">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {t('tools.connectionType', 'نوع الاتصال')}
                      </div>
                      <div className="font-medium">{connectionDetails.type}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {t('tools.linkSpeed', 'سرعة الارتباط')}
                      </div>
                      <div className="font-medium">{connectionDetails.speed}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {t('tools.ipAddress', 'عنوان IP')}
                      </div>
                      <div className="font-medium">{connectionDetails.ipAddress}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {t('tools.gateway', 'البوابة')}
                      </div>
                      <div className="font-medium">{connectionDetails.gateway}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {t('tools.primaryDNS', 'خادم DNS الأساسي')}
                      </div>
                      <div className="font-medium">{connectionDetails.dns1}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {t('tools.secondaryDNS', 'خادم DNS الثانوي')}
                      </div>
                      <div className="font-medium">{connectionDetails.dns2}</div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-3 flex items-center">
                      <Server className="h-4 w-4 mr-2 text-blue-500" />
                      {t('tools.connectionIssues', 'مشاكل الاتصال المحتملة')}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {t('tools.noIssues', 'لا توجد مشاكل')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="charts">
                <div className="space-y-6">
                  <LatencyChart data={sampleData} />
                  <SpeedChart data={sampleData} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
      <CardFooter className={cn("flex gap-2", analysisComplete ? "justify-between" : "justify-end")}>
        {analysisComplete && (
          <Button variant="outline" onClick={() => setAnalysisComplete(false)}>
            {t('tools.newAnalysis', 'تحليل جديد')}
          </Button>
        )}
        {analysisComplete && (
          <Button variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100">
            <Download className="h-4 w-4 mr-2" />
            {t('tools.exportResults', 'تصدير النتائج')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
