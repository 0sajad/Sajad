
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
  description?: string; // Add optional description for more context
}

export const ResourceMetricCard = ({ 
  icon: Icon, 
  label, 
  value, 
  iconColor, 
  bgColorFrom, 
  bgColorTo,
  ariaLabel,
  description
}: ResourceMetricCardProps) => {
  return (
    <Card 
      className={`border-${bgColorFrom}-200 shadow-sm transition-all duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-${iconColor}-500`}
      aria-label={ariaLabel || label}
      tabIndex={0} // Make card focusable for keyboard navigation
    >
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className={`mr-3 p-2 rounded-md bg-${bgColorFrom}-100 text-${iconColor}-500`} aria-hidden="true">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">{label}</p>
            <p className="text-lg font-bold">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1" aria-hidden="true">{description}</p>
            )}
            {/* Hidden text for screen readers with more context if description is provided */}
            {description && (
              <span className="sr-only">{description}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
