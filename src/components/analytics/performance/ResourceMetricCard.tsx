
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
  // استخدام القيم المباشرة للألوان بدلاً من الاعتماد على توليد فئات Tailwind
  const safeStyles = {
    card: "shadow-sm transition-all duration-300 hover:shadow-md",
    icon: {
      backgroundColor: `var(--color-${bgColorFrom}-100, #e6f7ff)`,
      color: `var(--color-${iconColor}-500, #3b82f6)`
    }
  };
  
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        className={cn(safeStyles.card, "border border-gray-200 dark:border-gray-700")}
        aria-label={ariaLabel || label}
        tabIndex={0}
        role="region"
      >
        <CardContent className="p-4">
          <div className="flex items-center">
            <div 
              className="mr-3 p-2 rounded-md rtl:ml-3 rtl:mr-0" 
              aria-hidden="true"
              style={safeStyles.icon}
            >
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
    </motion.div>
  );
};
