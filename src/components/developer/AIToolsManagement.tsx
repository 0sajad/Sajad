
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Database,
  Server,
  BarChart,
  MessageSquare,
  Network,
  Cpu,
  Cloud,
  Search,
  BrainCircuit,
  ArrowUpDown,
  Workflow,
  Lock,
  AlertTriangle,
} from "lucide-react";

interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  enabled: boolean;
  version: string;
  isCore?: boolean;
  isNew?: boolean;
}

export function AIToolsManagement() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("storage");

  // Initial AI tools data
  const [tools, setTools] = useState<AITool[]>([
    // Storage & Databases
    {
      id: "elasticsearch",
      name: "Elasticsearch",
      description: "محرك بحث وتحليل قوي لتخزين وفهرسة البيانات النصية الكبيرة",
      category: "storage",
      icon: <Search size={18} />,
      enabled: true,
      version: "8.6.0",
      isCore: true
    },
    {
      id: "influxdb",
      name: "InfluxDB",
      description: "قاعدة بيانات متخصصة في السلاسل الزمنية لتخزين بيانات المقاييس",
      category: "storage",
      icon: <Database size={18} />,
      enabled: true,
      version: "2.7.1",
      isCore: true
    },
    {
      id: "mongodb",
      name: "MongoDB",
      description: "قاعدة بيانات NoSQL مرنة لتخزين البيانات الهيكلية وشبه الهيكلية",
      category: "storage",
      icon: <Database size={18} />,
      enabled: false,
      version: "6.0.6",
      isNew: true
    },
    
    // Monitoring
    {
      id: "prometheus",
      name: "Prometheus",
      description: "نظام مراقبة وتنبيه لجمع وتخزين المقاييس كسلاسل زمنية",
      category: "monitoring",
      icon: <BarChart size={18} />,
      enabled: true,
      version: "2.45.0",
      isCore: true
    },
    {
      id: "grafana",
      name: "Grafana",
      description: "منصة لتصور البيانات وإنشاء لوحات المعلومات التفاعلية",
      category: "monitoring",
      icon: <BarChart size={18} />,
      enabled: true,
      version: "10.0.3",
      isCore: true
    },
    {
      id: "zabbix",
      name: "Zabbix",
      description: "منصة مراقبة شاملة للشبكات والخوادم والتطبيقات",
      category: "monitoring",
      icon: <AlertTriangle size={18} />,
      enabled: false,
      version: "6.4.0",
      isNew: true
    },
    
    // Network Analysis
    {
      id: "wireshark",
      name: "Wireshark/TShark",
      description: "أدوات لتحليل حزم الشبكة على مستوى البروتوكول",
      category: "network",
      icon: <Network size={18} />,
      enabled: true,
      version: "4.0.7",
      isCore: true
    },
    {
      id: "netflow",
      name: "NetFlow/IPFIX Libraries",
      description: "مكتبات لتحليل بيانات تدفق حركة مرور الشبكة",
      category: "network",
      icon: <ArrowUpDown size={18} />,
      enabled: true,
      version: "1.7.2",
      isCore: false
    },
    {
      id: "ntopng",
      name: "ntopng",
      description: "محلل حركة مرور الشبكة مع واجهة ويب تفاعلية",
      category: "network",
      icon: <Network size={18} />,
      enabled: false,
      version: "5.4.0",
      isNew: true
    },
    
    // AI & ML
    {
      id: "scikit",
      name: "Scikit-learn",
      description: "مكتبة تعلم آلي في Python للتصنيف والتجميع والتنبؤ",
      category: "ai",
      icon: <BrainCircuit size={18} />,
      enabled: true,
      version: "1.3.0",
      isCore: false
    },
    {
      id: "tensorflow",
      name: "TensorFlow",
      description: "مكتبة للتعلم العميق وتطوير نماذج عصبية معقدة",
      category: "ai",
      icon: <BrainCircuit size={18} />,
      enabled: false,
      version: "2.13.0",
      isNew: true
    },
    {
      id: "aws_sagemaker",
      name: "AWS SageMaker",
      description: "خدمة سحابية لبناء ونشر نماذج التعلم الآلي",
      category: "ai",
      icon: <Cloud size={18} />,
      enabled: true,
      version: "API v2023-07",
      isCore: false
    },
    
    // Processing
    {
      id: "kafka",
      name: "Apache Kafka",
      description: "منصة معالجة تدفق البيانات في الوقت الفعلي",
      category: "processing",
      icon: <ArrowUpDown size={18} />,
      enabled: true,
      version: "3.5.1",
      isCore: true
    },
    {
      id: "flink",
      name: "Apache Flink",
      description: "محرك معالجة تدفق البيانات للتحليل في الوقت الفعلي",
      category: "processing",
      icon: <Workflow size={18} />,
      enabled: false,
      version: "1.17.1",
      isNew: true
    },
    {
      id: "spark",
      name: "Apache Spark",
      description: "إطار عمل لمعالجة البيانات الكبيرة والتحليلات",
      category: "processing",
      icon: <Cpu size={18} />,
      enabled: true,
      version: "3.4.1",
      isCore: false
    },
    
    // Security
    {
      id: "elk_security",
      name: "ELK Stack (Security)",
      description: "مجموعة Elasticsearch و Logstash و Kibana للأمان",
      category: "security",
      icon: <Lock size={18} />,
      enabled: true,
      version: "8.6.0",
      isCore: true
    },
    {
      id: "splunk",
      name: "Splunk",
      description: "منصة لجمع وتحليل بيانات الأمان والمراقبة",
      category: "security",
      icon: <Search size={18} />,
      enabled: false,
      version: "9.1.0",
      isNew: true
    }
  ]);

  // Toggle tool enabled state
  const toggleTool = (id: string) => {
    setTools(prevTools => 
      prevTools.map(tool => 
        tool.id === id ? { ...tool, enabled: !tool.enabled } : tool
      )
    );
  };

  // Filter tools by category
  const getToolsByCategory = (category: string) => {
    return tools.filter(tool => tool.category === category);
  };

  // Render a tool card
  const renderToolCard = (tool: AITool) => (
    <div key={tool.id} className="border rounded-lg p-4 bg-card">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="mr-3 p-2 rounded-md bg-primary/10">
            {tool.icon}
          </div>
          <div>
            <div className="flex items-center">
              <h4 className="font-medium">{tool.name}</h4>
              {tool.isCore && (
                <Badge variant="outline" className="ml-2">أساسي</Badge>
              )}
              {tool.isNew && (
                <Badge className="ml-2 bg-green-500">جديد</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{t('version')}: {tool.version}</p>
          </div>
        </div>
        <Switch
          checked={tool.enabled}
          onCheckedChange={() => toggleTool(tool.id)}
          disabled={tool.isCore}
          aria-label={`تفعيل ${tool.name}`}
        />
      </div>
      <p className="text-sm text-muted-foreground">{tool.description}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="storage" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-5">
          <TabsTrigger value="storage">
            <Database className="h-4 w-4 mr-2" />
            التخزين
          </TabsTrigger>
          <TabsTrigger value="monitoring">
            <BarChart className="h-4 w-4 mr-2" />
            المراقبة
          </TabsTrigger>
          <TabsTrigger value="network">
            <Network className="h-4 w-4 mr-2" />
            الشبكة
          </TabsTrigger>
          <TabsTrigger value="ai">
            <BrainCircuit className="h-4 w-4 mr-2" />
            الذكاء الاصطناعي
          </TabsTrigger>
          <TabsTrigger value="processing">
            <Cpu className="h-4 w-4 mr-2" />
            المعالجة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="storage" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>أدوات التخزين وقواعد البيانات</CardTitle>
              <CardDescription>
                أدوات تخزين وتحليل البيانات الكبيرة والمعقدة
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getToolsByCategory('storage').map(renderToolCard)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>أدوات المراقبة</CardTitle>
              <CardDescription>
                أدوات لمراقبة وتصور أداء الشبكة والنظام
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getToolsByCategory('monitoring').map(renderToolCard)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>أدوات تحليل الشبكة</CardTitle>
              <CardDescription>
                أدوات متخصصة في تحليل حركة مرور الشبكة وبروتوكولاتها
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getToolsByCategory('network').map(renderToolCard)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>أدوات الذكاء الاصطناعي والتعلم الآلي</CardTitle>
              <CardDescription>
                تقنيات التعلم الآلي والذكاء الاصطناعي للتحليل والتنبؤ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getToolsByCategory('ai').map(renderToolCard)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>أدوات معالجة البيانات</CardTitle>
              <CardDescription>
                أدوات لمعالجة وتحليل تدفقات البيانات في الوقت الفعلي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getToolsByCategory('processing').map(renderToolCard)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="security">
          <AccordionTrigger className="py-4">
            <div className="flex items-center">
              <Lock className="mr-2 h-5 w-5" />
              <span>أدوات الأمان والحماية</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              {getToolsByCategory('security').map(renderToolCard)}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
