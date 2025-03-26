
import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";

export function useImportProfileHandler() {
  const { t } = useTranslation();
  
  // Function to show file dialog for import
  const showImportDialog = async (): Promise<File | null> => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    return new Promise<File | null>((resolve) => {
      input.onchange = (e) => {
        const target = e.target as HTMLInputElement;
        const files = target.files;
        
        if (files && files.length > 0) {
          resolve(files[0]);
        } else {
          resolve(null);
        }
      };
      
      input.click();
    });
  };
  
  // Function to handle errors during import
  const handleImportError = (error: any) => {
    console.error('Failed to import profile:', error);
    
    toast({
      title: t('error', 'خطأ'),
      description: t('accessibility.importError', 'حدث خطأ أثناء استيراد الملف الشخصي'),
      variant: 'destructive'
    });
    
    return null;
  };
  
  return {
    showImportDialog,
    handleImportError
  };
}
