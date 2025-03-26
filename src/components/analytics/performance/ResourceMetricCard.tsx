
import React from "react";
import { LucideIcon } from "lucide-react";

interface ResourceMetricCardProps {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  value: string | number;
  bgColorFrom: string;
  bgColorTo: string;
}

export const ResourceMetricCard = ({ 
  icon: Icon, 
  iconColor, 
  label, 
  value, 
  bgColorFrom, 
  bgColorTo 
}: ResourceMetricCardProps) => {
  return (
    <div className={`p-4 rounded-lg bg-gradient-to-br from-${bgColorFrom}-50 to-${bgColorTo}-100`}>
      <div className="flex items-center">
        <Icon className={`text-${iconColor}-500 mr-2 h-8 w-8`} />
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};
