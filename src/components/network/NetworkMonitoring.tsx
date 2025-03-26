
import React, { useState, useEffect, useCallback } from "react";
import { GlassCard } from "../ui/glass-card";
import { Progress } from "../ui/progress";
import { useTranslation } from "react-i18next";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "../ui/button";
import { RefreshCw, Wifi, Signal, Antenna } from "lucide-react";
import { toast } from "../ui/use-toast";

// Generate optimized data with limited data points for better performance
const generateData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    wifi: Math.floor(Math.random() * 100),
    cellular: Math.floor(Math.random() * 100),
    ethernet: Math.floor(Math.random() * 100)
  }));
};

export const NetworkMonitoring = () => {
  const { t } = useTranslation();
  const [data, setData] = useState(generateData());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Memoize refresh function to prevent unnecessary re-renders
  const refreshData = useCallback(() => {
    setIsRefreshing(true);
    toast({
      title: t('networkTools.qualityMonitoring'),
      description: t('networkTools.signalStrength')
    });
    
    setTimeout(() => {
      setData(generateData());
      setIsRefreshing(false);
    }, 800);
  }, [t]);
  
  // Auto refresh after mounting
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isRefreshing) refreshData();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [refreshData, isRefreshing]);
  
  return (
    <GlassCard className="p-0 overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{t('networkTools.qualityMonitoring')}</h3>
          <p className="text-sm text-muted-foreground">{t('networkTools.signalStrength')}</p>
        </div>
        <Button variant="outline" size="sm" onClick={refreshData} disabled={isRefreshing}>
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          <span className="ml-2">{isRefreshing ? '...' : t('networkTools.signalStrength')}</span>
        </Button>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Wifi size={18} className="text-green-600 dark:text-green-400" />
              <span className="font-medium">WiFi</span>
            </div>
            <Progress value={78} className="mb-1" />
            <span className="text-sm text-muted-foreground">78% {t('networkTools.signalStrength')}</span>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Signal size={18} className="text-blue-600 dark:text-blue-400" />
              <span className="font-medium">4G/5G</span>
            </div>
            <Progress value={62} className="mb-1" />
            <span className="text-sm text-muted-foreground">62% {t('networkTools.signalStrength')}</span>
          </div>
          
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Antenna size={18} className="text-purple-600 dark:text-purple-400" />
              <span className="font-medium">Ethernet</span>
            </div>
            <Progress value={95} className="mb-1" />
            <span className="text-sm text-muted-foreground">95% {t('networkTools.signalStrength')}</span>
          </div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="wifi" stroke="#22c55e" name="WiFi" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="cellular" stroke="#3b82f6" name="4G/5G" />
              <Line type="monotone" dataKey="ethernet" stroke="#a855f7" name="Ethernet" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">{t('networkTools.download')}</h4>
            <p className="text-2xl font-bold">87.5 <span className="text-sm font-normal">Mbps</span></p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">{t('networkTools.upload')}</h4>
            <p className="text-2xl font-bold">32.8 <span className="text-sm font-normal">Mbps</span></p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-medium mb-2">{t('networkTools.ping')}</h4>
            <p className="text-2xl font-bold">24 <span className="text-sm font-normal">ms</span></p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
