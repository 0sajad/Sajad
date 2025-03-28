
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ErrorMessageBase } from "./ErrorMessageBase";
import { ErrorMessageContent } from "./ErrorMessageContent";
import { ErrorDetailsDialog } from "./ErrorDetailsDialog";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const errorMessage = message || t('error.unknown', 'خطأ غير معروف');
  
  return (
    <>
      <ErrorMessageBase
        title={title}
        message={errorMessage}
        className={className}
      >
        <ErrorMessageContent
          message={errorMessage}
          details={details}
          onRetry={onRetry}
          showRetry={showRetry}
          showBackHome={showBackHome}
          showCopy={showCopy}
          onOpenDetails={() => setDialogOpen(true)}
          showDetailsDialog={showDetailsDialog}
        />
      </ErrorMessageBase>
      
      {/* Technical Details Dialog */}
      {details && showDetailsDialog && (
        <ErrorDetailsDialog
          isOpen={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title={t('error.technicalDetails', 'التفاصيل التقنية')}
          message={errorMessage}
          details={details}
        />
      )}
    </>
  );
}
