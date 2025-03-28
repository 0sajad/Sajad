
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, Area, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
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
      download: Math.floor(Math.random() * 30) + 90,
      upload: Math.floor(Math.random() * 20) + 20,
      latency: Math.floor(Math.random() * 10) + 15
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
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [realTimeData, setRealTimeData] = useState(generateRealTimeData());
  const [anomalies, setAnomalies] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const lastData = realTimeData[realTimeData.length - 1];
  
  // محاكاة تحديث البيانات في الوقت الفعلي
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...realTimeData.slice(1)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString().split(":").slice(0, 2).join(":") + ":" + now.getSeconds();
      
      newData.push({
        time: timeStr,
        download: Math.floor(Math.random() * 30) + 90,
        upload: Math.floor(Math.random() * 20) + 20,
        latency: Math.floor(Math.random() * 10) + 15
      });
      
      setRealTimeData(newData);
      setAnomalies(generateAnomaly(newData));
    }, 2000);
    
    return () => clearInterval(interval);
  }, [realTimeData]);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRealTimeData(generateRealTimeData());
      setIsRefreshing(false);
    }, 1000);
  };
  
  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-blue-800 mb-1">{isRTL ? "مراقبة الشبكة في الوقت الفعلي" : "Real-time Network Monitoring"}</h2>
          <p className="text-sm text-gray-500">{isRTL ? "قياس سرعة ومستوى أداء الشبكة بشكل مباشر" : "Measure network speed and performance in real-time"}</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="h-8 px-2"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="mr-2">{isRTL ? "تحديث" : "Refresh"}</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-lg bg-yellow-50 flex items-center justify-between`}>
          <span className="text-sm text-gray-600">{isRTL ? "زمن الإستجابة" : "Response Time"}</span>
          <div className="flex items-center">
            <span className="text-2xl font-bold">ms {lastData?.latency || 26}</span>
            <Zap className="mr-2 h-5 w-5 text-yellow-500" />
          </div>
        </div>
        
        <div className={`p-4 rounded-lg bg-green-50 flex items-center justify-between`}>
          <span className="text-sm text-gray-600">{isRTL ? "سرعة الرفع" : "Upload Speed"}</span>
          <div className="flex items-center">
            <span className="text-2xl font-bold">Mbps {lastData?.upload || 32}</span>
            <ArrowUpFromLine className="mr-2 h-5 w-5 text-green-500" />
          </div>
        </div>
        
        <div className={`p-4 rounded-lg bg-blue-50 flex items-center justify-between`}>
          <span className="text-sm text-gray-600">{isRTL ? "سرعة التنزيل" : "Download Speed"}</span>
          <div className="flex items-center">
            <span className="text-2xl font-bold">Mbps {lastData?.download || 103}</span>
            <ArrowDownToLine className="mr-2 h-5 w-5 text-blue-500" />
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2 text-right">{isRTL ? "سرعة التنزيل والرفع" : "Download & Upload Speed"}</h3>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={realTimeData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="colorDownload" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                </linearGradient>
                <linearGradient id="colorUpload" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="download" 
                name={isRTL ? "التنزيل" : "Download"} 
                stroke="#3b82f6" 
                fillOpacity={1}
                fill="url(#colorDownload)"
              />
              <Area 
                type="monotone" 
                dataKey="upload" 
                name={isRTL ? "الرفع" : "Upload"} 
                stroke="#10b981" 
                fillOpacity={1}
                fill="url(#colorUpload)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2 text-right">{isRTL ? "زمن الإستجابة" : "Response Time"}</h3>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={realTimeData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="latency" 
                name={isRTL ? "زمن الإستجابة" : "Latency"} 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {anomalies.length > 0 && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-md font-medium mb-2 flex items-center">
            <AlertTriangle className="text-yellow-500 h-5 w-5 mr-2" />
            {isRTL ? "تنبيهات الشبكة" : "Network Alerts"}
          </h3>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {anomalies.slice(0, 3).map((anomaly, index) => (
              <div key={index} className="flex items-start">
                <div className={`w-2 h-2 mt-1.5 rounded-full ${anomaly.type === 'latency' ? 'bg-yellow-500' : anomaly.type === 'download' ? 'bg-blue-500' : 'bg-green-500'} mr-2`} />
                <div>
                  <p className="text-sm font-medium">
                    {anomaly.type === 'latency' ? (isRTL ? 'ارتفاع في زمن الإستجابة' : 'High latency detected') : 
                     anomaly.type === 'download' ? (isRTL ? 'انخفاض في سرعة التنزيل' : 'Low download speed') : 
                     (isRTL ? 'انخفاض في سرعة الرفع' : 'Low upload speed')}
                  </p>
                  <p className="text-xs text-gray-500">
                    {anomaly.time} - {isRTL ? 'القيمة:' : 'Value:'} {anomaly.value} 
                    {anomaly.type === 'latency' ? ' ms' : ' Mbps'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
