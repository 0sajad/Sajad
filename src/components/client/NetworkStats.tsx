
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend
} from "recharts";
import { Wifi, Activity, Database, Upload, Download } from "lucide-react";

// بيانات وهمية لمحاكاة استخدام الشبكة
const networkUsageData = [
  { time: '00:00', download: 2, upload: 1 },
  { time: '02:00', download: 1, upload: 0.5 },
  { time: '04:00', download: 0.5, upload: 0.2 },
  { time: '06:00', download: 1, upload: 0.5 },
  { time: '08:00', download: 5, upload: 2 },
  { time: '10:00', download: 12, upload: 4 },
  { time: '12:00', download: 8, upload: 3 },
  { time: '14:00', download: 10, upload: 3.5 },
  { time: '16:00', download: 14, upload: 5 },
  { time: '18:00', download: 16, upload: 6 },
  { time: '20:00', download: 12, upload: 4 },
  { time: '22:00', download: 5, upload: 2 },
];

// بيانات وهمية لأنواع الحركة
const trafficTypeData = [
  { name: 'Web', value: 40 },
  { name: 'Video', value: 30 },
  { name: 'Social', value: 15 },
  { name: 'Email', value: 5 },
  { name: 'Gaming', value: 10 }
];

// ألوان للرسم البياني
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a569bd'];

export const NetworkStats = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="border-octaBlue-200">
      <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg">
        <CardTitle className="text-lg flex items-center">
          <Activity className="mr-2 h-5 w-5 text-octaBlue-600" />
          {t('dashboard.networkStats', 'إحصائيات الشبكة')}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-6">
          {/* مخطط استخدام الشبكة */}
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Database className="mr-1 h-4 w-4 text-blue-500" />
              {t('dashboard.networkUsage', 'استخدام الشبكة')}
            </h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={networkUsageData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="time" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip 
                    formatter={(value) => [`${value} GB`, '']}
                    labelFormatter={(label) => `${t('dashboard.time', 'الوقت')}: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="download" 
                    name={t('dashboard.download', 'تنزيل')}
                    stackId="1"
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="upload" 
                    name={t('dashboard.upload', 'رفع')}
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* توزيع أنواع الحركة */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Wifi className="mr-1 h-4 w-4 text-purple-500" />
                {t('dashboard.trafficTypes', 'أنواع حركة البيانات')}
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {trafficTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Activity className="mr-1 h-4 w-4 text-amber-500" />
                {t('dashboard.currentActivity', 'النشاط الحالي')}
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Download className="mr-1 h-4 w-4 text-blue-500" />
                      {t('dashboard.downloadSpeed', 'سرعة التنزيل')}
                    </div>
                    <span>18.5 Mbps</span>
                  </div>
                  <Progress value={68} className="h-2 bg-blue-100" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Upload className="mr-1 h-4 w-4 text-green-500" />
                      {t('dashboard.uploadSpeed', 'سرعة الرفع')}
                    </div>
                    <span>5.2 Mbps</span>
                  </div>
                  <Progress value={42} className="h-2 bg-green-100" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Activity className="mr-1 h-4 w-4 text-purple-500" />
                      {t('dashboard.latency', 'زمن الاستجابة')}
                    </div>
                    <span>28 ms</span>
                  </div>
                  <Progress value={25} className="h-2 bg-purple-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
