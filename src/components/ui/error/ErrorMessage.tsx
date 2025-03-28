
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw, Home, Copy, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  details?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  showBackHome?: boolean;
  showCopy?: boolean;
  className?: string;
  showDetailsDialog?: boolean;
}

export function ErrorMessage({
  title,
  message,
  details,
  onRetry,
  showRetry = true,
  showBackHome = true,
  showCopy = true,
  className,
  showDetailsDialog = false,
}: ErrorMessageProps) {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  
  const errorTitle = title || t('error.title', 'حدث خطأ');
  const errorMessage = message || t('error.unknown', 'خطأ غير معروف');
  
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
  
  const goToHomePage = () => {
    window.location.href = '/';
  };
  
  return (
    <>
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
          
          {details && showDetailsDialog && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDialogOpen(true)}
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
        </AlertDescription>
      </Alert>
      
      {/* Technical Details Dialog */}
      {details && showDetailsDialog && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                {t('error.technicalDetails', 'التفاصيل التقنية')}
              </DialogTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-4 top-4" 
                onClick={() => setDialogOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogHeader>
            
            <div className="overflow-auto max-h-96">
              <div className="font-medium text-sm mb-1">{t('error.message', 'رسالة الخطأ')}:</div>
              <pre className="text-xs bg-muted p-3 rounded overflow-auto">{errorMessage}</pre>
              
              {details && (
                <>
                  <div className="font-medium text-sm mt-3 mb-1">{t('error.details', 'التفاصيل')}:</div>
                  <pre className="text-xs bg-muted p-3 rounded overflow-auto">{details}</pre>
                </>
              )}
            </div>
            
            <DialogFooter>
              <div className="flex justify-end space-x-2 rtl:space-x-reverse">
                <Button variant="outline" size="sm" onClick={copyErrorToClipboard}>
                  <Copy className="h-4 w-4 mr-2" />
                  {t('error.copy', 'نسخ التفاصيل')}
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => setDialogOpen(false)}
                >
                  {t('error.close', 'إغلاق')}
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
