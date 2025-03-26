
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
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

export const SystemPerformanceMonitor = () => {
  const { t } = useTranslation();
  const { reducedMotion } = useA11y();
  const keyboardShortcuts = useKeyboardShortcuts();
  const [performanceData, setPerformanceData] = useState<PerformanceDataPoint[]>(generatePerformanceData());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Current values (last in the array)
  const currentValues = performanceData[performanceData.length - 1];
  
  // مساعدة آمنة للإعلان لقارئات الشاشة
  const safeAnnounce = (message: string) => {
    // التحقق من وجود الدالة announce قبل استخدامها
    if (keyboardShortcuts && typeof keyboardShortcuts.announce === 'function') {
      keyboardShortcuts.announce(message);
    } else if (window.announce) {
      // استخدام window.announce كخطة بديلة
      window.announce(message);
    }
  };
  
  const refreshData = () => {
    setIsRefreshing(true);
    
    toast({
      title: t('systemMonitor.refreshing', 'Refreshing Data'),
      description: t('systemMonitor.collectingMetrics', 'Collecting system metrics...')
    });
    
    // استخدام الدالة الآمنة للإعلان
    safeAnnounce(t('systemMonitor.refreshing', 'Refreshing Data') + '. ' + 
             t('systemMonitor.collectingMetrics', 'Collecting system metrics...'));
    
    setTimeout(() => {
      setPerformanceData(generatePerformanceData());
      setIsRefreshing(false);
      
      // استخدام الدالة الآمنة للإعلان
      safeAnnounce(t('systemMonitor.dataRefreshed', 'System data has been refreshed'));
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
  
  // Get descriptions for metrics with more context
  const getCpuDescription = () => {
    const value = currentValues.cpu;
    if (value > 80) return t('systemMonitor.cpuHigh', 'CPU usage is very high');
    if (value > 50) return t('systemMonitor.cpuModerate', 'CPU usage is moderate');
    return t('systemMonitor.cpuLow', 'CPU usage is low');
  };
  
  const getMemoryDescription = () => {
    const value = currentValues.memory;
    if (value > 80) return t('systemMonitor.memoryHigh', 'Memory usage is very high');
    if (value > 50) return t('systemMonitor.memoryModerate', 'Memory usage is moderate');
    return t('systemMonitor.memoryLow', 'Memory usage is low');
  };
  
  const getDiskDescription = () => {
    const value = currentValues.disk;
    if (value > 80) return t('systemMonitor.diskHigh', 'Disk usage is very high');
    if (value > 50) return t('systemMonitor.diskModerate', 'Disk usage is moderate');
    return t('systemMonitor.diskLow', 'Disk usage is low');
  };
  
  const getTemperatureDescription = () => {
    const value = currentValues.temperature;
    if (value > 75) return t('systemMonitor.tempHigh', 'Temperature is very high');
    if (value > 60) return t('systemMonitor.tempModerate', 'Temperature is moderate');
    return t('systemMonitor.tempLow', 'Temperature is in normal range');
  };
  
  return (
    <Card 
      className="border-octaBlue-200 shadow-md animate-fade-in" 
      aria-label={t('systemMonitor.title', 'System Performance Monitor')}
    >
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
            ariaLabel={t('systemMonitor.cpuUsage', 'CPU usage {value}', { value: `${currentValues.cpu}%` })}
            description={getCpuDescription()}
          />
          
          <ResourceMetricCard 
            icon={MemoryStick}
            iconColor="green"
            label={t('systemMonitor.memory', 'Memory')}
            value={`${currentValues.memory}%`}
            bgColorFrom="green"
            bgColorTo="green"
            ariaLabel={t('systemMonitor.memoryUsage', 'Memory usage {value}', { value: `${currentValues.memory}%` })}
            description={getMemoryDescription()}
          />
          
          <ResourceMetricCard 
            icon={HardDrive}
            iconColor="purple"
            label={t('systemMonitor.disk', 'Disk')}
            value={`${currentValues.disk}%`}
            bgColorFrom="purple"
            bgColorTo="purple"
            ariaLabel={t('systemMonitor.diskUsage', 'Disk usage {value}', { value: `${currentValues.disk}%` })}
            description={getDiskDescription()}
          />
          
          <ResourceMetricCard 
            icon={Thermometer}
            iconColor="amber"
            label={t('systemMonitor.temperature', 'Temperature')}
            value={`${currentValues.temperature}°C`}
            bgColorFrom="amber"
            bgColorTo="amber"
            ariaLabel={t('systemMonitor.tempReading', 'Temperature reading {value}', { value: `${currentValues.temperature}°C` })}
            description={getTemperatureDescription()}
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
