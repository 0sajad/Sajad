
import React, { Component, ErrorInfo, ReactNode } from "react";
import { ErrorMessage } from "./ErrorMessage";
import { Toaster } from "sonner";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home, Server, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDialog?: boolean;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showErrorDialog: boolean;
}

// Needed for i18n support in class components
const ErrorDialogContent = ({ 
  error, 
  errorInfo, 
  onClose, 
  onRetry 
}: { 
  error: Error | null, 
  errorInfo: ErrorInfo | null,
  onClose: () => void,
  onRetry: () => void
}) => {
  const { t } = useTranslation();
  
  const copyErrorToClipboard = () => {
    if (!error) return;
    
    const errorText = `
Error: ${error.message}
Stack: ${error.stack}
Component: ${errorInfo?.componentStack}
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
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          {t('error.title', 'حدث خطأ في التطبيق')}
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="bg-destructive/10 p-4 rounded-md border border-destructive/20">
          <h3 className="font-medium text-destructive mb-2">{error?.message || t('error.unknown', 'خطأ غير معروف')}</h3>
          {errorInfo && (
            <div className="mt-2">
              <p className="text-xs text-muted-foreground mb-1">{t('error.componentStack', 'سلسلة المكونات:')}</p>
              <pre className="text-xs overflow-auto max-h-24 p-2 bg-background/50 rounded border">
                {errorInfo.componentStack}
              </pre>
            </div>
          )}
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>{t('error.description', 'نأسف على هذا الخطأ. يمكنك محاولة إحدى الخيارات التالية:')}</p>
          <ul className="list-disc list-inside mt-2 space-y-1 rtl:pr-4 ltr:pl-4">
            <li>{t('error.refresh', 'تحديث الصفحة')}</li>
            <li>{t('error.clearCache', 'مسح ذاكرة التخزين المؤقت')}</li>
            <li>{t('error.contactSupport', 'الاتصال بالدعم الفني إذا استمرت المشكلة')}</li>
          </ul>
        </div>
      </div>
      <DialogFooter className="flex justify-between sm:justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyErrorToClipboard}>
            <Copy className="h-4 w-4 mr-2" />
            {t('error.copy', 'نسخ')}
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            <Server className="h-4 w-4 mr-2" />
            {t('error.details', 'التفاصيل')}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {t('error.retry', 'إعادة المحاولة')}
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => window.location.href = "/"}
          >
            <Home className="h-4 w-4 mr-2" />
            {t('error.backHome', 'الرئيسية')}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showErrorDialog: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return { 
      hasError: true,
      error: error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Update state with error info for dialog
    this.setState({
      errorInfo,
      showErrorDialog: Boolean(this.props.showDialog)
    });
    
    // Log the error to help with debugging
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    
    // Call any custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Show a toast notification
    toast({
      variant: "destructive",
      title: "خطأ في التطبيق",
      description: error.message || "حدث خطأ غير متوقع",
    });
  }

  handleRetry = (): void => {
    // Clear any potential cached data that might be causing the error
    try {
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem('errorState');
      }
    } catch (e) {
      console.error("Failed to clear session storage", e);
    }
    
    // Reset the error state to try rendering the component again
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null, 
      showErrorDialog: false 
    });
  }
  
  toggleErrorDialog = (): void => {
    this.setState(prevState => ({
      showErrorDialog: !prevState.showErrorDialog
    }));
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // Return fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Return default error UI
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-muted">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 text-center border-b border-red-100 dark:border-red-900/20">
              <div className="inline-flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-full p-2 mb-3">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                حدث خطأ في التطبيق
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {this.state.error?.message || "خطأ غير معروف"}
              </p>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                نأسف على هذا الخطأ. يمكنك محاولة إحدى الخيارات التالية:
              </p>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center" 
                  onClick={this.handleRetry}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  إعادة المحاولة
                </Button>
                
                <Button 
                  variant="default" 
                  className="w-full flex items-center justify-center" 
                  onClick={() => window.location.href = '/'}
                >
                  <Home className="h-4 w-4 mr-2" />
                  الصفحة الرئيسية
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center" 
                  onClick={this.toggleErrorDialog}
                >
                  <Server className="h-4 w-4 mr-2" />
                  عرض التفاصيل
                </Button>
              </div>
            </div>
          </div>
          
          {this.state.showErrorDialog && (
            <Dialog open={this.state.showErrorDialog} onOpenChange={this.toggleErrorDialog}>
              <ErrorDialogContent 
                error={this.state.error} 
                errorInfo={this.state.errorInfo}
                onClose={this.toggleErrorDialog}
                onRetry={this.handleRetry}
              />
            </Dialog>
          )}
          
          <Toaster />
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}
