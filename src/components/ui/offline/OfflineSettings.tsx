
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from 'react-i18next';
import { useAppPreferences } from '@/hooks/useAppPreferences';
import { Label } from '@/components/ui/label';
import { useOfflineMode } from '@/hooks/useOfflineMode';
import { DownloadCloud, HardDrive, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import { ArabicTextEnhancer } from '@/components/text/ArabicTextEnhancer';

export function OfflineSettings() {
  const { t } = useTranslation();
  const { preferences, updatePreference } = useAppPreferences();
  const { 
    isOnline,
    // Use optional chaining to safely access these properties
    cacheSize = 0, 
    clearCache = () => {}, 
    refreshCachedData = async () => {} 
  } = useOfflineMode();
  
  // معالج تبديل الوضع
  const handleToggle = (key: string, value: boolean) => {
    // التأكد من أن المفتاح موجود بالفعل في AppPreferences
    if (key === 'autoRefresh' || key === 'notificationsEnabled' || key === 'analyticsEnabled') {
      // يمكن استخدام as keyof AppPreferences هنا لأن المفاتيح هي بالفعل مفاتيح معروفة
      updatePreference(key as any, value);

      toast({
        title: value ? t('settings.enabled', 'تم التفعيل') : t('settings.disabled', 'تم التعطيل'),
        description: t('settings.preferenceSaved', 'تم حفظ تفضيلاتك بنجاح'),
      });
    }
  };

  // معالج تغيير معدل التحديث
  const handleRefreshRateChange = (value: number[]) => {
    updatePreference('refreshRate', value[0]);
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 dark:border-blue-900">
        <CardHeader className="pb-3">
          <CardTitle>
            <ArabicTextEnhancer>{t('offline.cacheSettings', 'إعدادات التخزين المؤقت')}</ArabicTextEnhancer>
          </CardTitle>
          <CardDescription>
            <ArabicTextEnhancer>
              {t('offline.cacheDescription', 'إدارة كيفية تخزين البيانات محلياً للاستخدام دون اتصال بالإنترنت')}
            </ArabicTextEnhancer>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-refresh" className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-blue-500" />
                <span>
                  <ArabicTextEnhancer>{t('offline.autoRefresh', 'تحديث تلقائي للبيانات')}</ArabicTextEnhancer>
                </span>
              </Label>
              <Switch
                id="auto-refresh"
                checked={preferences.autoRefresh}
                onCheckedChange={(value) => handleToggle('autoRefresh', value)}
                aria-label={t('offline.autoRefresh', 'تحديث تلقائي للبيانات')}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              <ArabicTextEnhancer>
                {t('offline.autoRefreshDescription', 'تحديث البيانات المخزنة مؤقتاً بشكل دوري عند وجود اتصال بالإنترنت')}
              </ArabicTextEnhancer>
            </p>
          </div>

          {preferences.autoRefresh && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="refresh-rate">
                  <ArabicTextEnhancer>{t('offline.refreshRate', 'معدل التحديث (دقائق)')}</ArabicTextEnhancer>
                </Label>
                <span className="font-medium">{preferences.refreshRate}</span>
              </div>
              <Slider
                id="refresh-rate"
                min={5}
                max={60}
                step={5}
                defaultValue={[preferences.refreshRate]}
                onValueChange={handleRefreshRateChange}
                aria-label={t('offline.refreshRate', 'معدل التحديث (دقائق)')}
              />
            </div>
          )}

          <div className="pt-2">
            <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-medium">
                    <ArabicTextEnhancer>{t('offline.cachedData', 'البيانات المخزنة مؤقتاً')}</ArabicTextEnhancer>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <ArabicTextEnhancer>
                      {cacheSize > 0
                        ? t('offline.currentCacheSize', 'الحجم الحالي: {{size}} ميجابايت', { size: cacheSize.toFixed(2) })
                        : t('offline.noCache', 'لا توجد بيانات مخزنة مؤقتاً')}
                    </ArabicTextEnhancer>
                  </div>
                </div>
              </div>
              <Button
                variant="default"
                size="sm"
                disabled={!isOnline}
                onClick={() => refreshCachedData()}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                <ArabicTextEnhancer>{t('common.refresh', 'تحديث')}</ArabicTextEnhancer>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/50 px-6 py-4 flex justify-between">
          <Button
            variant="outline"
            className="flex-1 mr-2"
            onClick={() => clearCache()}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            <ArabicTextEnhancer>{t('offline.clearCache', 'مسح التخزين المؤقت')}</ArabicTextEnhancer>
          </Button>
          <Button
            variant={isOnline ? "default" : "destructive"}
            className="flex-1 ml-2"
            disabled={!isOnline}
          >
            <DownloadCloud className="h-4 w-4 mr-2" />
            <ArabicTextEnhancer>{t('offline.prepareOffline', 'الاستعداد لوضع عدم الاتصال')}</ArabicTextEnhancer>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
