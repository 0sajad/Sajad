
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { generateRealTimeData, generateAnomaly } from "./monitoring/utils/dataGenerator";
import { MonitoringHeader } from "./monitoring/MonitoringHeader";
import { NetworkStatsCards } from "./monitoring/NetworkStatsCards";
import { SpeedChart } from "./monitoring/SpeedChart";
import { LatencyChart } from "./monitoring/LatencyChart";
import { NetworkAlerts } from "./monitoring/NetworkAlerts";
import { toast } from "sonner";

export const RealTimeMonitoring = () => {
  const [realTimeData, setRealTimeData] = useState(generateRealTimeData());
  const [anomalies, setAnomalies] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const refreshData = () => {
    setIsRefreshing(true);
    
    const newData = generateRealTimeData();
    setRealTimeData(newData);
    setAnomalies(generateAnomaly(newData));
    
    toast.success("تم تحديث بيانات الشبكة");
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };
  
  // محاكاة تحديث البيانات في الوقت الفعلي
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...realTimeData.slice(1)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString().split(":").slice(0, 2).join(":") + ":" + now.getSeconds();
      
      newData.push({
        time: timeStr,
        download: Math.floor(Math.random() * 100) + 50,
        upload: Math.floor(Math.random() * 50) + 20,
        latency: Math.floor(Math.random() * 20) + 10
      });
      
      setRealTimeData(newData);
      setAnomalies(generateAnomaly(newData));
    }, 2000);
    
    return () => clearInterval(interval);
  }, [realTimeData]);

  // الحصول على آخر قيم محدثة للشبكة
  const latestData = realTimeData[realTimeData.length - 1];
  
  return (
    <Card className="border-octaBlue-200 shadow-md animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg">
        <MonitoringHeader onRefresh={refreshData} isRefreshing={isRefreshing} />
      </CardHeader>
      
      <CardContent className="pt-6">
        <NetworkStatsCards 
          downloadSpeed={latestData.download}
          uploadSpeed={latestData.upload}
          latency={latestData.latency}
        />
        
        <div className="space-y-6">
          <SpeedChart data={realTimeData} />
          <LatencyChart data={realTimeData} />
        </div>
        
        <NetworkAlerts anomalies={anomalies} />
      </CardContent>
    </Card>
  );
};
