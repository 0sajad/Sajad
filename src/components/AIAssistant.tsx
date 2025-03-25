
import React, { useState } from "react";
import { GlassCard } from "./ui/glass-card";
import { BrainCircuit, Zap, RefreshCcw, Cpu, Server } from "lucide-react";

interface AIAssistantProps {
  minimized?: boolean;
  onMaximize?: () => void;
}

export function AIAssistant({ minimized = false, onMaximize }: AIAssistantProps) {
  const [status, setStatus] = useState<"learning" | "processing" | "idle">("idle");
  const [progress, setProgress] = useState(0);
  
  // محاكاة لعملية التعلم المستمر
  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setStatus("idle");
          // إعادة بدء دورة التعلم
          setTimeout(() => {
            setStatus("learning");
            return 0;
          }, 2000);
          return 0;
        } else if (prev >= 75) {
          setStatus("processing");
          return prev + 1;
        } else {
          setStatus("learning");
          return prev + 1;
        }
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  if (minimized) {
    return (
      <div 
        className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-3 text-white cursor-pointer shadow-lg hover:shadow-xl transition-all z-50"
        onClick={onMaximize}
      >
        <BrainCircuit size={24} className="animate-pulse" />
      </div>
    );
  }
  
  return (
    <GlassCard className="p-0 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3">
        <div className="flex items-center">
          <BrainCircuit size={20} className="ml-0 mr-2 rtl:ml-2 rtl:mr-0" />
          <h3 className="font-medium text-sm font-tajawal">مساعد OCTA-GRAM الذكي</h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            {status === "learning" && (
              <>
                <Zap size={16} className="text-amber-500 ml-0 mr-1 rtl:ml-1 rtl:mr-0 animate-pulse" />
                <span className="text-xs text-muted-foreground font-tajawal">جاري التعلم...</span>
              </>
            )}
            {status === "processing" && (
              <>
                <RefreshCcw size={16} className="text-blue-500 ml-0 mr-1 rtl:ml-1 rtl:mr-0 animate-spin" />
                <span className="text-xs text-muted-foreground font-tajawal">معالجة البيانات...</span>
              </>
            )}
            {status === "idle" && (
              <>
                <Cpu size={16} className="text-green-500 ml-0 mr-1 rtl:ml-1 rtl:mr-0" />
                <span className="text-xs text-muted-foreground font-tajawal">جاهز للمساعدة</span>
              </>
            )}
          </div>
          <div className="text-xs text-muted-foreground">{progress}%</div>
        </div>
        
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div 
            className={`h-full rounded-full ${
              status === "learning" 
                ? "bg-amber-500" 
                : status === "processing" 
                  ? "bg-blue-500" 
                  : "bg-green-500"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex space-x-2 rtl:space-x-reverse">
          <div className="flex-1 rounded-md bg-gray-50 p-2">
            <div className="flex items-center mb-1">
              <Server size={12} className="text-octaBlue-600 ml-0 mr-1 rtl:ml-1 rtl:mr-0" />
              <span className="text-xs font-medium font-tajawal">التعلم المستمر</span>
            </div>
            <p className="text-xs text-muted-foreground font-tajawal">يتعلم باستمرار من البيانات الجديدة</p>
          </div>
          <div className="flex-1 rounded-md bg-gray-50 p-2">
            <div className="flex items-center mb-1">
              <Zap size={12} className="text-amber-500 ml-0 mr-1 rtl:ml-1 rtl:mr-0" />
              <span className="text-xs font-medium font-tajawal">تطوير تلقائي</span>
            </div>
            <p className="text-xs text-muted-foreground font-tajawal">يُطور نفسه ويضيف أدوات جديدة</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
