
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";
import { LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Cpu, HardDrive, Thermometer, RefreshCw, MemoryStick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

// Generate sample system performance data
const generatePerformanceData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i.toString(),
    cpu: Math.floor(Math.random() * 30) + 10,
    memory: Math.floor(Math.random() * 40) + 30,
    disk: Math.floor(Math.random() * 15) + 5,
    temperature: Math.floor(Math.random() * 15) + 45,
  }));
};

export const SystemPerformanceMonitor = () => {
  const { t } = useTranslation();
  const [performanceData, setPerformanceData] = useState(generatePerformanceData());
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
      <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-octaBlue-800 flex items-center">
            <Cpu className="mr-2 h-5 w-5 text-octaBlue-600" />
            {t('systemMonitor.title', 'System Performance Monitor')}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t('systemMonitor.description', 'Real-time monitoring of system resources')}
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshData} 
          disabled={isRefreshing}
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin mr-2' : 'mr-2'} />
          {t('systemMonitor.refresh', 'Refresh')}
        </Button>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center">
              <Cpu className="text-blue-500 mr-2 h-8 w-8" />
              <div>
                <p className="text-sm text-muted-foreground">CPU</p>
                <p className="text-2xl font-bold">{currentValues.cpu}%</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center">
              <MemoryStick className="text-green-500 mr-2 h-8 w-8" />
              <div>
                <p className="text-sm text-muted-foreground">{t('systemMonitor.memory', 'Memory')}</p>
                <p className="text-2xl font-bold">{currentValues.memory}%</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center">
              <HardDrive className="text-purple-500 mr-2 h-8 w-8" />
              <div>
                <p className="text-sm text-muted-foreground">{t('systemMonitor.disk', 'Disk')}</p>
                <p className="text-2xl font-bold">{currentValues.disk}%</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100">
            <div className="flex items-center">
              <Thermometer className="text-amber-500 mr-2 h-8 w-8" />
              <div>
                <p className="text-sm text-muted-foreground">{t('systemMonitor.temperature', 'Temperature')}</p>
                <p className="text-2xl font-bold">{currentValues.temperature}°C</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">CPU & Memory Usage</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border rounded shadow-sm">
                            <p className="font-bold">Time: {label}</p>
                            <p className="text-blue-600">CPU: {payload[0].value}%</p>
                            <p className="text-green-600">Memory: {payload[1].value}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="cpu" 
                    name="CPU" 
                    stroke="#3b82f6" 
                    fill="#93c5fd" 
                    activeDot={{ r: 8 }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="memory" 
                    name="Memory" 
                    stroke="#10b981" 
                    fill="#6ee7b7" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Disk I/O & Temperature</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border rounded shadow-sm">
                            <p className="font-bold">Time: {label}</p>
                            <p className="text-purple-600">Disk I/O: {payload[0].value}%</p>
                            <p className="text-amber-600">Temperature: {payload[1].value}°C</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="disk" 
                    name="Disk I/O" 
                    stroke="#8b5cf6" 
                    strokeWidth={2} 
                    dot={{ r: 3 }} 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    name="Temperature" 
                    stroke="#f59e0b" 
                    strokeWidth={2} 
                    dot={{ r: 3 }} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-md font-medium mb-3">System Health Assessment</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Overall Health</span>
                <span className="text-sm font-medium">91%</span>
              </div>
              <Progress value={91} className="h-2 bg-blue-100" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Resource Efficiency</span>
                <span className="text-sm font-medium">88%</span>
              </div>
              <Progress value={88} className="h-2 bg-green-100" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Thermal Management</span>
                <span className="text-sm font-medium">95%</span>
              </div>
              <Progress value={95} className="h-2 bg-amber-100" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
