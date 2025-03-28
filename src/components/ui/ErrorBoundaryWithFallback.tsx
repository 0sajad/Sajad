
import React, { Component, ErrorInfo } from "react";
import { StatusMessage } from "./StatusMessage";
import { Button } from "./button";
import { useTranslation } from "react-i18next";
import { RefreshCw, Home, RotateCcw } from "lucide-react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryWithFallbackClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleRefresh = (): void => {
    window.location.reload();
  };

  handleClearCache = (): void => {
    // محاولة مسح التخزين المؤقت
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    
    // محاولة مسح التخزين المحلي
    localStorage.clear();
    sessionStorage.clear();
    
    // إعادة تحميل الصفحة
    window.location.reload();
  };

  handleGoHome = (): void => {
    window.location.href = "/";
  };

  handleRetry = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback 
        error={this.state.error} 
        onRefresh={this.handleRefresh} 
        onClearCache={this.handleClearCache}
        onGoHome={this.handleGoHome}
        onRetry={this.handleRetry}
      />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
  onRefresh: () => void;
  onClearCache: () => void;
  onGoHome: () => void;
  onRetry: () => void;
}

function ErrorFallback({ error, onRefresh, onClearCache, onGoHome, onRetry }: ErrorFallbackProps) {
  const { t, i18n } = useTranslation();
  
  const getErrorMessage = (error?: Error) => {
    if (!error) return t('error.unknown', 'Unknown error');
    return error.message || t('error.unknown', 'Unknown error');
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-3 mb-4">
              <svg className="h-10 w-10 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t('error.title', 'An error occurred')}
          </h2>
          
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {getErrorMessage(error)}
          </p>
        </div>
        
        <StatusMessage 
          type="error"
          message={t('error.message', 'Error message')}
          description={getErrorMessage(error)}
        />
        
        <div className="mt-6">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
            {t('error.description', 'We\'re sorry for the inconvenience. Please try one of the following:')}
          </p>
          
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center" 
              onClick={onRefresh}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {t('error.refresh', 'Refresh the page')}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center" 
              onClick={onClearCache}
            >
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t('error.clearCache', 'Clear cache')}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center" 
              onClick={onGoHome}
            >
              <Home className="h-4 w-4 mr-2" />
              {t('error.backHome', 'Back to home')}
            </Button>
            
            <Button 
              variant="default" 
              className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700" 
              onClick={onRetry}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              {t('error.retry', 'Try again')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ErrorBoundaryWithFallback(props: ErrorBoundaryProps) {
  return <ErrorBoundaryWithFallbackClass {...props} />;
}
