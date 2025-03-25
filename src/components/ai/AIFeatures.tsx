
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Network, Code, Wifi, Globe, FileCode, Database } from "lucide-react";

export const AIFeatures = () => {
  // المميزات المتاحة بالذكاء الاصطناعي
  const aiFeatures = [
    { name: "تطوير أدوات الشبكات", icon: Network, description: "إضافة وتطوير أدوات الشبكات والاتصالات باستمرار" },
    { name: "دعم جميع لغات البرمجة", icon: Code, description: "يدعم كافة لغات البرمجة العالمية" },
    { name: "تحليل الشبكات", icon: Wifi, description: "تحليل أداء الشبكات وتحسينها" },
    { name: "إنشاء برامج ومواقع", icon: Globe, description: "تطوير برامج وواجهات ويب احترافية" },
    { name: "معالجة الملفات المتعددة", icon: FileCode, description: "استقبال ومعالجة جميع أنواع الملفات" },
    { name: "التكامل مع بيئات التطوير", icon: Database, description: "الاتصال مع مختلف بيئات التطوير" }
  ];

  return (
    <ScrollArea className="h-[500px] p-4">
      <div className="space-y-4">
        {aiFeatures.map((feature, index) => (
          <div key={index} className="flex items-start p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
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
              <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" style={{width: '75%'}}></div>
            </div>
            <span className="text-xs font-medium ml-2">75%</span>
          </div>
          <p className="text-xs text-muted-foreground">
            يقوم النظام بالتطوير الذاتي المستمر وإضافة قدرات جديدة بناءً على آخر التقنيات في مجال الشبكات والاتصالات
          </p>
        </div>
      </div>
    </ScrollArea>
  );
};
