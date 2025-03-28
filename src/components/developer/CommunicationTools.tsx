
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { 
  Wifi, 
  Server, 
  Network, 
  Signal, 
  Globe, 
  Router, 
  Activity, 
  Database, 
  Shield, 
  Zap,
  AlertTriangle as Alert
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMode } from "@/context/ModeContext";

interface CommunicationTool {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  configurable: boolean;
  status: "stable" | "beta" | "experimental";
}

const defaultTools: CommunicationTool[] = [
  {
    id: "network-scanner",
    name: "Network Scanner",
    category: "diagnostics",
    description: "Scans network for connected devices and security vulnerabilities",
    icon: <Network className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "stable"
  },
  {
    id: "wifi-analyzer",
    name: "WiFi Analyzer",
    category: "diagnostics",
    description: "Analyzes WiFi signal strength and channel interference",
    icon: <Wifi className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "stable"
  },
  {
    id: "packet-sniffer",
    name: "Packet Sniffer",
    category: "monitoring",
    description: "Captures and analyzes network packets for troubleshooting",
    icon: <Activity className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "stable"
  },
  {
    id: "bandwidth-monitor",
    name: "Bandwidth Monitor",
    category: "monitoring",
    description: "Monitors network bandwidth usage and identifies bottlenecks",
    icon: <Activity className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "stable"
  },
  {
    id: "ping-tool",
    name: "Ping Tool",
    category: "diagnostics",
    description: "Tests network connectivity and latency to hosts",
    icon: <Signal className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  {
    id: "traceroute",
    name: "Traceroute",
    category: "diagnostics",
    description: "Maps the network path between your device and target host",
    icon: <Globe className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  {
    id: "dns-lookup",
    name: "DNS Lookup",
    category: "diagnostics",
    description: "Resolves domain names to IP addresses and vice versa",
    icon: <Database className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  {
    id: "port-scanner",
    name: "Port Scanner",
    category: "security",
    description: "Scans for open ports on network hosts",
    icon: <Shield className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "stable"
  },
  {
    id: "network-speed-test",
    name: "Network Speed Test",
    category: "performance",
    description: "Tests upload and download speeds to internet servers",
    icon: <Zap className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  {
    id: "ip-calculator",
    name: "IP Calculator",
    category: "utilities",
    description: "Calculates subnet masks, CIDR notations, and IP ranges",
    icon: <Server className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  // Adding more tools to meet the requirement of 40 total
  {
    id: "protocol-analyzer",
    name: "Protocol Analyzer",
    category: "monitoring",
    description: "Deep analysis of network protocols and their behavior",
    icon: <Activity className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "stable"
  },
  {
    id: "network-mapper",
    name: "Network Mapper",
    category: "diagnostics",
    description: "Creates visual maps of network topology",
    icon: <Globe className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "stable"
  },
  {
    id: "traffic-analyzer",
    name: "Traffic Analyzer",
    category: "monitoring",
    description: "Analyzes network traffic patterns and identifies anomalies",
    icon: <Activity className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "stable"
  },
  {
    id: "qos-manager",
    name: "QoS Manager",
    category: "performance",
    description: "Configures and monitors Quality of Service settings",
    icon: <Zap className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "beta"
  },
  {
    id: "fiber-diagnostics",
    name: "Fiber Diagnostics",
    category: "diagnostics",
    description: "Tests and troubleshoots fiber optic connections",
    icon: <Signal className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "beta"
  },
  {
    id: "cable-tester",
    name: "Cable Tester",
    category: "diagnostics",
    description: "Tests network cables for faults and performance issues",
    icon: <Signal className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  {
    id: "router-config",
    name: "Router Configuration",
    category: "utilities",
    description: "Configures and manages router settings",
    icon: <Router className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "stable"
  },
  {
    id: "vpn-manager",
    name: "VPN Manager",
    category: "security",
    description: "Sets up and manages VPN connections",
    icon: <Shield className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "stable"
  },
  {
    id: "firewall-analyzer",
    name: "Firewall Analyzer",
    category: "security",
    description: "Analyzes firewall rules and their effectiveness",
    icon: <Shield className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "beta"
  },
  {
    id: "network-logger",
    name: "Network Logger",
    category: "monitoring",
    description: "Logs network events and errors for analysis",
    icon: <Database className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "stable"
  },
  {
    id: "whois-lookup",
    name: "WHOIS Lookup",
    category: "utilities",
    description: "Looks up domain registration information",
    icon: <Globe className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  {
    id: "mac-address-finder",
    name: "MAC Address Finder",
    category: "utilities",
    description: "Finds MAC addresses of devices on the network",
    icon: <Network className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  {
    id: "network-simulator",
    name: "Network Simulator",
    category: "utilities",
    description: "Simulates network conditions for testing",
    icon: <Globe className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "beta"
  },
  {
    id: "bandwidth-shaper",
    name: "Bandwidth Shaper",
    category: "performance",
    description: "Shapes network traffic for optimal performance",
    icon: <Activity className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "beta"
  },
  {
    id: "uptime-monitor",
    name: "Uptime Monitor",
    category: "monitoring",
    description: "Monitors network service availability",
    icon: <Activity className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  {
    id: "mttr-calculator",
    name: "MTTR Calculator",
    category: "utilities",
    description: "Calculates Mean Time to Repair for network issues",
    icon: <Server className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  {
    id: "network-inventory",
    name: "Network Inventory",
    category: "utilities",
    description: "Manages inventory of network devices and components",
    icon: <Database className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "stable"
  },
  {
    id: "latency-monitor",
    name: "Latency Monitor",
    category: "performance",
    description: "Monitors and analyzes network latency",
    icon: <Signal className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  {
    id: "jitter-analyzer",
    name: "Jitter Analyzer",
    category: "performance",
    description: "Analyzes jitter in network connections",
    icon: <Signal className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  {
    id: "bgp-monitor",
    name: "BGP Monitor",
    category: "monitoring",
    description: "Monitors BGP routing tables and changes",
    icon: <Router className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "beta"
  },
  {
    id: "packet-loss-analyzer",
    name: "Packet Loss Analyzer",
    category: "diagnostics",
    description: "Analyzes packet loss in network connections",
    icon: <Activity className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  {
    id: "sdn-controller",
    name: "SDN Controller",
    category: "utilities",
    description: "Controls software-defined networks",
    icon: <Server className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "experimental"
  },
  {
    id: "dhcp-monitor",
    name: "DHCP Monitor",
    category: "monitoring",
    description: "Monitors DHCP server activity and leases",
    icon: <Server className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  {
    id: "dns-monitor",
    name: "DNS Monitor",
    category: "monitoring",
    description: "Monitors DNS server activity and resolution",
    icon: <Server className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  {
    id: "ap-optimizer",
    name: "AP Optimizer",
    category: "performance",
    description: "Optimizes wireless access point placement and settings",
    icon: <Wifi className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "beta"
  },
  {
    id: "mesh-network-analyzer",
    name: "Mesh Network Analyzer",
    category: "diagnostics",
    description: "Analyzes mesh network performance and topology",
    icon: <Network className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "beta"
  },
  {
    id: "wan-optimizer",
    name: "WAN Optimizer",
    category: "performance",
    description: "Optimizes wide area network connections",
    icon: <Globe className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "beta"
  },
  {
    id: "network-compliance",
    name: "Network Compliance",
    category: "security",
    description: "Checks network configurations for compliance with standards",
    icon: <Shield className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "beta"
  },
  {
    id: "ip-conflict-detector",
    name: "IP Conflict Detector",
    category: "diagnostics",
    description: "Detects IP address conflicts on the network",
    icon: <Alert className="h-4 w-4" />,
    enabled: true,
    configurable: false,
    status: "stable"
  },
  {
    id: "ssl-certificate-manager",
    name: "SSL Certificate Manager",
    category: "security",
    description: "Manages SSL certificates for network services",
    icon: <Shield className="h-4 w-4" />,
    enabled: true,
    configurable: true,
    status: "stable"
  }
];

export function CommunicationTools() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { mode, applyConfiguration } = useMode();
  const [tools, setTools] = useState<CommunicationTool[]>(defaultTools);
  const [newTool, setNewTool] = useState({
    name: "",
    category: "utilities",
    description: ""
  });
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "All Tools" },
    { id: "diagnostics", name: "Diagnostics" },
    { id: "monitoring", name: "Monitoring" },
    { id: "performance", name: "Performance" },
    { id: "security", name: "Security" },
    { id: "utilities", name: "Utilities" }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "all" || tool.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const toggleToolStatus = (id: string) => {
    setTools(
      tools.map(tool => 
        tool.id === id ? { ...tool, enabled: !tool.enabled } : tool
      )
    );
    
    toast({
      title: "Tool Status Updated",
      description: `Tool has been ${tools.find(t => t.id === id)?.enabled ? 'disabled' : 'enabled'}.`,
      duration: 3000,
    });
  };

  const addNewTool = () => {
    if (!newTool.name || !newTool.description) {
      toast({
        title: "Validation Error",
        description: "Please provide a name and description for the new tool.",
        variant: "destructive",
      });
      return;
    }

    const toolId = newTool.name.toLowerCase().replace(/\s+/g, '-');
    
    if (tools.some(tool => tool.id === toolId)) {
      toast({
        title: "Tool Already Exists",
        description: "A tool with this name already exists.",
        variant: "destructive",
      });
      return;
    }

    const newToolEntry: CommunicationTool = {
      id: toolId,
      name: newTool.name,
      category: newTool.category,
      description: newTool.description,
      icon: <Server className="h-4 w-4" />,
      enabled: true,
      configurable: true,
      status: "experimental"
    };

    setTools([...tools, newToolEntry]);
    
    setNewTool({
      name: "",
      category: "utilities",
      description: ""
    });

    toast({
      title: "Tool Added",
      description: `${newTool.name} has been added to the tools list.`,
    });
  };

  const saveToolsConfiguration = () => {
    // Here you would typically save the configuration to a database or API
    // For now, we'll just simulate saving with a toast notification
    
    applyConfiguration();
    
    toast({
      title: "Configuration Saved",
      description: "Tool configurations have been saved successfully.",
    });
  };

  const getStatusBadge = (status: "stable" | "beta" | "experimental") => {
    switch (status) {
      case "stable":
        return <Badge variant="default" className="bg-green-500">Stable</Badge>;
      case "beta":
        return <Badge variant="default" className="bg-blue-500">Beta</Badge>;
      case "experimental":
        return <Badge variant="default" className="bg-amber-500">Experimental</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Communication Tools</CardTitle>
            <Button onClick={saveToolsConfiguration}>Apply Configuration</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-6">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="border rounded-md p-4">
              <ScrollArea className="h-[400px] pr-4">
                <div className="grid grid-cols-1 gap-4">
                  {filteredTools.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No tools found matching your search criteria.
                    </div>
                  ) : (
                    filteredTools.map((tool) => (
                      <div key={tool.id} className="border rounded-md p-4 flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {tool.icon}
                            <h3 className="font-medium">{tool.name}</h3>
                            {getStatusBadge(tool.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{tool.description}</p>
                          <div className="flex gap-2 text-xs">
                            <Badge variant="outline">{tool.category}</Badge>
                            {tool.configurable && (
                              <Badge variant="outline">Configurable</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={tool.enabled}
                            onCheckedChange={() => toggleToolStatus(tool.id)}
                            id={`tool-enabled-${tool.id}`}
                          />
                          <Label htmlFor={`tool-enabled-${tool.id}`}>
                            {tool.enabled ? "Enabled" : "Disabled"}
                          </Label>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>

      {mode === "developer" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Add New Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-tool-name">Tool Name</Label>
                <Input
                  id="new-tool-name"
                  placeholder="Enter tool name"
                  value={newTool.name}
                  onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-tool-category">Category</Label>
                <select
                  id="new-tool-category"
                  className="w-full p-2 border rounded"
                  value={newTool.category}
                  onChange={(e) => setNewTool({ ...newTool, category: e.target.value })}
                >
                  {categories.filter(c => c.id !== "all").map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="new-tool-description">Description</Label>
                <Input
                  id="new-tool-description"
                  placeholder="Enter tool description"
                  value={newTool.description}
                  onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                />
              </div>
              
              <Button onClick={addNewTool} className="w-full">
                Add Tool
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
