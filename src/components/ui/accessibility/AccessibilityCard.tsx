
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AccessibilityFeatureToggle } from "./AccessibilityFeatureToggle";
import { useA11y } from "@/hooks/useA11y";
import { useTranslation } from "react-i18next";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccessibilityCardProps {
  title: string;
  description: string;
  features: {
    id: keyof ReturnType<typeof useA11y>;
    label: string;
    description: string;
    icon?: React.ReactNode;
  }[];
  className?: string;
}

/**
 * بطاقة تجمع مجموعة من ميزات إمكانية الوصول ذات الصلة
 */
export function AccessibilityCard({ title, description, features, className }: AccessibilityCardProps) {
  const a11y = useA11y();
  const { t } = useTranslation();
  
  // حساب عدد الميزات النشطة
  const activeFeatures = features.filter(feature => {
    const key = feature.id as string;
    const value = a11y[key as keyof typeof a11y];
    return typeof value === 'boolean' && value === true;
  }).length;
  
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg md:text-xl font-medium">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          
          {activeFeatures > 0 && (
            <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs rounded-full px-2 py-1 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>
                {t('accessibility.featuresActive', { count: activeFeatures, defaultValue: '{{count}} ميزة نشطة' })}
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-2">
        {features.map((feature) => {
          const isActive = a11y[feature.id as keyof typeof a11y] as boolean;
          const setterKey = `set${feature.id.charAt(0).toUpperCase() + feature.id.slice(1)}` as keyof typeof a11y;
          const setter = a11y[setterKey] as (value: boolean) => void;
          
          return (
            <AccessibilityFeatureToggle
              key={feature.id as string}
              label={feature.label}
              description={feature.description}
              checked={isActive}
              onCheckedChange={(checked) => setter(checked)}
              icon={feature.icon}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
