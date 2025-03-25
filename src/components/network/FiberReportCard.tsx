
import React from "react";
import { FileText, Download, FileUp } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { Button } from "../ui/button";

interface FiberReportCardProps {
  reportGenerationTime?: string;
  reportStatus?: "ready" | "generating" | "error";
}

export const FiberReportCard: React.FC<FiberReportCardProps> = ({ 
  reportGenerationTime = "آخر تقرير: منذ ساعة",
  reportStatus = "ready" 
}) => {
  const handleGenerateReport = () => {
    console.log("Generating new fiber optic report...");
    // Implementation of report generation would go here
  };

  const handleDownloadReport = () => {
    console.log("Downloading fiber optic report...");
    // Implementation of report download would go here
  };

  return (
    <GlassCard className="p-4 animate-fade-in">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold mb-2 font-tajawal">تقارير الألياف الضوئية</h3>

        <div className="flex items-center mb-4">
          <div className="p-3 rounded-xl mr-4 text-blue-500 bg-blue-50">
            <FileText size={20} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-tajawal">{reportGenerationTime}</p>
            <p className="text-xs mt-1 font-tajawal">
              {reportStatus === "ready" && "جاهز للتحميل"}
              {reportStatus === "generating" && "جاري توليد التقرير..."}
              {reportStatus === "error" && "حدث خطأ في توليد التقرير"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleGenerateReport}
            className="flex items-center font-tajawal"
            disabled={reportStatus === "generating"}
          >
            <FileUp className="mr-2 h-4 w-4" />
            توليد تقرير جديد
          </Button>
          
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleDownloadReport}
            className="flex items-center font-tajawal"
            disabled={reportStatus !== "ready"}
          >
            <Download className="mr-2 h-4 w-4" />
            تحميل التقرير
          </Button>
        </div>
      </div>
    </GlassCard>
  );
};
