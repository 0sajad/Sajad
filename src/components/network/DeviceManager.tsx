
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Laptop, Smartphone, Tv, WifiIcon, Router, RefreshCw, PlusCircle, ServerOff } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample device data
const generateDevices = () => {
  const deviceTypes = ["laptop", "smartphone", "tv", "router", "other"];
  const statuses = ["online", "offline", "sleep"];
  const manufacturers = ["Apple", "Samsung", "Sony", "LG", "Cisco", "HP", "Dell"];
  
  return Array.from({ length: 10 }, (_, i) => {
    const type = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
    const status = Math.random() > 0.3 ? "online" : statuses[Math.floor(Math.random() * statuses.length)];
    const manufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)];
    
    return {
      id: `device-${i}`,
      name: `${manufacturer} ${type.charAt(0).toUpperCase() + type.slice(1)} ${i + 1}`,
      type,
      status,
      ipAddress: `192.168.1.${10 + i}`,
      lastSeen: status === "online" ? "Now" : `${Math.floor(Math.random() * 60)} minutes ago`,
      macAddress: `00:1A:2B:${Math.floor(Math.random() * 100).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 100).toString(16).padStart(2, '0')}:${Math.floor(Math.random() * 100).toString(16).padStart(2, '0')}`,
      manufacturer
    };
  });
};

export const DeviceManager = () => {
  const { t } = useTranslation();
  const [devices, setDevices] = useState(generateDevices());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  
  const getDeviceIcon = (type) => {
    switch (type) {
      case "laptop": return <Laptop size={16} />;
      case "smartphone": return <Smartphone size={16} />;
      case "tv": return <Tv size={16} />;
      case "router": return <Router size={16} />;
      default: return <WifiIcon size={16} />;
    }
  };
  
  const refreshDevices = () => {
    setIsRefreshing(true);
    
    toast({
      title: t('deviceManager.refreshing', 'Refreshing Devices'),
      description: t('deviceManager.scanningNetwork', 'Scanning network for connected devices...')
    });
    
    setTimeout(() => {
      setDevices(generateDevices());
      setIsRefreshing(false);
      
      toast({
        title: t('deviceManager.scanComplete', 'Scan Complete'),
        description: t('deviceManager.devicesFound', `${devices.length} devices found on your network`)
      });
    }, 2000);
  };
  
  // Filter devices based on active filter
  const filteredDevices = devices.filter(device => {
    if (activeFilter === "all") return true;
    if (activeFilter === "online") return device.status === "online";
    if (activeFilter === "offline") return device.status !== "online";
    return device.type === activeFilter;
  });
  
  // Count devices by type
  const deviceCounts = {
    all: devices.length,
    online: devices.filter(d => d.status === "online").length,
    offline: devices.filter(d => d.status !== "online").length,
    laptop: devices.filter(d => d.type === "laptop").length,
    smartphone: devices.filter(d => d.type === "smartphone").length,
    tv: devices.filter(d => d.type === "tv").length,
    router: devices.filter(d => d.type === "router").length,
    other: devices.filter(d => d.type === "other").length
  };
  
  return (
    <Card className="border-octaBlue-200 shadow-md animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-octaBlue-50 to-octaBlue-100 rounded-t-lg flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-octaBlue-800 flex items-center">
            <WifiIcon className="mr-2 h-5 w-5 text-octaBlue-600" />
            {t('deviceManager.title', 'Network Device Manager')}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {t('deviceManager.description', 'Monitor and manage all devices connected to your network')}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshDevices} 
            disabled={isRefreshing}
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin mr-2' : 'mr-2'} />
            {t('deviceManager.scan', 'Scan')}
          </Button>
          <Button size="sm">
            <PlusCircle size={16} className="mr-2" />
            {t('deviceManager.addDevice', 'Add Device')}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs value={activeFilter} onValueChange={setActiveFilter} className="mb-6">
          <TabsList className="w-full grid grid-cols-4 md:grid-cols-8">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <WifiIcon size={14} />
              <span>All ({deviceCounts.all})</span>
            </TabsTrigger>
            <TabsTrigger value="online" className="flex items-center gap-1">
              <WifiIcon size={14} />
              <span>Online ({deviceCounts.online})</span>
            </TabsTrigger>
            <TabsTrigger value="offline" className="flex items-center gap-1">
              <ServerOff size={14} />
              <span>Offline ({deviceCounts.offline})</span>
            </TabsTrigger>
            <TabsTrigger value="laptop" className="flex items-center gap-1">
              <Laptop size={14} />
              <span>Laptops ({deviceCounts.laptop})</span>
            </TabsTrigger>
            <TabsTrigger value="smartphone" className="flex items-center gap-1">
              <Smartphone size={14} />
              <span>Phones ({deviceCounts.smartphone})</span>
            </TabsTrigger>
            <TabsTrigger value="tv" className="flex items-center gap-1">
              <Tv size={14} />
              <span>TVs ({deviceCounts.tv})</span>
            </TabsTrigger>
            <TabsTrigger value="router" className="flex items-center gap-1">
              <Router size={14} />
              <span>Routers ({deviceCounts.router})</span>
            </TabsTrigger>
            <TabsTrigger value="other" className="flex items-center gap-1">
              <WifiIcon size={14} />
              <span>Other ({deviceCounts.other})</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="overflow-auto rounded-md border">
          <table className="w-full min-w-[600px] caption-bottom text-sm">
            <thead className="bg-muted/50">
              <tr className="border-b transition-colors hover:bg-muted/80">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{t('deviceManager.device', 'Device')}</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{t('deviceManager.status', 'Status')}</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{t('deviceManager.ipAddress', 'IP Address')}</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">{t('deviceManager.lastSeen', 'Last Seen')}</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">{t('deviceManager.actions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.length > 0 ? (
                filteredDevices.map((device) => (
                  <tr key={device.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <div className={`bg-${device.status === 'online' ? 'green' : 'gray'}-100 p-1.5 rounded-md`}>
                          {getDeviceIcon(device.type)}
                        </div>
                        <div>
                          <p className="font-medium">{device.name}</p>
                          <p className="text-xs text-muted-foreground">{device.macAddress}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">
                      <Badge variant="outline" className={`
                        ${device.status === 'online' ? 'bg-green-50 text-green-700 hover:bg-green-50' : 
                         device.status === 'offline' ? 'bg-red-50 text-red-700 hover:bg-red-50' : 
                         'bg-amber-50 text-amber-700 hover:bg-amber-50'}
                      `}>
                        {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle font-mono">{device.ipAddress}</td>
                    <td className="p-4 align-middle">{device.lastSeen}</td>
                    <td className="p-4 align-middle text-right">
                      <Button variant="ghost" size="sm">
                        {t('deviceManager.details', 'Details')}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <ServerOff className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">{t('deviceManager.noDevices', 'No devices found')}</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-md font-medium mb-2">{t('deviceManager.networkInsights', 'Network Insights')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="bg-white p-3 rounded border">
              <p className="text-muted-foreground text-sm mb-1">{t('deviceManager.activeDevices', 'Active Devices')}</p>
              <p className="text-2xl font-bold">{deviceCounts.online}</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="text-muted-foreground text-sm mb-1">{t('deviceManager.lastScan', 'Last Scan')}</p>
              <p className="text-2xl font-bold">2:45 PM</p>
            </div>
            <div className="bg-white p-3 rounded border">
              <p className="text-muted-foreground text-sm mb-1">{t('deviceManager.networkHealth', 'Network Health')}</p>
              <p className="text-2xl font-bold text-green-600">93%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
