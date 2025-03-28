
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Home, RefreshCw, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ErrorDetailsDialog } from '@/components/ui/error/ErrorDetailsDialog';
import { useA11y } from '@/hooks/useA11y';

interface FallbackErrorPageProps {
  error?: Error;
  resetError?: () => void;
}

export function FallbackErrorPage({ error, resetError }: FallbackErrorPageProps) {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);
  const { announce } = useA11y();
  
  // إعلان حدوث خطأ عند تحميل الصفحة
  useEffect(() => {
    if (announce) {
      const timer = setTimeout(() => {
        announce(t('error.appCrashAnnouncement', 'حدث خطأ في التطبيق. يرجى إعادة تحميل الصفحة أو الانتقال إلى الصفحة الرئيسية.'), 'assertive');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [announce, t]);
  
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
    
    if (announce) {
      announce(t('error.reloadingPage', 'جاري إعادة تحميل الصفحة...'), 'polite');
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
      
      if (announce) {
        announce(t('error.copiedAnnouncement', 'تم نسخ تفاصيل الخطأ إلى الحافظة'), 'polite');
      }
    });
  };
  
  const goToHomePage = () => {
    if (announce) {
      announce(t('error.goingToHomePage', 'جاري الانتقال إلى الصفحة الرئيسية...'), 'polite');
    }
    
    window.location.href = '/';
  };
  
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4" role="alert" aria-live="assertive">
      <div className="max-w-md w-full space-y-4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-red-50 p-6 text-center border-b border-red-100">
          <div className="inline-flex items-center justify-center bg-red-100 rounded-full p-3 mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" aria-hidden="true" />
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
              <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
              {t('error.retry', 'إعادة المحاولة')}
            </Button>
            
            <Button 
              variant="default" 
              className="w-full flex items-center justify-center" 
              onClick={goToHomePage}
            >
              <Home className="h-4 w-4 mr-2" aria-hidden="true" />
              {t('error.backHome', 'الصفحة الرئيسية')}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center col-span-2" 
              onClick={() => setShowDetails(true)}
            >
              <Server className="h-4 w-4 mr-2" aria-hidden="true" />
              {t('error.details', 'عرض التفاصيل التقنية')}
            </Button>
          </div>
        </div>
      </div>
      
      {/* استخدام مكون ErrorDetailsDialog بدلاً من Dialog المباشر */}
      {error && (
        <ErrorDetailsDialog
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          title={t('error.technicalDetails', 'التفاصيل التقنية')}
          message={error.message}
          details={error.stack}
        />
      )}
    </div>
  );
}
