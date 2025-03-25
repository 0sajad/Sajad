
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

interface FileInputHandlerProps {
  onFileChange: (files: FileList | null) => void;
  children: (handleFileUpload: () => void) => React.ReactNode;
}

export const FileInputHandler = ({ onFileChange, children }: FileInputHandlerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(e.target.files);
  };

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        aria-label="File upload"
      />
      {children(handleFileUpload)}
    </div>
  );
};
