
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LicenseSelector } from "@/components/license/LicenseSelector";
import { ConfigSync } from "@/components/dev/ConfigSync";
import { SyncGuide } from "@/components/license/SyncGuide";
import { SyncStatus } from "@/components/license/SyncStatus";
import { ClientSyncPanel } from "@/components/license/ClientSyncPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMode } from "@/context/ModeContext";
import { useToast } from "@/components/ui/use-toast";
import { useSyncQueue } from "@/hooks/offline/useSyncQueue";

const License = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { mode, setMode, features, isSyncing } = useMode();
  // إضافة حالة للمزامنة التلقائية
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(() => {
    return localStorage.getItem("octa-auto-sync") === "true";
  });
  const [syncStatus, setSyncStatus] = useState<"offline" | "syncing" | "synced">("offline");
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const { queueLength, syncQueue } = useSyncQueue();
  
  // حالة نوع الترخيص
  const [licenseType, setLicenseType] = useState<"client" | "developer">(mode);
  // حالة التبويب النشط
  const [activeTab, setActiveTab] = useState<"sync" | "guide">("sync");

  // تحديث نوع الترخيص عند تغيير وضع التطبيق
  useEffect(() => {
    setLicenseType(mode);
  }, [mode]);

  // معالجة تغيير نوع الترخيص
  const handleLicenseChange = (value: string) => {
    setMode(value as "client" | "developer");
    setLicenseType(value as "client" | "developer");
  };

  // استعادة آخر وقت مزامنة من التخزين المحلي
  useEffect(() => {
    const storedTime = localStorage.getItem("octa-last-sync-time");
    if (storedTime) {
      setLastSyncTime(storedTime);
      setSyncStatus("synced");
    }
  }, []);

  // تفعيل المزامنة التلقائية
  useEffect(() => {
    if (autoSyncEnabled) {
      const syncInterval = setInterval(() => {
        checkForUpdates();
      }, 5 * 60 * 1000); // كل 5 دقائق
      
      return () => clearInterval(syncInterval);
    }
  }, [autoSyncEnabled]);

  // تبديل حالة المزامنة التلقائية
  const toggleAutoSync = () => {
    const newValue = !autoSyncEnabled;
    setAutoSyncEnabled(newValue);
    localStorage.setItem("octa-auto-sync", newValue.toString());
    
    toast({
      title: newValue ? "تم تفعيل المزامنة التلقائية" : "تم تعطيل المزامنة التلقائية",
      description: newValue ? "سيتم مزامنة الإعدادات تلقائيًا كل 5 دقائق" : "لن يتم مزامنة الإعدادات تلقائيًا",
    });
  };

  // التحقق من وجود تحديثات
  const checkForUpdates = async () => {
    if (syncStatus === "syncing") return;
    
    setSyncStatus("syncing");
    try {
      // محاولة الوصول إلى المزامنة عبر JSONBin.io العام
      const binId = localStorage.getItem("octa-sync-bin-id");
      if (!binId) {
        console.log("لا يوجد معرف مخزن للمزامنة");
        setSyncStatus("offline");
        return;
      }

      const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error("فشل في الوصول إلى بيانات المزامنة");
      }
      
      const data = await response.json();
      
      // التحقق من وجود تحديثات
      const serverTimestamp = data.metadata?.createdAt || '';
      const localTimestamp = localStorage.getItem("octa-sync-timestamp") || '';
      
      if (serverTimestamp > localTimestamp) {
        // تطبيق التحديثات إذا كانت جديدة
        localStorage.setItem("octa-sync-config", JSON.stringify(data.record));
        localStorage.setItem("octa-sync-timestamp", serverTimestamp);
        localStorage.setItem("octa-last-sync-time", new Date().toLocaleString());
        setLastSyncTime(new Date().toLocaleString());
        
        // إرسال حدث لتطبيق التكوين
        document.dispatchEvent(new CustomEvent('configurationUpdate', { 
          detail: { features: data.record.features }
        }));
        
        toast({
          title: "تم تحديث التكوين",
          description: "تم تطبيق أحدث الإعدادات من المزامنة",
        });
      }
      
      setSyncStatus("synced");
    } catch (error) {
      console.error("خطأ في المزامنة:", error);
      setSyncStatus("offline");
      
      // محاولة مزامنة البيانات المخزنة محليًا
      if (queueLength > 0) {
        await syncQueue();
      }
    }
  };

  // تنفيذ المزامنة اليدوية
  const syncNow = async () => {
    await checkForUpdates();
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">إدارة الترخيص</h1>
      
      <LicenseSelector 
        value={licenseType} 
        onChange={handleLicenseChange} 
      />
      
      {/* قسم حالة المزامنة */}
      <SyncStatus 
        syncStatus={syncStatus}
        lastSyncTime={lastSyncTime}
        autoSyncEnabled={autoSyncEnabled}
        toggleAutoSync={toggleAutoSync}
        syncNow={syncNow}
      />
      
      {/* قسم المزامنة عند اختيار وضع المطور */}
      {licenseType === "developer" && (
        <div className="mt-8">
          <Card className="border-indigo-200">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
              <CardTitle>مزامنة التكوين</CardTitle>
              <CardDescription>
                استخدم هذه الأداة لمشاركة إعدادات وضع المطور مع العملاء على أجهزة بعيدة
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ConfigSync />
            </CardContent>
          </Card>
          
          {/* إضافة دليل المزامنة المصور */}
          <SyncGuide />
        </div>
      )}
      
      {/* قسم المزامنة عند اختيار وضع العميل */}
      {licenseType === "client" && (
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "sync" | "guide")}>
            <TabsList className="mb-4">
              <TabsTrigger value="sync">إعدادات المزامنة</TabsTrigger>
              <TabsTrigger value="guide">دليل المزامنة المصور</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sync">
              <ClientSyncPanel autoSyncEnabled={autoSyncEnabled} />
            </TabsContent>
            
            <TabsContent value="guide">
              <SyncGuide />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default License;
