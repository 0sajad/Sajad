
import React from "react";
import { Wifi } from "lucide-react";
import { GlassCard } from "../ui/glass-card";

interface ConnectedDevicesCardProps {
  connectedDevices: number;
}

export const ConnectedDevicesCard: React.FC<ConnectedDevicesCardProps> = ({ connectedDevices }) => {
  return (
    <GlassCard className="p-4 animate-fade-in">
      <div className="flex items-center">
        <div className="p-3 rounded-xl mr-4 text-octaBlue-600 bg-octaBlue-50">
          <Wifi size={20} />
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-tajawal">الأجهزة المتصلة</p>
          <p className="text-xl font-semibold">{connectedDevices}</p>
        </div>
      </div>
    </GlassCard>
  );
};
