import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Upload, ImageIcon, FileVideo, FileCode, Database, Link as LinkIcon, FileText, Music, PanelRight, CloudLightning } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";

interface AIFileUploadProps {
  onFileUpload?: (files: FileList) => void;
}

export const AIFileUpload = ({ onFileUpload }: AIFileUploadProps) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<string[]>([]);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setUploadedFiles([...uploadedFiles, ...fileArray]);
      
      toast({
        title: t('fileUpload.received', "تم استلام الملفات"),
        description: t('fileUpload.processing', `تم استلام ${fileArray.length} ملفات وجاري معالجتها`),
      });
      
      // محاكاة معالجة الملفات
      processFiles(fileArray);
      
      if (onFileUpload) {
        onFileUpload(files);
      }
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <ImageIcon size={16} className="text-blue-500" />;
    if (type.includes('video')) return <FileVideo size={16} className="text-red-500" />;
    if (type.includes('audio')) return <Music size={16} className="text-purple-500" />;
    if (type.includes('text/plain') || type.includes('pdf')) return <FileText size={16} className="text-amber-500" />;
    if (type.includes('application/json') || type.includes('javascript') || type.includes('html')) 
      return <FileCode size={16} className="text-green-500" />;
    return <FileText size={16} className="text-gray-500" />;
  };
  
  const processFiles = (files: File[]) => {
    setProcessing(true);
    setProcessingProgress(0);
    
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          
          // محاكاة نتائج التحليل
          const results = files.map(file => {
            const analysisOptions = [
              `تم تحليل ${file.name}: الملف سليم وخالي من البرمجيات الضارة`,
              `تم استخراج البيانات من ${file.name} بنجاح`,
              `تم اكتشاف أنماط متكررة في ${file.name}`,
              `تحليل محتوى ${file.name} يشير إلى بنية بيانات متقدمة`
            ];
            
            return analysisOptions[Math.floor(Math.random() * analysisOptions.length)];
          });
          
          setAnalysisResults(results);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };
  
  const clearFiles = () => {
    setUploadedFiles([]);
    setAnalysisResults([]);
  };

  return (
    <div className="p-6 flex flex-col h-[500px]">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
      />
      
      {uploadedFiles.length === 0 ? (
        <div className="text-center flex-1 flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload size={32} className="text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{t('fileUpload.title', "رفع الملفات للتحليل")}</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            {t('fileUpload.description', "يمكنك رفع أي نوع من الملفات: صور، فيديو، صوت، مستندات، ملفات برمجية، وأكثر.")}
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <FileTypeBadge icon={<ImageIcon size={12} />} name={t('fileUpload.images', "صور")} />
            <FileTypeBadge icon={<FileVideo size={12} />} name={t('fileUpload.videos', "فيديو")} />
            <FileTypeBadge icon={<FileCode size={12} />} name={t('fileUpload.code', "برمجة")} />
            <FileTypeBadge icon={<Database size={12} />} name={t('fileUpload.data', "بيانات")} />
            <FileTypeBadge icon={<LinkIcon size={12} />} name={t('fileUpload.links', "روابط")} />
            <FileTypeBadge icon={<FileText size={12} />} name={t('fileUpload.documents', "مستندات")} />
            <FileTypeBadge icon={<PanelRight size={12} />} name={t('fileUpload.apis', "واجهات API")} />
            <FileTypeBadge icon={<CloudLightning size={12} />} name={t('fileUpload.cloud', "خدمات سحابية")} />
          </div>
          
          <Button onClick={handleFileUpload} className="gap-2">
            <Upload size={16} />
            {t('fileUpload.chooseFiles', "اختر ملفات للرفع")}
          </Button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{t('fileUpload.uploadedFiles', "الملفات المرفوعة")}</h3>
            <Button variant="ghost" size="sm" onClick={clearFiles}>{t('fileUpload.clear', "مسح")}</Button>
          </div>
          
          <div className="border rounded-md p-4 mb-4 flex-1 overflow-auto">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center border-b last:border-0 py-2">
                {getFileIcon(file.type)}
                <div className="ml-2 flex-1">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB • {file.type || "غير معروف"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {processing && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{t('fileUpload.analyzing', "جاري تحليل الملفات...")}</span>
                <span className="text-xs text-muted-foreground">{processingProgress}%</span>
              </div>
              <Progress value={processingProgress} className="h-2" />
            </div>
          )}
          
          {analysisResults.length > 0 && (
            <div className="mb-4 border rounded-md p-4 bg-gray-50">
              <h4 className="text-sm font-semibold mb-2">{t('fileUpload.analysisResults', "نتائج التحليل")}</h4>
              <ul className="text-sm space-y-1">
                {analysisResults.map((result, index) => (
                  <li key={index} className="text-muted-foreground">• {result}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleFileUpload} className="gap-2">
              <Upload size={16} />
              {t('fileUpload.uploadMore', "رفع المزيد")}
            </Button>
            
            <Button className="gap-2">
              <Database size={16} />
              {t('fileUpload.advancedAnalysis', "تحليل متقدم")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const FileTypeBadge = ({ icon, name }: { icon: React.ReactNode; name: string }) => {
  return (
    <Badge variant="outline" className="flex items-center gap-1">
      {icon} {name}
    </Badge>
  );
};
