
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { AreaChart, Area, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Activity, Zap, ArrowDownToLine, ArrowUpFromLine, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// إنشاء بيانات مصطنعة للوقت الفعلي
const generateRealTimeData = () => {
  const now = new Date();
  const data = [];
  
  for (let i = 20; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 2000);
    const timeStr = time.toLocaleTimeString().split(":").slice(0, 2).join(":") + ":" + time.getSeconds();
    
    data.push({
      time: timeStr,
      download: Math.floor(Math.random() * 100) + 50,
      upload: Math.floor(Math.random() * 50) + 20,
      latency: Math.floor(Math.random() * 20) + 10
    });
  }
  
  return data;
};

// تحديد الشذوذ في البيانات كمثال على مشكلة
const generateAnomaly = (data) => {
  const anomalies = [];
  
  data.forEach((point, index) => {
    if (point.latency > 25 || point.download < 40 || point.upload < 15) {
      anomalies.push({
        time: point.time,
        type: point.latency > 25 ? "latency" : point.download < 40 ? "download" : "upload",
        value: point.latency > 25 ? point.latency : point.download < 40 ? point.download : point.upload
      });
    }
  });
  
  return anomalies;
};

export const RealTimeMonitoring = () => {
  const { t } = useTranslation();
  const [realTimeData, setRealTimeData] = useState(generateRealTimeData());
  const [anomalies, setAnomalies] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const refreshData = () => {
    setIsRefreshing(true);
    
    const newData = generateRealTimeData();
    setRealTimeData(newData);
    setAnomalies(generateAnomaly(newData));
    
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
  
  return (
    <Card className="border-octaBlue-200 shadow-md animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-octaBlue-800 font-tajawal flex items-center">
              <Activity className="mr-2 h-5 w-5 text-octaBlue-600" />
              مراقبة الشبكة في الوقت الفعلي
            </CardTitle>
            <p className="text-sm text-muted-foreground font-tajawal">
              قياس سرعة ومستوى أداء الشبكة بشكل مباشر
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshData} 
            disabled={isRefreshing}
            className="font-tajawal flex items-center gap-1"
          >
            <RefreshCw size={14} className={cn("mr-1", isRefreshing && "animate-spin")} />
            تحديث
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center">
              <ArrowDownToLine className="text-blue-500 mr-2 h-8 w-8" />
              <div>
                <p className="text-sm text-muted-foreground font-tajawal">سرعة التنزيل</p>
                <p className="text-2xl font-bold">{realTimeData[realTimeData.length - 1].download} Mbps</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center">
              <ArrowUpFromLine className="text-green-500 mr-2 h-8 w-8" />
              <div>
                <p className="text-sm text-muted-foreground font-tajawal">سرعة الرفع</p>
                <p className="text-2xl font-bold">{realTimeData[realTimeData.length - 1].upload} Mbps</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100">
            <div className="flex items-center">
              <Zap className="text-amber-500 mr-2 h-8 w-8" />
              <div>
                <p className="text-sm text-muted-foreground font-tajawal">زمن الإستجابة</p>
                <p className="text-2xl font-bold">{realTimeData[realTimeData.length - 1].latency} ms</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4 font-tajawal">سرعة التنزيل والرفع</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={realTimeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border rounded shadow-sm">
                            <p className="text-sm font-bold">{label}</p>
                            <p className="text-sm text-blue-600">{`تنزيل: ${payload[0].value} Mbps`}</p>
                            <p className="text-sm text-green-600">{`رفع: ${payload[1].value} Mbps`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="download" 
                    name="التنزيل" 
                    stroke="#3b82f6" 
                    fill="#93c5fd" 
                    activeDot={{ r: 8 }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="upload" 
                    name="الرفع" 
                    stroke="#10b981" 
                    fill="#6ee7b7" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4 font-tajawal">زمن الإستجابة</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={realTimeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border rounded shadow-sm">
                            <p className="text-sm font-bold">{label}</p>
                            <p className="text-sm text-amber-600">{`زمن الإستجابة: ${payload[0].value} ms`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="latency" 
                    name="زمن الإستجابة" 
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
        
        {anomalies.length > 0 && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="text-md font-medium mb-3 flex items-center font-tajawal">
              <AlertTriangle className="text-amber-500 mr-2 h-5 w-5" />
              تنبيهات الشبكة
            </h3>
            <div className="space-y-3 max-h-36 overflow-y-auto">
              {anomalies.map((anomaly, index) => (
                <div key={index} className="flex items-start space-x-2 rtl:space-x-reverse">
                  <div className={`w-2 h-2 mt-1.5 rounded-full ${
                    anomaly.type === 'latency' ? 'bg-amber-500' : 
                    anomaly.type === 'download' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium font-tajawal">
                      {anomaly.type === 'latency' ? 'ارتفاع في زمن الإستجابة' : 
                       anomaly.type === 'download' ? 'انخفاض في سرعة التنزيل' : 
                       'انخفاض في سرعة الرفع'}
                    </p>
                    <p className="text-xs text-muted-foreground font-tajawal">
                      {anomaly.time} - القيمة: {anomaly.value} 
                      {anomaly.type === 'latency' ? ' ms' : ' Mbps'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
