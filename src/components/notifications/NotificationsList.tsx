
import React from "react";
import { useTranslation } from "react-i18next";
import { Bell, Info, AlertTriangle, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  time: string;
  read: boolean;
}

export function NotificationsList() {
  const { t } = useTranslation();
  
  // عيّنة من الإشعارات - في التطبيق الحقيقي ستأتي من مخزن الحالة أو API
  const notifications: NotificationItem[] = [
    {
      id: "1",
      title: "اكتمال التحليل",
      message: "تم اكتمال تحليل الشبكة بنجاح",
      type: "success",
      time: "منذ 5 دقائق",
      read: false
    },
    {
      id: "2",
      title: "تحذير نشاط",
      message: "تم اكتشاف نشاط مشبوه على الشبكة",
      type: "warning",
      time: "منذ ساعة",
      read: false
    },
    {
      id: "3",
      title: "تحديث متوفر",
      message: "هناك تحديث جديد متوفر للنظام",
      type: "info",
      time: "منذ 3 ساعات",
      read: true
    }
  ];
  
  const getIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-950 rounded-md overflow-hidden">
      <div className="p-4 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Bell className="h-5 w-5" />
            <h3 className="font-semibold">{t('notifications.title', 'الإشعارات')}</h3>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-white/20">
            {notifications.filter(n => !n.read).length} جديد
          </span>
        </div>
      </div>
      
      <ScrollArea className="h-[300px]">
        {notifications.length > 0 ? (
          <div className="py-2">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 border-b last:border-0 ${
                  !notification.read ? "bg-blue-50/60 dark:bg-blue-900/20" : ""
                }`}
              >
                <div className="flex items-start">
                  <div className="mr-3 rtl:mr-0 rtl:ml-3 mt-0.5">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-20" />
            <p>{t('notifications.empty', 'لا توجد إشعارات')}</p>
          </div>
        )}
      </ScrollArea>
      
      <div className="p-2 border-t">
        <button className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline py-1">
          {t('notifications.markAllRead', 'تعيين الكل كمقروء')}
        </button>
      </div>
    </div>
  );
}
