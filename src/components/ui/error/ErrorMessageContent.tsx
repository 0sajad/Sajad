
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ErrorMessageContentProps {
  message: string;
  details?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  showBackHome?: boolean;
  showCopy?: boolean;
  onOpenDetails?: () => void;
  showDetailsDialog?: boolean;
}

export function ErrorMessageContent({
  message,
  details,
  onRetry,
  showRetry = true,
  showBackHome = true,
  showCopy = true,
  onOpenDetails,
  showDetailsDialog = false,
}: ErrorMessageContentProps) {
  const { t } = useTranslation();

  const handleReload = () => {
    // Clear any cached data that might be causing issues
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.clear();
      }
      if (typeof localStorage !== 'undefined') {
        // Clear only error-related items, not all preferences
        localStorage.removeItem('errorState');
      }
    } catch (e) {
      console.error("Failed to clear storage", e);
    }
    
    // Reload the page
    window.location.reload();
  };
  
  const copyErrorToClipboard = () => {
    const errorText = `
Error: ${message}
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
  
  const goToHomePage = () => {
    window.location.href = '/';
  };
  
  return (
    <>
      <p className="mb-4 text-sm text-red-700 dark:text-red-300">
        {t('error.description', "نأسف على هذا الخطأ. يمكنك محاولة إحدى الخيارات التالية:")}
      </p>
      
      {details && showDetailsDialog && (
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenDetails}
          className="mb-4 border-gray-200 bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-800 dark:border-gray-800/50 dark:bg-transparent dark:hover:bg-gray-900/30 dark:text-gray-300 dark:hover:text-gray-200"
        >
          {t('error.details', 'عرض التفاصيل التقنية')}
        </Button>
      )}
      
      {details && !showDetailsDialog && (
        <div className="mt-2 mb-4 p-2 bg-white/50 dark:bg-black/20 border border-red-200 dark:border-red-800/50 rounded text-xs font-mono overflow-auto max-h-32">
          {details}
        </div>
      )}
      
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
            onClick={goToHomePage}
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
    </>
  );
}
