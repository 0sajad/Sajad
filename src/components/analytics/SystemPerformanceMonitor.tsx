
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Cpu, HardDrive, Thermometer, MemoryStick, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ResourceMetricCard } from "./performance/ResourceMetricCard";
import { CPUMemoryChart } from "./performance/CPUMemoryChart";
import { DiskTemperatureChart } from "./performance/DiskTemperatureChart";
import { SystemHealthAssessment } from "./performance/SystemHealthAssessment";
import { generatePerformanceData, PerformanceDataPoint } from "./performance/utils/performanceUtils";
import { useA11y } from "@/hooks/useA11y";

export const SystemPerformanceMonitor = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const { reducedMotion } = useA11y();
  const [performanceData, setPerformanceData] = useState<PerformanceDataPoint[]>(generatePerformanceData());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Current values (last in the array)
  const currentValues = performanceData[performanceData.length - 1];
  
  const refreshData = () => {
    setIsRefreshing(true);
    
    toast({
      title: t('systemMonitor.refreshing', isRTL ? 'تحديث البيانات' : 'Refreshing Data'),
      description: t('systemMonitor.collectingMetrics', isRTL ? 'جمع مقاييس النظام...' : 'Collecting system metrics...')
    });
    
    setTimeout(() => {
      setPerformanceData(generatePerformanceData());
      setIsRefreshing(false);
    }, 1000);
  };
  
  // Auto-refresh after component mount
  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      refreshData();
    }, 500);
    
    // Regular refresh interval
    const interval = setInterval(() => {
      const newData = [...performanceData.slice(1)];
      newData.push({
        time: (parseInt(performanceData[performanceData.length - 1].time) + 1).toString(),
        cpu: Math.floor(Math.random() * 30) + 10,
        memory: Math.floor(Math.random() * 40) + 30,
        disk: Math.floor(Math.random() * 15) + 5,
        temperature: Math.floor(Math.random() * 15) + 45,
      });
      setPerformanceData(newData);
    }, reducedMotion ? 10000 : 5000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [performanceData, reducedMotion]);
  
  return (
    <Card className="border-blue-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg flex flex-row items-center justify-between p-4">
        <div>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Cpu className="h-5 w-5 text-blue-600" />
            {isRTL ? 'مراقب أداء النظام' : 'System Performance Monitor'}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {isRTL ? 'مراقبة موارد النظام في الوقت الفعلي' : 'Real-time monitoring of system resources'}
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshData} 
          disabled={isRefreshing}
          className="h-8 px-2"
        >
          <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          <span className="ml-1">{isRTL ? 'تحديث' : 'Refresh'}</span>
        </Button>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg border shadow-sm">
            <div className="flex items-center mb-2">
              <Cpu className="text-blue-500 mr-2 h-5 w-5" />
              <div>
                <h3 className="font-medium text-lg">{currentValues.cpu}%</h3>
                <p className="text-sm text-muted-foreground">CPU</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {isRTL ? 'استخدام المعالج منخفض' : 'CPU usage is low'}
            </p>
          </div>
          
          <div className="p-4 rounded-lg border shadow-sm">
            <div className="flex items-center mb-2">
              <MemoryStick className="text-green-500 mr-2 h-5 w-5" />
              <div>
                <h3 className="font-medium text-lg">{currentValues.memory}%</h3>
                <p className="text-sm text-muted-foreground">{isRTL ? 'ذاكرة' : 'Memory'}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {isRTL ? 'استخدام الذاكرة معتدل' : 'Memory usage is moderate'}
            </p>
          </div>
          
          <div className="p-4 rounded-lg border shadow-sm">
            <div className="flex items-center mb-2">
              <HardDrive className="text-purple-500 mr-2 h-5 w-5" />
              <div>
                <h3 className="font-medium text-lg">{currentValues.disk}%</h3>
                <p className="text-sm text-muted-foreground">{isRTL ? 'قرص' : 'Disk'}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {isRTL ? 'استخدام القرص منخفض' : 'Disk usage is low'}
            </p>
          </div>
          
          <div className="p-4 rounded-lg border shadow-sm">
            <div className="flex items-center mb-2">
              <Thermometer className="text-amber-500 mr-2 h-5 w-5" />
              <div>
                <h3 className="font-medium text-lg">{currentValues.temperature}°C</h3>
                <p className="text-sm text-muted-foreground">{isRTL ? 'درجة الحرارة' : 'Temperature'}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {isRTL ? 'درجة الحرارة في النطاق الطبيعي' : 'Temperature is in normal range'}
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <CPUMemoryChart performanceData={performanceData} reducedAnimations={reducedMotion} />
          <DiskTemperatureChart performanceData={performanceData} reducedAnimations={reducedMotion} />
          <SystemHealthAssessment />
        </div>
      </CardContent>
    </Card>
  );
};
