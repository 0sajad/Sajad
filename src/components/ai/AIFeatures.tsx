
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Network, Code, Wifi, Globe, FileCode, Database, Zap, Shield, BrainCircuit, Terminal, Layers, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";

export const AIFeatures = () => {
  const { t } = useTranslation();
  
  // المميزات المتاحة بالذكاء الاصطناعي
  const aiFeatures = [
    { name: "التطوير الذاتي المستمر", icon: BrainCircuit, description: "يتعلم ويطور نفسه باستمرار دون توقف" },
    { name: "حل المشاكل البرمجية", icon: Terminal, description: "يحل جميع مشاكل البرنامج دون تدخل المطور" },
    { name: "دعم جميع اللغات البرمجية", icon: Code, description: "يدعم كافة لغات البرمجة العالمية" },
    { name: "تحليل الشبكات", icon: Wifi, description: "تحليل أداء الشبكات والتنبؤ بالمشاكل قبل حدوثها" },
    { name: "إنشاء برامج ومواقع", icon: Globe, description: "تطوير برامج وواجهات ويب احترافية" },
    { name: "معالجة الملفات المتعددة", icon: FileCode, description: "استقبال ومعالجة جميع أنواع الملفات" },
    { name: "التكامل مع بيئات التطوير", icon: Database, description: "الاتصال مع مختلف بيئات التطوير" },
    { name: "الاتصال بالذكاء السحابي", icon: Layers, description: "التكامل مع خدمات الذكاء الاصطناعي السحابية" },
    { name: "المعالجة الصوتية المتقدمة", icon: Cpu, description: "فهم الأوامر الصوتية وتنفيذها بدقة عالية" },
    { name: "الحماية والأمان المتقدم", icon: Shield, description: "نظام متطور للأمان ضد الاختراقات والتهديدات" },
    { name: "التعلم الآلي المتقدم", icon: Zap, description: "استخدام تقنيات التعلم الآلي للتحسين المستمر" },
    { name: "تطوير أدوات الشبكات", icon: Network, description: "إضافة وتطوير أدوات الشبكات والاتصالات باستمرار" },
  ];

  return (
    <ScrollArea className="h-[500px] p-4">
      <div className="space-y-4">
        {aiFeatures.map((feature, index) => (
          <div 
            key={index} 
            className="flex items-start p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-colors cursor-pointer"
          >
            <div className="p-2 rounded-md bg-white shadow-sm mr-3">
              <feature.icon size={20} className="text-octaBlue-600" />
            </div>
            <div>
              <h4 className="font-medium text-sm">{feature.name}</h4>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
        
        <div className="mt-6">
          <h4 className="font-semibold mb-2">التطوير المستمر</h4>
          <div className="flex items-center mb-2">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" style={{width: '85%'}}></div>
            </div>
            <span className="text-xs font-medium ml-2">85%</span>
          </div>
          <p className="text-xs text-muted-foreground">
            يقوم النظام بالتطوير الذاتي المستمر وإضافة قدرات جديدة بناءً على آخر التقنيات في مجال الشبكات والاتصالات
          </p>
        </div>
        
        <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100">
          <h4 className="font-semibold mb-2 flex items-center">
            <Shield size={16} className="mr-2 text-amber-600" />
            نظام الحماية والأمان
          </h4>
          <p className="text-xs text-muted-foreground">
            يتضمن النظام حماية متقدمة ضد الاختراقات وتقنيات Machine Learning لتحليل النشاط المشبوه وتعزيز الأمان بشكل مستمر
          </p>
        </div>
      </div>
    </ScrollArea>
  );
};
