
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Terminal, 
  Settings, 
  Code, 
  Network, 
  Shield, 
  Zap, 
  Database,
  BarChart4,
  Cpu,
  WifiOff,
  Webhook
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export function ToolsDocumentation() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  
  // تصنيفات الأدوات
  const toolCategories = [
    {
      id: "all",
      name: t('developer.toolsDocs.categories.all', 'جميع الأدوات'),
    },
    {
      id: "network",
      name: t('developer.toolsDocs.categories.network', 'أدوات الشبكة'),
      icon: <Network className="w-4 h-4 mr-1" />
    },
    {
      id: "security",
      name: t('developer.toolsDocs.categories.security', 'أدوات الأمان'),
      icon: <Shield className="w-4 h-4 mr-1" />
    },
    {
      id: "performance",
      name: t('developer.toolsDocs.categories.performance', 'أدوات الأداء'),
      icon: <Zap className="w-4 h-4 mr-1" />
    },
    {
      id: "code",
      name: t('developer.toolsDocs.categories.code', 'أدوات البرمجة'),
      icon: <Code className="w-4 h-4 mr-1" />
    },
    {
      id: "ai",
      name: t('developer.toolsDocs.categories.ai', 'أدوات الذكاء الاصطناعي'),
      icon: <Cpu className="w-4 h-4 mr-1" />
    }
  ];
  
  // قائمة الأدوات مع التفاصيل
  const tools = [
    {
      id: "network-monitor",
      name: t('developer.tools.networkMonitor.name', 'مراقب الشبكة المتقدم'),
      description: t('developer.tools.networkMonitor.description', 'أداة متقدمة لمراقبة حالة الشبكة وتحليل الأداء بشكل تفصيلي'),
      category: "network",
      icon: <Network />,
      usage: t('developer.tools.networkMonitor.usage', 'استخدم هذه الأداة لتحليل أداء الشبكة ومراقبة الاتصالات النشطة. يمكنك تحديد قيود النطاق الترددي واختبار سرعة الاتصال.'),
      parameters: [
        { name: "interface", type: "string", description: t('developer.tools.networkMonitor.params.interface', 'واجهة الشبكة المراد مراقبتها') },
        { name: "interval", type: "number", description: t('developer.tools.networkMonitor.params.interval', 'الفاصل الزمني للتحديث بالثواني') }
      ],
      returnValue: t('developer.tools.networkMonitor.return', 'تقرير مفصل عن حالة الشبكة وقياسات الأداء'),
      example: "networkMonitor.start({ interface: 'eth0', interval: 5 })"
    },
    {
      id: "packet-analyzer",
      name: t('developer.tools.packetAnalyzer.name', 'محلل الحزم'),
      description: t('developer.tools.packetAnalyzer.description', 'تحليل حزم البيانات وحركة المرور على الشبكة'),
      category: "network",
      icon: <BarChart4 />,
      usage: t('developer.tools.packetAnalyzer.usage', 'استخدم هذه الأداة لتحليل حزم البيانات ومراقبة حركة المرور على الشبكة. يمكنك تحديد بروتوكولات معينة أو عناوين IP للتصفية.'),
      parameters: [
        { name: "protocol", type: "string", description: t('developer.tools.packetAnalyzer.params.protocol', 'البروتوكول المراد تحليله (TCP, UDP, HTTP, etc)') },
        { name: "sourceIP", type: "string", description: t('developer.tools.packetAnalyzer.params.sourceIP', 'عنوان IP المصدر للتصفية') }
      ],
      returnValue: t('developer.tools.packetAnalyzer.return', 'تحليل مفصل لحزم البيانات ومعلومات حول حركة المرور'),
      example: "packetAnalyzer.analyze({ protocol: 'TCP', sourceIP: '192.168.1.1' })"
    },
    {
      id: "security-scanner",
      name: t('developer.tools.securityScanner.name', 'فاحص الأمان'),
      description: t('developer.tools.securityScanner.description', 'فحص شامل للأمان واكتشاف الثغرات المحتملة'),
      category: "security",
      icon: <Shield />,
      usage: t('developer.tools.securityScanner.usage', 'استخدم هذه الأداة لإجراء فحص أمان شامل للنظام واكتشاف الثغرات المحتملة. يمكنك تحديد مستوى العمق والنطاق للفحص.'),
      parameters: [
        { name: "depth", type: "string", description: t('developer.tools.securityScanner.params.depth', 'عمق الفحص (سريع، قياسي، عميق)') },
        { name: "targets", type: "array", description: t('developer.tools.securityScanner.params.targets', 'الأهداف المحددة للفحص (المنافذ، الخدمات، إلخ)') }
      ],
      returnValue: t('developer.tools.securityScanner.return', 'تقرير أمان مفصل مع توصيات لإصلاح الثغرات المكتشفة'),
      example: "securityScanner.scan({ depth: 'standard', targets: ['ports', 'services'] })"
    },
    {
      id: "ai-assistant",
      name: t('developer.tools.aiAssistant.name', 'مساعد الذكاء الاصطناعي للمطور'),
      description: t('developer.tools.aiAssistant.description', 'مساعد متقدم لاقتراح تحسينات وتوليد رموز وحل المشكلات'),
      category: "ai",
      icon: <Cpu />,
      usage: t('developer.tools.aiAssistant.usage', 'استخدم هذه الأداة للحصول على اقتراحات ذكية لتحسين البرنامج، توليد رموز، أو حل مشكلات معقدة.'),
      parameters: [
        { name: "query", type: "string", description: t('developer.tools.aiAssistant.params.query', 'السؤال أو المشكلة المراد حلها') },
        { name: "context", type: "object", description: t('developer.tools.aiAssistant.params.context', 'سياق إضافي للمساعدة في فهم المشكلة') }
      ],
      returnValue: t('developer.tools.aiAssistant.return', 'اقتراحات، حلول برمجية، أو توجيهات تفصيلية'),
      example: "aiAssistant.ask({ query: 'كيف يمكنني تحسين أداء الاتصال بالشبكة؟', context: { currentSetup: 'wifi-direct' } })"
    },
    {
      id: "database-optimizer",
      name: t('developer.tools.databaseOptimizer.name', 'محسن قواعد البيانات'),
      description: t('developer.tools.databaseOptimizer.description', 'تحسين أداء قواعد البيانات وتقليل وقت الاستجابة'),
      category: "performance",
      icon: <Database />,
      usage: t('developer.tools.databaseOptimizer.usage', 'استخدم هذه الأداة لتحسين أداء قواعد البيانات وتسريع الاستعلامات. يمكنك تحديد جداول معينة للتحسين أو إجراء تحسين شامل.'),
      parameters: [
        { name: "tables", type: "array", description: t('developer.tools.databaseOptimizer.params.tables', 'الجداول المراد تحسينها') },
        { name: "actions", type: "array", description: t('developer.tools.databaseOptimizer.params.actions', 'إجراءات التحسين (إعادة الفهرسة، تحليل، إلخ)') }
      ],
      returnValue: t('developer.tools.databaseOptimizer.return', 'تقرير يوضح التحسينات المطبقة والتأثير على الأداء'),
      example: "databaseOptimizer.optimize({ tables: ['users', 'logs'], actions: ['reindex', 'analyze'] })"
    },
    {
      id: "code-analyzer",
      name: t('developer.tools.codeAnalyzer.name', 'محلل الكود'),
      description: t('developer.tools.codeAnalyzer.description', 'تحليل جودة الكود واكتشاف المشاكل المحتملة'),
      category: "code",
      icon: <Code />,
      usage: t('developer.tools.codeAnalyzer.usage', 'استخدم هذه الأداة لتحليل جودة الكود واكتشاف المشاكل المحتملة مثل الثغرات الأمنية والأخطاء المنطقية.'),
      parameters: [
        { name: "path", type: "string", description: t('developer.tools.codeAnalyzer.params.path', 'مسار الملفات المراد تحليلها') },
        { name: "rules", type: "object", description: t('developer.tools.codeAnalyzer.params.rules', 'قواعد التحليل وإعداداتها') }
      ],
      returnValue: t('developer.tools.codeAnalyzer.return', 'تقرير تحليل مفصل مع توصيات للتحسين'),
      example: "codeAnalyzer.analyze({ path: './src', rules: { security: 'strict', performance: 'standard' } })"
    },
    {
      id: "connection-troubleshooter",
      name: t('developer.tools.connectionTroubleshooter.name', 'مستكشف مشاكل الاتصال'),
      description: t('developer.tools.connectionTroubleshooter.description', 'اكتشاف وحل مشاكل الاتصال بالشبكة تلقائيًا'),
      category: "network",
      icon: <WifiOff />,
      usage: t('developer.tools.connectionTroubleshooter.usage', 'استخدم هذه الأداة لاكتشاف وحل مشاكل الاتصال بالشبكة بشكل تلقائي. يمكنك تحديد نوع الاتصال وإجراءات الإصلاح.'),
      parameters: [
        { name: "connectionType", type: "string", description: t('developer.tools.connectionTroubleshooter.params.connectionType', 'نوع الاتصال (WiFi، Ethernet، Cellular)') },
        { name: "autoFix", type: "boolean", description: t('developer.tools.connectionTroubleshooter.params.autoFix', 'تفعيل الإصلاح التلقائي للمشاكل المكتشفة') }
      ],
      returnValue: t('developer.tools.connectionTroubleshooter.return', 'تقرير يوضح المشاكل المكتشفة والإجراءات المتخذة لحلها'),
      example: "connectionTroubleshooter.diagnose({ connectionType: 'WiFi', autoFix: true })"
    },
    {
      id: "api-tester",
      name: t('developer.tools.apiTester.name', 'اختبار واجهات API'),
      description: t('developer.tools.apiTester.description', 'اختبار وتحليل أداء واجهات API'),
      category: "code",
      icon: <Webhook />,
      usage: t('developer.tools.apiTester.usage', 'استخدم هذه الأداة لاختبار واجهات API وتحليل أدائها. يمكنك تحديد الطرق والبيانات لاختبار الاستجابة والأداء.'),
      parameters: [
        { name: "endpoint", type: "string", description: t('developer.tools.apiTester.params.endpoint', 'نقطة النهاية المراد اختبارها') },
        { name: "method", type: "string", description: t('developer.tools.apiTester.params.method', 'طريقة الطلب (GET، POST، PUT، DELETE)') },
        { name: "data", type: "object", description: t('developer.tools.apiTester.params.data', 'البيانات المراد إرسالها مع الطلب') }
      ],
      returnValue: t('developer.tools.apiTester.return', 'نتائج الاختبار بما في ذلك وقت الاستجابة وحالة الطلب والبيانات المستلمة'),
      example: "apiTester.test({ endpoint: 'https://api.example.com/users', method: 'GET', data: { limit: 10 } })"
    }
  ];
  
  // تصفية الأدوات بناءً على البحث والتصنيف المحدد
  const filterTools = (tools, category, searchQuery) => {
    return tools.filter(tool => {
      const matchesCategory = category === "all" || tool.category === category;
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  };
  
  // عرض تفاصيل الأداة
  const ToolDetails = ({ tool }) => {
    return (
      <Card className="mb-4 border-gray-200 hover:border-primary/50 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="mr-3 p-2 bg-primary/5 rounded-md">
                {tool.icon}
              </div>
              <div>
                <CardTitle className="text-lg font-tajawal">{tool.name}</CardTitle>
                <CardDescription className="font-tajawal">{tool.description}</CardDescription>
              </div>
            </div>
            <Badge variant="outline">{toolCategories.find(cat => cat.id === tool.category)?.name}</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1 font-tajawal">كيفية الاستخدام</h4>
              <p className="text-sm text-muted-foreground font-tajawal">{tool.usage}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1 font-tajawal">المعاملات</h4>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-right p-2 font-medium font-tajawal">الاسم</th>
                      <th className="text-right p-2 font-medium font-tajawal">النوع</th>
                      <th className="text-right p-2 font-medium font-tajawal">الوصف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tool.parameters.map((param, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2 font-mono text-xs font-tajawal">{param.name}</td>
                        <td className="p-2 font-tajawal">
                          <Badge variant="outline" className="font-mono text-xs">{param.type}</Badge>
                        </td>
                        <td className="p-2 text-muted-foreground font-tajawal">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1 font-tajawal">القيمة المرجعة</h4>
              <p className="text-sm text-muted-foreground font-tajawal">{tool.returnValue}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1 font-tajawal">مثال</h4>
              <div className="bg-black text-white p-3 rounded-md font-mono text-xs overflow-auto rtl:text-left ltr:text-left">
                {tool.example}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t('developer.toolsDocs.searchPlaceholder', 'البحث عن الأدوات...')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="pl-10 font-tajawal"
          />
        </div>
        
        <Tabs defaultValue="all">
          <TabsList className="w-full overflow-auto">
            {toolCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center">
                {category.icon}
                <span className="font-tajawal">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {toolCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-4">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {filterTools(tools, category.id, searchQuery).length > 0 ? (
                    filterTools(tools, category.id, searchQuery).map(tool => (
                      <ToolDetails key={tool.id} tool={tool} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <Search className="h-10 w-10 text-muted-foreground mb-3" />
                      <p className="text-muted-foreground font-tajawal">
                        {t('developer.toolsDocs.noResults', 'لم يتم العثور على أدوات تطابق معايير البحث')}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
