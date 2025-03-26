
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
  
  // مساعدة آمنة للإعلان لقارئات الشاشة
  const safeAnnounce = (message: string) => {
    // التحقق من وجود الدالة announce قبل استخدامها
    if (typeof window !== 'undefined' && window.announce) {
      window.announce(message);
    }
  };
  
  const refreshData = () => {
    setIsRefreshing(true);
    
    toast({
      title: t('systemMonitor.refreshing', 'تحديث البيانات'),
      description: t('systemMonitor.collectingMetrics', 'جمع مقاييس النظام...')
    });
    
    // استخدام الدالة الآمنة للإعلان
    safeAnnounce(t('systemMonitor.refreshing', 'تحديث البيانات') + '. ' + 
             t('systemMonitor.collectingMetrics', 'جمع مقاييس النظام...'));
    
    setTimeout(() => {
      setPerformanceData(generatePerformanceData());
      setIsRefreshing(false);
      
      // استخدام الدالة الآمنة للإعلان
      safeAnnounce(t('systemMonitor.dataRefreshed', 'تم تحديث بيانات النظام'));
    }, 1000);
  };
  
  // Auto-refresh after component mount - reduce initial timeout for faster loading
  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      refreshData();
    }, 300); // تقليل وقت التأخير الأولي من 500 إلى 300
    
    // Regular refresh interval - optimize for better performance
    const interval = setInterval(() => {
      // تحسين أداء التحديث بمعالجة البيانات بطريقة أكثر كفاءة
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
  
  // Get descriptions for metrics with more context
  const getCpuDescription = () => {
    const value = currentValues.cpu;
    if (value > 80) return t('systemMonitor.cpuHigh', 'استخدام CPU مرتفع جدًا');
    if (value > 50) return t('systemMonitor.cpuModerate', 'استخدام CPU متوسط');
    return t('systemMonitor.cpuLow', 'استخدام CPU منخفض');
  };
  
  const getMemoryDescription = () => {
    const value = currentValues.memory;
    if (value > 80) return t('systemMonitor.memoryHigh', 'استخدام الذاكرة مرتفع جدًا');
    if (value > 50) return t('systemMonitor.memoryModerate', 'استخدام الذاكرة متوسط');
    return t('systemMonitor.memoryLow', 'استخدام الذاكرة منخفض');
  };
  
  const getDiskDescription = () => {
    const value = currentValues.disk;
    if (value > 80) return t('systemMonitor.diskHigh', 'استخدام القرص مرتفع جدًا');
    if (value > 50) return t('systemMonitor.diskModerate', 'استخدام القرص متوسط');
    return t('systemMonitor.diskLow', 'استخدام القرص منخفض');
  };
  
  const getTemperatureDescription = () => {
    const value = currentValues.temperature;
    if (value > 75) return t('systemMonitor.tempHigh', 'درجة الحرارة مرتفعة جدًا');
    if (value > 60) return t('systemMonitor.tempModerate', 'درجة الحرارة متوسطة');
    return t('systemMonitor.tempLow', 'درجة الحرارة في النطاق الطبيعي');
  };
  
  return (
    <Card 
      className="border-octaBlue-200 shadow-md animate-fade-in" 
      aria-label={t('systemMonitor.title', 'مراقب أداء النظام')}
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
            ariaLabel={t('systemMonitor.cpuUsage', 'استخدام CPU {value}', { value: `${currentValues.cpu}%` })}
            description={getCpuDescription()}
          />
          
          <ResourceMetricCard 
            icon={MemoryStick}
            iconColor="green"
            label={t('systemMonitor.memory', 'الذاكرة')}
            value={`${currentValues.memory}%`}
            bgColorFrom="green"
            bgColorTo="green"
            ariaLabel={t('systemMonitor.memoryUsage', 'استخدام الذاكرة {value}', { value: `${currentValues.memory}%` })}
            description={getMemoryDescription()}
          />
          
          <ResourceMetricCard 
            icon={HardDrive}
            iconColor="purple"
            label={t('systemMonitor.disk', 'القرص')}
            value={`${currentValues.disk}%`}
            bgColorFrom="purple"
            bgColorTo="purple"
            ariaLabel={t('systemMonitor.diskUsage', 'استخدام القرص {value}', { value: `${currentValues.disk}%` })}
            description={getDiskDescription()}
          />
          
          <ResourceMetricCard 
            icon={Thermometer}
            iconColor="amber"
            label={t('systemMonitor.temperature', 'درجة الحرارة')}
            value={`${currentValues.temperature}°C`}
            bgColorFrom="amber"
            bgColorTo="amber"
            ariaLabel={t('systemMonitor.tempReading', 'قراءة درجة الحرارة {value}', { value: `${currentValues.temperature}°C` })}
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
