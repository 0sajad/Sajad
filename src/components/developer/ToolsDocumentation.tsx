
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  BookOpen, 
  Layers, 
  Code, 
  Database,
  Server,
  Webhook,
  PlusCircle,
  Wrench,
  Sliders,
  Cpu
} from "lucide-react";

export function ToolsDocumentation() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("network");
  
  // فئات الأدوات
  const toolCategories = [
    { id: "network", name: "devTools.categories.network", icon: Webhook },
    { id: "security", name: "devTools.categories.security", icon: Shield },
    { id: "system", name: "devTools.categories.system", icon: Server },
    { id: "database", name: "devTools.categories.database", icon: Database },
    { id: "integration", name: "devTools.categories.integration", icon: PlusCircle },
    { id: "advanced", name: "devTools.categories.advanced", icon: Sliders },
  ];
  
  // تحميل قائمة الأدوات حسب الفئة المحددة
  const getToolsList = () => {
    // يمكن مستقبلاً تحميل هذه البيانات من API أو مصدر خارجي
    const toolsData = {
      network: [
        {
          id: "netOptimizer",
          name: "devTools.network.netOptimizer.name",
          description: "devTools.network.netOptimizer.description",
          usage: "devTools.network.netOptimizer.usage",
          params: [
            { name: "mode", type: "string", description: "devTools.network.netOptimizer.params.mode" },
            { name: "level", type: "number", description: "devTools.network.netOptimizer.params.level" }
          ],
          examples: "devTools.network.netOptimizer.examples",
          category: "network",
          level: "advanced"
        },
        {
          id: "packetAnalyzer",
          name: "devTools.network.packetAnalyzer.name",
          description: "devTools.network.packetAnalyzer.description",
          usage: "devTools.network.packetAnalyzer.usage",
          params: [
            { name: "filter", type: "string", description: "devTools.network.packetAnalyzer.params.filter" },
            { name: "depth", type: "number", description: "devTools.network.packetAnalyzer.params.depth" }
          ],
          examples: "devTools.network.packetAnalyzer.examples",
          category: "network",
          level: "advanced"
        },
        {
          id: "protocolInspector",
          name: "devTools.network.protocolInspector.name",
          description: "devTools.network.protocolInspector.description",
          usage: "devTools.network.protocolInspector.usage",
          params: [
            { name: "protocol", type: "string", description: "devTools.network.protocolInspector.params.protocol" }
          ],
          examples: "devTools.network.protocolInspector.examples",
          category: "network",
          level: "intermediate"
        },
        {
          id: "dnsManager",
          name: "devTools.network.dnsManager.name",
          description: "devTools.network.dnsManager.description",
          usage: "devTools.network.dnsManager.usage",
          params: [
            { name: "server", type: "string", description: "devTools.network.dnsManager.params.server" },
            { name: "cache", type: "boolean", description: "devTools.network.dnsManager.params.cache" }
          ],
          examples: "devTools.network.dnsManager.examples",
          category: "network",
          level: "basic"
        },
        {
          id: "trafficShaper",
          name: "devTools.network.trafficShaper.name",
          description: "devTools.network.trafficShaper.description",
          usage: "devTools.network.trafficShaper.usage",
          params: [
            { name: "rules", type: "object", description: "devTools.network.trafficShaper.params.rules" },
            { name: "priority", type: "array", description: "devTools.network.trafficShaper.params.priority" }
          ],
          examples: "devTools.network.trafficShaper.examples",
          category: "network",
          level: "expert"
        },
      ],
      security: [
        {
          id: "firewall",
          name: "devTools.security.firewall.name",
          description: "devTools.security.firewall.description",
          usage: "devTools.security.firewall.usage",
          params: [
            { name: "rules", type: "array", description: "devTools.security.firewall.params.rules" },
            { name: "mode", type: "string", description: "devTools.security.firewall.params.mode" }
          ],
          examples: "devTools.security.firewall.examples",
          category: "security",
          level: "advanced"
        },
        {
          id: "encryptor",
          name: "devTools.security.encryptor.name",
          description: "devTools.security.encryptor.description",
          usage: "devTools.security.encryptor.usage",
          params: [
            { name: "algorithm", type: "string", description: "devTools.security.encryptor.params.algorithm" },
            { name: "keySize", type: "number", description: "devTools.security.encryptor.params.keySize" }
          ],
          examples: "devTools.security.encryptor.examples",
          category: "security",
          level: "expert"
        },
        // يمكن إضافة المزيد من الأدوات هنا
      ],
      system: [
        {
          id: "processManager",
          name: "devTools.system.processManager.name",
          description: "devTools.system.processManager.description",
          usage: "devTools.system.processManager.usage",
          params: [
            { name: "filter", type: "string", description: "devTools.system.processManager.params.filter" },
            { name: "action", type: "string", description: "devTools.system.processManager.params.action" }
          ],
          examples: "devTools.system.processManager.examples",
          category: "system",
          level: "intermediate"
        },
        // يمكن إضافة المزيد من الأدوات هنا
      ],
      database: [
        {
          id: "queryOptimizer",
          name: "devTools.database.queryOptimizer.name",
          description: "devTools.database.queryOptimizer.description",
          usage: "devTools.database.queryOptimizer.usage",
          params: [
            { name: "query", type: "string", description: "devTools.database.queryOptimizer.params.query" },
            { name: "target", type: "string", description: "devTools.database.queryOptimizer.params.target" }
          ],
          examples: "devTools.database.queryOptimizer.examples",
          category: "database",
          level: "advanced"
        },
        // يمكن إضافة المزيد من الأدوات هنا
      ],
      integration: [
        {
          id: "apiConnector",
          name: "devTools.integration.apiConnector.name",
          description: "devTools.integration.apiConnector.description",
          usage: "devTools.integration.apiConnector.usage",
          params: [
            { name: "url", type: "string", description: "devTools.integration.apiConnector.params.url" },
            { name: "method", type: "string", description: "devTools.integration.apiConnector.params.method" }
          ],
          examples: "devTools.integration.apiConnector.examples",
          category: "integration",
          level: "intermediate"
        },
        // يمكن إضافة المزيد من الأدوات هنا
      ],
      advanced: [
        {
          id: "customTool",
          name: "devTools.advanced.customTool.name",
          description: "devTools.advanced.customTool.description",
          usage: "devTools.advanced.customTool.usage",
          params: [
            { name: "config", type: "object", description: "devTools.advanced.customTool.params.config" }
          ],
          examples: "devTools.advanced.customTool.examples",
          category: "advanced",
          level: "expert"
        },
        // يمكن إضافة المزيد من الأدوات هنا
      ]
    };
    
    return toolsData[activeCategory as keyof typeof toolsData] || [];
  };
  
  // تصفية الأدوات بناءً على البحث
  const tools = searchQuery 
    ? getToolsList().filter(tool => 
        t(tool.name).toLowerCase().includes(searchQuery.toLowerCase()) ||
        t(tool.description).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : getToolsList();
  
  // تحديد لون شارة المستوى
  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "basic": return "bg-green-50 text-green-700 border-green-200";
      case "intermediate": return "bg-blue-50 text-blue-700 border-blue-200";
      case "advanced": return "bg-purple-50 text-purple-700 border-purple-200";
      case "expert": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="bg-muted/50">
        <CardTitle className="flex items-center text-lg font-tajawal">
          <BookOpen className="mr-2 h-5 w-5" />
          {t('developer.documentation.title', 'توثيق أدوات المطور')}
        </CardTitle>
        <CardDescription className="font-tajawal">
          {t('developer.documentation.description', 'دليل شامل لجميع أدوات المطور المتوفرة مع شرح تفصيلي لاستخدامها')}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="p-4 pb-0">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('developer.documentation.search', 'ابحث عن أداة...')}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="network" value={activeCategory} onValueChange={setActiveCategory}>
          <div className="px-4 pt-2">
            <TabsList className="w-full justify-start grid grid-cols-3 md:grid-cols-6 mb-4">
              {toolCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="font-tajawal">
                  <category.icon className="mr-2 h-4 w-4" />
                  {t(category.name)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value={activeCategory} className="m-0">
            <div className="border-t">
              <div className="grid grid-cols-12 text-sm font-medium p-2 bg-muted/50">
                <div className="col-span-3">{t('developer.documentation.table.name', 'اسم الأداة')}</div>
                <div className="col-span-5">{t('developer.documentation.table.description', 'الوصف')}</div>
                <div className="col-span-2">{t('developer.documentation.table.category', 'الفئة')}</div>
                <div className="col-span-2">{t('developer.documentation.table.level', 'المستوى')}</div>
              </div>
              
              <ScrollArea className="h-[300px]">
                {tools.length > 0 ? (
                  tools.map((tool, index) => (
                    <React.Fragment key={tool.id}>
                      {index > 0 && <Separator />}
                      <div className="p-3 cursor-pointer hover:bg-muted/30">
                        <div className="grid grid-cols-12 mb-2">
                          <div className="col-span-3 font-medium">{t(tool.name)}</div>
                          <div className="col-span-5 text-sm text-muted-foreground">{t(tool.description)}</div>
                          <div className="col-span-2">
                            <Badge variant="outline" className="bg-gray-50">
                              {t(`devTools.categories.${tool.category}`)}
                            </Badge>
                          </div>
                          <div className="col-span-2">
                            <Badge variant="outline" className={getLevelBadgeColor(tool.level)}>
                              {t(`developer.level.${tool.level}`)}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <h4 className="text-sm font-medium mb-1">
                            {t('developer.documentation.usage', 'طريقة الاستخدام')}:
                          </h4>
                          <div className="bg-muted p-2 rounded text-sm font-mono">
                            {t(tool.usage)}
                          </div>
                        </div>
                        
                        {tool.params && tool.params.length > 0 && (
                          <div className="mt-2">
                            <h4 className="text-sm font-medium mb-1">
                              {t('developer.documentation.parameters', 'المعلمات')}:
                            </h4>
                            <div className="bg-muted/30 rounded">
                              {tool.params.map((param, pIndex) => (
                                <div key={param.name} className={`p-2 ${pIndex > 0 ? 'border-t' : ''}`}>
                                  <div className="flex items-start text-sm">
                                    <code className="font-mono bg-muted/50 px-1 py-0.5 rounded text-xs mr-2">{param.name}</code>
                                    <span className="text-xs bg-blue-50 text-blue-700 px-1 py-0.5 rounded mr-2">{param.type}</span>
                                    <span className="text-xs text-muted-foreground">{t(param.description)}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-2">
                          <h4 className="text-sm font-medium mb-1">
                            {t('developer.documentation.examples', 'أمثلة')}:
                          </h4>
                          <div className="bg-muted/20 p-2 rounded text-xs">
                            {t(tool.examples)}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <div className="flex items-center justify-center p-8 text-center">
                    <div>
                      <Wrench className="mx-auto h-12 w-12 text-muted" />
                      <h3 className="mt-2 text-lg font-medium">
                        {t('developer.documentation.noTools', 'لا توجد أدوات')}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t('developer.documentation.trySearch', 'جرب بحثًا آخر أو اختر فئة أخرى من القائمة')}
                      </p>
                    </div>
                  </div>
                )}
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
