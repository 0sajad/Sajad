
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDeviceIcon, getStatusIcon } from "./DeviceIcons";
import { useTranslation } from "react-i18next";

export interface Device {
  id: number;
  name: string;
  type: 'laptop' | 'smartphone' | 'tv' | 'gaming' | 'printer';
  ip: string;
  status: 'online' | 'offline' | 'warning';
  lastSeen: string;
}

interface DeviceTableProps {
  devices: Device[];
  onFixIssue: (deviceId: number) => void;
}

export function DeviceTable({ devices, onFixIssue }: DeviceTableProps) {
  const { t } = useTranslation();

  return (
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
                <Button variant="secondary" size="sm" onClick={() => onFixIssue(device.id)}>
                  {t('networkTools.networkTroubleshooting')}
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
