
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Upload, ImageIcon, FileVideo, FileCode, Database, Link as LinkIcon } from "lucide-react";

interface AIFileUploadProps {
  onFileUpload?: (files: FileList) => void;
}

export const AIFileUpload = ({ onFileUpload }: AIFileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      toast({
        title: "تم استلام الملف",
        description: `تم استلام الملف ${files[0].name} وجاري معالجته`,
      });
      
      if (onFileUpload) {
        onFileUpload(files);
      }
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center h-[500px]">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
      
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload size={32} className="text-purple-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">رفع الملفات للتحليل</h3>
        <p className="text-muted-foreground max-w-md">
          يمكنك رفع أي نوع من الملفات: صور، فيديو، صوت، مستندات، ملفات برمجية، وأكثر.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <Badge variant="outline" className="flex items-center gap-1">
          <ImageIcon size={12} /> صور
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <FileVideo size={12} /> فيديو
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <FileCode size={12} /> برمجة
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <Database size={12} /> بيانات
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1">
          <LinkIcon size={12} /> روابط
        </Badge>
      </div>
      
      <Button onClick={handleFileUpload} className="gap-2">
        <Upload size={16} />
        اختر ملفًا للرفع
      </Button>
    </div>
  );
};
