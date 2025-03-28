
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useRTLSupport } from '@/hooks/useRTLSupport';
import { ColorBlindMode } from '@/hooks/accessibility/useA11yColor';

interface ColorBlindFilterProps {
  value: ColorBlindMode;
  onChange: (value: ColorBlindMode) => void;
}

export function ColorBlindFilter({ value, onChange }: ColorBlindFilterProps) {
  const { t } = useTranslation();
  const { isRTL } = useRTLSupport();
  
  // نعرف المصفوفة الأصلية من القيم
  const options = [
    { value: 'none', label: t('accessibility.normalVision', 'رؤية طبيعية') },
    { value: 'protanopia', label: t('accessibility.protanopia', 'عمى اللون الأحمر') },
    { value: 'deuteranopia', label: t('accessibility.deuteranopia', 'عمى اللون الأخضر') },
    { value: 'tritanopia', label: t('accessibility.tritanopia', 'عمى اللون الأزرق') },
    { value: 'achromatopsia', label: t('accessibility.achromatopsia', 'عمى الألوان الكلي') }
  ];
  
  // نستخدم الدالة المساعدة لعكس المصفوفة في RTL إذا لزم الأمر
  const displayOptions = isRTL ? [...options].reverse() : options;
  
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange as (value: string) => void}
      className={`grid grid-cols-1 ${isRTL ? 'rtl-grid' : ''} gap-3 mt-2`}
    >
      {displayOptions.map(option => (
        <div key={option.value} className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <RadioGroupItem 
            value={option.value} 
            id={`color-${option.value}`}
            aria-label={option.label}
          />
          <Label 
            htmlFor={`color-${option.value}`} 
            className="text-sm cursor-pointer"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
