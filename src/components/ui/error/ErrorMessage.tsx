
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw, Home, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  details?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  showBackHome?: boolean;
  showCopy?: boolean;
  className?: string;
}

export function ErrorMessage({
  title,
  message,
  details,
  onRetry,
  showRetry = true,
  showBackHome = true,
  showCopy = true,
  className
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
  
  const copyErrorToClipboard = () => {
    const errorText = `
Error: ${errorMessage}
Details: ${details || 'No details provided'}
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
    <Alert 
      variant="destructive" 
      className={cn(
        "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-50",
        className
      )}
    >
      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
      <AlertTitle className="font-medium text-red-800 dark:text-red-300">{errorTitle}</AlertTitle>
      <AlertDescription>
        <div className="mt-2 mb-4 text-red-700 dark:text-red-300">{errorMessage}</div>
        
        {details && (
          <div className="mt-2 mb-4 p-2 bg-white/50 dark:bg-black/20 border border-red-200 dark:border-red-800/50 rounded text-xs font-mono overflow-auto max-h-32">
            {details}
          </div>
        )}
        
        <p className="mb-4 text-sm text-red-700 dark:text-red-300">
          {t('error.description', "نأسف على هذا الخطأ. يمكنك محاولة إحدى الخيارات التالية:")}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {showRetry && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRetry || handleReload}
              className="border-red-200 bg-white hover:bg-red-100 text-red-700 hover:text-red-800 dark:border-red-800/50 dark:bg-transparent dark:hover:bg-red-900/30 dark:text-red-300 dark:hover:text-red-200"
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
              className="border-blue-200 bg-white hover:bg-blue-100 text-blue-700 hover:text-blue-800 dark:border-blue-800/50 dark:bg-transparent dark:hover:bg-blue-900/30 dark:text-blue-300 dark:hover:text-blue-200"
            >
              <Home className="h-4 w-4 mr-2" />
              {t('error.backHome', 'الصفحة الرئيسية')}
            </Button>
          )}
          
          {showCopy && details && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyErrorToClipboard}
              className="border-gray-200 bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-800 dark:border-gray-800/50 dark:bg-transparent dark:hover:bg-gray-900/30 dark:text-gray-300 dark:hover:text-gray-200"
            >
              <Copy className="h-4 w-4 mr-2" />
              {t('error.copy', 'نسخ التفاصيل')}
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}
