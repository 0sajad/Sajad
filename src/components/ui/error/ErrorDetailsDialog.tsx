
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AlertCircle, Copy, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ErrorDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  details?: string;
}

export function ErrorDetailsDialog({
  isOpen,
  onClose,
  title,
  message,
  details
}: ErrorDetailsDialogProps) {
  const { t } = useTranslation();
  
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
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            {title || t('error.technicalDetails', 'التفاصيل التقنية')}
          </DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        
        <div className="overflow-auto max-h-96">
          <div className="font-medium text-sm mb-1">{t('error.message', 'رسالة الخطأ')}:</div>
          <pre className="text-xs bg-muted p-3 rounded overflow-auto">{message}</pre>
          
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
              onClick={onClose}
            >
              {t('error.close', 'إغلاق')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
