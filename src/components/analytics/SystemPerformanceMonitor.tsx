
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Cpu, HardDrive, Thermometer, MemoryStick } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { SystemMonitorHeader } from "./performance/SystemMonitorHeader";
import { ResourceMetricCard } from "./performance/ResourceMetricCard";
import { CPUMemoryChart } from "./performance/CPUMemoryChart";
import { DiskTemperatureChart } from "./performance/DiskTemperatureChart";
import { SystemHealthAssessment } from "./performance/SystemHealthAssessment";
import { generatePerformanceData, PerformanceDataPoint } from "./performance/utils/performanceUtils";
import { useA11y } from "@/hooks/useA11y";

export const SystemPerformanceMonitor = () => {
  const { t } = useTranslation();
  const { reducedMotion } = useA11y();
  const [performanceData, setPerformanceData] = useState<PerformanceDataPoint[]>(generatePerformanceData());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Current values (last in the array)
  const currentValues = performanceData[performanceData.length - 1];
  
  const refreshData = () => {
    setIsRefreshing(true);
    
    toast({
      title: t('systemMonitor.refreshing', 'Refreshing Data'),
      description: t('systemMonitor.collectingMetrics', 'Collecting system metrics...')
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
    }, reducedMotion ? 10000 : 5000); // تقليل التحديثات في وضع تقليل الحركة
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [performanceData, reducedMotion]);
  
  return (
    <Card className="border-octaBlue-200 shadow-md animate-fade-in" aria-label={t('systemMonitor.title', 'مراقبة أداء النظام')}>
      <SystemMonitorHeader onRefresh={refreshData} isRefreshing={isRefreshing} />
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <ResourceMetricCard 
            icon={Cpu}
            iconColor="blue"
            label="CPU"
            value={`${currentValues.cpu}%`}
            bgColorFrom="blue"
            bgColorTo="blue"
            ariaLabel={t('systemMonitor.cpuUsage', 'استخدام المعالج {value}', { value: `${currentValues.cpu}%` })}
          />
          
          <ResourceMetricCard 
            icon={MemoryStick}
            iconColor="green"
            label={t('systemMonitor.memory', 'Memory')}
            value={`${currentValues.memory}%`}
            bgColorFrom="green"
            bgColorTo="green"
            ariaLabel={t('systemMonitor.memoryUsage', 'استخدام الذاكرة {value}', { value: `${currentValues.memory}%` })}
          />
          
          <ResourceMetricCard 
            icon={HardDrive}
            iconColor="purple"
            label={t('systemMonitor.disk', 'Disk')}
            value={`${currentValues.disk}%`}
            bgColorFrom="purple"
            bgColorTo="purple"
            ariaLabel={t('systemMonitor.diskUsage', 'استخدام القرص {value}', { value: `${currentValues.disk}%` })}
          />
          
          <ResourceMetricCard 
            icon={Thermometer}
            iconColor="amber"
            label={t('systemMonitor.temperature', 'Temperature')}
            value={`${currentValues.temperature}°C`}
            bgColorFrom="amber"
            bgColorTo="amber"
            ariaLabel={t('systemMonitor.tempReading', 'قراءة درجة الحرارة {value}', { value: `${currentValues.temperature}°C` })}
          />
        </div>
        
        <div className="space-y-6">
          <CPUMemoryChart performanceData={performanceData} reducedAnimations={reducedMotion} />
          <DiskTemperatureChart performanceData={performanceData} reducedAnimations={reducedMotion} />
        </div>
        
        <SystemHealthAssessment />
      </CardContent>
    </Card>
  );
};
