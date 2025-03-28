
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface ErrorMessageBaseProps {
  title?: string;
  message?: string;
  children?: React.ReactNode;
  className?: string;
}

export function ErrorMessageBase({
  title,
  message,
  children,
  className,
}: ErrorMessageBaseProps) {
  const { t } = useTranslation();
  
  const errorTitle = title || t('error.title', 'حدث خطأ');
  const errorMessage = message || t('error.unknown', 'خطأ غير معروف');
  
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
        {children}
      </AlertDescription>
    </Alert>
  );
}
