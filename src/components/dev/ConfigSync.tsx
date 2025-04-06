
import React, { useState, useEffect } from "react";
import { useMode } from "@/context/ModeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CloudUpload, CloudDownload, RefreshCw, Check, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function ConfigSync() {
  const { t } = useTranslation();
  const { features, applyConfiguration, isSyncing } = useMode();
  const { toast } = useToast();
  const [syncState, setSyncState] = useState<'idle' | 'uploading' | 'downloading' | 'success' | 'error'>('idle');
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncKey, setSyncKey] = useState("");
  const [lastSyncDate, setLastSyncDate] = useState<Date | null>(null);
  const [showSyncKey, setShowSyncKey] = useState(false);
  const [useOnlineSync, setUseOnlineSync] = useState<boolean>(() => {
    return localStorage.getItem("octa-use-online-sync") === "true";
  });
  const [binId, setBinId] = useState<string>(() => {
    return localStorage.getItem("octa-sync-bin-id") || "";
  });

  // استعادة آخر وقت مزامنة من التخزين المحلي
  useEffect(() => {
    const storedTimeStr = localStorage.getItem("octa-last-sync-time");
    if (storedTimeStr) {
      setLastSyncDate(new Date(storedTimeStr));
    }
    
    const storedSyncKey = localStorage.getItem("octa-sync-key");
    if (storedSyncKey) {
      setSyncKey(storedSyncKey);
    }
  }, []);

  // تبديل حالة المزامنة عبر الإنترنت
  const toggleOnlineSync = () => {
    const newValue = !useOnlineSync;
    setUseOnlineSync(newValue);
    localStorage.setItem("octa-use-online-sync", newValue.toString());
    
    toast({
      title: newValue ? "تم تفعيل المزامنة عبر الإنترنت" : "تم التبديل إلى المزامنة المحلية",
      description: newValue 
        ? "سيتم حفظ التكوين على خادم JSONBin.io المجاني" 
        : "سيتم حفظ التكوين محليًا فقط",
    });
  };

  // محاكاة رفع التكوين إلى الخادم باستخدام JSONBin.io
  const uploadConfig = async () => {
    try {
      setSyncState('uploading');
      
      // تحديث حالة التقدم
      for (let i = 0; i <= 50; i += 10) {
        await new Promise(r => setTimeout(r, 100));
        setSyncProgress(i);
      }
      
      // إنشاء مفتاح تزامن عشوائي إذا لم يكن موجودًا
      let key = syncKey;
      if (!key) {
        key = Math.random().toString(36).substring(2, 10).toUpperCase();
        setSyncKey(key);
        localStorage.setItem("octa-sync-key", key);
      }
      
      // إنشاء كائن التكوين
      const configData = {
        features,
        syncKey: key,
        timestamp: new Date().toISOString(),
        version: "1.0"
      };
      
      // حفظ التكوين في التخزين المحلي
      localStorage.setItem("octa-sync-config", JSON.stringify(configData));
      localStorage.setItem("octa-sync-timestamp", new Date().toISOString());
      
      // إذا كانت المزامنة عبر الإنترنت مفعلة، قم برفع التكوين إلى JSONBin.io
      if (useOnlineSync) {
        setSyncProgress(60);
        
        let url = 'https://api.jsonbin.io/v3/b';
        let method = 'POST';
        
        // إذا كان لدينا معرف bin موجود، قم بتحديثه بدلاً من إنشاء جديد
        if (binId) {
          url = `https://api.jsonbin.io/v3/b/${binId}`;
          method = 'PUT';
        }
        
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'X-Bin-Private': 'false'
          },
          body: JSON.stringify(configData)
        });
        
        if (!response.ok) {
          throw new Error("فشل في رفع التكوين إلى الخادم");
        }
        
        const result = await response.json();
        
        // حفظ معرف Bin للاستخدام المستقبلي
        if (!binId && result.metadata?.id) {
          setBinId(result.metadata.id);
          localStorage.setItem("octa-sync-bin-id", result.metadata.id);
        }
        
        setSyncProgress(100);
      } else {
        // إذا كانت المزامنة المحلية فقط
        await new Promise(r => setTimeout(r, 300));
        setSyncProgress(100);
      }
      
      // تحديث حالة المزامنة
      setSyncState('success');
      setLastSyncDate(new Date());
      localStorage.setItem("octa-last-sync-time", new Date().toLocaleString());
      
      toast({
        title: t('developer.sync.uploadSuccess', 'تم رفع التكوين بنجاح'),
        description: useOnlineSync 
          ? t('developer.sync.syncKeyGeneratedOnline', 'تم إنشاء مفتاح المزامنة ورفعه عبر الإنترنت: ') + key
          : t('developer.sync.syncKeyGenerated', 'تم إنشاء مفتاح المزامنة: ') + key,
      });
      
      // إعادة التعيين بعد 3 ثوانٍ
      setTimeout(() => {
        setSyncState('idle');
        setSyncProgress(0);
      }, 3000);
      
    } catch (error) {
      console.error("خطأ في رفع التكوين:", error);
      setSyncState('error');
      toast({
        title: t('developer.sync.uploadFailed', 'فشل رفع التكوين'),
        description: t('developer.sync.tryAgain', 'يرجى المحاولة مرة أخرى لاحقًا'),
        variant: "destructive",
      });
    }
  };

  // محاكاة تنزيل التكوين من الخادم
  const downloadConfig = async () => {
    try {
      if (!syncKey.trim()) {
        toast({
          title: t('developer.sync.syncKeyRequired', 'مفتاح المزامنة مطلوب'),
          description: t('developer.sync.enterSyncKey', 'يرجى إدخال مفتاح المزامنة للتنزيل'),
          variant: "destructive",
        });
        return;
      }
      
      setSyncState('downloading');
      
      // تحديث حالة التقدم
      for (let i = 0; i <= 40; i += 10) {
        await new Promise(r => setTimeout(r, 100));
        setSyncProgress(i);
      }
      
      let configData;
      
      // إذا كانت المزامنة عبر الإنترنت مفعلة وهناك معرف bin
      if (useOnlineSync && binId) {
        setSyncProgress(50);
        
        const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error("فشل في الوصول إلى بيانات المزامنة");
        }
        
        const result = await response.json();
        configData = result.record;
        
        setSyncProgress(80);
      } else {
        // استخدام التخزين المحلي
        const savedConfig = localStorage.getItem("octa-sync-config");
        if (!savedConfig) {
          throw new Error("لم يتم العثور على تكوين محلي");
        }
        
        configData = JSON.parse(savedConfig);
        setSyncProgress(80);
      }
      
      // التحقق من مفتاح المزامنة
      if (configData && configData.syncKey === syncKey.trim()) {
        // تطبيق التكوين
        localStorage.setItem("octa-sync-config", JSON.stringify(configData));
        localStorage.setItem("octa-sync-timestamp", new Date().toISOString());
        
        applyConfiguration();
        
        setSyncState('success');
        setLastSyncDate(new Date());
        localStorage.setItem("octa-last-sync-time", new Date().toLocaleString());
        
        toast({
          title: t('developer.sync.downloadSuccess', 'تم تنزيل التكوين بنجاح'),
          description: t('developer.sync.configApplied', 'تم تطبيق التكوين الجديد'),
        });
      } else {
        setSyncState('error');
        toast({
          title: t('developer.sync.invalidSyncKey', 'مفتاح المزامنة غير صالح'),
          description: t('developer.sync.checkSyncKey', 'يرجى التحقق من مفتاح المزامنة وإعادة المحاولة'),
          variant: "destructive",
        });
      }
      
      setSyncProgress(100);
      
      // إعادة التعيين بعد 3 ثوانٍ
      setTimeout(() => {
        setSyncState('idle');
        setSyncProgress(0);
      }, 3000);
      
    } catch (error) {
      console.error("خطأ في تنزيل التكوين:", error);
      setSyncState('error');
      toast({
        title: t('developer.sync.downloadFailed', 'فشل تنزيل التكوين'),
        description: t('developer.sync.tryAgain', 'يرجى المحاولة مرة أخرى لاحقًا'),
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-octaBlue-200 shadow-md">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-t-lg">
        <CardTitle className="font-tajawal text-octaBlue-800">
          {t('developer.sync.title', 'مزامنة التكوين')}
        </CardTitle>
        <CardDescription className="font-tajawal">
          {t('developer.sync.description', 'نقل التكوين بين الأجهزة البعيدة')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-4 space-y-4">
        <Alert className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertTitle className="font-tajawal text-blue-800">
            {t('developer.sync.howItWorks', 'كيف تعمل المزامنة')}
          </AlertTitle>
          <AlertDescription className="text-blue-700 text-sm">
            {t('developer.sync.howItWorksDesc', 'قم برفع التكوين الحالي للحصول على مفتاح مزامنة. شارك هذا المفتاح مع العملاء البعيدين ليتمكنوا من تنزيل نفس التكوين على أجهزتهم.')}
          </AlertDescription>
        </Alert>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-indigo-600" />
            <span className="text-sm">مزامنة عبر الإنترنت</span>
          </div>
          <Switch
            checked={useOnlineSync}
            onCheckedChange={toggleOnlineSync}
          />
        </div>
        
        {useOnlineSync && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <p className="text-sm text-green-700">
              المزامنة عبر الإنترنت مفعلة! سيتم حفظ التكوين على خادم JSONBin.io المجاني ويمكن للعملاء 
              مزامنة التكوين من أي مكان في العالم باستخدام مفتاح المزامنة.
            </p>
          </div>
        )}
        
        {syncState !== 'idle' && (
          <div className="space-y-2 my-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {syncState === 'uploading' 
                  ? t('developer.sync.uploading', 'جارٍ رفع التكوين...') 
                  : syncState === 'downloading' 
                    ? t('developer.sync.downloading', 'جارٍ تنزيل التكوين...') 
                    : syncState === 'success' 
                      ? t('developer.sync.completed', 'اكتملت العملية') 
                      : t('developer.sync.error', 'حدث خطأ')}
              </span>
              <span className="text-sm font-medium">{syncProgress}%</span>
            </div>
            <Progress value={syncProgress} className={
              syncState === 'error' ? "bg-red-100" : 
              syncState === 'success' ? "bg-green-100" : "bg-blue-100"
            } />
          </div>
        )}
        
        {syncState === 'success' && syncKey && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3 my-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">{t('developer.sync.syncKey', 'مفتاح المزامنة')}:</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSyncKey(!showSyncKey)}
                className="text-xs h-6"
              >
                {showSyncKey ? t('developer.sync.hide', 'إخفاء') : t('developer.sync.show', 'إظهار')}
              </Button>
            </div>
            <div className="mt-1 font-mono bg-white p-2 rounded border border-green-200 text-center">
              {showSyncKey ? syncKey : '•'.repeat(syncKey.length)}
            </div>
            <p className="text-xs text-green-700 mt-2">
              {t('developer.sync.shareKeyDesc', 'شارك هذا المفتاح مع العملاء البعيدين ليتمكنوا من تنزيل نفس التكوين')}
            </p>
          </div>
        )}
        
        <div className="flex flex-col space-y-4">
          <div className="flex gap-4">
            <Button
              className="flex-1 bg-indigo-600 hover:bg-indigo-700"
              onClick={uploadConfig}
              disabled={syncState !== 'idle' && syncState !== 'success' && syncState !== 'error'}
            >
              <CloudUpload className="h-4 w-4 mr-2" />
              {useOnlineSync ? "رفع التكوين للإنترنت" : t('developer.sync.uploadConfig', 'رفع التكوين')}
            </Button>
            
            <Button
              className="flex-1"
              variant="outline"
              onClick={downloadConfig}
              disabled={syncState !== 'idle' && syncState !== 'success' && syncState !== 'error'}
            >
              <CloudDownload className="h-4 w-4 mr-2" />
              {t('developer.sync.downloadConfig', 'تنزيل التكوين')}
            </Button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder={t('developer.sync.enterSyncKey', 'أدخل مفتاح المزامنة للتنزيل')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={syncKey}
              onChange={(e) => setSyncKey(e.target.value)}
              disabled={syncState === 'uploading' || syncState === 'downloading'}
            />
          </div>
        </div>
        
        {lastSyncDate && (
          <p className="text-xs text-muted-foreground text-center mt-4">
            {t('developer.sync.lastSync', 'آخر مزامنة')}: {lastSyncDate.toLocaleString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
