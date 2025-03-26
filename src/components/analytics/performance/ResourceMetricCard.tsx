
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ResourceMetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  iconColor: string;
  bgColorFrom: string;
  bgColorTo: string;
  ariaLabel?: string;
  description?: string;
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
  // تحسين التعامل مع الألوان لضمان التباين المناسب
  const safeIconColor = iconColor || "blue";
  const safeBgFrom = bgColorFrom || "blue";
  
  // استخدام cn لدمج الفئات بشكل صحيح وتجنب مشاكل الألوان المخصصة مع Tailwind
  const cardClassName = cn(
    "shadow-sm transition-all duration-300 hover:shadow-md focus-within:ring-2",
    `border-${safeBgFrom}-200`,
    `focus-within:ring-${safeIconColor}-500`
  );
  
  const iconContainerClassName = cn(
    "mr-3 p-2 rounded-md",
    `bg-${safeBgFrom}-100`,
    `text-${safeIconColor}-500`
  );
  
  return (
    <Card 
      className={cardClassName}
      aria-label={ariaLabel || label}
      tabIndex={0}
    >
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className={iconContainerClassName} aria-hidden="true">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">{label}</p>
            <p className="text-lg font-bold">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
            {/* نص مخفي لقارئات الشاشة لتوفير المزيد من السياق */}
            {description && (
              <span className="sr-only">{description}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
