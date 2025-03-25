
import React, { useState } from "react";
import { Code, Network, Globe, Database, RefreshCcw, FileCode, Cpu, Shield, BrainCircuit, Terminal, Zap, Cloud } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

export const AITools = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("development");
  
  // محاكاة تطوير أدوات جديدة
  const developingTools = [
    { name: "محلل الشبكات المتقدم", progress: 78, icon: Network },
    { name: "معالج اللغات الطبيعية", progress: 92, icon: Terminal },
    { name: "محاكي الشبكات الافتراضية", progress: 65, icon: Globe },
    { name: "محرك تحليل البيانات", progress: 84, icon: Database }
  ];
  
  // تصنيف الأدوات المتاحة
  const toolCategories = {
    development: [
      { name: "محرر الكود الذكي", description: "تحرير وتحليل الكود مع اقتراحات ذكية", icon: Code },
      { name: "منشئ التطبيقات", description: "إنشاء تطبيقات ويب وبرامج بسرعة", icon: Globe },
      { name: "إدارة قواعد البيانات", description: "إنشاء وإدارة قواعد البيانات", icon: Database },
      { name: "محلل الكود البرمجي", description: "تحليل وتحسين الكود البرمجي", icon: FileCode }
    ],
    network: [
      { name: "محلل الشبكات", description: "تحليل وتشخيص مشاكل الشبكات", icon: Network },
      { name: "مراقب أداء الشبكة", description: "مراقبة أداء الشبكة في الوقت الحقيقي", icon: Cpu },
      { name: "كاشف الثغرات الأمنية", description: "كشف الثغرات الأمنية في الشبكة", icon: Shield },
      { name: "محاكي الشبكات", description: "محاكاة بيئات الشبكات المختلفة", icon: Globe }
    ],
    ai: [
      { name: "محرك التعلم الآلي", description: "إنشاء وتدريب نماذج التعلم الآلي", icon: BrainCircuit },
      { name: "معالجة اللغات", description: "فهم وتحليل اللغات الطبيعية", icon: Terminal },
      { name: "تكامل السحابة", description: "الاتصال بخدمات الذكاء الاصطناعي السحابية", icon: Cloud },
      { name: "الذكاء التنبؤي", description: "التنبؤ بالمشاكل قبل حدوثها", icon: Zap }
    ]
  };
  
  return (
    <div className="p-6 h-[500px] overflow-auto">
      <h3 className="text-xl font-semibold mb-4 font-tajawal">{t('ai.advancedTools', "أدوات متقدمة للمطورين")}</h3>
      
      <Tabs defaultValue="development" value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="development" className="flex-1">
            <Code size={14} className="mr-2" />
            {t('ai.development', "التطوير")}
          </TabsTrigger>
          <TabsTrigger value="network" className="flex-1">
            <Network size={14} className="mr-2" />
            {t('ai.network', "الشبكات")}
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex-1">
            <BrainCircuit size={14} className="mr-2" />
            {t('ai.ai', "الذكاء الاصطناعي")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="development" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolCategories.development.map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </TabsContent>
        
        <TabsContent value="network" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolCategories.network.map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </TabsContent>
        
        <TabsContent value="ai" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolCategories.ai.map((tool, index) => (
            <ToolCard key={index} tool={tool} />
          ))}
        </TabsContent>
      </Tabs>
      
      <div className="border rounded-lg p-4 bg-gray-50">
        <h4 className="font-medium mb-3 flex items-center font-tajawal">
          <RefreshCcw size={16} className="ml-0 mr-2 rtl:ml-2 rtl:mr-0 text-blue-600" />
          {t('ai.developingTools', "جاري تطوير أدوات جديدة")}
        </h4>
        
        <div className="space-y-4">
          {developingTools.map((tool, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <tool.icon size={14} className="mr-2 text-octaBlue-600" />
                  <span className="text-sm font-medium">{tool.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{tool.progress}%</span>
              </div>
              <Progress value={tool.progress} className="h-1.5" />
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground font-tajawal">
            {t('ai.selfDevelopment', "يقوم الذكاء الاصطناعي بتطوير أدوات جديدة باستمرار بناءً على آخر التقنيات في مجال الشبكات والبرمجة")}
          </p>
        </div>
      </div>
    </div>
  );
};

// بطاقة الأداة
const ToolCard = ({ tool }: { tool: { name: string; description: string; icon: any } }) => {
  const ToolIcon = tool.icon;
  
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
      <div className="flex items-center">
        <div className="p-2 rounded-md bg-octaBlue-50 ml-0 mr-3 rtl:ml-3 rtl:mr-0">
          <ToolIcon size={18} className="text-octaBlue-600" />
        </div>
        <div>
          <h4 className="font-medium font-tajawal">{tool.name}</h4>
          <p className="text-xs text-muted-foreground font-tajawal">{tool.description}</p>
        </div>
      </div>
    </div>
  );
};
