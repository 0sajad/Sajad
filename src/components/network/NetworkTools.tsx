
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMode } from "@/context/ModeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Wifi, 
  Signal, 
  RefreshCw, 
  BarChart3, 
  Zap, 
  ShieldCheck, 
  Radar, 
  Network, 
  Radio, 
  Laptop 
} from "lucide-react";

export type NetworkTool = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'diagnostic' | 'security' | 'optimization' | 'monitoring';
  isActive: boolean;
  isPremium: boolean;
  isDeveloperOnly?: boolean;
};

// قائمة الأدوات
const allNetworkTools: NetworkTool[] = [
  {
    id: "wifi-analyzer",
    name: "WiFi Analyzer",
    description: "Analyze WiFi signals and channels to optimize wireless networks",
    icon: Wifi,
    category: "diagnostic",
    isActive: true,
    isPremium: false
  },
  {
    id: "packet-sniffer",
    name: "Packet Sniffer",
    description: "Capture and analyze network packets for troubleshooting",
    icon: Radar,
    category: "diagnostic",
    isActive: true,
    isPremium: true
  },
  {
    id: "network-scanner",
    name: "Network Scanner",
    description: "Discover and map all devices on your network",
    icon: Network,
    category: "monitoring",
    isActive: true,
    isPremium: false
  },
  {
    id: "speed-test",
    name: "Speed Test",
    description: "Measure download, upload speeds and latency",
    icon: Zap,
    category: "diagnostic",
    isActive: true,
    isPremium: false
  },
  {
    id: "port-scanner",
    name: "Port Scanner",
    description: "Scan for open ports on network devices",
    icon: BarChart3,
    category: "security",
    isActive: true,
    isPremium: false
  },
  {
    id: "traffic-monitor",
    name: "Traffic Monitor",
    description: "Real-time monitoring of network traffic and bandwidth usage",
    icon: Signal,
    category: "monitoring",
    isActive: true,
    isPremium: false
  },
  {
    id: "dns-lookup",
    name: "DNS Lookup",
    description: "Query DNS records and troubleshoot domain issues",
    icon: RefreshCw,
    category: "diagnostic",
    isActive: true,
    isPremium: false
  },
  {
    id: "security-scanner",
    name: "Security Scanner",
    description: "Scan for vulnerabilities in your network",
    icon: ShieldCheck,
    category: "security",
    isActive: true,
    isPremium: true
  },
  {
    id: "signal-mapper",
    name: "Signal Mapper",
    description: "Create a map of WiFi signal strength in different areas",
    icon: Radio,
    category: "optimization",
    isActive: true,
    isPremium: true
  },
  {
    id: "device-monitor",
    name: "Device Monitor",
    description: "Monitor connected devices and their network activity",
    icon: Laptop,
    category: "monitoring",
    isActive: true,
    isPremium: false
  }
];

export function NetworkTools() {
  const { t } = useTranslation();
  const { isDeveloperMode, features } = useMode();
  const [tools, setTools] = useState<NetworkTool[]>(allNetworkTools);
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // تصفية الأدوات بناءً على علامة التبويب المختارة
  const filteredTools = activeTab === "all" 
    ? tools 
    : tools.filter(tool => tool.category === activeTab);
  
  // أدوات مخصصة لوضع المطور فقط
  const developerTools = tools.filter(tool => tool.isDeveloperOnly);
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Network Tools</CardTitle>
        <CardDescription>
          Professional tools for network diagnostics, monitoring, and optimization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all">All Tools</TabsTrigger>
            <TabsTrigger value="diagnostic">Diagnostic</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => (
              <Card key={tool.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2 flex flex-row items-start space-y-0 gap-2">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <tool.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      {tool.name}
                      {tool.isPremium && (
                        <Badge variant="secondary" className="text-xs">Premium</Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {tool.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="mt-2 space-y-2">
                    <Progress value={75} className="h-1" />
                    <div className="flex justify-between items-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs h-7"
                      >
                        Launch
                      </Button>
                      <span className="text-xs text-muted-foreground">Ready</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs>
        
        {/* عناصر التحكم في وضع المطور فقط */}
        {isDeveloperMode && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Developer Controls</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Add New Tool</Button>
              <Button variant="outline" size="sm">Configure Tools</Button>
              <Button variant="outline" size="sm">Export Tool Data</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
