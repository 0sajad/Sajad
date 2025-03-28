
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FallbackErrorPageProps {
  error?: Error;
  resetError?: () => void;
}

export function FallbackErrorPage({ error, resetError }: FallbackErrorPageProps) {
  const { t } = useTranslation();
  
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
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card rounded-lg shadow-lg overflow-hidden">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 flex items-center">
          <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400 mr-3" />
          <h1 className="text-2xl font-bold text-foreground">
            {t('error.title', 'حدث خطأ في التطبيق')}
          </h1>
        </div>
        
        <div className="p-6">
          <p className="text-muted-foreground mb-4">
            {t('error.description', 'نأسف على هذا الخطأ. يمكنك محاولة إحدى الخيارات التالية:')}
          </p>
          
          {error && error.message && (
            <div className="bg-muted p-3 rounded-md text-sm mb-6 overflow-auto max-h-32">
              <code>{error.message}</code>
            </div>
          )}
          
          <div className="space-y-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
