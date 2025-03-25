
import React, { useState } from "react";
import { GlassCard } from "../ui/glass-card";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { AlertTriangle, CheckCircle, RefreshCw, XCircle, HelpCircle, Laptop, Smartphone, Tv, Gamepad, Printer } from "lucide-react";
import { toast } from "../ui/use-toast";

interface Device {
  id: number;
  name: string;
  type: 'laptop' | 'smartphone' | 'tv' | 'gaming' | 'printer';
  ip: string;
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
}

const getDeviceIcon = (type: string) => {
  switch (type) {
    case 'laptop': return <Laptop size={16} />;
    case 'smartphone': return <Smartphone size={16} />;
    case 'tv': return <Tv size={16} />;
    case 'gaming': return <Gamepad size={16} />;
    case 'printer': return <Printer size={16} />;
    default: return <HelpCircle size={16} />;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'online': return <CheckCircle size={16} className="text-green-500" />;
    case 'offline': return <XCircle size={16} className="text-gray-400" />;
    case 'warning': return <AlertTriangle size={16} className="text-amber-500" />;
    default: return <HelpCircle size={16} className="text-blue-500" />;
  }
};

export const NetworkManagement = () => {
  const { t } = useTranslation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: 'MacBook Pro', type: 'laptop', ip: '192.168.1.10', status: 'online', lastSeen: 'Now' },
    { id: 2, name: 'iPhone 13', type: 'smartphone', ip: '192.168.1.11', status: 'online', lastSeen: '2 min ago' },
    { id: 3, name: 'Samsung TV', type: 'tv', ip: '192.168.1.12', status: 'warning', lastSeen: '5 min ago' },
    { id: 4, name: 'PlayStation 5', type: 'gaming', ip: '192.168.1.13', status: 'offline', lastSeen: '1 hour ago' },
    { id: 5, name: 'HP Printer', type: 'printer', ip: '192.168.1.14', status: 'online', lastSeen: '10 min ago' },
  ]);
  
  const refreshDevices = () => {
    setIsRefreshing(true);
    toast({
      title: t('networkTools.deviceManagement'),
      description: t('networkTools.faultMonitoring')
    });
    
    setTimeout(() => {
      // Simulate some changes in device statuses
      const updatedDevices = devices.map(device => ({
        ...device,
        status: Math.random() > 0.7 ? 'warning' : Math.random() > 0.4 ? 'online' : 'offline',
        lastSeen: Math.random() > 0.5 ? 'Now' : `${Math.floor(Math.random() * 30)} min ago`
      }));
      setDevices(updatedDevices);
      setIsRefreshing(false);
    }, 1000);
  };
  
  const fixIssue = (deviceId: number) => {
    toast({
      title: t('networkTools.faultMonitoring'),
      description: `${t('networkTools.networkTroubleshooting')} ${devices.find(d => d.id === deviceId)?.name}`
    });
    
    setTimeout(() => {
      setDevices(devices.map(device => 
        device.id === deviceId ? { ...device, status: 'online', lastSeen: 'Now' } : device
      ));
    }, 1500);
  };
  
  return (
    <GlassCard className="p-0 overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{t('networkTools.networkManagement')}</h3>
          <p className="text-sm text-muted-foreground">{t('networkTools.deviceManagement')}</p>
        </div>
        <Button variant="outline" size="sm" onClick={refreshDevices} disabled={isRefreshing}>
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          <span className="ml-2">{isRefreshing ? '...' : t('networkTools.faultMonitoring')}</span>
        </Button>
      </div>
      
      <div className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]"></TableHead>
              <TableHead>{t('networkTools.deviceManagement')}</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>{t('securityStatus.title')}</TableHead>
              <TableHead>{t('networkTools.faultMonitoring')}</TableHead>
              <TableHead className="text-right">{t('networkTools.networkTroubleshooting')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.id}>
                <TableCell className="p-2">
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md inline-flex">
                    {getDeviceIcon(device.type)}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{device.name}</TableCell>
                <TableCell>{device.ip}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(device.status)}
                    <Badge variant={device.status === 'online' ? 'outline' : device.status === 'warning' ? 'secondary' : 'destructive'}>
                      {device.status === 'online' ? 'Online' : device.status === 'warning' ? 'Warning' : 'Offline'}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{device.lastSeen}</TableCell>
                <TableCell className="text-right">
                  {device.status !== 'online' && (
                    <Button variant="secondary" size="sm" onClick={() => fixIssue(device.id)}>
                      {t('networkTools.networkTroubleshooting')}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </GlassCard>
  );
};
