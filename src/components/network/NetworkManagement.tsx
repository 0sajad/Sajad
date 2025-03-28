
import React, { useState } from "react";
import { GlassCard } from "../ui/glass-card";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { ManagementHeader } from "./management/ManagementHeader";
import { DeviceTable, Device } from "./management/DeviceTable";

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
    toast.info(t('networkTools.deviceManagement'));
    
    setTimeout(() => {
      // Simulate some changes in device statuses
      const updatedDevices = devices.map(device => ({
        ...device,
        status: Math.random() > 0.7 ? 'warning' : Math.random() > 0.4 ? 'online' : 'offline',
        lastSeen: Math.random() > 0.5 ? 'Now' : `${Math.floor(Math.random() * 30)} min ago`
      })) as Device[]; // Cast to ensure type safety
      setDevices(updatedDevices);
      setIsRefreshing(false);
    }, 1000);
  };
  
  const fixIssue = (deviceId: number) => {
    toast.success(`${t('networkTools.networkTroubleshooting')} ${devices.find(d => d.id === deviceId)?.name}`);
    
    setTimeout(() => {
      setDevices(devices.map(device => 
        device.id === deviceId ? { ...device, status: 'online', lastSeen: 'Now' } : device
      ));
    }, 1500);
  };
  
  return (
    <GlassCard className="p-0 overflow-hidden">
      <ManagementHeader onRefresh={refreshDevices} isRefreshing={isRefreshing} />
      
      <div className="p-0">
        <DeviceTable devices={devices} onFixIssue={fixIssue} />
      </div>
    </GlassCard>
  );
};
