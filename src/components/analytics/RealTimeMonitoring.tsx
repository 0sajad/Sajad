
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, Area, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Activity, Zap, ArrowDownToLine, ArrowUpFromLine, AlertTriangle } from "lucide-react";
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
    <div className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`${isRTL ? 'ml-2' : 'mr-2'}`}>
            <ArrowDownToLine className="text-blue-500 h-6 w-6" />
          </div>
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-sm text-muted-foreground">{isRTL ? "سرعة التنزيل" : "Download Speed"}</p>
            <p className="text-xl font-semibold">{lastData?.download || 95} Mbps</p>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`${isRTL ? 'ml-2' : 'mr-2'}`}>
            <ArrowUpFromLine className="text-green-500 h-6 w-6" />
          </div>
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-sm text-muted-foreground">{isRTL ? "سرعة الرفع" : "Upload Speed"}</p>
            <p className="text-xl font-semibold">{lastData?.upload || 65} Mbps</p>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className={`${isRTL ? 'ml-2' : 'mr-2'}`}>
            <Zap className="text-amber-500 h-6 w-6" />
          </div>
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-sm text-muted-foreground">{isRTL ? "زمن الإستجابة" : "Latency"}</p>
            <p className="text-xl font-semibold">{lastData?.latency || 21} ms</p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className={`text-md font-medium mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          {isRTL ? "سرعة التنزيل والرفع" : "Download & Upload Speed"}
        </h3>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={realTimeData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border rounded shadow-sm">
                        <p className="text-sm font-bold">{label}</p>
                        <p className="text-sm text-blue-600">{`${isRTL ? "تنزيل" : "Download"}: ${payload[0].value} Mbps`}</p>
                        <p className="text-sm text-green-600">{`${isRTL ? "رفع" : "Upload"}: ${payload[1].value} Mbps`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="download" 
                name={isRTL ? "تنزيل" : "Download"} 
                stroke="#3b82f6" 
                fill="#93c5fd" 
                activeDot={{ r: 8 }} 
              />
              <Area 
                type="monotone" 
                dataKey="upload" 
                name={isRTL ? "رفع" : "Upload"} 
                stroke="#10b981" 
                fill="#6ee7b7" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className={`text-md font-medium mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
          {isRTL ? "زمن الإستجابة" : "Response Time"}
        </h3>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={realTimeData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border rounded shadow-sm">
                        <p className="text-sm font-bold">{label}</p>
                        <p className="text-sm text-amber-600">{`${isRTL ? "زمن الإستجابة" : "Latency"}: ${payload[0].value} ms`}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="latency" 
                name={isRTL ? "زمن الإستجابة" : "Latency"} 
                stroke="#f59e0b" 
                strokeWidth={2} 
                dot={{ r: 3 }} 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {anomalies.length > 0 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className={`text-md font-medium mb-3 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
            <AlertTriangle className="text-amber-500 h-5 w-5 mx-2" />
            {isRTL ? "تنبيهات الشبكة" : "Network Alerts"}
          </h3>
          <div className="space-y-3 max-h-32 overflow-y-auto">
            {anomalies.slice(0, 2).map((anomaly, index) => (
              <div key={index} className={`flex items-start ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <div className={`w-2 h-2 mt-1.5 rounded-full ${anomaly.type === 'latency' ? 'bg-amber-500' : anomaly.type === 'download' ? 'bg-blue-500' : 'bg-green-500'} mx-2`} />
                <div>
                  <p className="text-sm font-medium">
                    {anomaly.type === 'latency' ? (isRTL ? 'ارتفاع في زمن الإستجابة' : 'High latency detected') : 
                     anomaly.type === 'download' ? (isRTL ? 'انخفاض في سرعة التنزيل' : 'Low download speed') : 
                     (isRTL ? 'انخفاض في سرعة الرفع' : 'Low upload speed')}
                  </p>
                  <p className="text-xs text-muted-foreground">
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
