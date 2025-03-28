
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemStatusPanel } from "@/components/dashboard/SystemStatusPanel";
import { NetworkQualityIndicator } from "@/components/dashboard/NetworkQualityIndicator";
import { RealtimeNetworkMonitor } from "@/components/dashboard/RealtimeNetworkMonitor";
import { useMode } from "@/context/ModeContext";
import Layout from "@/components/layout/Layout";

export default function Dashboard() {
  const { t, i18n } = useTranslation("dashboard");
  const { features } = useMode();
  const direction = i18n.dir();

  return (
    <Layout>
      <div className="container mx-auto p-4 max-w-7xl">
        <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
        
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{t("welcome")}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center justify-between">
                {t("systemStatus")}
                <Badge variant="default" className="bg-green-500 hover:bg-green-600">{t("active")}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SystemStatusPanel />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">{t("quickActions")}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Quick actions content */}
              <div className="space-y-2">
                <select className="w-full p-2 border rounded mb-2">
                  <option value="">{t("selectAction")}</option>
                  <option value="scan">{t("actions.scan")}</option>
                  <option value="optimize">{t("actions.optimize")}</option>
                  <option value="backup">{t("actions.backup")}</option>
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-4 py-2 bg-muted text-center rounded">
                    {t("actions.scan")}
                  </button>
                  <button className="px-4 py-2 bg-muted text-center rounded">
                    {t("actions.optimize")}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">{t("latestUpdates")}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t("noUpdates")}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">{t("statistics")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="network" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="network">{t("networkQuality")}</TabsTrigger>
                  <TabsTrigger value="devices">{t("deviceStatus")}</TabsTrigger>
                  <TabsTrigger value="security">{t("securityStatus")}</TabsTrigger>
                </TabsList>
                <TabsContent value="network">
                  <NetworkQualityIndicator />
                </TabsContent>
                <TabsContent value="devices">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>{t("connectedDevices")}</span>
                      <span className="font-semibold">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t("disconnectedDevices")}</span>
                      <span className="font-semibold">2</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="security">
                  {/* Security content */}
                  <p className="text-muted-foreground">{t("trafficAnalysis")}</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">{t("performanceMetrics")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("downloadSpeed")}</span>
                    <span className="font-semibold">95 Mbps</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("uploadSpeed")}</span>
                    <span className="font-semibold">65 Mbps</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("latency")}</span>
                    <span className="font-semibold">21 ms</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-full rounded-full" style={{ width: "30%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">{t("systemResources")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("cpuUsage")}</span>
                    <span className="font-semibold">32%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: "32%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("memoryUsage")}</span>
                    <span className="font-semibold">45%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t("storageUsage")}</span>
                    <span className="font-semibold">28%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: "28%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <RealtimeNetworkMonitor />
        </div>
      </div>
    </Layout>
  );
}
