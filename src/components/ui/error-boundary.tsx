
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): Pick<State, 'hasError'> {
    // تحديث الحالة بحيث يتم عرض واجهة الخطأ في التقديم التالي
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
    
    // يمكن إضافة تسجيل الأخطاء هنا
    console.error("🔴 خطأ في تطبيق React:", error, errorInfo);
    
    // إظهار إشعار للمستخدم
    toast({
      title: "حدث خطأ غير متوقع",
      description: "نعتذر عن هذا الخطأ. يرجى تحديث الصفحة للمتابعة.",
      variant: "destructive"
    });
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      // يمكنك تخصيص واجهة الخطأ هنا
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">حدث خطأ غير متوقع</h2>
          <p className="mb-4 text-muted-foreground max-w-lg">
            نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى أو تحديث الصفحة.
          </p>
          {this.state.error && (
            <div className="p-4 mb-4 bg-red-50 dark:bg-red-900/20 rounded-md max-w-2xl overflow-auto text-sm">
              <p className="font-mono">{this.state.error.toString()}</p>
            </div>
          )}
          <div className="flex gap-4">
            <Button 
              variant="default" 
              onClick={() => window.location.reload()}
            >
              تحديث الصفحة
            </Button>
            <Button 
              variant="outline" 
              onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            >
              محاولة مرة أخرى
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
