import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/hooks/state/use-app-state";
import { useTranslation } from "react-i18next";
import { useNetworkStatus } from "@/hooks/state";
import { toast } from "sonner";
import { useA11y } from "@/hooks/useA11y";

/**
 * إعدادات وضع عدم الاتصال - تتيح للمستخدمين التحكم في سلوك التطبيق في وضع عدم الاتصال
 */
export function OfflineSettings() {
  const { t } = useTranslation();
  const { isOnline } = useNetworkStatus();
  const { clearCache } = useAppState();
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState(false);
  const { preferences, setPreference } = useAppState(state => ({
    preferences: state.preferences,
    setPreference: state.setPreference
  }));
  const { announce } = useA11y();
  
  // تحميل حالة المزامنة التلقائية من التفضيلات
  useEffect(() => {
    setIsAutoSyncEnabled(preferences.autoRefresh);
  }, [preferences.autoRefresh]);
  
  // تبديل حالة المزامنة التلقائية
  const toggleAutoSync = useCallback((checked: boolean) => {
    // تغيير استخدام المفتاح غير المدعوم "autoRefresh" إلى المفتاح المدعوم في واجهة AppPreferences
    setPreference("autoRefresh", checked);
    setIsAutoSyncEnabled(checked);
    
    // إعلان حالة المزامنة التلقائية الجديدة
    if (announce) {
      if (checked) {
        announce(t('offline.autoSyncEnabled', 'تم تفعيل المزامنة التلقائية'), 'polite');
      } else {
        announce(t('offline.autoSyncDisabled', 'تم تعطيل المزامنة التلقائية'), 'polite');
      }
    }
  }, [setPreference, announce, t]);
  
  // مسح ذاكرة التخزين المؤقت
  const handleClearCache = async () => {
    clearCache();
    
    // إعلان مسح ذاكرة التخزين المؤقت
    if (announce) {
      announce(t('offline.cacheCleared', 'تم مسح ذاكرة التخزين المؤقت'), 'polite');
    }
    
    toast.success(t('offline.cacheCleared', 'تم مسح ذاكرة التخزين المؤقت'));
  };
  
  return (
    <Card className="shadow-md border-blue-100 dark:border-blue-900">
      <CardHeader>
        <CardTitle>{t('offline.title', 'إعدادات وضع عدم الاتصال')}</CardTitle>
        <CardDescription>
          {t('offline.description', 'التحكم في سلوك التطبيق عند عدم الاتصال بالإنترنت')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-sync">
            {t('offline.autoSyncLabel', 'المزامنة التلقائية')}
          </Label>
          <Switch
            id="auto-sync"
            checked={isAutoSyncEnabled}
            onCheckedChange={toggleAutoSync}
            disabled={!isOnline}
          />
        </div>
        
        <p className="text-sm text-muted-foreground">
          {t('offline.autoSyncDescription', 'عند التفعيل، سيحاول التطبيق مزامنة البيانات تلقائيًا عند الاتصال بالإنترنت.')}
        </p>
        
        <Button
          onClick={handleClearCache}
          variant="default"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          {t('offline.clearCacheButton', 'مسح ذاكرة التخزين المؤقت')}
        </Button>
        
        <p className="text-sm text-muted-foreground">
          {t('offline.clearCacheDescription', 'إزالة جميع البيانات المخزنة مؤقتًا لتحرير مساحة.')}
        </p>
      </CardContent>
    </Card>
  );
}
