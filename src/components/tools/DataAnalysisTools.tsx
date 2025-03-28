
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useMode } from "@/context/ModeContext";
import { useTranslation } from "react-i18next";
import { 
  Database, 
  BarChart, 
  Search, 
  Network, 
  ArrowUpDown, 
  BrainCircuit,
  Workflow,
  RefreshCcw,
  Server,
  Shield,
  Cloud,
  AlertTriangle,
  Zap,
  CheckCircle2,
  Code,
  FileText
} from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  status: "active" | "inactive" | "loading" | "error";
  api?: string;
  version?: string;
  isCore?: boolean;
  isCloud?: boolean;
}

export function DataAnalysisTools() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { features, isDeveloperMode } = useMode();
  const [activeTab, setActiveTab] = useState("storage");
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  
  // المجموعات الرئيسية للأدوات
  const categories = [
    { id: "storage", label: "التخزين وقواعد البيانات", icon: <Database size={16} /> },
    { id: "analysis", label: "التحليل والمراقبة", icon: <BarChart size={16} /> },
    { id: "network", label: "تحليل الشبكات", icon: <Network size={16} /> },
    { id: "ai", label: "الذكاء الاصطناعي", icon: <BrainCircuit size={16} /> },
    { id: "integration", label: "التكامل والمعالجة", icon: <Workflow size={16} /> },
    { id: "security", label: "الأمان والحماية", icon: <Shield size={16} /> },
  ];
  
  // قائمة الأدوات المتاحة
  const [tools, setTools] = useState<Tool[]>([
    // Storage & Databases
    {
      id: "elasticsearch",
      name: "Elasticsearch",
      description: "محرك بحث وتحليل قوي لتخزين وفهرسة البيانات النصية الكبيرة",
      category: "storage",
      icon: <Search size={18} />,
      status: "active",
      version: "8.6.0",
      api: "REST API",
      isCore: true
    },
    {
      id: "influxdb",
      name: "InfluxDB",
      description: "قاعدة بيانات متخصصة في السلاسل الزمنية لتخزين بيانات المقاييس",
      category: "storage",
      icon: <Database size={18} />,
      status: "active",
      version: "2.7.1",
      api: "REST API",
      isCore: true
    },
    {
      id: "mongodb",
      name: "MongoDB",
      description: "قاعدة بيانات NoSQL مرنة لتخزين البيانات الهيكلية وشبه الهيكلية",
      category: "storage",
      icon: <Database size={18} />,
      status: "inactive",
      version: "6.0.6",
      api: "MongoDB API"
    },
    {
      id: "cassandra",
      name: "Apache Cassandra",
      description: "قاعدة بيانات موزعة عالية الأداء للتطبيقات الحساسة للتأخير",
      category: "storage",
      icon: <Database size={18} />,
      status: "inactive",
      version: "4.1.0",
      api: "CQL"
    },
    
    // Monitoring & Analysis
    {
      id: "prometheus",
      name: "Prometheus",
      description: "نظام مراقبة وتنبيه لجمع وتخزين المقاييس كسلاسل زمنية",
      category: "analysis",
      icon: <BarChart size={18} />,
      status: "active",
      version: "2.45.0",
      api: "HTTP API",
      isCore: true
    },
    {
      id: "grafana",
      name: "Grafana",
      description: "منصة لتصور البيانات وإنشاء لوحات المعلومات التفاعلية",
      category: "analysis",
      icon: <BarChart size={18} />,
      status: "active",
      version: "10.0.3",
      api: "HTTP API",
      isCore: true
    },
    {
      id: "kibana",
      name: "Kibana",
      description: "منصة تصور مفتوحة المصدر لتحليل البيانات في Elasticsearch",
      category: "analysis",
      icon: <BarChart size={18} />,
      status: "inactive",
      version: "8.6.0",
      api: "REST API"
    },
    {
      id: "metricbeat",
      name: "Metricbeat",
      description: "خدمة لجمع المقاييس من الأنظمة والخدمات",
      category: "analysis",
      icon: <Zap size={18} />,
      status: "loading",
      version: "8.6.0"
    },
    
    // Network Analysis
    {
      id: "wireshark",
      name: "Wireshark/TShark",
      description: "أدوات لتحليل حزم الشبكة على مستوى البروتوكول",
      category: "network",
      icon: <Network size={18} />,
      status: "active",
      version: "4.0.7",
      isCore: true
    },
    {
      id: "netflow",
      name: "NetFlow/IPFIX Libraries",
      description: "مكتبات لتحليل بيانات تدفق حركة مرور الشبكة",
      category: "network",
      icon: <ArrowUpDown size={18} />,
      status: "active",
      version: "1.7.2"
    },
    {
      id: "ntopng",
      name: "ntopng",
      description: "محلل حركة مرور الشبكة مع واجهة ويب تفاعلية",
      category: "network",
      icon: <Network size={18} />,
      status: "inactive",
      version: "5.4.0"
    },
    {
      id: "scapy",
      name: "Scapy",
      description: "مكتبة Python قوية لإنشاء وتحليل حزم الشبكة",
      category: "network",
      icon: <Code size={18} />,
      status: "active",
      version: "2.5.0"
    },
    
    // AI & ML
    {
      id: "scikit",
      name: "Scikit-learn",
      description: "مكتبة تعلم آلي في Python للتصنيف والتجميع والتنبؤ",
      category: "ai",
      icon: <BrainCircuit size={18} />,
      status: "active",
      version: "1.3.0"
    },
    {
      id: "tensorflow",
      name: "TensorFlow",
      description: "مكتبة للتعلم العميق وتطوير نماذج عصبية معقدة",
      category: "ai",
      icon: <BrainCircuit size={18} />,
      status: "inactive",
      version: "2.13.0"
    },
    {
      id: "aws_sagemaker",
      name: "AWS SageMaker",
      description: "خدمة سحابية لبناء ونشر نماذج التعلم الآلي",
      category: "ai",
      icon: <Cloud size={18} />,
      status: "loading",
      version: "API v2023-07",
      isCloud: true
    },
    {
      id: "azure_ml",
      name: "Azure Machine Learning",
      description: "منصة للتعلم الآلي والذكاء الاصطناعي من Microsoft",
      category: "ai",
      icon: <Cloud size={18} />,
      status: "inactive",
      version: "API v2023",
      isCloud: true
    },
    
    // Integration & Processing
    {
      id: "kafka",
      name: "Apache Kafka",
      description: "منصة معالجة تدفق البيانات في الوقت الفعلي",
      category: "integration",
      icon: <ArrowUpDown size={18} />,
      status: "active",
      version: "3.5.1",
      api: "Kafka API",
      isCore: true
    },
    {
      id: "flink",
      name: "Apache Flink",
      description: "محرك معالجة تدفق البيانات للتحليل في الوقت الفعلي",
      category: "integration",
      icon: <Workflow size={18} />,
      status: "inactive",
      version: "1.17.1",
      api: "DataStream API"
    },
    {
      id: "spark",
      name: "Apache Spark",
      description: "إطار عمل لمعالجة البيانات الكبيرة والتحليلات",
      category: "integration",
      icon: <Zap size={18} />,
      status: "active",
      version: "3.4.1",
      api: "Spark API"
    },
    {
      id: "rabbitmq",
      name: "RabbitMQ",
      description: "وسيط رسائل متقدم مفتوح المصدر",
      category: "integration",
      icon: <ArrowUpDown size={18} />,
      status: "inactive",
      version: "3.12.0",
      api: "AMQP"
    },
    
    // Security
    {
      id: "elk_security",
      name: "ELK Stack (Security)",
      description: "مجموعة Elasticsearch و Logstash و Kibana للأمان",
      category: "security",
      icon: <Shield size={18} />,
      status: "active",
      version: "8.6.0",
      isCore: true
    },
    {
      id: "splunk",
      name: "Splunk",
      description: "منصة لجمع وتحليل بيانات الأمان والمراقبة",
      category: "security",
      icon: <Search size={18} />,
      status: "inactive",
      version: "9.1.0"
    },
    {
      id: "suricata",
      name: "Suricata",
      description: "محرك كشف وحماية من التسلل مفتوح المصدر",
      category: "security",
      icon: <AlertTriangle size={18} />,
      status: "loading",
      version: "6.0.10"
    }
  ]);
  
  // تحديث حالة الأداة
  const updateToolStatus = (id: string, status: "active" | "inactive" | "loading" | "error") => {
    setTools(prevTools => 
      prevTools.map(tool => 
        tool.id === id ? { ...tool, status } : tool
      )
    );
    
    // عرض إشعار بالتغيير
    const tool = tools.find(t => t.id === id);
    if (tool) {
      toast({
        title: `تم تحديث حالة ${tool.name}`,
        description: status === "active" ? "تم تفعيل الأداة بنجاح" : status === "inactive" ? "تم إيقاف الأداة" : "جاري التحميل...",
        variant: status === "error" ? "destructive" : "default"
      });
    }
  };
  
  // الحصول على الأدوات حسب الفئة
  const getToolsByCategory = (category: string) => {
    return tools.filter(tool => tool.category === category);
  };
  
  // عرض أيقونة الحالة المناسبة
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle2 size={14} className="text-green-500" />;
      case "inactive":
        return <AlertTriangle size={14} className="text-gray-400" />;
      case "loading":
        return <RefreshCcw size={14} className="text-blue-500 animate-spin" />;
      case "error":
        return <AlertTriangle size={14} className="text-red-500" />;
      default:
        return null;
    }
  };
  
  // عرض الحالة كنص
  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return t("tools.status.active", "نشط");
      case "inactive":
        return t("tools.status.inactive", "غير نشط");
      case "loading":
        return t("tools.status.loading", "جاري التحميل");
      case "error":
        return t("tools.status.error", "خطأ");
      default:
        return "";
    }
  };
  
  // تبديل حالة الأداة
  const toggleTool = (id: string) => {
    const tool = tools.find(t => t.id === id);
    if (tool) {
      if (tool.status === "active") {
        updateToolStatus(id, "inactive");
      } else if (tool.status === "inactive") {
        updateToolStatus(id, "loading");
        // محاكاة وقت التحميل
        setTimeout(() => {
          updateToolStatus(id, "active");
        }, 1500);
      }
    }
  };
  
  // عرض تفاصيل الأداة
  const toggleExpandTool = (id: string) => {
    setExpandedTool(expandedTool === id ? null : id);
  };
  
  // عرض بطاقة الأداة
  const renderToolCard = (tool: Tool) => (
    <div 
      key={tool.id} 
      className={`border rounded-lg p-4 bg-card transition-all duration-300 ${
        expandedTool === tool.id ? 'shadow-md' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className={`mr-3 p-2 rounded-md ${
            tool.status === "active" ? 'bg-primary/10' : 'bg-muted'
          }`}>
            {tool.icon}
          </div>
          <div>
            <div className="flex items-center">
              <h4 className="font-medium">{tool.name}</h4>
              {tool.isCore && (
                <Badge variant="outline" className="mr-2 mr-2">أساسي</Badge>
              )}
              {tool.isCloud && (
                <Badge variant="secondary" className="mr-2">سحابي</Badge>
              )}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{t('version')}: {tool.version}</span>
              {tool.api && (
                <span className="mr-2">{tool.api}</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center mr-2 text-xs">
            {renderStatusIcon(tool.status)}
            <span className="mr-1">{getStatusText(tool.status)}</span>
          </div>
          {isDeveloperMode && (
            <Button 
              variant="ghost" 
              size="sm"
              disabled={tool.status === "loading" || tool.isCore}
              onClick={() => toggleTool(tool.id)}
            >
              {tool.status === "active" ? t("tools.deactivate", "إيقاف") : t("tools.activate", "تفعيل")}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleExpandTool(tool.id)}
          >
            {expandedTool === tool.id ? t("tools.collapse", "طي") : t("tools.expand", "تفاصيل")}
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{tool.description}</p>
      
      {expandedTool === tool.id && (
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-sm font-medium mb-2">{t("tools.details.info", "معلومات الأداة")}</h5>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>{t("tools.details.category", "الفئة")}: {categories.find(c => c.id === tool.category)?.label}</li>
                <li>{t("tools.details.version", "الإصدار")}: {tool.version}</li>
                {tool.api && <li>{t("tools.details.api", "واجهة برمجة التطبيقات")}: {tool.api}</li>}
                <li>{t("tools.details.status", "الحالة")}: {getStatusText(tool.status)}</li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium mb-2">{t("tools.details.integration", "التكامل")}</h5>
              <div className="flex flex-wrap gap-2">
                {getRelatedTools(tool.id).map(relatedTool => (
                  <Badge key={relatedTool.id} variant="outline" className="text-xs">
                    {relatedTool.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {isDeveloperMode && (
            <div className="mt-4 pt-2">
              <h5 className="text-sm font-medium mb-2">{t("tools.details.devControls", "إعدادات المطور")}</h5>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => updateToolStatus(tool.id, "loading")}>
                  {t("tools.details.reload", "إعادة تحميل")}
                </Button>
                <Button size="sm" variant="outline" onClick={() => console.log(`Debug ${tool.id}`)}>
                  {t("tools.details.debug", "فحص")}
                </Button>
                <Button size="sm" variant="outline" onClick={() => console.log(`Configure ${tool.id}`)}>
                  {t("tools.details.configure", "تكوين")}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
  // الحصول على الأدوات المتعلقة
  const getRelatedTools = (toolId: string) => {
    // في سيناريو حقيقي، هذه المعلومات ستكون من الخادم أو من البيانات
    const relations: Record<string, string[]> = {
      "elasticsearch": ["kibana", "elk_security", "grafana"],
      "influxdb": ["grafana", "prometheus"],
      "prometheus": ["grafana", "metricbeat"],
      "grafana": ["elasticsearch", "influxdb", "prometheus"],
      "wireshark": ["netflow", "scapy"],
      "netflow": ["wireshark", "ntopng"],
      "kafka": ["spark", "flink"],
      "spark": ["kafka", "flink"],
      "elk_security": ["elasticsearch", "kibana"],
      "scikit": ["tensorflow", "aws_sagemaker"]
    };
    
    const relatedIds = relations[toolId] || [];
    return tools.filter(tool => relatedIds.includes(tool.id));
  };
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full mb-4">
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center">
              <span className="mr-1.5">{category.icon}</span>
              <span className="hidden sm:inline">{category.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <span className="mr-2">{category.icon}</span>
                      {category.label}
                    </CardTitle>
                    <CardDescription>
                      {t(`tools.categories.${category.id}.description`, `أدوات ${category.label}`)}
                    </CardDescription>
                  </div>
                  {isDeveloperMode && (
                    <Badge variant="outline">
                      {getToolsByCategory(category.id).filter(t => t.status === "active").length} / {getToolsByCategory(category.id).length}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getToolsByCategory(category.id).map(renderToolCard)}
                </div>
              </CardContent>
              {isDeveloperMode && (
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    {t("tools.totalTools", "إجمالي الأدوات")}: {getToolsByCategory(category.id).length}
                  </div>
                  <div className="space-x-2 rtl:space-x-reverse">
                    <Button size="sm" variant="outline" onClick={() => {
                      // تفعيل جميع الأدوات في هذه الفئة
                      getToolsByCategory(category.id).forEach(tool => {
                        if (tool.status !== "active" && !tool.isCore) {
                          updateToolStatus(tool.id, "loading");
                          setTimeout(() => {
                            updateToolStatus(tool.id, "active");
                          }, 800);
                        }
                      });
                    }}>
                      {t("tools.activateAll", "تفعيل الكل")}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => {
                      // إيقاف جميع الأدوات غير الأساسية في هذه الفئة
                      getToolsByCategory(category.id).forEach(tool => {
                        if (tool.status === "active" && !tool.isCore) {
                          updateToolStatus(tool.id, "inactive");
                        }
                      });
                    }}>
                      {t("tools.deactivateAll", "إيقاف الكل")}
                    </Button>
                  </div>
                </CardFooter>
              )}
            </Card>
            
            {/* قسم الإحصائيات والتكامل لوضع المطور */}
            {isDeveloperMode && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("tools.integration", "التكامل والإحصائيات")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">{t("tools.loadStatus", "حالة التحميل")}</h4>
                      <div className="space-y-2">
                        {getToolsByCategory(category.id).map(tool => (
                          <div key={`load-${tool.id}`} className="flex items-center gap-2">
                            <div className="w-24 text-xs">{tool.name}</div>
                            <Progress 
                              value={tool.status === "active" ? 100 : tool.status === "loading" ? 70 : tool.status === "inactive" ? 10 : 0} 
                              className="h-2 flex-1" 
                            />
                            <div className="w-10 text-xs text-right">
                              {tool.status === "active" ? "100%" : tool.status === "loading" ? "70%" : tool.status === "inactive" ? "10%" : "0%"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">{t("tools.dependencies", "الاعتماديات")}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {getToolsByCategory(category.id).map(tool => {
                          const relatedTools = getRelatedTools(tool.id);
                          return (
                            <div key={`dep-${tool.id}`} className="text-xs border rounded p-2">
                              <div className="font-medium mb-1">{tool.name}</div>
                              <div className="text-muted-foreground">
                                {relatedTools.length > 0 
                                  ? `${t("tools.dependsOn", "يعتمد على")}: ${relatedTools.map(rt => rt.name).join(', ')}` 
                                  : t("tools.noDependencies", "لا توجد اعتماديات")}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      {/* قسم إضافة أدوات جديدة - متاح فقط في وضع المطور */}
      {isDeveloperMode && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t("tools.addNewTools", "إضافة أدوات جديدة")}</CardTitle>
            <CardDescription>
              {t("tools.addNewToolsDesc", "اكتشف وأضف أدوات جديدة لتعزيز قدرات النظام")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-center mb-3">
                  <Cloud className="mr-2 h-5 w-5 text-primary" />
                  <h4 className="font-medium">{t("tools.cloudIntegrations", "تكاملات سحابية")}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("tools.cloudIntegrationsDesc", "إضافة خدمات من AWS، Azure، Google Cloud وغيرها.")}
                </p>
              </div>
              
              <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-center mb-3">
                  <Server className="mr-2 h-5 w-5 text-primary" />
                  <h4 className="font-medium">{t("tools.customApis", "واجهات API مخصصة")}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("tools.customApisDesc", "إنشاء واجهات برمجة مخصصة للاتصال بخدماتك الخاصة.")}
                </p>
              </div>
              
              <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-center mb-3">
                  <Code className="mr-2 h-5 w-5 text-primary" />
                  <h4 className="font-medium">{t("tools.scriptAutomation", "أتمتة النصوص البرمجية")}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("tools.scriptAutomationDesc", "إنشاء وإدارة نصوص Python و R للتحليل الآلي.")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* تقارير التكامل - متاح للجميع */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>{t("tools.integrationReport", "تقرير التكامل")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>{t("tools.integrationScore", "درجة التكامل")}</span>
              <span className="font-medium">
                {tools.filter(t => t.status === "active").length} / {tools.length} ({Math.round((tools.filter(t => t.status === "active").length / tools.length) * 100)}%)
              </span>
            </div>
            <Progress value={(tools.filter(t => t.status === "active").length / tools.length) * 100} className="h-2" />
            
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-4">{t("tools.activeCategoriesHeader", "الفئات النشطة")}</h4>
                <div className="space-y-2">
                  {categories.map(category => {
                    const categoryTools = getToolsByCategory(category.id);
                    const activeCount = categoryTools.filter(t => t.status === "active").length;
                    const percentage = categoryTools.length > 0 ? (activeCount / categoryTools.length) * 100 : 0;
                    
                    return (
                      <div key={`cat-${category.id}`} className="flex items-center gap-2">
                        <div className="w-24 text-xs flex items-center">
                          <span className="mr-1.5">{category.icon}</span>
                          <span>{category.label}</span>
                        </div>
                        <Progress value={percentage} className="h-2 flex-1" />
                        <div className="w-16 text-xs text-right">
                          {activeCount} / {categoryTools.length}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-4">{t("tools.dataTypesHeader", "أنواع البيانات المدعومة")}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center p-2 border rounded-md text-xs">
                    <FileText className="mr-2 h-4 w-4 text-primary" />
                    <span>{t("tools.dataTypes.logs", "سجلات النظام")}</span>
                  </div>
                  <div className="flex items-center p-2 border rounded-md text-xs">
                    <Network className="mr-2 h-4 w-4 text-primary" />
                    <span>{t("tools.dataTypes.network", "بيانات الشبكة")}</span>
                  </div>
                  <div className="flex items-center p-2 border rounded-md text-xs">
                    <BarChart className="mr-2 h-4 w-4 text-primary" />
                    <span>{t("tools.dataTypes.metrics", "مقاييس الأداء")}</span>
                  </div>
                  <div className="flex items-center p-2 border rounded-md text-xs">
                    <Database className="mr-2 h-4 w-4 text-primary" />
                    <span>{t("tools.dataTypes.structured", "بيانات منظمة")}</span>
                  </div>
                  <div className="flex items-center p-2 border rounded-md text-xs">
                    <Search className="mr-2 h-4 w-4 text-primary" />
                    <span>{t("tools.dataTypes.search", "بيانات البحث")}</span>
                  </div>
                  <div className="flex items-center p-2 border rounded-md text-xs">
                    <Shield className="mr-2 h-4 w-4 text-primary" />
                    <span>{t("tools.dataTypes.security", "بيانات الأمان")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// التحويل الافتراضي لاستخدام React.lazy()
export default DataAnalysisTools;
