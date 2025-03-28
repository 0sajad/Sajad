
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { useA11y } from "@/hooks/useA11y";
import { ColorBlindMode } from "@/hooks/accessibility/useA11yColor";

interface ColorBlindFilterProps {
  value: ColorBlindMode;
  onChange: (value: ColorBlindMode) => void;
  className?: string;
}

/**
 * مكون لاختيار وضع عمى الألوان
 * يعرض خيارات لأوضاع عمى الألوان المختلفة مع نماذج مرئية
 */
export function ColorBlindFilter({ 
  value = 'none', 
  onChange, 
  className 
}: ColorBlindFilterProps) {
  const { t } = useTranslation();
  const { reducedMotion } = useA11y();
  
  // قائمة أوضاع عمى الألوان المدعومة
  const colorBlindOptions: { value: ColorBlindMode; label: string; description?: string }[] = [
    { 
      value: 'none', 
      label: t('accessibility.normalVision'),
    },
    { 
      value: 'protanopia', 
      label: t('accessibility.protanopia'),
      description: t('accessibility.colorBlindDescription')
    },
    { 
      value: 'deuteranopia', 
      label: t('accessibility.deuteranopia'),
    },
    { 
      value: 'tritanopia', 
      label: t('accessibility.tritanopia'),
    }
  ];
  
  // عينة ألوان للمعاينة
  const colorSample = () => (
    <div className="flex space-x-1 rtl:space-x-reverse">
      <div className="w-3 h-3 bg-red-500 rounded-sm" aria-hidden="true"></div>
      <div className="w-3 h-3 bg-green-500 rounded-sm" aria-hidden="true"></div>
      <div className="w-3 h-3 bg-blue-500 rounded-sm" aria-hidden="true"></div>
      <div className="w-3 h-3 bg-yellow-500 rounded-sm" aria-hidden="true"></div>
    </div>
  );
  
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange as (value: string) => void}
      className={cn("space-y-2", className)}
    >
      {colorBlindOptions.map((option) => (
        <div 
          key={option.value}
          className={cn(
            "flex items-center justify-between space-x-2 rtl:space-x-reverse",
            "p-2 rounded-md",
            value === option.value ? "bg-muted" : "hover:bg-muted/50",
            "transition-colors duration-200"
          )}
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <RadioGroupItem 
              value={option.value} 
              id={`color-blind-${option.value}`}
              aria-label={option.label}
            />
            <div>
              <Label 
                htmlFor={`color-blind-${option.value}`}
                className="font-medium text-sm cursor-pointer"
              >
                {option.label}
              </Label>
              {option.description && (
                <p className="text-xs text-muted-foreground hidden sm:block mt-0.5">
                  {option.description}
                </p>
              )}
            </div>
          </div>
          
          <div className={`filter-${option.value}`}>
            {colorSample()}
          </div>
        </div>
      ))}
    </RadioGroup>
  );
}
