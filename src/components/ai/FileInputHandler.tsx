
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";

interface FileInputHandlerProps {
  onFileChange: (files: FileList | null) => void;
  children: (handleFileUpload: () => void) => React.ReactNode;
  maxFileSize?: number; // Maximum file size in MB
  acceptedFileTypes?: string; // Comma-separated list of file types
}

export const FileInputHandler = ({ 
  onFileChange, 
  children,
  maxFileSize = 10, // Default 10MB
  acceptedFileTypes = "*"
}: FileInputHandlerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    
    if (files && files.length > 0) {
      // Validate file sizes
      const oversizedFiles = Array.from(files).filter(
        file => file.size > maxFileSize * 1024 * 1024
      );
      
      if (oversizedFiles.length > 0) {
        toast({
          title: isRTL ? "ملفات كبيرة جداً" : "Files too large",
          description: isRTL 
            ? `بعض الملفات تتجاوز الحد الأقصى (${maxFileSize}MB)`
            : `Some files exceed the maximum size (${maxFileSize}MB)`,
          variant: "destructive"
        });
        
        // Reset the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }
      
      // Process valid files
      onFileChange(files);
      
      // Show success toast
      const fileCount = files.length;
      toast({
        title: isRTL ? "تم رفع الملفات" : "Files uploaded",
        description: isRTL 
          ? `تم رفع ${fileCount} ${fileCount === 1 ? "ملف" : "ملفات"} بنجاح`
          : `Successfully uploaded ${fileCount} ${fileCount === 1 ? "file" : "files"}`
      });
    }
    
    // Reset the file input to allow uploading the same file(s) again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes}
        aria-label={isRTL ? "رفع الملفات" : "File upload"}
      />
      {children(handleFileUpload)}
    </div>
  );
};
