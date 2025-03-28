
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Home, RefreshCw, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Copy, X } from 'lucide-react';

interface FallbackErrorPageProps {
  error?: Error;
  resetError?: () => void;
}

export function FallbackErrorPage({ error, resetError }: FallbackErrorPageProps) {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);
  
  const handleRefresh = () => {
    // Clear caches if possible
    if ('caches' in window) {
      try {
        caches.keys().then(cacheNames => {
          cacheNames.forEach(cacheName => {
            caches.delete(cacheName);
          });
        });
      } catch (e) {
        console.error('Failed to clear caches', e);
      }
    }
    
    // Clear local storage related to app state
    try {
      localStorage.removeItem('app-store');
    } catch (e) {
      console.error('Failed to clear local storage', e);
    }
    
    // Reload the page
    window.location.reload();
  };
  
  const copyErrorToClipboard = () => {
    if (!error) return;
    
    const errorText = `
Error: ${error.message}
Stack: ${error.stack}
    `;
    
    navigator.clipboard.writeText(errorText).then(() => {
      toast({
        title: t('error.copied', 'تم النسخ'),
        description: t('error.clipboardCopy', 'تم نسخ تفاصيل الخطأ إلى الحافظة'),
        duration: 3000,
      });
    });
  };
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-red-50 p-6 text-center border-b border-red-100">
          <div className="inline-flex items-center justify-center bg-red-100 rounded-full p-3 mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('error.title', 'حدث خطأ في التطبيق')}
          </h1>
          <p className="text-sm text-gray-600">
            {error?.message || t('error.unknown', 'خطأ غير معروف')}
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h2 className="text-lg font-medium text-gray-900">
              {t('error.whatHappened', 'ماذا حدث؟')}
            </h2>
            <p className="text-sm text-gray-600">
              {t('error.description', 'نأسف على هذا الخطأ. يمكنك محاولة إحدى الخيارات التالية:')}
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 rtl:pr-4 ltr:pl-4 space-y-1 mt-2">
              <li>{t('error.refresh', 'تحديث الصفحة')}</li>
              <li>{t('error.clearCache', 'مسح ذاكرة التخزين المؤقت')}</li>
              <li>{t('error.differentBrowser', 'تجربة متصفح مختلف')}</li>
              <li>{t('error.contactSupport', 'الاتصال بالدعم الفني إذا استمرت المشكلة')}</li>
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center" 
              onClick={resetError || handleRefresh}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('error.retry', 'إعادة المحاولة')}
            </Button>
            
            <Button 
              variant="default" 
              className="w-full flex items-center justify-center" 
              onClick={() => window.location.href = '/'}
            >
              <Home className="h-4 w-4 mr-2" />
              {t('error.backHome', 'الصفحة الرئيسية')}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center col-span-2" 
              onClick={() => setShowDetails(true)}
            >
              <Server className="h-4 w-4 mr-2" />
              {t('error.details', 'عرض التفاصيل التقنية')}
            </Button>
          </div>
        </div>
      </div>
      
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-destructive gap-2">
              <AlertCircle className="h-5 w-5" />
              {t('error.technicalDetails', 'التفاصيل التقنية')}
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-4 top-4" 
              onClick={() => setShowDetails(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogHeader>
          <div className="space-y-4">
            {error && (
              <div className="overflow-auto max-h-96">
                <div className="font-medium text-sm mb-1">{t('error.message', 'رسالة الخطأ')}:</div>
                <pre className="text-xs bg-muted p-3 rounded overflow-auto">{error.message}</pre>
                
                {error.stack && (
                  <>
                    <div className="font-medium text-sm mt-3 mb-1">{t('error.stack', 'تتبع الخطأ')}:</div>
                    <pre className="text-xs bg-muted p-3 rounded overflow-auto">{error.stack}</pre>
                  </>
                )}
              </div>
            )}
            
            <div className="flex justify-end space-x-2 rtl:space-x-reverse">
              <Button variant="outline" size="sm" onClick={copyErrorToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                {t('error.copy', 'نسخ التفاصيل')}
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => setShowDetails(false)}
              >
                {t('error.close', 'إغلاق')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
