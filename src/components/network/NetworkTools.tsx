
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useMode } from "@/context/ModeContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAIToolkit } from "@/hooks/useAIToolkit";
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
  Laptop,
  Rss,
  Cpu,
  Server,
  Globe,
  Cloud,
  Lock,
  Search,
  Router,
  Smartphone,
  Monitor,
  Database,
  GitBranch,
  FileText,
  Share2,
  Link,
  Waves,
  ArrowDownUp,
  Activity,
  Plus,
  Trash2,
  Save,
  Download,
  DownloadCloud,
  Settings,
  AlertCircle
} from "lucide-react";

export type NetworkTool = {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'diagnostic' | 'security' | 'optimization' | 'monitoring' | 'communication' | 'analysis' | 'management';
  isActive: boolean;
  isPremium: boolean;
  isDeveloperOnly?: boolean;
  status?: 'ready' | 'updating' | 'maintenance' | 'error';
  progressValue?: number;
  isNew?: boolean;
};

// 40 أداة مفيدة تُستخدم في عالم الاتصالات
const allNetworkTools: NetworkTool[] = [
  // الأدوات الأصلية
  {
    id: "wifi-analyzer",
    name: "WiFi Analyzer",
    description: "Analyze WiFi signals and channels to optimize wireless networks",
    icon: Wifi,
    category: "diagnostic",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100
  },
  {
    id: "packet-sniffer",
    name: "Packet Sniffer",
    description: "Capture and analyze network packets for troubleshooting",
    icon: Radar,
    category: "diagnostic",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100
  },
  {
    id: "network-scanner",
    name: "Network Scanner",
    description: "Discover and map all devices on your network",
    icon: Network,
    category: "monitoring",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100
  },
  {
    id: "speed-test",
    name: "Speed Test",
    description: "Measure download, upload speeds and latency",
    icon: Zap,
    category: "diagnostic",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100
  },
  {
    id: "port-scanner",
    name: "Port Scanner",
    description: "Scan for open ports on network devices",
    icon: BarChart3,
    category: "security",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100
  },
  {
    id: "traffic-monitor",
    name: "Traffic Monitor",
    description: "Real-time monitoring of network traffic and bandwidth usage",
    icon: Signal,
    category: "monitoring",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100
  },
  {
    id: "dns-lookup",
    name: "DNS Lookup",
    description: "Query DNS records and troubleshoot domain issues",
    icon: RefreshCw,
    category: "diagnostic",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100
  },
  {
    id: "security-scanner",
    name: "Security Scanner",
    description: "Scan for vulnerabilities in your network",
    icon: ShieldCheck,
    category: "security",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100
  },
  {
    id: "signal-mapper",
    name: "Signal Mapper",
    description: "Create a map of WiFi signal strength in different areas",
    icon: Radio,
    category: "optimization",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100
  },
  {
    id: "device-monitor",
    name: "Device Monitor",
    description: "Monitor connected devices and their network activity",
    icon: Laptop,
    category: "monitoring",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100
  },
  // أدوات إضافية جديدة
  {
    id: "bandwidth-manager",
    name: "Bandwidth Manager",
    description: "Control and prioritize network bandwidth allocation",
    icon: ArrowDownUp,
    category: "optimization",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100
  },
  {
    id: "network-topology",
    name: "Network Topology",
    description: "Visualize and map your entire network structure",
    icon: GitBranch,
    category: "analysis",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100
  },
  {
    id: "protocol-analyzer",
    name: "Protocol Analyzer",
    description: "Deep analysis of network protocols and traffic patterns",
    icon: Activity,
    category: "analysis",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100
  },
  {
    id: "vpn-manager",
    name: "VPN Manager",
    description: "Set up and manage virtual private networks",
    icon: Lock,
    category: "security",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100
  },
  {
    id: "ip-tracker",
    name: "IP Tracker",
    description: "Track and analyze IP addresses and their origins",
    icon: Search,
    category: "monitoring",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100
  },
  {
    id: "router-configuration",
    name: "Router Configuration",
    description: "Advanced configuration tool for network routers",
    icon: Router,
    category: "management",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100
  },
  {
    id: "firewall-manager",
    name: "Firewall Manager",
    description: "Configure and manage network firewall settings",
    icon: Shield,
    category: "security",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100
  },
  {
    id: "traffic-shaper",
    name: "Traffic Shaper",
    description: "Shape and prioritize network traffic based on rules",
    icon: Waves,
    category: "optimization",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100
  },
  {
    id: "connectivity-tester",
    name: "Connectivity Tester",
    description: "Test network connectivity and diagnose issues",
    icon: Link,
    category: "diagnostic",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100
  },
  {
    id: "wireless-optimizer",
    name: "Wireless Optimizer",
    description: "Optimize wireless network settings for peak performance",
    icon: Rss,
    category: "optimization",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100
  },
  {
    id: "network-load-balancer",
    name: "Network Load Balancer",
    description: "Distribute network traffic across multiple servers",
    icon: Share2,
    category: "optimization",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100
  },
  {
    id: "qos-manager",
    name: "QoS Manager",
    description: "Set up and manage Quality of Service for prioritizing traffic",
    icon: BarChart3,
    category: "optimization",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100
  },
  {
    id: "cloud-network-connector",
    name: "Cloud Network Connector",
    description: "Connect and manage hybrid cloud network infrastructure",
    icon: Cloud,
    category: "management",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100
  },
  {
    id: "network-automation",
    name: "Network Automation",
    description: "Automate network tasks and management processes",
    icon: RefreshCw,
    category: "management",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100
  },
  {
    id: "mobile-network-analyzer",
    name: "Mobile Network Analyzer",
    description: "Analyze cellular and mobile network performance",
    icon: Smartphone,
    category: "diagnostic",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100
  },
  {
    id: "network-logger",
    name: "Network Logger",
    description: "Log and record all network activities for later analysis",
    icon: FileText,
    category: "monitoring",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100
  },
  {
    id: "server-monitor",
    name: "Server Monitor",
    description: "Monitor server performance and health metrics",
    icon: Server,
    category: "monitoring",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100
  },
  {
    id: "remote-access-manager",
    name: "Remote Access Manager",
    description: "Manage remote access to network resources",
    icon: Monitor,
    category: "management",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100
  },
  {
    id: "database-monitor",
    name: "Database Monitor",
    description: "Monitor and optimize database connections and performance",
    icon: Database,
    category: "monitoring",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100
  },
  {
    id: "internet-failover",
    name: "Internet Failover",
    description: "Configure backup internet connections for reliability",
    icon: Globe,
    category: "optimization",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100
  },
  {
    id: "system-performance",
    name: "System Performance Analyzer",
    description: "Analyze system performance in relation to network usage",
    icon: Cpu,
    category: "analysis",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100,
    isNew: true
  },
  {
    id: "intrusion-detection",
    name: "Intrusion Detection System",
    description: "Detect and alert about unauthorized network access",
    icon: AlertCircle,
    category: "security",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100,
    isNew: true
  },
  {
    id: "malware-scanner",
    name: "Network Malware Scanner",
    description: "Scan network traffic for malware and threats",
    icon: ShieldCheck,
    category: "security",
    isActive: true,
    isPremium: true,
    status: "ready",
    progressValue: 100,
    isNew: true
  },
  {
    id: "network-backup",
    name: "Network Configuration Backup",
    description: "Back up network device configurations",
    icon: DownloadCloud,
    category: "management",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100,
    isNew: true
  },
  {
    id: "bandwidth-monitor",
    name: "Bandwidth Monitor",
    description: "Monitor bandwidth usage across your network",
    icon: Download,
    category: "monitoring",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100,
    isNew: true
  },
  {
    id: "network-scheduler",
    name: "Network Task Scheduler",
    description: "Schedule automated network maintenance tasks",
    icon: Settings,
    category: "management",
    isActive: true,
    isPremium: false,
    status: "updating",
    progressValue: 75,
    isNew: true
  },
  {
    id: "packet-capture",
    name: "Packet Capture Tool",
    description: "Advanced packet capture for deep network analysis",
    icon: Radar,
    category: "analysis",
    isActive: true,
    isPremium: true,
    status: "maintenance",
    progressValue: 60,
    isNew: true
  },
  {
    id: "network-policy-manager",
    name: "Network Policy Manager",
    description: "Create and enforce network access policies",
    icon: FileText,
    category: "management",
    isActive: true,
    isPremium: true,
    status: "error",
    progressValue: 30,
    isNew: true
  },
  {
    id: "routing-optimizer",
    name: "Routing Optimizer",
    description: "Optimize network routing for improved performance",
    icon: GitBranch,
    category: "optimization",
    isActive: true,
    isPremium: true,
    status: "updating",
    progressValue: 45,
    isNew: true
  },
  {
    id: "network-inventory",
    name: "Network Inventory Manager",
    description: "Track and manage all network assets and devices",
    icon: Laptop,
    category: "management",
    isActive: true,
    isPremium: false,
    status: "ready",
    progressValue: 100,
    isNew: true
  }
];

const Shield = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

export function NetworkTools() {
  const { t } = useTranslation();
  const { isDeveloperMode, features } = useMode();
  const [tools, setTools] = useState<NetworkTool[]>(allNetworkTools);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newToolDialogOpen, setNewToolDialogOpen] = useState(false);
  const [newToolData, setNewToolData] = useState({
    name: "",
    description: "",
    category: "diagnostic",
    isPremium: false
  });
  const { isGenerating, generateToolIdea } = useAIToolkit();
  
  // تصفية الأدوات بناءً على علامة التبويب المختارة والبحث
  const filteredTools = tools
    .filter(tool => {
      if (searchQuery) {
        return (
          tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    })
    .filter(tool => {
      if (activeTab === "all") return true;
      return tool.category === activeTab;
    });
  
  // مسح أداة
  const deleteTool = (id: string) => {
    setTools(prevTools => prevTools.filter(tool => tool.id !== id));
  };
  
  // إضافة أداة جديدة
  const addNewTool = () => {
    const newTool: NetworkTool = {
      id: `tool-${Date.now()}`,
      name: newToolData.name,
      description: newToolData.description,
      icon: getIconForCategory(newToolData.category),
      category: newToolData.category as any,
      isActive: true,
      isPremium: newToolData.isPremium,
      status: "ready",
      progressValue: 100,
      isNew: true
    };
    
    setTools(prevTools => [...prevTools, newTool]);
    setNewToolDialogOpen(false);
    setNewToolData({
      name: "",
      description: "",
      category: "diagnostic",
      isPremium: false
    });
  };
  
  // الحصول على أيقونة مناسبة للفئة
  const getIconForCategory = (category: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      diagnostic: Search,
      security: ShieldCheck,
      optimization: Zap,
      monitoring: Activity,
      communication: Rss,
      analysis: BarChart3,
      management: Settings
    };
    
    return iconMap[category] || Activity;
  };
  
  // توليد فكرة أداة باستخدام الذكاء الاصطناعي
  const generateAITool = async () => {
    const idea = await generateToolIdea();
    
    setNewToolData({
      name: idea.name,
      description: idea.description,
      category: idea.category,
      isPremium: Math.random() > 0.5 // عشوائي للتجربة
    });
  };
  
  // الحصول على لون حالة الأداة
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "ready": return "bg-green-500";
      case "updating": return "bg-blue-500";
      case "maintenance": return "bg-yellow-500";
      case "error": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Network Tools</CardTitle>
            <CardDescription>
              Professional tools for network diagnostics, monitoring, and optimization
            </CardDescription>
          </div>
          {isDeveloperMode && (
            <Dialog open={newToolDialogOpen} onOpenChange={setNewToolDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs h-8">
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add Tool
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Network Tool</DialogTitle>
                  <DialogDescription>
                    Create a new tool or let AI suggest one for you.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name">Tool Name</label>
                    <Input
                      id="name"
                      value={newToolData.name}
                      onChange={(e) => setNewToolData({...newToolData, name: e.target.value})}
                      placeholder="Enter tool name"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="description">Description</label>
                    <Input
                      id="description"
                      value={newToolData.description}
                      onChange={(e) => setNewToolData({...newToolData, description: e.target.value})}
                      placeholder="Enter tool description"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label htmlFor="category">Category</label>
                    <Select 
                      value={newToolData.category}
                      onValueChange={(value) => setNewToolData({...newToolData, category: value})}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diagnostic">Diagnostic</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="optimization">Optimization</SelectItem>
                        <SelectItem value="monitoring">Monitoring</SelectItem>
                        <SelectItem value="communication">Communication</SelectItem>
                        <SelectItem value="analysis">Analysis</SelectItem>
                        <SelectItem value="management">Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label htmlFor="isPremium">Premium Tool</label>
                    <input
                      id="isPremium"
                      type="checkbox"
                      checked={newToolData.isPremium}
                      onChange={(e) => setNewToolData({...newToolData, isPremium: e.target.checked})}
                    />
                  </div>
                </div>
                
                <DialogFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={generateAITool}
                    disabled={isGenerating}
                  >
                    {isGenerating ? "Generating..." : "Generate with AI"}
                  </Button>
                  <Button onClick={addNewTool} disabled={!newToolData.name || !newToolData.description}>
                    Add Tool
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        <div className="pt-4">
          <Input
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <ScrollArea className="h-12">
            <TabsList className="inline-flex w-auto">
              <TabsTrigger value="all">All Tools</TabsTrigger>
              <TabsTrigger value="diagnostic">Diagnostic</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="optimization">Optimization</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="management">Management</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
            </TabsList>
          </ScrollArea>
          
          <ScrollArea className="h-[500px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map((tool) => (
                <Card key={tool.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="p-4 pb-2 flex flex-row items-start space-y-0 gap-2">
                    <div className="bg-primary/10 p-2 rounded-md">
                      {React.createElement(tool.icon, { className: "h-4 w-4 text-primary" })}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          {tool.name}
                          {tool.isPremium && (
                            <Badge variant="secondary" className="text-xs">Premium</Badge>
                          )}
                          {tool.isNew && (
                            <Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200">New</Badge>
                          )}
                        </CardTitle>
                        {isDeveloperMode && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0" 
                            onClick={() => deleteTool(tool.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-500" />
                          </Button>
                        )}
                      </div>
                      <CardDescription className="text-xs">
                        {tool.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <Progress value={tool.progressValue || 100} className="h-1" />
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(tool.status)}`} />
                      </div>
                      <div className="flex justify-between items-center">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs h-7"
                        >
                          Launch
                        </Button>
                        <span className="text-xs text-muted-foreground capitalize">{tool.status || "Ready"}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Tabs>
        
        {/* عناصر التحكم في وضع المطور فقط */}
        {isDeveloperMode && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Developer Controls</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">Configure Tools</Button>
              <Button variant="outline" size="sm">Export Tool Data</Button>
              <Button variant="outline" size="sm">
                <Save className="h-3.5 w-3.5 mr-1" />
                Save Configuration
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
