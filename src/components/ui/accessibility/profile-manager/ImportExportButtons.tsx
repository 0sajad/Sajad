
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Upload, Clock } from "lucide-react";

interface ImportExportButtonsProps {
  onImport: () => void;
  onShowBackups?: () => void;
  hasBackups?: boolean;
}

export function ImportExportButtons({ 
  onImport, 
  onShowBackups,
  hasBackups = false
}: ImportExportButtonsProps) {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="secondary" 
        size="sm"
        onClick={onImport}
      >
        <Upload className="h-4 w-4 mr-2" />
        {t('accessibility.importSettings', 'استيراد الإعدادات')}
      </Button>
      
      {hasBackups && onShowBackups && (
        <Button 
          variant="secondary" 
          size="sm"
          onClick={onShowBackups}
        >
          <Clock className="h-4 w-4 mr-2" />
          {t('accessibility.restoreBackup', 'استعادة نسخة احتياطية')}
        </Button>
      )}
    </div>
  );
}
