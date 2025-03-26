
import React, { useState } from "react";
import { Search } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

type Tool = {
  id: string;
  name: string;
  description: string;
  category: string;
  usage: string;
  icon?: React.ReactNode;
  tags: string[];
  newFeature?: boolean;
  premium?: boolean;
};

export function DeveloperTools() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Define tool categories
  const categories = [
    { id: "all", name: t('developer.tools.categories.all', 'كل الأدوات') },
    { id: "network", name: t('developer.tools.categories.network', 'أدوات الشبكة') },
    { id: "ai", name: t('developer.tools.categories.ai', 'أدوات الذكاء الاصطناعي') },
    { id: "security", name: t('developer.tools.categories.security', 'أدوات الأمان') },
    { id: "dev", name: t('developer.tools.categories.dev', 'أدوات التطوير') },
    { id: "analysis", name: t('developer.tools.categories.analysis', 'أدوات التحليل') },
    { id: "system", name: t('developer.tools.categories.system', 'أدوات النظام') },
    { id: "ui", name: t('developer.tools.categories.ui', 'أدوات الواجهة') }
  ];
  
  // Define tools list
  const tools: Tool[] = [
    // Network Tools
    {
      id: "network-scanner",
      name: t('developer.tools.networkScanner.name', 'ماسح الشبكة'),
      description: t('developer.tools.networkScanner.description', 'مسح الشبكة لاكتشاف الأجهزة المتصلة وتفاصيلها'),
      category: "network",
      usage: t('developer.tools.networkScanner.usage', 'استخدم هذه الأداة لاكتشاف الأجهزة على الشبكة وجمع معلومات مثل عنوان IP، عنوان MAC، ونوع الجهاز.'),
      tags: ["discovery", "devices", "monitoring"]
    },
    {
      id: "traffic-analyzer",
      name: t('developer.tools.trafficAnalyzer.name', 'محلل حركة المرور'),
      description: t('developer.tools.trafficAnalyzer.description', 'تحليل حركة مرور الشبكة للكشف عن الأنماط والمشكلات'),
      category: "network",
      usage: t('developer.tools.trafficAnalyzer.usage', 'استخدم هذه الأداة لتحليل حركة مرور الشبكة، وتحديد الاستخدام العالي، والكشف عن الأنماط غير الطبيعية.'),
      tags: ["traffic", "analysis", "monitoring"],
      newFeature: true
    },
    {
      id: "packet-inspector",
      name: t('developer.tools.packetInspector.name', 'فاحص الحزم'),
      description: t('developer.tools.packetInspector.description', 'فحص حزم البيانات الفردية للتحليل المتعمق'),
      category: "network",
      usage: t('developer.tools.packetInspector.usage', 'استخدم هذه الأداة لفحص حزم البيانات الفردية، وتحليل البروتوكولات، وتشخيص مشاكل الاتصال.'),
      tags: ["packets", "deep inspection", "protocols"]
    },
    
    // AI Tools
    {
      id: "ai-assistant",
      name: t('developer.tools.aiAssistant.name', 'مساعد الذكاء الاصطناعي المتقدم'),
      description: t('developer.tools.aiAssistant.description', 'مساعد ذكي لتحليل وتشخيص وحل مشاكل الشبكة'),
      category: "ai",
      usage: t('developer.tools.aiAssistant.usage', 'استخدم المساعد الذكي لتحليل بيانات الشبكة، وتقديم التوصيات، وحل المشكلات تلقائيًا.'),
      tags: ["assistant", "diagnostics", "recommendations"]
    },
    {
      id: "ai-code-generator",
      name: t('developer.tools.aiCodeGenerator.name', 'مولد الكود الذكي'),
      description: t('developer.tools.aiCodeGenerator.description', 'توليد تلقائي للكود باستخدام الذكاء الاصطناعي'),
      category: "ai",
      usage: t('developer.tools.aiCodeGenerator.usage', 'أدخل وصفًا للوظيفة التي تريدها وسيقوم المولد الذكي بإنشاء الكود اللازم لها.'),
      tags: ["code generation", "automation", "development"],
      premium: true
    },
    {
      id: "ai-predictor",
      name: t('developer.tools.aiPredictor.name', 'متنبئ الشبكة الذكي'),
      description: t('developer.tools.aiPredictor.description', 'التنبؤ بمشاكل الشبكة قبل حدوثها'),
      category: "ai",
      usage: t('developer.tools.aiPredictor.usage', 'يحلل بيانات الشبكة التاريخية للتنبؤ بالمشكلات المحتملة والتوصية بإجراءات استباقية.'),
      tags: ["prediction", "prevention", "analysis"],
      newFeature: true
    },
    
    // Security Tools
    {
      id: "vulnerability-scanner",
      name: t('developer.tools.vulnerabilityScanner.name', 'ماسح الثغرات الأمنية'),
      description: t('developer.tools.vulnerabilityScanner.description', 'فحص الشبكة والأجهزة للكشف عن الثغرات الأمنية'),
      category: "security",
      usage: t('developer.tools.vulnerabilityScanner.usage', 'قم بفحص الشبكة والأجهزة المتصلة للكشف عن الثغرات الأمنية المعروفة وتقديم توصيات الإصلاح.'),
      tags: ["security", "vulnerabilities", "scanning"]
    },
    {
      id: "firewall-manager",
      name: t('developer.tools.firewallManager.name', 'مدير جدار الحماية'),
      description: t('developer.tools.firewallManager.description', 'إدارة قواعد وإعدادات جدار الحماية'),
      category: "security",
      usage: t('developer.tools.firewallManager.usage', 'تكوين وإدارة قواعد جدار الحماية، ومراقبة الحركة المسموح بها والمحظورة.'),
      tags: ["firewall", "security", "rules"]
    },
    
    // Development Tools
    {
      id: "api-builder",
      name: t('developer.tools.apiBuilder.name', 'مطور واجهات البرمجة'),
      description: t('developer.tools.apiBuilder.description', 'إنشاء وإدارة واجهات برمجة التطبيقات (APIs)'),
      category: "dev",
      usage: t('developer.tools.apiBuilder.usage', 'تصميم وإنشاء واختبار واجهات برمجة التطبيقات (APIs) للتكامل مع خدمات أخرى.'),
      tags: ["API", "development", "integration"],
      premium: true
    },
    {
      id: "code-editor",
      name: t('developer.tools.codeEditor.name', 'محرر الكود'),
      description: t('developer.tools.codeEditor.description', 'محرر متكامل لتطوير وتعديل الكود'),
      category: "dev",
      usage: t('developer.tools.codeEditor.usage', 'استخدم المحرر لكتابة وتصحيح وتعديل الكود بتنسيق الألوان ودعم مجموعة واسعة من اللغات.'),
      tags: ["editor", "development", "coding"]
    },
    
    // Analysis Tools
    {
      id: "performance-profiler",
      name: t('developer.tools.performanceProfiler.name', 'محلل الأداء'),
      description: t('developer.tools.performanceProfiler.description', 'تحليل وتحسين أداء الشبكة والتطبيقات'),
      category: "analysis",
      usage: t('developer.tools.performanceProfiler.usage', 'قياس وتحليل أداء الشبكة والتطبيقات لتحديد نقاط الضعف وفرص التحسين.'),
      tags: ["performance", "optimization", "analysis"]
    },
    {
      id: "log-analyzer",
      name: t('developer.tools.logAnalyzer.name', 'محلل السجلات'),
      description: t('developer.tools.logAnalyzer.description', 'تحليل سجلات النظام والتطبيقات للكشف عن المشكلات'),
      category: "analysis",
      usage: t('developer.tools.logAnalyzer.usage', 'جمع وتحليل سجلات النظام والتطبيقات للكشف عن الأخطاء والأنماط وحل المشكلات.'),
      tags: ["logs", "analysis", "troubleshooting"],
      newFeature: true
    }
  ];
  
  // More tools would be defined here - this is just a sample set
  
  // Filter tools based on search query and active category
  const filteredTools = tools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Render a tool card
  const renderToolCard = (tool: Tool) => (
    <Card key={tool.id} className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2 bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium font-tajawal">
              {tool.name}
              {tool.newFeature && (
                <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                  {t('developer.tools.newFeature', 'جديد')}
                </Badge>
              )}
              {tool.premium && (
                <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                  {t('developer.tools.premium', 'مميز')}
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-xs font-tajawal">
              {tool.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 text-sm font-tajawal">
        <p className="mb-2 text-muted-foreground text-xs">{tool.usage}</p>
        <div className="flex flex-wrap gap-1 pt-2">
          {tool.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="space-y-4">
      <div className="flex items-center relative mb-4">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t('developer.tools.searchPlaceholder', 'ابحث عن الأدوات...')}
          className="pl-10 font-tajawal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveCategory}>
        <TabsList className="w-full justify-start overflow-x-auto pb-2 mb-4 border-b flex">
          {categories.map(category => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="font-tajawal text-sm whitespace-nowrap"
            >
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="text-sm font-medium text-muted-foreground mb-4 font-tajawal">
              {filteredTools.length === 0 ? (
                <p>{t('developer.tools.noResults', 'لا توجد نتائج للبحث')}</p>
              ) : (
                <p>
                  {t('developer.tools.resultsCount', 'عرض {{count}} من الأدوات', { 
                    count: filteredTools.length 
                  })}
                </p>
              )}
            </div>
            
            <ScrollArea className="h-[60vh] pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTools.map(renderToolCard)}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
