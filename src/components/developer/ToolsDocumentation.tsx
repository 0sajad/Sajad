import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription
} from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Search, 
  Cpu, 
  Wifi, 
  Database, 
  RefreshCw, 
  Settings, 
  FileText, 
  ShieldCheck,
  BrainCircuit
} from "lucide-react";

export const ToolsDocumentation = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  
  const toolCategories = [
    {
      id: "network",
      icon: <Wifi className="h-4 w-4 mr-2" />,
      name: t('toolCategories.network', 'أدوات الشبكة'),
      tools: [
        { id: "scan", name: t('tools.scan.name', 'فحص الشبكة'), description: t('tools.scan.desc', 'يقوم بفحص الشبكة واكتشاف الأجهزة المتصلة ومشاكل الاتصال')},
        { id: "optimize", name: t('tools.optimize.name', 'تحسين الشبكة'), description: t('tools.optimize.desc', 'تحسين أداء الشبكة وتسريعها وتقليل التأخير')},
        { id: "monitor", name: t('tools.monitor.name', 'مراقبة الشبكة'), description: t('tools.monitor.desc', 'مراقبة حركة البيانات على الشبكة وتحليلها')},
        { id: "troubleshoot", name: t('tools.troubleshoot.name', 'استكشاف مشاكل الشبكة'), description: t('tools.troubleshoot.desc', 'تشخيص وإصلاح مشاكل الاتصال والشبكة')},
      ]
    },
    {
      id: "security",
      icon: <ShieldCheck className="h-4 w-4 mr-2" />,
      name: t('toolCategories.security', 'أدوات الأمان'),
      tools: [
        { id: "firewall", name: t('tools.firewall.name', 'جدار الحماية'), description: t('tools.firewall.desc', 'إدارة إعدادات جدار الحماية وقواعد الأمان')},
        { id: "encryption", name: t('tools.encryption.name', 'التشفير'), description: t('tools.encryption.desc', 'إدارة وتكوين التشفير وحماية البيانات')},
        { id: "vulnerability", name: t('tools.vulnerability.name', 'فحص الثغرات'), description: t('tools.vulnerability.desc', 'البحث عن الثغرات الأمنية في النظام والشبكة')},
        { id: "securityMonitor", name: t('tools.securityMonitor.name', 'مراقبة الأمان'), description: t('tools.securityMonitor.desc', 'مراقبة الأحداث الأمنية والتهديدات المحتملة')},
      ]
    },
    {
      id: "system",
      icon: <Cpu className="h-4 w-4 mr-2" />,
      name: t('toolCategories.system', 'أدوات النظام'),
      tools: [
        { id: "performance", name: t('tools.performance.name', 'تحسين الأداء'), description: t('tools.performance.desc', 'تحسين أداء النظام وتسريعه')},
        { id: "diagnostics", name: t('tools.diagnostics.name', 'تشخيص المشاكل'), description: t('tools.diagnostics.desc', 'تشخيص مشاكل النظام والأجهزة')},
        { id: "update", name: t('tools.update.name', 'التحديثات'), description: t('tools.update.desc', 'إدارة تحديثات النظام والبرامج')},
        { id: "backup", name: t('tools.backup.name', 'النسخ الاحتياطي'), description: t('tools.backup.desc', 'إدارة النسخ الاحتياطي واستعادة البيانات')},
      ]
    },
    {
      id: "development",
      icon: <Code className="h-4 w-4 mr-2" />,
      name: t('toolCategories.development', 'أدوات التطوير'),
      tools: [
        { id: "codeAnalysis", name: t('tools.codeAnalysis.name', 'تحليل الكود'), description: t('tools.codeAnalysis.desc', 'تحليل جودة الكود وكشف المشاكل')},
        { id: "apiManagement", name: t('tools.apiManagement.name', 'إدارة واجهات API'), description: t('tools.apiManagement.desc', 'إنشاء وإدارة واجهات برمجة التطبيقات')},
        { id: "database", name: t('tools.database.name', 'إدارة قواعد البيانات'), description: t('tools.database.desc', 'أدوات إدارة قواعد البيانات وتحسين الأداء')},
        { id: "deployment", name: t('tools.deployment.name', 'النشر والتوزيع'), description: t('tools.deployment.desc', 'نشر وتوزيع التطبيقات والبرامج')},
      ]
    },
    {
      id: "ai",
      icon: <BrainCircuit className="h-4 w-4 mr-2" />,
      name: t('toolCategories.ai', 'أدوات الذكاء الاصطناعي'),
      tools: [
        { id: "modelTraining", name: t('tools.modelTraining.name', 'تدريب النماذج'), description: t('tools.modelTraining.desc', 'إنشاء وتدريب نماذج الذكاء الاصطناعي')},
        { id: "nlp", name: t('tools.nlp.name', 'معالجة اللغة الطبيعية'), description: t('tools.nlp.desc', 'أدوات معالجة اللغة الطبيعية وفهم النص')},
        { id: "imageAnalysis", name: t('tools.imageAnalysis.name', 'تحليل الصور'), description: t('tools.imageAnalysis.desc', 'تحليل ومعالجة الصور باستخدام الذكاء الاصطناعي')},
        { id: "predictionTools", name: t('tools.predictionTools.name', 'أدوات التنبؤ'), description: t('tools.predictionTools.desc', 'التنبؤ بالأحداث والمشاكل المستقبلية')},
      ]
    }
  ];
  
  return (
    <Card className="border rounded-lg shadow-sm">
      <CardHeader className="bg-octaBlue-50/50">
        <CardTitle className="text-lg flex items-center">
          <FileText className="mr-2 h-5 w-5 text-octaBlue-600" />
          {t('toolsDocumentation.title', 'دليل الأدوات')}
        </CardTitle>
        <CardDescription>
          {t('toolsDocumentation.description', 'استكشف مجموعة أدوات المطور الشاملة وتعرف على كيفية استخدامها')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('toolsDocumentation.searchPlaceholder', 'البحث عن أداة...')}
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="flex-wrap">
            <TabsTrigger value="all">
              {t('toolsDocumentation.allTools', 'كل الأدوات')}
            </TabsTrigger>
            {toolCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center">
                {category.icon}
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-6">
                {toolCategories.map(category => (
                  <div key={category.id} className="space-y-2">
                    <h3 className="text-md font-medium flex items-center">
                      {category.icon}
                      {category.name}
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                      {category.tools
                        .filter(tool => tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                       tool.description.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(tool => (
                        <AccordionItem key={tool.id} value={tool.id} className="border rounded-md mb-2 overflow-hidden">
                          <AccordionTrigger className="px-4 py-2 hover:bg-muted/30">
                            <div className="flex items-center">
                              <span>{tool.name}</span>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {category.name}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pt-2 pb-4 bg-card/50">
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">{tool.description}</p>
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="text-xs">
                                  <Settings className="mr-1 h-3 w-3" />
                                  {t('toolsDocumentation.configuration', 'قابل للتكوين')}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  <RefreshCw className="mr-1 h-3 w-3" />
                                  {t('toolsDocumentation.automation', 'يدعم التشغيل التلقائي')}
                                </Badge>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          {toolCategories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-2">
                  <Accordion type="single" collapsible className="w-full">
                    {category.tools
                      .filter(tool => tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                     tool.description.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(tool => (
                      <AccordionItem key={tool.id} value={tool.id} className="border rounded-md mb-2 overflow-hidden">
                        <AccordionTrigger className="px-4 py-2 hover:bg-muted/30">
                          <div className="flex items-center">
                            <span>{tool.name}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pt-2 pb-4 bg-card/50">
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">{tool.description}</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary" className="text-xs">
                                <Settings className="mr-1 h-3 w-3" />
                                {t('toolsDocumentation.configuration', 'قابل للتكوين')}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                <RefreshCw className="mr-1 h-3 w-3" />
                                {t('toolsDocumentation.automation', 'يدعم التشغيل التلقائي')}
                              </Badge>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};
