import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Laptop, 
  Smartphone, 
  Wifi, 
  Router, 
  Printer, 
  Tv,
  Search,
  Plus,
  RefreshCw
} from "lucide-react";

type DeviceType = 'laptop' | 'smartphone' | 'router' | 'printer' | 'tv' | 'other';
type ConnectionType = 'wifi' | 'ethernet' | 'offline';

interface Device {
  id: string;
  name: string;
  type: DeviceType;
  ipAddress: string;
  macAddress: string;
  connectionType: ConnectionType;
  lastSeen: Date;
  isOnline: boolean;
}

export function DeviceManager() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  
  const [devices] = useState<Device[]>([
    {
      id: "1",
      name: "Main Laptop",
      type: "laptop",
      ipAddress: "192.168.1.101",
      macAddress: "A1:B2:C3:D4:E5:F6",
      connectionType: "wifi",
      lastSeen: new Date(),
      isOnline: true
    },
    {
      id: "2",
      name: "iPhone 13",
      type: "smartphone",
      ipAddress: "192.168.1.102",
      macAddress: "G7:H8:I9:J0:K1:L2",
      connectionType: "wifi",
      lastSeen: new Date(),
      isOnline: true
    },
    {
      id: "3",
      name: "Main Router",
      type: "router",
      ipAddress: "192.168.1.1",
      macAddress: "M3:N4:O5:P6:Q7:R8",
      connectionType: "ethernet",
      lastSeen: new Date(),
      isOnline: true
    },
    {
      id: "4",
      name: "HP Printer",
      type: "printer",
      ipAddress: "192.168.1.103",
      macAddress: "S9:T0:U1:V2:W3:X4",
      connectionType: "wifi",
      lastSeen: new Date(Date.now() - 3600000), // 1 hour ago
      isOnline: false
    },
    {
      id: "5",
      name: "Smart TV",
      type: "tv",
      ipAddress: "192.168.1.104",
      macAddress: "Y5:Z6:A7:B8:C9:D0",
      connectionType: "wifi",
      lastSeen: new Date(),
      isOnline: true
    }
  ]);
  
  const filteredDevices = devices.filter(device => 
    device.name.toLowerCase().includes(search.toLowerCase()) ||
    device.ipAddress.includes(search) ||
    device.macAddress.toLowerCase().includes(search.toLowerCase())
  );
  
  const getDeviceIcon = (type: DeviceType) => {
    switch (type) {
      case 'laptop': return <Laptop className="h-4 w-4" />;
      case 'smartphone': return <Smartphone className="h-4 w-4" />;
      case 'router': return <Router className="h-4 w-4" />;
      case 'printer': return <Printer className="h-4 w-4" />;
      case 'tv': return <Tv className="h-4 w-4" />;
      default: return <Laptop className="h-4 w-4" />;
    }
  };
  
  const getStatusBadge = (isOnline: boolean) => {
    return isOnline 
      ? <Badge variant="default" className="bg-green-500">Online</Badge>
      : <Badge variant="outline">Offline</Badge>;
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-md font-medium">Device Manager</CardTitle>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Scan Network
          </Button>
          <Button variant="default" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search devices..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>MAC Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Seen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="bg-primary/10 p-1 rounded-md">
                        {getDeviceIcon(device.type)}
                      </div>
                      <span>{device.name}</span>
                    </TableCell>
                    <TableCell>{device.ipAddress}</TableCell>
                    <TableCell className="font-mono text-xs">{device.macAddress}</TableCell>
                    <TableCell>{getStatusBadge(device.isOnline)}</TableCell>
                    <TableCell>
                      {device.isOnline ? 'Now' : new Intl.RelativeTimeFormat().format(
                        -Math.round((new Date().getTime() - device.lastSeen.getTime()) / 3600000),
                        'hour'
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
