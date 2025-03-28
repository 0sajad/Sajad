
import React from "react";
import { useTranslation } from "react-i18next";

interface CountdownUnitProps {
  value: number;
  unit: "days" | "hours" | "minutes" | "seconds";
}

export function CountdownUnit({ value, unit }: CountdownUnitProps) {
  const { t, i18n } = useTranslation();
  
  // ترجمة وحدات الوقت حسب اللغة
  const getTimeUnit = (value: number, unit: string) => {
    const units = {
      days: {
        en: value === 1 ? 'day' : 'days',
        ar: value === 1 ? 'يوم' : (value >= 3 && value <= 10) ? 'أيام' : 'يوم',
        'ar-iq': value === 1 ? 'يوم' : (value >= 3 && value <= 10) ? 'ايام' : 'يوم',
        fr: value === 1 ? 'jour' : 'jours',
        ja: '日',
        zh: '天'
      },
      hours: {
        en: value === 1 ? 'hour' : 'hours',
        ar: value === 1 ? 'ساعة' : (value >= 3 && value <= 10) ? 'ساعات' : 'ساعة',
        'ar-iq': value === 1 ? 'ساعة' : (value >= 3 && value <= 10) ? 'ساعات' : 'ساعة',
        fr: value === 1 ? 'heure' : 'heures',
        ja: '時間',
        zh: '小时'
      },
      minutes: {
        en: value === 1 ? 'minute' : 'minutes',
        ar: value === 1 ? 'دقيقة' : (value >= 3 && value <= 10) ? 'دقائق' : 'دقيقة',
        'ar-iq': value === 1 ? 'دقيقة' : (value >= 3 && value <= 10) ? 'دقائق' : 'دقيقة',
        fr: value === 1 ? 'minute' : 'minutes',
        ja: '分',
        zh: '分钟'
      },
      seconds: {
        en: value === 1 ? 'second' : 'seconds',
        ar: value === 1 ? 'ثانية' : (value >= 3 && value <= 10) ? 'ثوان' : 'ثانية',
        'ar-iq': value === 1 ? 'ثانية' : (value >= 3 && value <= 10) ? 'ثواني' : 'ثانية',
        fr: value === 1 ? 'seconde' : 'secondes',
        ja: '秒',
        zh: '秒'
      }
    };
    
    const language = i18n.language in units[unit as keyof typeof units] ? i18n.language : 'en';
    return units[unit as keyof typeof units][language as keyof typeof units[keyof typeof units]];
  };

  // الوحدة النصية
  const unitText = getTimeUnit(value, unit);
  
  // تنسيق مختلف للغة اليابانية والصينية
  const formattedDisplay = (i18n.language === 'ja' || i18n.language === 'zh') 
    ? `${value}${unitText}`
    : `${value} ${unitText}`;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transform transition-transform duration-200 hover:scale-105">
      <div 
        className="text-3xl font-bold text-blue-600 dark:text-blue-400"
        aria-label={formattedDisplay}
      >
        {value}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300">
        {unitText}
      </div>
    </div>
  );
}
