
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { CPUMemoryChart } from '@/components/analytics/performance/CPUMemoryChart';
import { DiskTemperatureChart } from '@/components/analytics/performance/DiskTemperatureChart';
import { useTranslation } from 'react-i18next';
import { 
  Activity, 
  AlertTriangle, 
  BarChart2, 
  Cpu, 
  FileCog, 
  HardDrive, 
  LineChart, 
  RefreshCw, 
  Settings, 
  Sparkles,
  DatabaseBackup,
  Gauge,
  PauseOctagon
} from 'lucide-react';

// Sample performance data
const samplePerformanceData = [
  { time: "12:00", cpu: 45, memory: 62, disk: 55, temperature: 42 },
  { time: "12:05", cpu: 52, memory: 64, disk: 54, temperature: 44 },
  { time: "12:10", cpu: 48, memory: 60, disk: 55, temperature: 43 },
  { time: "12:15", cpu: 58, memory: 68, disk: 56, temperature: 45 },
  { time: "12:20", cpu: 72, memory: 72, disk: 55, temperature: 46 },
  { time: "12:25", cpu: 65, memory: 70, disk: 55, temperature: 45 },
  { time: "12:30", cpu: 55, memory: 65, disk: 55, temperature: 44 },
];

export function PerformancePanel() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("monitoring");
  const [optimizing, setOptimizing] = useState(false);
  const [reducedAnimations, setReducedAnimations] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(5);
  
  // Simulated performance metrics
  const performanceMetrics = {
    cpuUsage: 58,
    memoryUsage: 72,
    diskUsage: 55,
    temperature: 44,
    renderTime: 126, // ms
    apiLatency: 215, // ms
    domElements: 1245,
    bundleSize: 2.4, // MB
    runtimeErrors: 0,
  };
  
  // Performance score calculation
  const getPerformanceScore = () => {
    // Simplified scoring mechanism
    const cpuScore = 100 - performanceMetrics.cpuUsage;
    const memoryScore = 100 - performanceMetrics.memoryUsage;
    const renderScore = performanceMetrics.renderTime < 100 ? 100 : 
                        performanceMetrics.renderTime < 200 ? 80 : 
                        performanceMetrics.renderTime < 300 ? 60 : 
                        performanceMetrics.renderTime < 400 ? 40 : 20;
    
    const apiScore = performanceMetrics.apiLatency < 100 ? 100 : 
                    performanceMetrics.apiLatency < 200 ? 80 : 
                    performanceMetrics.apiLatency < 300 ? 60 : 
                    performanceMetrics.apiLatency < 400 ? 40 : 20;
    
    // Weighted average
    const totalScore = (cpuScore * 0.25) + (memoryScore * 0.25) + 
                      (renderScore * 0.3) + (apiScore * 0.2);
    
    return Math.round(totalScore);
  };
  
  // Get performance rating
  const getPerformanceRating = (score: number) => {
    if (score >= 90) return { text: "Excellent", color: "bg-green-500" };
    if (score >= 75) return { text: "Good", color: "bg-blue-500" };
    if (score >= 60) return { text: "Acceptable", color: "bg-yellow-500" };
    if (score >= 40) return { text: "Poor", color: "bg-orange-500" };
    return { text: "Critical", color: "bg-red-500" };
  };
  
  // Simulated performance optimization
  const handleOptimize = () => {
    setOptimizing(true);
    
    setTimeout(() => {
      setOptimizing(false);
    }, 2500);
  };
  
  const performanceScore = getPerformanceScore();
  const performanceRating = getPerformanceRating(performanceScore);
  
  return (
    <Card className="border-blue-200 dark:border-blue-900">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-lg flex items-center">
          <Gauge className="w-5 h-5 mr-2 text-blue-500" />
          {t('developer.performancePanel.title', 'مراقبة الأداء')}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge className={performanceRating.color}>
            {performanceRating.text} - {performanceScore}/100
          </Badge>
          <Button 
            variant="outline"
            size="sm" 
            className="h-8" 
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            {t('developer.common.refresh', 'تحديث')}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-3">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="monitoring">
              <Activity className="h-4 w-4 mr-2" />
              {t('developer.performancePanel.monitoring', 'المراقبة')}
            </TabsTrigger>
            <TabsTrigger value="optimization">
              <Sparkles className="h-4 w-4 mr-2" />
              {t('developer.performancePanel.optimization', 'التحسين')}
            </TabsTrigger>
            <TabsTrigger value="settings">
              <FileCog className="h-4 w-4 mr-2" />
              {t('developer.performancePanel.settings', 'الإعدادات')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="monitoring" className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg flex flex-col justify-between">
                <div className="text-xs text-blue-500 font-medium flex items-center">
                  <Cpu className="h-3.5 w-3.5 mr-1" />
                  {t('developer.performancePanel.cpu', 'المعالج')}
                </div>
                <div className="text-2xl font-bold mt-2">{performanceMetrics.cpuUsage}%</div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg flex flex-col justify-between">
                <div className="text-xs text-purple-500 font-medium flex items-center">
                  <LineChart className="h-3.5 w-3.5 mr-1" />
                  {t('developer.performancePanel.memory', 'الذاكرة')}
                </div>
                <div className="text-2xl font-bold mt-2">{performanceMetrics.memoryUsage}%</div>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg flex flex-col justify-between">
                <div className="text-xs text-amber-500 font-medium flex items-center">
                  <BarChart2 className="h-3.5 w-3.5 mr-1" />
                  {t('developer.performancePanel.renderTime', 'زمن العرض')}
                </div>
                <div className="text-2xl font-bold mt-2">{performanceMetrics.renderTime} <span className="text-sm">ms</span></div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg flex flex-col justify-between">
                <div className="text-xs text-green-500 font-medium flex items-center">
                  <Activity className="h-3.5 w-3.5 mr-1" />
                  {t('developer.performancePanel.apiLatency', 'زمن استجابة API')}
                </div>
                <div className="text-2xl font-bold mt-2">{performanceMetrics.apiLatency} <span className="text-sm">ms</span></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <CPUMemoryChart 
                performanceData={samplePerformanceData}
                reducedAnimations={reducedAnimations}
              />
              
              <DiskTemperatureChart 
                performanceData={samplePerformanceData}
                reducedAnimations={reducedAnimations}
              />
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <h3 className="text-sm font-medium mb-3 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                {t('developer.performancePanel.performanceIssues', 'مشاكل الأداء')}
              </h3>
              
              <div className="space-y-2">
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 p-2 rounded text-sm">
                  {t('developer.performancePanel.highMemory', 'استخدام الذاكرة مرتفع (72%)')}
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 p-2 rounded text-sm">
                  {t('developer.performancePanel.slowApi', 'زمن استجابة API بطيء (215ms)')}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="optimization" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-medium">
                {t('developer.performancePanel.availableOptimizations', 'التحسينات المتاحة')}
              </h3>
              <Button 
                variant={optimizing ? "outline" : "default"}
                disabled={optimizing}
                onClick={handleOptimize}
              >
                {optimizing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    {t('developer.performancePanel.optimizing', 'جاري التحسين...')}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    {t('developer.performancePanel.optimizeAll', 'تحسين الكل')}
                  </>
                )}
              </Button>
            </div>
            
            <div className="grid gap-2">
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md mr-3">
                    <HardDrive className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {t('developer.performancePanel.cacheOptimization', 'تحسين ذاكرة التخزين المؤقت')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t('developer.performancePanel.reduceMemory', 'يمكن أن تقلل من استخدام الذاكرة بنسبة 15-20%')}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-blue-200 hover:border-blue-300"
                >
                  {t('developer.performancePanel.apply', 'تطبيق')}
                </Button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-purple-100 dark:bg-purple-900/50 p-2 rounded-md mr-3">
                    <DatabaseBackup className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {t('developer.performancePanel.lazyLoading', 'تفعيل التحميل الكسول للبيانات')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t('developer.performancePanel.fasterPageLoad', 'يمكن أن تحسن سرعة تحميل الصفحات بنسبة 25-30%')}
                    </div>
                  </div>
                </div>
                <Button
                  variant="default"
                >
                  {t('developer.performancePanel.apply', 'تطبيق')}
                </Button>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-md mr-3">
                    <PauseOctagon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {t('developer.performancePanel.debouncing', 'تقليل حمل المعالج')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t('developer.performancePanel.reduceCpuUsage', 'يمكن أن يقلل من استخدام المعالج بنسبة 10-15%')}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-green-200 hover:border-green-300"
                >
                  {t('developer.performancePanel.apply', 'تطبيق')}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    {t('developer.performancePanel.autoRefresh', 'تحديث تلقائي')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('developer.performancePanel.autoRefreshDesc', 'الفاصل الزمني لتحديث بيانات الأداء')}
                  </p>
                </div>
                <Switch 
                  checked={true} 
                  onCheckedChange={() => {}}
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <div className="font-medium">{t('developer.performancePanel.refreshInterval', 'الفاصل الزمني (ثواني)')}</div>
                  <div>{refreshInterval}</div>
                </div>
                <Slider 
                  value={[refreshInterval]}
                  min={1}
                  max={30}
                  step={1}
                  onValueChange={(value) => setRefreshInterval(value[0])}
                  className="mt-2"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    {t('developer.performancePanel.reducedAnimations', 'تقليل الرسوم المتحركة')}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t('developer.performancePanel.reducedAnimationsDesc', 'تعطيل الرسوم المتحركة في المخططات لتحسين الأداء')}
                  </p>
                </div>
                <Switch 
                  checked={reducedAnimations} 
                  onCheckedChange={setReducedAnimations}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
