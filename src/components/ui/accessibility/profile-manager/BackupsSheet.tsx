
import React from "react";
import { useTranslation } from "react-i18next";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";

interface BackupsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  backups: { name: string; date: string }[];
  onRestore: (index: number) => void;
}

export function BackupsSheet({
  open,
  onOpenChange,
  backups,
  onRestore
}: BackupsSheetProps) {
  const { t } = useTranslation();
  
  if (backups.length === 0) {
    return null;
  }
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            {t('accessibility.backups', 'النسخ الاحتياطية')}
          </SheetTitle>
          <SheetDescription>
            {t('accessibility.backupsDescription', 'استعادة إعداداتك من نسخة احتياطية سابقة')}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {backups.map((backup, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{backup.name}</p>
                <p className="text-sm text-muted-foreground">{backup.date}</p>
              </div>
              <Button 
                variant="secondary"
                size="sm"
                onClick={() => onRestore(index)}
              >
                {t('accessibility.restore', 'استعادة')}
              </Button>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
