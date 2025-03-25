
import React from "react";
import { FileDown, FileSpreadsheet, FilePdf } from "lucide-react";
import { GlassCard } from "../ui/glass-card";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/use-toast";

export const FiberReportCard: React.FC = () => {
  const generateReport = (type: "pdf" | "excel") => {
    toast({
      title: "جاري إنشاء التقرير",
      description: `سيتم تنزيل تقرير ${type === "pdf" ? "PDF" : "Excel"} خلال لحظات.`,
    });
    
    // محاكاة عملية توليد التقرير وتنزيله
    setTimeout(() => {
      toast({
        title: "تم إنشاء التقرير بنجاح",
        description: `تم تنزيل تقرير ${type === "pdf" ? "PDF" : "Excel"} بنجاح.`,
      });
    }, 1500);
  };

  return (
    <GlassCard className="p-4 animate-fade-in h-full">
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-xl mr-4 text-indigo-500 bg-indigo-50">
          <FileDown size={20} />
        </div>
        <div>
          <h3 className="font-medium font-tajawal">تقارير الألياف الضوئية</h3>
          <p className="text-sm text-muted-foreground font-tajawal">تنزيل تقارير تفصيلية</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <Button 
          variant="outline" 
          className="w-full justify-start text-left font-tajawal" 
          onClick={() => generateReport("pdf")}
        >
          <FilePdf className="mr-2 h-4 w-4 text-red-500" />
          <span>تقرير PDF</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start text-left font-tajawal" 
          onClick={() => generateReport("excel")}
        >
          <FileSpreadsheet className="mr-2 h-4 w-4 text-green-500" />
          <span>تقرير Excel</span>
        </Button>
      </div>
      
      <div className="mt-4 text-xs text-muted-foreground font-tajawal">
        <p>تتضمن التقارير معلومات تفصيلية عن أداء الألياف الضوئية وإحصائيات الشبكة.</p>
      </div>
    </GlassCard>
  );
};
