
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

export const SystemPerformanceMonitor = () => {
  const { t } = useTranslation();
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
    }, 5000);
    
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [performanceData]);
  
  return (
    <Card className="border-octaBlue-200 shadow-md animate-fade-in">
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
          />
          
          <ResourceMetricCard 
            icon={MemoryStick}
            iconColor="green"
            label={t('systemMonitor.memory', 'Memory')}
            value={`${currentValues.memory}%`}
            bgColorFrom="green"
            bgColorTo="green"
          />
          
          <ResourceMetricCard 
            icon={HardDrive}
            iconColor="purple"
            label={t('systemMonitor.disk', 'Disk')}
            value={`${currentValues.disk}%`}
            bgColorFrom="purple"
            bgColorTo="purple"
          />
          
          <ResourceMetricCard 
            icon={Thermometer}
            iconColor="amber"
            label={t('systemMonitor.temperature', 'Temperature')}
            value={`${currentValues.temperature}°C`}
            bgColorFrom="amber"
            bgColorTo="amber"
          />
        </div>
        
        <div className="space-y-6">
          <CPUMemoryChart performanceData={performanceData} />
          <DiskTemperatureChart performanceData={performanceData} />
        </div>
        
        <SystemHealthAssessment />
      </CardContent>
    </Card>
  );
};
