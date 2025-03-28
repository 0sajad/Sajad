
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

// مكون وسيط للترجمة (لأن مكونات الفئة لا تدعم الخطافات مباشرة)
const ErrorFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => {
  const { t } = useTranslation();
  
  return (
    <Card className="w-full max-w-md mx-auto my-8 shadow-lg border-red-200 dark:border-red-900 bg-white dark:bg-gray-900">
      <CardHeader className="bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-900/30">
        <CardTitle className="flex items-center text-red-700 dark:text-red-400">
          <AlertCircle className="h-5 w-5 mr-2" />
          {t('error.title', 'حدث خطأ ما')}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>{t('error.message', 'رسالة الخطأ')}</AlertTitle>
          <AlertDescription className="mt-2 font-mono text-sm overflow-auto max-h-[150px] p-2 bg-red-50 dark:bg-red-900/10 rounded">
            {error.message || t('error.unknown', 'خطأ غير معروف')}
          </AlertDescription>
        </Alert>
        
        <div className="text-sm text-muted-foreground mt-4">
          <p>{t('error.description', 'نأسف على هذا الخطأ. يمكنك محاولة إحدى الخيارات التالية:')}</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>{t('error.refresh', 'تحديث الصفحة')}</li>
            <li>{t('error.clearCache', 'مسح ذاكرة التخزين المؤقت')}</li>
            <li>{t('error.differentBrowser', 'تجربة متصفح مختلف')}</li>
            <li>{t('error.contactSupport', 'الاتصال بالدعم الفني إذا استمرت المشكلة')}</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800">
        <Button variant="ghost" onClick={() => window.location.href = "/"}>
          <Home className="h-4 w-4 mr-2" />
          {t('error.backHome', 'الصفحة الرئيسية')}
        </Button>
        <Button onClick={resetError}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          {t('error.retry', 'إعادة المحاولة')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      errorInfo
    });
    
    // هنا يمكن إضافة كود لتسجيل الأخطاء على الخادم
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      // يمكن استخدام واجهة السقوط المخصصة أو الافتراضية
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return <ErrorFallback error={this.state.error!} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}
