
import React from "react";
import { useTranslation } from "react-i18next";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileName: string | null;
  onConfirmDelete: () => void;
}

export function DeleteProfileDialog({
  open,
  onOpenChange,
  profileName,
  onConfirmDelete
}: DeleteProfileDialogProps) {
  const { t } = useTranslation();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            {t('accessibility.confirmDelete', 'تأكيد الحذف')}
          </DialogTitle>
          <DialogDescription>
            {t('accessibility.deleteConfirmation', 'هل أنت متأكد من رغبتك في حذف الملف الشخصي "{name}"؟ لا يمكن التراجع عن هذا الإجراء.', { name: profileName || '' })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between sm:justify-end">
          <Button
            variant="default"
            onClick={() => onOpenChange(false)}
          >
            {t('common.cancel', 'إلغاء')}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirmDelete}
          >
            {t('common.delete', 'حذف')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
