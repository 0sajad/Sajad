
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export interface ResourceMetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  iconColor: string;
  bgColorFrom: string;
  bgColorTo: string;
  ariaLabel?: string; // Add optional ariaLabel prop
}

export const ResourceMetricCard = ({ 
  icon: Icon, 
  label, 
  value, 
  iconColor, 
  bgColorFrom, 
  bgColorTo,
  ariaLabel
}: ResourceMetricCardProps) => {
  return (
    <Card 
      className={`border-${bgColorFrom}-200 shadow-sm`}
      aria-label={ariaLabel || label}
    >
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className={`mr-3 p-2 rounded-md bg-${bgColorFrom}-100 text-${iconColor}-500`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">{label}</p>
            <p className="text-lg font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
