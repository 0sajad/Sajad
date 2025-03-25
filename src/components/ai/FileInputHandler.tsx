
import React, { useRef } from "react";

interface FileInputHandlerProps {
  onFileChange: (files: FileList | null) => void;
  children: (handleFileUpload: () => void) => React.ReactNode;
}

export const FileInputHandler = ({ onFileChange, children }: FileInputHandlerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileChange(e.target.files);
  };

  return (
    <>
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {children(handleFileUpload)}
    </>
  );
};
