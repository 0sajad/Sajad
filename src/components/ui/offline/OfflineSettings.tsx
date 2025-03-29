
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Loader2, RefreshCw, Trash2, Settings, Wifi, WifiOff, InfoIcon } from "lucide-react";
import { useOfflineSupport } from '@/hooks/useOfflineSupport';
import { ArabicTextEnhancer } from '@/components/text/ArabicTextEnhancer';
import { useAppState } from '@/hooks/state/use-app-state';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * مكون إعدادات وضع عدم الاتصال - يتيح للمستخدم إدارة تفضيلات عدم الاتصال والإجراءات المعلقة
 */
export function OfflineSettings() {
  const { t } = useTranslation();
  const { 
    isOnline, 
    hasPendingSync, 
    pendingItemsCount, 
    pendingActions, 
    isSyncing, 
    syncOfflineData, 
    checkConnection 
  } = useOfflineSupport();
  
  const [isClearing, setIsClearing] = useState(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  const [offlineCacheSize, setOfflineCacheSize] = useState(50);
  
  // خصائص من مخزن حالة التطبيق
  const preferences = useAppState(state => state.preferences);
  const setPreference = useAppState(state => state.setPreference);
  
  // تغيير إعدادات وضع عدم الاتصال
  const handleAutoSyncChange = (checked: boolean) => {
    setAutoSyncEnabled(checked);
    setPreference('autoRefresh', checked);
    toast.success(
      checked 
        ? t('settings.autoSyncEnabled', 'تم تفعيل المزامنة التلقائية') 
        : t('settings.autoSyncDisabled', 'تم تعطيل المزامنة التلقائية')
    );
  };
  
  // محاكاة مسح الإجراءات المعلقة
  const handleClearPendingActions = async () => {
    setIsClearing(true);
    
    try {
      // محاكاة تأخير المسح
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.removeItem('pendingActions');
      toast.success(t('settings.pendingActionsCleared', 'تم مسح جميع الإجراءات المعلقة'));
    } catch (error) {
      console.error('Error clearing pending actions:', error);
      toast.error(t('settings.errorClearingActions', 'حدث خطأ أثناء مسح الإجراءات المعلقة'));
    } finally {
      setIsClearing(false);
    }
  };
  
  // تنسيق حجم الذاكرة المؤقتة
  const formatCacheSize = (sizeInMB: number) => {
    if (sizeInMB < 1) {
      return `${(sizeInMB * 1024).toFixed(0)} KB`;
    }
    return `${sizeInMB.toFixed(0)} MB`;
  };
  
  // تنسيق تاريخ الإجراء
  const formatActionDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                <ArabicTextEnhancer>{t('settings.offlineMode', 'وضع عدم الاتصال')}</ArabicTextEnhancer>
              </CardTitle>
              <CardDescription>
                <ArabicTextEnhancer>{t('settings.offlineModeDesc', 'إدارة كيفية عمل التطبيق عند عدم وجود اتصال بالإنترنت')}</ArabicTextEnhancer>
              </CardDescription>
            </div>
            <Badge 
              variant={isOnline ? "success" : "destructive"}
              className="px-3 py-1"
            >
              {isOnline ? (
                <>
                  <Wifi className="h-3.5 w-3.5 mr-1.5" />
                  <ArabicTextEnhancer>{t('network.online', 'متصل')}</ArabicTextEnhancer>
                </>
              ) : (
                <>
                  <WifiOff className="h-3.5 w-3.5 mr-1.5" />
                  <ArabicTextEnhancer>{t('network.offline', 'غير متصل')}</ArabicTextEnhancer>
                </>
              )}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>
                <ArabicTextEnhancer>{t('settings.autoSync', 'مزامنة تلقائية')}</ArabicTextEnhancer>
              </Label>
              <div className="text-sm text-muted-foreground">
                <ArabicTextEnhancer>{t('settings.autoSyncDesc', 'مزامنة البيانات تلقائيًا عند استعادة الاتصال')}</ArabicTextEnhancer>
              </div>
            </div>
            <Switch 
              checked={autoSyncEnabled} 
              onCheckedChange={handleAutoSyncChange} 
              aria-label={t('settings.autoSync', 'مزامنة تلقائية')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cache-size">
              <ArabicTextEnhancer>{t('settings.offlineCacheSize', 'حجم ذاكرة التخزين المؤقت')}</ArabicTextEnhancer>
            </Label>
            <div className="flex items-center gap-2">
              <Input 
                id="cache-size"
                type="range" 
                min="10" 
                max="500" 
                step="10"
                value={offlineCacheSize}
                onChange={(e) => setOfflineCacheSize(parseInt(e.target.value))}
                className="w-full"
              />
              <span className="w-14 text-center font-mono">
                {formatCacheSize(offlineCacheSize)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              <ArabicTextEnhancer>{t('settings.offlineCacheSizeDesc', 'حجم البيانات التي سيتم تخزينها للاستخدام في وضع عدم الاتصال')}</ArabicTextEnhancer>
            </div>
          </div>
          
          <div className="pt-2">
            <h3 className="text-sm font-medium mb-2">
              <ArabicTextEnhancer>{t('settings.offlineCapabilities', 'القدرات في وضع عدم الاتصال')}</ArabicTextEnhancer>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-start gap-2">
                <div className={`rounded-full w-2 h-2 mt-1.5 ${isOnline ? 'bg-green-500' : 'bg-amber-500'}`} />
                <div className="text-sm">
                  <ArabicTextEnhancer>{t('settings.offlineBasicTools', 'أدوات الشبكة الأساسية')}</ArabicTextEnhancer>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className={`rounded-full w-2 h-2 mt-1.5 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                <div className="text-sm">
                  <ArabicTextEnhancer>{t('settings.offlineAdvancedTools', 'أدوات الشبكة المتقدمة')}</ArabicTextEnhancer>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className={`rounded-full w-2 h-2 mt-1.5 ${isOnline ? 'bg-green-500' : 'bg-green-500'}`} />
                <div className="text-sm">
                  <ArabicTextEnhancer>{t('settings.offlineSavedReports', 'التقارير المحفوظة')}</ArabicTextEnhancer>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className={`rounded-full w-2 h-2 mt-1.5 ${isOnline ? 'bg-green-500' : 'bg-amber-500'}`} />
                <div className="text-sm">
                  <ArabicTextEnhancer>{t('settings.offlineDocumentation', 'الوثائق والمساعدة')}</ArabicTextEnhancer>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button 
              variant="outline" 
              onClick={checkConnection}
              className="w-full"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              <ArabicTextEnhancer>{t('settings.checkConnection', 'فحص الاتصال')}</ArabicTextEnhancer>
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => toast.info(t('settings.offlineModeInfo', 'وضع عدم الاتصال يتيح لك استخدام التطبيق بدون إنترنت'))}
              className="w-full"
            >
              <InfoIcon className="h-4 w-4 mr-2" />
              <ArabicTextEnhancer>{t('settings.learnMore', 'معرفة المزيد')}</ArabicTextEnhancer>
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {(hasPendingSync || pendingItemsCount > 0) && (
        <Card>
          <CardHeader>
            <CardTitle>
              <ArabicTextEnhancer>{t('settings.pendingActions', 'الإجراءات المعلقة')}</ArabicTextEnhancer>
            </CardTitle>
            <CardDescription>
              <ArabicTextEnhancer>
                {t('settings.pendingActionsDesc', 'إجراءات سيتم تنفيذها عند استعادة الاتصال بالإنترنت')}
              </ArabicTextEnhancer>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingItemsCount > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {pendingActions.map((action, index) => (
                  <TooltipProvider key={action.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center justify-between p-2 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors">
                          <div>
                            <div className="font-medium text-sm">{action.type}</div>
                            <div className="text-xs text-muted-foreground">{formatActionDate(action.timestamp)}</div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {t('settings.pendingSync', 'في انتظار المزامنة')}
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-xs">
                          <div className="font-bold mb-1">
                            <ArabicTextEnhancer>{t('settings.actionDetails', 'تفاصيل الإجراء')}</ArabicTextEnhancer>
                          </div>
                          <pre className="p-1 bg-black/10 rounded">
                            {JSON.stringify(action.data, null, 2).substring(0, 150)}
                            {JSON.stringify(action.data, null, 2).length > 150 ? '...' : ''}
                          </pre>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            ) : (
              <Alert variant="default">
                <AlertDescription>
                  <ArabicTextEnhancer>{t('settings.noPendingActions', 'لا توجد إجراءات معلقة')}</ArabicTextEnhancer>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleClearPendingActions} 
              disabled={isClearing || pendingItemsCount === 0}
            >
              {isClearing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              <ArabicTextEnhancer>{t('settings.clearAll', 'مسح الكل')}</ArabicTextEnhancer>
            </Button>
            
            <Button 
              variant="default" 
              onClick={syncOfflineData} 
              disabled={isSyncing || !isOnline || pendingItemsCount === 0}
            >
              {isSyncing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  <ArabicTextEnhancer>{t('settings.syncing', 'جارِ المزامنة...')}</ArabicTextEnhancer>
                </>
              ) : (
                <>
                  <Settings className="h-4 w-4 mr-2" />
                  <ArabicTextEnhancer>{t('settings.syncNow', 'مزامنة الآن')}</ArabicTextEnhancer>
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
