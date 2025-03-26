
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ComposedChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Shield, Zap, Activity, TrendingUp, Globe, Wifi, Signal, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// بيانات مصطنعة لأغراض العرض
const generateTrafficData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    inbound: Math.floor(Math.random() * 100) + 50,
    outbound: Math.floor(Math.random() * 80) + 20,
    latency: Math.floor(Math.random() * 30),
  }));
};

const generateDeviceData = () => {
  return [
    { name: "الهواتف الذكية", value: 35 },
    { name: "أجهزة الكمبيوتر", value: 25 },
    { name: "أجهزة لوحية", value: 20 },
    { name: "أجهزة ذكية", value: 15 },
    { name: "أخرى", value: 5 },
  ];
};

const generateBandwidthData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    day: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"][i],
    download: Math.floor(Math.random() * 150) + 100,
    upload: Math.floor(Math.random() * 50) + 30,
  }));
};

const generateSecurityData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    threats: Math.floor(Math.random() * 10),
    blocked: Math.floor(Math.random() * 20) + 10,
  }));
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export const AdvancedNetworkAnalytics = () => {
  const { t } = useTranslation();
  const [trafficData, setTrafficData] = useState(generateTrafficData);
  const [deviceData, setDeviceData] = useState(generateDeviceData);
  const [bandwidthData, setBandwidthData] = useState(generateBandwidthData);
  const [securityData, setSecurityData] = useState(generateSecurityData);
  const [activeTab, setActiveTab] = useState("traffic");
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setTrafficData(generateTrafficData());
      setDeviceData(generateDeviceData());
      setBandwidthData(generateBandwidthData());
      setSecurityData(generateSecurityData());
      setIsLoading(false);
    }, 800);
  };

  // تحميل البيانات الأولية
  useEffect(() => {
    refreshData();
  }, []);

  return (
    <Card className="border-octaBlue-200 shadow-md animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-octaBlue-800 mb-1 font-tajawal">
              أدوات تحليل الشبكة المتقدمة
            </CardTitle>
            <p className="text-sm text-muted-foreground font-tajawal">
              مراقبة وتحليل وتحسين أداء الشبكة في الوقت الفعلي
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshData} 
            disabled={isLoading}
            className="font-tajawal flex items-center gap-1"
          >
            <RefreshCw size={14} className={cn("mr-1", isLoading && "animate-spin")} />
            تحديث البيانات
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="traffic" className="font-tajawal">
              <Activity size={14} className="mr-1" />
              حركة المرور
            </TabsTrigger>
            <TabsTrigger value="devices" className="font-tajawal">
              <Wifi size={14} className="mr-1" />
              الأجهزة المتصلة
            </TabsTrigger>
            <TabsTrigger value="bandwidth" className="font-tajawal">
              <TrendingUp size={14} className="mr-1" />
              استخدام النطاق الترددي
            </TabsTrigger>
            <TabsTrigger value="security" className="font-tajawal">
              <Shield size={14} className="mr-1" />
              حالة الأمان
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="traffic" className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-4 font-tajawal">تحليل حركة مرور الشبكة</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={trafficData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 border rounded shadow-sm">
                            <p className="font-bold">{label}</p>
                            <p className="text-blue-600">{`الوارد: ${payload[0].value} Mbps`}</p>
                            <p className="text-green-600">{`الصادر: ${payload[1].value} Mbps`}</p>
                            <p className="text-red-600">{`زمن الإستجابة: ${payload[2].value} ms`}</p>
                          </div>
                        );
                      }
                      return null;
                    }} />
                    <Legend />
                    <Area type="monotone" dataKey="inbound" fill="#8884d8" stroke="#8884d8" name="الوارد" />
                    <Area type="monotone" dataKey="outbound" fill="#82ca9d" stroke="#82ca9d" name="الصادر" />
                    <Line type="monotone" dataKey="latency" stroke="#ff7300" name="زمن الإستجابة" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1 font-tajawal">متوسط الوارد</p>
                  <p className="text-xl font-bold">76.4 Mbps</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1 font-tajawal">متوسط الصادر</p>
                  <p className="text-xl font-bold">42.1 Mbps</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1 font-tajawal">متوسط زمن الإستجابة</p>
                  <p className="text-xl font-bold">18 ms</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="devices" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-4 font-tajawal">توزيع الأجهزة المتصلة</h3>
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-4 font-tajawal">تفاصيل الأجهزة النشطة</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-tajawal">الهواتف الذكية (8 أجهزة)</span>
                      <span className="text-xs text-muted-foreground">35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-tajawal">أجهزة الكمبيوتر (5 أجهزة)</span>
                      <span className="text-xs text-muted-foreground">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-tajawal">أجهزة لوحية (4 أجهزة)</span>
                      <span className="text-xs text-muted-foreground">20%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-tajawal">أجهزة ذكية (3 أجهزة)</span>
                      <span className="text-xs text-muted-foreground">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-tajawal">أخرى (1 جهاز)</span>
                      <span className="text-xs text-muted-foreground">5%</span>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </div>
                
                <div className="mt-6 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm font-tajawal">إجمالي الأجهزة النشطة: <span className="font-bold">21</span></p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bandwidth" className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-4 font-tajawal">استخدام النطاق الترددي الأسبوعي</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bandwidthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="download" name="تنزيل" fill="#3b82f6" />
                    <Bar dataKey="upload" name="رفع" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1 font-tajawal">إجمالي التنزيل</p>
                  <p className="text-xl font-bold">12.4 GB</p>
                  <p className="text-xs text-muted-foreground font-tajawal">متوسط يومي: 1.8 GB</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1 font-tajawal">إجمالي الرفع</p>
                  <p className="text-xl font-bold">3.2 GB</p>
                  <p className="text-xs text-muted-foreground font-tajawal">متوسط يومي: 0.45 GB</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium mb-4 font-tajawal">إحصائيات أمان الشبكة (آخر 30 يوم)</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={securityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="threats" name="تهديدات مكتشفة" stroke="#ef4444" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="blocked" name="محاولات محظورة" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1 font-tajawal">إجمالي التهديدات</p>
                  <p className="text-xl font-bold">124</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1 font-tajawal">محاولات محظورة</p>
                  <p className="text-xl font-bold">487</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1 font-tajawal">الحالة العامة</p>
                  <p className="text-xl font-bold font-tajawal">آمنة</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
