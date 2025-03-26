
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
  // استخدام متغيرات CSS مخصصة للألوان بدلاً من الاعتماد على توليد فئات Tailwind
  const getBackgroundColor = (colorName: string) => {
    // تعيين قيم افتراضية آمنة للألوان مع تحسين قابلية القراءة والتباين
    const safeColors: Record<string, string> = {
      'blue': 'hsl(210, 100%, 97%)',
      'green': 'hsl(142, 76%, 97%)',
      'red': 'hsl(0, 100%, 97%)',
      'yellow': 'hsl(48, 100%, 96%)',
      'purple': 'hsl(270, 100%, 98%)',
      'orange': 'hsl(30, 100%, 96%)',
      'gray': 'hsl(0, 0%, 96%)'
    };
    
    // استخدام التباين العالي إذا كان مفعلاً
    const isHighContrast = document.body.classList.contains('high-contrast');
    if (isHighContrast) {
      return {
        'blue': 'hsl(210, 100%, 90%)',
        'green': 'hsl(142, 76%, 90%)',
        'red': 'hsl(0, 100%, 90%)',
        'yellow': 'hsl(48, 100%, 90%)',
        'purple': 'hsl(270, 100%, 90%)',
        'orange': 'hsl(30, 100%, 90%)',
        'gray': 'hsl(0, 0%, 90%)'
      }[colorName] || safeColors['blue'];
    }
    
    return safeColors[colorName] || safeColors['blue'];
  };
  
  const getIconColor = (colorName: string) => {
    // تعيين قيم افتراضية آمنة للألوان مع تحسين التباين
    const safeColors: Record<string, string> = {
      'blue': 'hsl(210, 100%, 50%)',
      'green': 'hsl(142, 76%, 36%)',
      'red': 'hsl(0, 84%, 50%)',
      'yellow': 'hsl(48, 100%, 40%)',
      'purple': 'hsl(270, 76%, 50%)',
      'orange': 'hsl(30, 100%, 50%)',
      'gray': 'hsl(0, 0%, 40%)'
    };
    
    // استخدام التباين العالي إذا كان مفعلاً
    const isHighContrast = document.body.classList.contains('high-contrast');
    if (isHighContrast) {
      return {
        'blue': 'hsl(210, 100%, 30%)',
        'green': 'hsl(142, 76%, 25%)',
        'red': 'hsl(0, 84%, 30%)',
        'yellow': 'hsl(48, 100%, 30%)',
        'purple': 'hsl(270, 76%, 30%)',
        'orange': 'hsl(30, 100%, 30%)',
        'gray': 'hsl(0, 0%, 20%)'
      }[colorName] || safeColors['blue'];
    }
    
    return safeColors[colorName] || safeColors['blue'];
  };
  
  const safeStyles = {
    card: "shadow-sm transition-all duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-primary",
    icon: {
      backgroundColor: getBackgroundColor(bgColorFrom),
      color: getIconColor(iconColor)
    }
  };
  
  // إضافة تأثيرات الحركة فقط إذا كان وضع تقليل الحركة غير مفعل
  const isReducedMotion = document.body.classList.contains('reduced-motion');
  
  const baseCardProps = {
    className: cn(safeStyles.card, "border border-gray-200 dark:border-gray-700"),
    "aria-label": ariaLabel || label,
    tabIndex: 0,
    role: "region"
  };
  
  if (isReducedMotion) {
    return (
      <Card {...baseCardProps}>
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
                <span className="sr-only">
                  {label}: {value}. {description}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card {...baseCardProps}>
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
                <span className="sr-only">
                  {label}: {value}. {description}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
