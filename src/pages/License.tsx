
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LicenseSelector } from "@/components/license/LicenseSelector";
import { ConfigSync } from "@/components/dev/ConfigSync";
import { SyncGuide } from "@/components/license/SyncGuide";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMode } from "@/context/ModeContext";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { CloudOff, RefreshCw, Cloud } from "lucide-react";
import { useSyncQueue } from "@/hooks/offline/useSyncQueue";
import { Button } from "@/components/ui/button";

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
      <div className="flex items-center justify-between mt-4 p-3 bg-gray-50 rounded-md border">
        <div className="flex items-center gap-2">
          {syncStatus === "offline" ? (
            <CloudOff className="h-5 w-5 text-gray-500" />
          ) : syncStatus === "syncing" ? (
            <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
          ) : (
            <Cloud className="h-5 w-5 text-green-500" />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium">
              {syncStatus === "offline" ? "غير متزامن" : syncStatus === "syncing" ? "جارٍ المزامنة..." : "متزامن"}
            </span>
            {lastSyncTime && syncStatus === "synced" && (
              <span className="text-xs text-muted-foreground">آخر مزامنة: {lastSyncTime}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">مزامنة تلقائية</span>
            <div
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                autoSyncEnabled ? "bg-green-500" : "bg-gray-300"
              }`}
              onClick={toggleAutoSync}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  autoSyncEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </div>
          <Button 
            size="sm" 
            onClick={syncNow} 
            disabled={syncStatus === "syncing" || isSyncing}
            className="ml-2 h-8"
          >
            {syncStatus === "syncing" ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <RefreshCw className="h-3 w-3 mr-1" />
                <span className="text-xs">تزامن الآن</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
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
              <Card className="border-indigo-200">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
                  <CardTitle>مزامنة تكوين العميل</CardTitle>
                  <CardDescription>
                    أدخل مفتاح المزامنة للحصول على أحدث الإعدادات من المطور
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      للحصول على أحدث التكوينات والإعدادات، اطلب مفتاح المزامنة من المطور واستخدم زر "تزامن" في شريط التنقل العلوي.
                    </p>
                    <div className="p-4 border rounded-md bg-blue-50 text-blue-800 text-sm">
                      يمكنك الآن مزامنة الإعدادات والتكوينات مع جهاز المطور حتى لو كنت في شبكة مختلفة أو دولة أخرى!
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-medium">مزامنة تلقائية</span>
                      <Badge className={autoSyncEnabled ? "bg-green-500" : "bg-gray-500"}>
                        {autoSyncEnabled ? "مفعل" : "معطل"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      عند تفعيل المزامنة التلقائية، سيقوم التطبيق بالتحقق من وجود تحديثات كل 5 دقائق تلقائيًا.
                    </p>
                  </div>
                </CardContent>
              </Card>
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
