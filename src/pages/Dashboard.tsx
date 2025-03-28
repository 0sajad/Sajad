
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemStatusPanel } from "@/components/dashboard/SystemStatusPanel";
import { NetworkQualityIndicator } from "@/components/dashboard/NetworkQualityIndicator";
import { RealtimeNetworkMonitor } from "@/components/dashboard/RealtimeNetworkMonitor";
import { SystemPerformanceMonitor } from "@/components/analytics/SystemPerformanceMonitor";
import { RealTimeMonitoring } from "@/components/analytics/RealTimeMonitoring";
import { NetworkQualityGauge } from "@/components/analytics/NetworkQualityGauge";
import { Button } from "@/components/ui/button";
import { Cpu, Network, Shield } from "lucide-react";
import Layout from "@/components/layout/Layout";

export default function Dashboard() {
  const { t, i18n } = useTranslation("dashboard");
  const direction = i18n.dir();
  const isRTL = direction === "rtl";

  return (
    <Layout>
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Latest Updates Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center justify-between">
                {isRTL ? "آخر التحديثات" : "Latest Updates"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                  <span className="text-sm text-blue-600">{isRTL ? "تحديث أمني متاح" : "Security update available"}</span>
                  <Badge variant="outline" className="bg-blue-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1"></span>
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
                  <span className="text-sm text-green-600">{isRTL ? "تم تحسين الأداء" : "Performance optimized"}</span>
                  <Badge variant="outline" className="bg-green-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">{isRTL ? "إجراءات سريعة" : "Quick Actions"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <select className="w-full p-2 border rounded mb-2">
                  <option value="">{isRTL ? "اختر إجراء" : "Select action"}</option>
                  <option value="scan">{isRTL ? "فحص الشبكة" : "Scan Network"}</option>
                  <option value="optimize">{isRTL ? "تحسين الأداء" : "Optimize Performance"}</option>
                  <option value="backup">{isRTL ? "نسخ احتياطي" : "Backup"}</option>
                </select>
                <div className="flex justify-between">
                  <span className="px-4 py-2 text-center">{isRTL ? "جدولة" : "Schedule"}</span>
                  <Button className="px-4 py-2 bg-primary text-white rounded">
                    {isRTL ? "تنفيذ" : "Execute"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center justify-between">
                {isRTL ? "حالة النظام" : "System Status"}
                <Badge variant="default" className="bg-green-500 hover:bg-green-600">{isRTL ? "نشط" : "Active"}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{isRTL ? "الحالة" : "Status"}:</span>
                  <span className="font-semibold">{isRTL ? "نشط" : "Active"}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isRTL ? "آخر فحص" : "Last Check"}:</span>
                  <span className="font-semibold">
                    {isRTL ? "منذ 2 دقائق" : "2 minutes ago"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{isRTL ? "مستوى الاستقرار" : "Uptime"}:</span>
                  <span className="font-semibold">99.9%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Network Quality Indicator */}
          <Card className="md:row-span-2">
            <CardHeader className="pb-2 bg-blue-50/50">
              <CardTitle className="text-lg font-medium flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {isRTL ? "مراقبة الشبكة في الوقت الفعلي" : "Real-time Network Monitoring"}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {isRTL ? "قياس سرعة ومستوى أداء الشبكة بشكل مباشر" : "Measure network speed and performance in real-time"}
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <RealTimeMonitoring />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2 bg-green-50/50">
              <CardTitle className="text-lg font-medium flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {isRTL ? "مؤشر جودة الشبكة" : "Network Quality Indicator"}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {isRTL ? "تحليل مفصل لجودة وأداء الشبكة الحالية" : "Detailed analysis of current network quality and performance"}
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <NetworkQualityGauge 
                qualityScore={87} 
                latency={24} 
                packetLoss={0.5} 
                jitter={1.2}
              />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="system" className="mb-6">
          <TabsList className="mb-4 grid grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="system" className="flex items-center gap-1">
              <Cpu size={14} />
              <span>{isRTL ? "النظام" : "System"}</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="flex items-center gap-1">
              <Network size={14} />
              <span>{isRTL ? "الأجهزة" : "Devices"}</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1">
              <Shield size={14} />
              <span>{isRTL ? "الأمان" : "Security"}</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="system">
            <SystemPerformanceMonitor />
          </TabsContent>
          
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? "إدارة الأجهزة" : "Device Management"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 text-muted-foreground">
                  {isRTL ? "معلومات الأجهزة ستظهر هنا" : "Device information will be displayed here"}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? "لوحة الأمان" : "Security Dashboard"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 text-muted-foreground">
                  {isRTL ? "معلومات الأمان ستظهر هنا" : "Security information will be displayed here"}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
