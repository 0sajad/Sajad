
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Cpu, 
  HardDrive, 
  Thermometer, 
  Zap,
  Clock,
  AreaChart
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

// بيانات مراقبة أداء النظام
const performanceData = [
  { time: '00:00', cpu: 15, memory: 35, disk: 10 },
  { time: '02:00', cpu: 12, memory: 32, disk: 8 },
  { time: '04:00', cpu: 10, memory: 30, disk: 6 },
  { time: '06:00', cpu: 18, memory: 33, disk: 12 },
  { time: '08:00', cpu: 42, memory: 45, disk: 15 },
  { time: '10:00', cpu: 65, memory: 60, disk: 22 },
  { time: '12:00', cpu: 48, memory: 55, disk: 18 },
  { time: '14:00', cpu: 58, memory: 62, disk: 25 },
  { time: '16:00', cpu: 70, memory: 67, disk: 30 },
  { time: '18:00', cpu: 62, memory: 65, disk: 28 },
  { time: '20:00', cpu: 45, memory: 58, disk: 20 },
  { time: '22:00', cpu: 25, memory: 42, disk: 15 },
];

export const SystemMonitor = () => {
  const { t } = useTranslation();
  
  // الحصول على قيم حالية (آخر قيمة في البيانات)
  const currentValues = performanceData[performanceData.length - 1];
  
  // محاكاة درجة حرارة النظام (هذه بيانات وهمية)
  const cpuTemp = 48; // بالدرجة المئوية
  const systemUptime = "5 days, 12 hours";
  
  // تحديد لون المؤشر بناءً على القيمة
  const getIndicatorColor = (value: number) => {
    if (value < 50) return "text-green-500";
    if (value < 80) return "text-amber-500";
    return "text-red-500";
  };
  
  return (
    <Card className="border-octaBlue-200">
      <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg">
        <CardTitle className="text-lg flex items-center">
          <Cpu className="mr-2 h-5 w-5 text-octaBlue-600" />
          {t('dashboard.systemMonitor', 'مراقبة أداء النظام')}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-6">
          {/* مؤشرات النظام الحالية */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-3 border rounded-md transform hover:scale-105 transition-all hover:shadow-lg">
              <div className="flex items-center justify-center bg-blue-50 rounded-full p-3 mb-2">
                <Cpu className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-xs text-muted-foreground">{t('dashboard.cpuUsage', 'استخدام المعالج')}</span>
              <span className={`text-xl font-semibold ${getIndicatorColor(currentValues.cpu)}`}>
                {currentValues.cpu}%
              </span>
            </div>
            
            <div className="flex flex-col items-center p-3 border rounded-md transform hover:scale-105 transition-all hover:shadow-lg">
              <div className="flex items-center justify-center bg-purple-50 rounded-full p-3 mb-2">
                <HardDrive className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-xs text-muted-foreground">{t('dashboard.memoryUsage', 'استخدام الذاكرة')}</span>
              <span className={`text-xl font-semibold ${getIndicatorColor(currentValues.memory)}`}>
                {currentValues.memory}%
              </span>
            </div>
            
            <div className="flex flex-col items-center p-3 border rounded-md transform hover:scale-105 transition-all hover:shadow-lg">
              <div className="flex items-center justify-center bg-amber-50 rounded-full p-3 mb-2">
                <HardDrive className="h-5 w-5 text-amber-600" />
              </div>
              <span className="text-xs text-muted-foreground">{t('dashboard.diskUsage', 'استخدام القرص')}</span>
              <span className={`text-xl font-semibold ${getIndicatorColor(currentValues.disk)}`}>
                {currentValues.disk}%
              </span>
            </div>
            
            <div className="flex flex-col items-center p-3 border rounded-md transform hover:scale-105 transition-all hover:shadow-lg">
              <div className="flex items-center justify-center bg-red-50 rounded-full p-3 mb-2">
                <Thermometer className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-xs text-muted-foreground">{t('dashboard.cpuTemp', 'حرارة المعالج')}</span>
              <span className={`text-xl font-semibold ${getIndicatorColor(cpuTemp)}`}>
                {cpuTemp}°C
              </span>
            </div>
          </div>
          
          {/* رسم بياني لأداء النظام */}
          <div className="transform hover:scale-102 transition-transform">
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <AreaChart className="mr-1 h-4 w-4 text-blue-500" />
              {t('dashboard.systemPerformance', 'أداء النظام على مدار اليوم')}
            </h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="time" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '']}
                    labelFormatter={(label) => `${t('dashboard.time', 'الوقت')}: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="cpu" 
                    name={t('dashboard.cpu', 'المعالج')}
                    stroke="#3b82f6" 
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="memory" 
                    name={t('dashboard.memory', 'الذاكرة')}
                    stroke="#8b5cf6" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="disk" 
                    name={t('dashboard.disk', 'القرص')}
                    stroke="#f59e0b" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* معلومات إضافية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-md p-3 transform hover:scale-105 transition-all hover:shadow-lg">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Clock className="mr-1 h-4 w-4 text-green-500" />
                {t('dashboard.uptime', 'وقت التشغيل')}
              </h4>
              <div className="flex items-center">
                <span className="text-lg font-medium">{systemUptime}</span>
              </div>
            </div>
            
            <div className="border rounded-md p-3 transform hover:scale-105 transition-all hover:shadow-lg">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <Zap className="mr-1 h-4 w-4 text-amber-500" />
                {t('dashboard.powerStatus', 'حالة الطاقة')}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>{t('dashboard.powerMode', 'وضع الطاقة')}:</span>
                  <span className="font-medium text-green-600">{t('dashboard.performance', 'أداء')}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>{t('dashboard.batteryStatus', 'حالة البطارية')}:</span>
                  <span className="font-medium">85%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
