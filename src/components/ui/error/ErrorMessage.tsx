
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  showBackHome?: boolean;
}

export function ErrorMessage({
  title,
  message,
  onRetry,
  showRetry = true,
  showBackHome = true
}: ErrorMessageProps) {
  const { t } = useTranslation();
  
  const errorTitle = title || t('error.title', 'حدث خطأ');
  const errorMessage = message || t('error.unknown', 'خطأ غير معروف');
  
  const handleReload = () => {
    // Clear any cached data that might be causing issues
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.clear();
      }
    } catch (e) {
      console.error("Failed to clear session storage", e);
    }
    
    // Reload the page
    window.location.reload();
  };
  
  return (
    <Alert variant="destructive" className="border-red-500/50 bg-red-50 dark:bg-red-900/20">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle className="font-medium">{errorTitle}</AlertTitle>
      <AlertDescription>
        <p className="mt-2 mb-4">{errorMessage}</p>
        <p className="mb-4">
          {t('error.description', "نأسف على هذا الخطأ. يمكنك محاولة إحدى الخيارات التالية:")}
        </p>
        <div className="flex flex-wrap gap-2">
          {showRetry && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRetry || handleReload}
              className="border-red-200 hover:bg-red-100 hover:text-red-800 dark:border-red-800 dark:hover:bg-red-900 dark:hover:text-red-100"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('error.retry', 'إعادة المحاولة')}
            </Button>
          )}
          {showBackHome && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.location.href = '/'}
              className="border-blue-200 hover:bg-blue-100 hover:text-blue-800 dark:border-blue-800 dark:hover:bg-blue-900 dark:hover:text-blue-100"
            >
              <Home className="h-4 w-4 mr-2" />
              {t('error.backHome', 'الصفحة الرئيسية')}
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}
