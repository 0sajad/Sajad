
import React, { useState } from "react";
import { useMode } from "@/context/ModeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CloudUpload, CloudDownload, RefreshCw, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/components/ui/use-toast";

export function ConfigSync() {
  const { t } = useTranslation();
  const { features, applyConfiguration, isSyncing } = useMode();
  const { toast } = useToast();
  const [syncState, setSyncState] = useState<'idle' | 'uploading' | 'downloading' | 'success' | 'error'>('idle');
  const [syncProgress, setSyncProgress] = useState(0);
  const [syncKey, setSyncKey] = useState("");
  const [lastSyncDate, setLastSyncDate] = useState<Date | null>(null);
  const [showSyncKey, setShowSyncKey] = useState(false);

  // محاكاة رفع التكوين إلى الخادم
  const uploadConfig = async () => {
    try {
      setSyncState('uploading');
      
      // محاكاة التقدم
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(r => setTimeout(r, 200));
        setSyncProgress(i);
      }
      
      // إنشاء مفتاح تزامن عشوائي
      const randomKey = Math.random().toString(36).substring(2, 10).toUpperCase();
      setSyncKey(randomKey);
      
      // حفظ التكوين في التخزين المحلي (في تطبيق حقيقي سيتم الإرسال إلى خادم)
      localStorage.setItem("octa-sync-config", JSON.stringify({
        features,
        timestamp: new Date().toISOString(),
        syncKey: randomKey
      }));
      
      setSyncState('success');
      setLastSyncDate(new Date());
      toast({
        title: t('developer.sync.uploadSuccess', 'تم رفع التكوين بنجاح'),
        description: t('developer.sync.syncKeyGenerated', 'تم إنشاء مفتاح المزامنة: ') + randomKey,
      });
      
      // إعادة التعيين بعد 3 ثوانٍ
      setTimeout(() => {
        setSyncState('idle');
        setSyncProgress(0);
      }, 3000);
      
    } catch (error) {
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
      
      // محاكاة التقدم
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(r => setTimeout(r, 200));
        setSyncProgress(i);
      }
      
      // استرجاع التكوين من التخزين المحلي (في تطبيق حقيقي سيتم الجلب من خادم)
      const savedConfig = localStorage.getItem("octa-sync-config");
      
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        
        if (parsedConfig.syncKey === syncKey.trim()) {
          // تطبيق التكوين
          applyConfiguration();
          
          setSyncState('success');
          setLastSyncDate(new Date(parsedConfig.timestamp));
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
      } else {
        setSyncState('error');
        toast({
          title: t('developer.sync.noConfigFound', 'لم يتم العثور على تكوين'),
          description: t('developer.sync.uploadFirst', 'يجب رفع التكوين أولاً قبل محاولة التنزيل'),
          variant: "destructive",
        });
      }
      
      // إعادة التعيين بعد 3 ثوانٍ
      setTimeout(() => {
        setSyncState('idle');
        setSyncProgress(0);
      }, 3000);
      
    } catch (error) {
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
              {t('developer.sync.uploadConfig', 'رفع التكوين')}
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
