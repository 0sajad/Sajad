
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { Badge } from '@/components/ui/badge';
import { useAppState } from '@/hooks/state/use-app-state';
import { 
  Activity, 
  Cpu, 
  BarChart, 
  Clock, 
  RefreshCw, 
  AlertCircle, 
  Database
} from "lucide-react";

export function PerformancePanel() {
  const { 
    getPerformanceReport, 
    resetPerformanceMonitor,
    logPerformanceReport 
  } = usePerformanceMonitor({ 
    componentId: 'performance-panel', 
    trackFPS: true,
    trackMemory: true,
    autoLog: false
  });
  
  const [activeTab, setActiveTab] = useState('overview');
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [memoryUsage, setMemoryUsage] = useState<number>(0);
  const [fpsValue, setFpsValue] = useState<number>(0);
  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const isDeveloperMode = useAppState(state => state.preferences.developerMode);
  
  useEffect(() => {
    if (!isDeveloperMode) return;
    
    // Fetch initial performance data
    updatePerformanceData();
    
    // Set up auto-refresh if enabled
    let intervalId: NodeJS.Timeout | null = null;
    if (autoRefresh) {
      intervalId = setInterval(() => {
        updatePerformanceData();
      }, 2000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoRefresh, isDeveloperMode]);
  
  const updatePerformanceData = () => {
    const report = getPerformanceReport();
    setPerformanceData(report);
    
    // Update specific metrics
    if (report?.memory?.current) {
      setMemoryUsage(Math.min(report.memory.current / report.memory.limit * 100, 100));
    }
    
    if (report?.fps?.current) {
      setFpsValue(report.fps.current);
    }
    
    // Simulate CPU usage (this would be replaced with actual data)
    setCpuUsage(Math.min(Math.random() * 80, 100));
  };
  
  const handleReset = () => {
    resetPerformanceMonitor();
    updatePerformanceData();
  };
  
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };
  
  const generateReport = () => {
    logPerformanceReport();
  };
  
  if (!isDeveloperMode) {
    return null;
  }
  
  return (
    <Card className="shadow-md w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Activity className="mr-2 h-5 w-5 text-blue-500" />
            أداء التطبيق
          </CardTitle>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleAutoRefresh}
              className={autoRefresh ? "bg-blue-100 dark:bg-blue-900/30" : ""}
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              تحديث تلقائي
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReset}
            >
              إعادة تعيين
            </Button>
          </div>
        </div>
        <CardDescription>
          قياسات ومؤشرات أداء التطبيق في الوقت الفعلي
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="metrics">المقاييس</TabsTrigger>
            <TabsTrigger value="events">الأحداث</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MetricCard
                title="الذاكرة"
                value={performanceData?.memory?.current ? `${(performanceData.memory.current / (1024 * 1024)).toFixed(1)} MB` : "غير متاح"}
                icon={<Database className="h-4 w-4" />}
                status={memoryUsage > 80 ? "danger" : memoryUsage > 60 ? "warning" : "normal"}
                progress={memoryUsage}
              />
              
              <MetricCard
                title="معدل الإطارات"
                value={fpsValue ? `${fpsValue.toFixed(1)} FPS` : "غير متاح"}
                icon={<BarChart className="h-4 w-4" />}
                status={fpsValue < 30 ? "danger" : fpsValue < 50 ? "warning" : "normal"}
                progress={fpsValue / 60 * 100}
              />
              
              <MetricCard
                title="المعالج"
                value={`${cpuUsage.toFixed(1)}%`}
                icon={<Cpu className="h-4 w-4" />}
                status={cpuUsage > 80 ? "danger" : cpuUsage > 60 ? "warning" : "normal"}
                progress={cpuUsage}
              />
            </div>
            
            <div className="bg-muted/50 rounded-md p-4">
              <h4 className="text-sm font-medium mb-2">ملخص الأداء</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">وقت التحميل:</span>
                    <span>{performanceData?.pageLoad?.duration ? `${performanceData.pageLoad.duration.toFixed(0)} ms` : "غير متاح"}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">وقت التفاعل:</span>
                    <span>{performanceData?.interactivity?.timeToInteractive ? `${performanceData.interactivity.timeToInteractive.toFixed(0)} ms` : "غير متاح"}</span>
                  </p>
                </div>
                <div>
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">عدد طلبات API:</span>
                    <span>{performanceData?.apiCalls?.count || 0}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">متوسط زمن الاستجابة:</span>
                    <span>{performanceData?.apiCalls?.avgDuration ? `${performanceData.apiCalls.avgDuration.toFixed(0)} ms` : "0 ms"}</span>
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-5">
            <div>
              <h3 className="text-sm font-medium mb-2">استخدام الذاكرة</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs">الحالي: {performanceData?.memory?.current ? `${(performanceData.memory.current / (1024 * 1024)).toFixed(1)} MB` : "غير متاح"}</span>
                  <span className="text-xs">الأقصى: {performanceData?.memory?.peak ? `${(performanceData.memory.peak / (1024 * 1024)).toFixed(1)} MB` : "غير متاح"}</span>
                </div>
                <Progress value={memoryUsage} className="h-2 bg-gray-200 dark:bg-gray-700" />
              </div>
              
              <Separator className="my-3" />
              
              <h3 className="text-sm font-medium mb-2">معدل الإطارات (FPS)</h3>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs">الحالي: {fpsValue ? `${fpsValue.toFixed(1)} FPS` : "غير متاح"}</span>
                  <span className="text-xs">الأقصى: {performanceData?.fps?.peak ? `${performanceData.fps.peak.toFixed(1)} FPS` : "غير متاح"}</span>
                </div>
                <Progress value={fpsValue / 60 * 100} className="h-2 bg-gray-200 dark:bg-gray-700" />
              </div>
              
              <Separator className="my-3" />
              
              <h3 className="text-sm font-medium mb-2">أوقات استجابة طلبات API</h3>
              {performanceData?.apiCalls?.details && performanceData.apiCalls.details.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-auto">
                  {performanceData.apiCalls.details.map((api: any, index: number) => (
                    <div key={index} className="flex justify-between items-center text-xs p-1 rounded bg-muted/30">
                      <span className="font-mono overflow-hidden text-ellipsis">{api.name}</span>
                      <Badge variant={api.duration > 500 ? "outline" : "secondary"}>
                        {api.duration} ms
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">لا توجد طلبات API مسجلة</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">أوقات معالجة الأحداث</h3>
              {performanceData?.events?.details && performanceData.events.details.length > 0 ? (
                <div className="space-y-2 max-h-60 overflow-auto">
                  {performanceData.events.details.map((event: any, index: number) => (
                    <div key={index} className="flex justify-between items-center text-xs p-2 rounded bg-muted/30">
                      <div>
                        <span className="font-semibold">{event.name}</span>
                        <span className="text-muted-foreground ml-2">
                          ({new Date(event.timestamp).toLocaleTimeString()})
                        </span>
                      </div>
                      <Badge variant={event.duration > 100 ? "outline" : "secondary"}>
                        {event.duration} ms
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">لا توجد أحداث مسجلة</p>
              )}
              
              <Separator className="my-3" />
              
              <h3 className="text-sm font-medium mb-2">أخطاء مسجلة</h3>
              {performanceData?.errors?.details && performanceData.errors.details.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-auto">
                  {performanceData.errors.details.map((error: any, index: number) => (
                    <div key={index} className="p-2 rounded bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-xs">
                      <div className="flex items-center mb-1">
                        <AlertCircle className="h-3 w-3 text-red-500 mr-1" />
                        <span className="font-semibold">{error.name}</span>
                      </div>
                      <p className="text-muted-foreground">{error.message}</p>
                      <Badge variant="outline" className="mt-1 text-[10px]">
                        {new Date(error.timestamp).toLocaleString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">لا توجد أخطاء مسجلة</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <div className="text-xs text-muted-foreground">
          آخر تحديث: {performanceData?.timestamp ? new Date(performanceData.timestamp).toLocaleTimeString() : "--:--:--"}
        </div>
        <Button size="sm" onClick={generateReport}>
          توليد تقرير
        </Button>
      </CardFooter>
    </Card>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  status: "normal" | "warning" | "danger";
  progress: number;
}

function MetricCard({ title, value, icon, status, progress }: MetricCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'danger': return "text-red-500 bg-red-100 dark:bg-red-900/20";
      case 'warning': return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/20";
      default: return "text-green-500 bg-green-100 dark:bg-green-900/20";
    }
  };
  
  const getProgressColor = () => {
    switch (status) {
      case 'danger': return "bg-red-500";
      case 'warning': return "bg-yellow-500";
      default: return "bg-green-500";
    }
  };
  
  return (
    <div className="border rounded-md p-3 bg-card">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className={`p-1.5 rounded-full ${getStatusColor()} mr-2`}>
            {icon}
          </div>
          <span className="text-sm font-medium">{title}</span>
        </div>
        <Badge variant={status === 'danger' ? 'outline' : 'secondary'} className="text-xs">
          {status === 'danger' ? 'مرتفع' : status === 'warning' ? 'متوسط' : 'عادي'}
        </Badge>
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${getProgressColor()}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
