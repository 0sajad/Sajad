
import React, { useState, useEffect } from "react";
import { DateTimeDisplay } from "@/components/ui/datetime-display";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Clock, Calendar } from "lucide-react";

export function SpecificDateTimeDisplay() {
  const { t, i18n } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  // إنشاء كائن تاريخ لـ 28 مارس 2025 الساعة 02:10
  const specificDateTime = new Date(2025, 2, 28, 2, 10); // شهر مارس هو الشهر 2 (الأشهر تبدأ من 0)
  
  // تحديث الوقت الحالي كل ثانية
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // حساب الفرق بين الوقت المحدد والوقت الحالي
  const calculateTimeRemaining = () => {
    const timeDifference = specificDateTime.getTime() - currentTime.getTime();
    
    if (timeDifference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }
    
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
  };
  
  const timeRemaining = calculateTimeRemaining();
  
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
  
  // تنسيق عرض العد التنازلي
  const formatTimeDisplay = (value: number, unit: string) => {
    const unitText = getTimeUnit(value, unit);
    
    // تنسيق مختلف للغة اليابانية والصينية
    if (i18n.language === 'ja' || i18n.language === 'zh') {
      return `${value}${unitText}`;
    }
    
    return `${value} ${unitText}`;
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto my-8 space-y-6" aria-live="polite">
      <DateTimeDisplay 
        datetime={specificDateTime} 
        className="shadow-lg hover:shadow-xl transition-shadow duration-300"
      />
      
      <Card className="overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">
                {isRTL ? "العد التنازلي للموعد" : "Countdown to Date"}
              </h3>
              <Calendar className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
          
          <div className="p-6">
            <div 
              className={`grid grid-cols-4 gap-4 text-center ${isRTL ? "dir-rtl" : ""}`}
              role="timer"
              aria-label={isRTL ? "العد التنازلي للموعد المحدد" : "Countdown to specified date"}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400" aria-label={`${timeRemaining.days} ${getTimeUnit(timeRemaining.days, 'days')}`}>
                  {timeRemaining.days}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {getTimeUnit(timeRemaining.days, 'days')}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400" aria-label={`${timeRemaining.hours} ${getTimeUnit(timeRemaining.hours, 'hours')}`}>
                  {timeRemaining.hours}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {getTimeUnit(timeRemaining.hours, 'hours')}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400" aria-label={`${timeRemaining.minutes} ${getTimeUnit(timeRemaining.minutes, 'minutes')}`}>
                  {timeRemaining.minutes}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {getTimeUnit(timeRemaining.minutes, 'minutes')}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400" aria-label={`${timeRemaining.seconds} ${getTimeUnit(timeRemaining.seconds, 'seconds')}`}>
                  {timeRemaining.seconds}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {getTimeUnit(timeRemaining.seconds, 'seconds')}
                </div>
              </div>
            </div>
            
            <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
              {isRTL 
                ? "العد التنازلي لتاريخ 28 مارس 2025 الساعة 02:10"
                : "Countdown to March 28, 2025 at 02:10 AM"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
