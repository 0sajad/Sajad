
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { BookOpen, AlertCircle, Check, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface Announcement {
  id: string;
  text: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: Date;
}

interface ScreenReaderAnnouncementsProps {
  announcements: Announcement[];
  maxAnnouncements?: number;
}

export function ScreenReaderAnnouncements({
  announcements,
  maxAnnouncements = 5
}: ScreenReaderAnnouncementsProps) {
  const { t } = useTranslation();
  const [visibleAnnouncements, setVisibleAnnouncements] = useState<Announcement[]>([]);
  const announcerRef = useRef<HTMLDivElement>(null);

  // تحديث الإعلانات المرئية عند تغيير الإعلانات
  useEffect(() => {
    // اقتصار العدد على الحد الأقصى المحدد
    setVisibleAnnouncements(announcements.slice(0, maxAnnouncements));
  }, [announcements, maxAnnouncements]);

  // الحصول على أيقونة الإعلان حسب النوع
  const getAnnouncementIcon = (type: Announcement['type']) => {
    switch (type) {
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'info':
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  // تنسيق الوقت
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center">
          <BookOpen className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" aria-hidden="true" />
          {t('accessibility.screenReaderAnnouncements', 'إعلانات قارئ الشاشة')}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* عنصر الإعلان المخفي لقارئات الشاشة */}
        <div 
          ref={announcerRef}
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          {visibleAnnouncements.length > 0 && visibleAnnouncements[0].text}
        </div>
        
        {/* قائمة الإعلانات السابقة */}
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {visibleAnnouncements.length > 0 ? (
            visibleAnnouncements.map((announcement) => (
              <div 
                key={announcement.id}
                className={cn(
                  "p-2 rounded-md border flex items-start gap-2 text-sm",
                  announcement.type === 'success' && "border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800/30",
                  announcement.type === 'info' && "border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800/30",
                  announcement.type === 'warning' && "border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800/30",
                  announcement.type === 'error' && "border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800/30"
                )}
              >
                <div className="pt-0.5">
                  {getAnnouncementIcon(announcement.type)}
                </div>
                <div className="flex-1">
                  <p>{announcement.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTime(announcement.timestamp)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              {t('accessibility.noAnnouncements', 'لا توجد إعلانات حتى الآن.')}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// مكون مساعد لإضافة إعلانات جديدة
export function useScreenReaderAnnouncements(maxAnnouncements = 10) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  
  // إضافة إعلان جديد
  const announce = (text: string, type: Announcement['type'] = 'info') => {
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: new Date()
    };
    
    setAnnouncements(prev => [newAnnouncement, ...prev].slice(0, maxAnnouncements));
    
    // إعلان للقارئات الشاشية باستخدام وظيفة window.announce إذا كانت متاحة
    if (typeof window !== 'undefined' && window.announce) {
      window.announce(text, type === 'error' ? 'assertive' : 'polite');
    }
  };
  
  // مسح كل الإعلانات
  const clearAnnouncements = () => {
    setAnnouncements([]);
  };
  
  return {
    announcements,
    announce,
    clearAnnouncements
  };
}
