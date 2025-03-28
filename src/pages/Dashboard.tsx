
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Cpu, Network, Shield, RefreshCw } from "lucide-react";
import { SystemPerformanceMonitor } from "@/components/analytics/SystemPerformanceMonitor";
import { RealTimeMonitoring } from "@/components/analytics/RealTimeMonitoring";
import { NetworkQualityGauge } from "@/components/analytics/NetworkQualityGauge";
import Layout from "@/components/layout/Layout";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  return (
    <Layout>
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Latest Updates Card */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex justify-between items-center">
                <span>{isRTL ? "آخر التحديثات" : "Latest Updates"}</span>
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 0.875C7.5 0.875 7.5 0.875 7.5 0.875C3.83152 0.875 0.875 3.83152 0.875 7.5C0.875 11.1685 3.83152 14.125 7.5 14.125C11.1685 14.125 14.125 11.1685 14.125 7.5C14.125 3.83152 11.1685 0.875 7.5 0.875Z" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M7.5 3.625V7.5L10.0625 10.0625" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                  <span className="text-sm text-blue-600">{isRTL ? "تحديث أمني متاح" : "Security update available"}</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-md">
                  <span className="text-sm text-green-600">{isRTL ? "تم تحسين الأداء" : "Performance optimized"}</span>
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex justify-between items-center">
                <span>{isRTL ? "إجراءات سريعة" : "Quick Actions"}</span>
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM7.50003 4C7.77617 4 8.00003 4.22386 8.00003 4.5V7H10.5C10.7762 7 11 7.22386 11 7.5C11 7.77614 10.7762 8 10.5 8H7.50003C7.22389 8 7.00003 7.77614 7.00003 7.5V4.5C7.00003 4.22386 7.22389 4 7.50003 4Z" fill="#3b82f6" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </CardTitle>
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
                  <Button variant="outline" className="px-4 py-2 w-[48%]">
                    {isRTL ? "جدولة" : "Schedule"}
                  </Button>
                  <Button className="px-4 py-2 bg-primary text-white w-[48%]">
                    {isRTL ? "تنفيذ" : "Execute"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status Card */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex justify-between items-center">
                <span>{isRTL ? "حالة النظام" : "System Status"}</span>
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 1C2.44772 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H12C12.5523 14 13 13.5523 13 13V2C13 1.44772 12.5523 1 12 1H3ZM3 2H12V13H3V2ZM5 10.5C5 10.2239 5.22386 10 5.5 10H9.5C9.77614 10 10 10.2239 10 10.5C10 10.7761 9.77614 11 9.5 11H5.5C5.22386 11 5 10.7761 5 10.5ZM5.5 7C5.22386 7 5 7.22386 5 7.5C5 7.77614 5.22386 8 5.5 8H9.5C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7H5.5ZM5 4.5C5 4.22386 5.22386 4 5.5 4H9.5C9.77614 4 10 4.22386 10 4.5C10 4.77614 9.77614 5 9.5 5H5.5C5.22386 5 5 4.77614 5 4.5Z" fill="#22c55e" fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{isRTL ? "الحالة" : "Status"}:</span>
                  <Badge className="bg-green-500">{isRTL ? "نشط" : "Active"}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{isRTL ? "آخر فحص" : "Last Check"}:</span>
                  <span className="text-sm font-medium">
                    {isRTL ? "منذ 2 دقائق" : "2 minutes ago"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">{isRTL ? "مستوى الاستقرار" : "Uptime"}:</span>
                  <span className="text-sm font-medium">99.9%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Real-time Network Monitoring */}
          <Card className="md:col-span-1 overflow-hidden">
            <CardContent className="p-4">
              <RealTimeMonitoring />
            </CardContent>
          </Card>

          {/* Network Quality Gauge */}
          <Card className="md:col-span-1 overflow-hidden">
            <CardContent className="p-4">
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
