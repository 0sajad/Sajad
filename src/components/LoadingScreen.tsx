
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  showSpinner?: boolean;
}

export function LoadingScreen({ showSpinner = true }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isErrored, setIsErrored] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // زيادة شريط التقدم تدريجياً لإعطاء المستخدم مؤشراً بصرياً أن التطبيق يتم تحميله
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        // نتحقق من وجود أخطاء
        const hasErrors = window.hasOwnProperty('__REACT_ERROR_OVERLAY__');
        
        if (hasErrors) {
          setIsErrored(true);
          setErrorMessage("حدث خطأ أثناء تحميل التطبيق. يرجى تحديث الصفحة.");
          return 100; // نكمل شريط التقدم
        }
        
        const newProgress = prevProgress + 5;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 50);

    // التأكد من أن شاشة التحميل تظهر لمدة لا تقل عن 500 مللي ثانية
    const visibilityTimer = setTimeout(() => {
      if (progress >= 100) {
        setIsVisible(false);
      }
    }, 500);
    
    // وضع مؤقت أمان يتأكد من إخفاء شاشة التحميل حتى لو استغرق التحميل وقتاً طويلاً
    const safetyTimer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(visibilityTimer);
      clearTimeout(safetyTimer);
    };
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center">
        {showSpinner && !isErrored && (
          <div className="relative w-20 h-20">
            <div className={cn(
              "absolute w-full h-full border-4 border-primary rounded-full",
              "animate-spin"
            )} />
            <div className={cn(
              "absolute w-full h-full border-4 border-transparent border-t-primary rounded-full",
              "animate-spin-slow"
            )} />
          </div>
        )}
        
        {isErrored ? (
          <>
            <div className="w-16 h-16 mb-4 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-foreground">خطأ في التحميل</h2>
            <p className="text-muted-foreground mt-2 text-center max-w-md">{errorMessage}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              تحديث الصفحة
            </button>
          </>
        ) : (
          <>
            <h2 className="mt-4 text-2xl font-semibold text-foreground">OCTA-GRAM</h2>
            <p className="text-muted-foreground">جاري التحميل...</p>
            
            {/* شريط تقدم لإظهار حالة التحميل للمستخدم */}
            <div className="w-56 h-1.5 mt-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
