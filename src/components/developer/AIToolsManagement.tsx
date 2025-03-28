import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
  PlusCircle,
  RefreshCcw,
  Settings,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  apiEndpoint?: string;
}

const getToolTemplate = (id: string = "", category: string = "storage"): AITool => {
  const iconMap: Record<string, React.ReactNode> = {
    "storage": <Database size={18} />,
    "monitoring": <BarChart size={18} />,
    "network": <Network size={18} />,
    "ai": <BrainCircuit size={18} />,
    "processing": <ArrowUpDown size={18} />,
    "security": <Lock size={18} />
  };
  
  return {
    id: id || `tool-${Date.now()}`,
    name: "",
    description: "",
    category,
    icon: iconMap[category] || <Database size={18} />,
    enabled: false,
    version: "1.0.0",
    isNew: true
  };
};

export function AIToolsManagement() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("storage");
  const [editMode, setEditMode] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTool, setNewTool] = useState<AITool | null>(null);

  const [tools, setTools] = useState<AITool[]>([
    {
      id: "elasticsearch",
      name: "Elasticsearch",
      description: "محرك بحث وتحليل قوي لتخزين وفهرسة البيانات النصية الكبيرة",
      category: "storage",
      icon: <Search size={18} />,
      enabled: true,
      version: "8.6.0",
      isCore: true,
      apiEndpoint: "https://api.elastic.co/"
    },
    {
      id: "influxdb",
      name: "InfluxDB",
      description: "قاعدة بيانات متخصصة في السلاسل الزمنية لتخزين بيانات المقاييس",
      category: "storage",
      icon: <Database size={18} />,
      enabled: true,
      version: "2.7.1",
      isCore: true,
      apiEndpoint: "https://influxdb.example.org/api/"
    },
    {
      id: "mongodb",
      name: "MongoDB",
      description: "قاعدة بيانات NoSQL مرنة لتخزين البيانات الهيكلية وشبه الهيكلية",
      category: "storage",
      icon: <Database size={18} />,
      enabled: false,
      version: "6.0.6",
      isNew: true,
      apiEndpoint: "https://mongodb.example.org/api/"
    },
    
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

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + 1;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTool = (id: string) => {
    setTools(prevTools => 
      prevTools.map(tool => 
        tool.id === id ? { ...tool, enabled: !tool.enabled } : tool
      )
    );
    
    const tool = tools.find(t => t.id === id);
    if (tool) {
      toast({
        title: tool.enabled ? `تم تعطيل ${tool.name}` : `تم تفعيل ${tool.name}`,
        description: tool.enabled 
          ? "تم إيقاف الأداة بنجاح" 
          : "تم تفعيل الأداة وجميع واجهات API المرتبطة بها",
      });
    }
  };

  const getToolsByCategory = (category: string) => {
    return filteredTools.filter(tool => tool.category === category);
  };

  const handleAddTool = (category: string) => {
    setNewTool(getToolTemplate("", category));
  };
  
  const handleSaveTool = () => {
    if (newTool && newTool.name.trim()) {
      setTools(prev => [...prev, { ...newTool, id: `${newTool.category}-${Date.now()}` }]);
      setNewTool(null);
      toast({
        title: `تمت إضافة ${newTool.name}`,
        description: "تمت إضافة الأداة الجديدة بنجاح"
      });
    } else {
      toast({
        title: "خطأ في الإضافة",
        description: "يرجى إدخال اسم الأداة على الأقل",
        variant: "destructive"
      });
    }
  };
  
  const handleCancelAddTool = () => {
    setNewTool(null);
  };
  
  const handleUpdateNewTool = (field: keyof AITool, value: string) => {
    if (newTool) {
      setNewTool(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

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
        <div className="flex items-center gap-2">
          {editMode ? (
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => {
                if (!tool.isCore) {
                  setTools(tools.filter(t => t.id !== tool.id));
                  toast({
                    title: `تم حذف ${tool.name}`,
                    description: "تمت إزالة الأداة من النظام"
                  });
                } else {
                  toast({
                    title: "لا يمكن الحذف",
                    description: "لا يمكن حذف الأدوات الأساسية",
                    variant: "destructive"
                  });
                }
              }}
              disabled={tool.isCore}
            >
              {t("tools.delete", "حذف")}
            </Button>
          ) : (
            <Switch
              checked={tool.enabled}
              onCheckedChange={() => toggleTool(tool.id)}
              disabled={tool.isCore && tool.enabled}
              aria-label={`تفعيل ${tool.name}`}
            />
          )}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{tool.description}</p>
      
      {editMode && (
        <div className="mt-3 pt-3 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor={`api-${tool.id}`}>عنوان API</Label>
              <Input 
                id={`api-${tool.id}`} 
                value={tool.apiEndpoint || ""} 
                placeholder="https://api.example.com/" 
                onChange={(e) => {
                  setTools(prevTools => 
                    prevTools.map(t => 
                      t.id === tool.id ? { ...t, apiEndpoint: e.target.value } : t
                    )
                  );
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`version-${tool.id}`}>الإصدار</Label>
              <Input 
                id={`version-${tool.id}`} 
                value={tool.version} 
                onChange={(e) => {
                  setTools(prevTools => 
                    prevTools.map(t => 
                      t.id === tool.id ? { ...t, version: e.target.value } : t
                    )
                  );
                }}
              />
            </div>
          </div>
          
          <div className="mt-3 space-y-2">
            <Label htmlFor={`desc-${tool.id}`}>الوصف</Label>
            <Input 
              id={`desc-${tool.id}`} 
              value={tool.description} 
              onChange={(e) => {
                setTools(prevTools => 
                  prevTools.map(t => 
                    t.id === tool.id ? { ...t, description: e.target.value } : t
                  )
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input 
            placeholder="البحث عن أدوات..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[250px]"
          />
          <span className="text-sm text-muted-foreground">
            {filteredTools.length} من {tools.length} أداة
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setEditMode(!editMode)}
          >
            <Settings size={16} className="mr-1" />
            {editMode ? "إنهاء التحرير" : "تحرير الأدوات"}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="storage" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3 md:grid-cols-6">
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
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            الأمان
          </TabsTrigger>
        </TabsList>

        <TabsContent value="storage" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">أدوات التخزين وقواعد البيانات</h3>
              <p className="text-sm text-muted-foreground">أدوات تخزين وتحليل البيانات</p>
            </div>
            {!newTool && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleAddTool("storage")}
              >
                <PlusCircle size={16} className="mr-1" />
                إضافة أداة
              </Button>
            )}
          </div>
          
          {newTool && newTool.category === "storage" && (
            <Card>
              <CardHeader>
                <CardTitle>إضافة أداة تخزين جديدة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tool-name">اسم الأداة</Label>
                      <Input 
                        id="tool-name" 
                        placeholder="اسم الأداة"
                        value={newTool.name}
                        onChange={(e) => handleUpdateNewTool("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tool-version">الإصدار</Label>
                      <Input 
                        id="tool-version" 
                        placeholder="1.0.0"
                        value={newTool.version}
                        onChange={(e) => handleUpdateNewTool("version", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tool-description">وصف الأداة</Label>
                    <Input 
                      id="tool-description" 
                      placeholder="وصف مختصر للأداة ووظيفتها"
                      value={newTool.description}
                      onChange={(e) => handleUpdateNewTool("description", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tool-api">عنوان API (اختياري)</Label>
                    <Input 
                      id="tool-api" 
                      placeholder="https://api.example.com/"
                      value={newTool.apiEndpoint || ""}
                      onChange={(e) => handleUpdateNewTool("apiEndpoint", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="ghost" onClick={handleCancelAddTool}>إلغاء</Button>
                <Button onClick={handleSaveTool}>حفظ</Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="space-y-4">
            {getToolsByCategory('storage').map(renderToolCard)}
            
            {getToolsByCategory('storage').length === 0 && searchQuery && (
              <div className="text-center p-4 border rounded-md">
                <p className="text-muted-foreground">لا توجد أدوات تطابق "{searchQuery}"</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">أدوات المراقبة</h3>
              <p className="text-sm text-muted-foreground">أدوات لمراقبة وتصور أداء الشبكة والنظام</p>
            </div>
            {!newTool && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleAddTool("monitoring")}
              >
                <PlusCircle size={16} className="mr-1" />
                إضافة أداة
              </Button>
            )}
          </div>
          
          {newTool && newTool.category === "monitoring" && (
            <Card>
              <CardHeader>
                <CardTitle>إضافة أداة مراقبة جديدة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tool-name">اسم الأداة</Label>
                      <Input 
                        id="tool-name" 
                        placeholder="اسم الأداة"
                        value={newTool.name}
                        onChange={(e) => handleUpdateNewTool("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tool-version">الإصدار</Label>
                      <Input 
                        id="tool-version" 
                        placeholder="1.0.0"
                        value={newTool.version}
                        onChange={(e) => handleUpdateNewTool("version", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tool-description">وصف الأداة</Label>
                    <Input 
                      id="tool-description" 
                      placeholder="وصف مختصر للأداة ووظيفتها"
                      value={newTool.description}
                      onChange={(e) => handleUpdateNewTool("description", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tool-api">عنوان API (اختياري)</Label>
                    <Input 
                      id="tool-api" 
                      placeholder="https://api.example.com/"
                      value={newTool.apiEndpoint || ""}
                      onChange={(e) => handleUpdateNewTool("apiEndpoint", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="ghost" onClick={handleCancelAddTool}>إلغاء</Button>
                <Button onClick={handleSaveTool}>حفظ</Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="space-y-4">
            {getToolsByCategory('monitoring').map(renderToolCard)}
            
            {getToolsByCategory('monitoring').length === 0 && (
              <div className="text-center p-4 border rounded-md">
                <p className="text-muted-foreground">
                  {searchQuery ? `لا توجد أدوات تطابق "${searchQuery}"` : "لا توجد أدوات مراقبة حاليًا"}
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="network" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">أدوات تحليل الشبكة</h3>
              <p className="text-sm text-muted-foreground">أدوات متخصصة في تحليل حركة مرور الشبكة وبروتوكولاتها</p>
            </div>
            {!newTool && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleAddTool("network")}
              >
                <PlusCircle size={16} className="mr-1" />
                إضافة أداة
              </Button>
            )}
          </div>
          
          {newTool && newTool.category === "network" && (
            <Card>
              <CardHeader>
                <CardTitle>إضافة أداة شبكة جديدة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tool-name">اسم الأداة</Label>
                      <Input 
                        id="tool-name" 
                        placeholder="اسم الأداة"
                        value={newTool.name}
                        onChange={(e) => handleUpdateNewTool("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tool-version">الإصدار</Label>
                      <Input 
                        id="tool-version" 
                        placeholder="1.0.0"
                        value={newTool.version}
                        onChange={(e) => handleUpdateNewTool("version", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tool-description">وصف الأداة</Label>
                    <Input 
                      id="tool-description" 
                      placeholder="وصف مختصر للأداة ووظيفتها"
                      value={newTool.description}
                      onChange={(e) => handleUpdateNewTool("description", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tool-api">عنوان API (اختياري)</Label>
                    <Input 
                      id="tool-api" 
                      placeholder="https://api.example.com/"
                      value={newTool.apiEndpoint || ""}
                      onChange={(e) => handleUpdateNewTool("apiEndpoint", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="ghost" onClick={handleCancelAddTool}>إلغاء</Button>
                <Button onClick={handleSaveTool}>حفظ</Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="space-y-4">
            {getToolsByCategory('network').map(renderToolCard)}
            
            {getToolsByCategory('network').length === 0 && searchQuery && (
              <div className="text-center p-4 border rounded-md">
                <p className="text-muted-foreground">لا توجد أدوات تطابق "{searchQuery}"</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">أدوات الذكاء الاصطناعي والتعلم الآلي</h3>
              <p className="text-sm text-muted-foreground">تقنيات التعلم الآلي والذكاء الاصطناعي للتحليل والتنبؤ</p>
            </div>
            {!newTool && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleAddTool("ai")}
              >
                <PlusCircle size={16} className="mr-1" />
                إضافة أداة
              </Button>
            )}
          </div>
          
          {newTool && newTool.category === "ai" && (
            <Card>
              <CardHeader>
                <CardTitle>إضافة أداة ذكاء اصطناعي جديدة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tool-name">اسم الأداة</Label>
                      <Input 
                        id="tool-name" 
                        placeholder="اسم الأداة"
                        value={newTool.name}
                        onChange={(e) => handleUpdateNewTool("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tool-version">الإصدار</Label>
                      <Input 
                        id="tool-version" 
                        placeholder="1.0.0"
                        value={newTool.version}
                        onChange={(e) => handleUpdateNewTool("version", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tool-description">وصف الأداة</Label>
                    <Input 
                      id="tool-description" 
                      placeholder="وصف مختصر للأداة ووظيفتها"
                      value={newTool.description}
                      onChange={(e) => handleUpdateNewTool("description", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tool-api">عنوان API (اختياري)</Label>
                    <Input 
                      id="tool-api" 
                      placeholder="https://api.example.com/"
                      value={newTool.apiEndpoint || ""}
                      onChange={(e) => handleUpdateNewTool("apiEndpoint", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="ghost" onClick={handleCancelAddTool}>إلغاء</Button>
                <Button onClick={handleSaveTool}>حفظ</Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="space-y-4">
            {getToolsByCategory('ai').map(renderToolCard)}
            
            {getToolsByCategory('ai').length === 0 && searchQuery && (
              <div className="text-center p-4 border rounded-md">
                <p className="text-muted-foreground">لا توجد أدوات تطابق "{searchQuery}"</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="processing" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">أدوات معالجة البيانات</h3>
              <p className="text-sm text-muted-foreground">أدوات لمعالجة وتحليل تدفقات البيانات في الوقت الفعلي</p>
            </div>
            {!newTool && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleAddTool("processing")}
              >
                <PlusCircle size={16} className="mr-1" />
                إضافة أداة
              </Button>
            )}
          </div>
          
          {newTool && newTool.category === "processing" && (
            <Card>
              <CardHeader>
                <CardTitle>إضافة أداة معالجة بيانات جديدة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tool-name">اسم الأداة</Label>
                      <Input 
                        id="tool-name" 
                        placeholder="اسم الأداة"
                        value={newTool.name}
                        onChange={(e) => handleUpdateNewTool("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tool-version">الإصدار</Label>
                      <Input 
                        id="tool-version" 
                        placeholder="1.0.0"
                        value={newTool.version}
                        onChange={(e) => handleUpdateNewTool("version", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tool-description">وصف الأداة</Label>
                    <Input 
                      id="tool-description" 
                      placeholder="وصف مختصر للأداة ووظيفتها"
                      value={newTool.description}
                      onChange={(e) => handleUpdateNewTool("description", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tool-api">عنوان API (اختياري)</Label>
                    <Input 
                      id="tool-api" 
                      placeholder="https://api.example.com/"
                      value={newTool.apiEndpoint || ""}
                      onChange={(e) => handleUpdateNewTool("apiEndpoint", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="ghost" onClick={handleCancelAddTool}>إلغاء</Button>
                <Button onClick={handleSaveTool}>حفظ</Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="space-y-4">
            {getToolsByCategory('processing').map(renderToolCard)}
            
            {getToolsByCategory('processing').length === 0 && searchQuery && (
              <div className="text-center p-4 border rounded-md">
                <p className="text-muted-foreground">لا توجد أدوات تطابق "{searchQuery}"</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">أدوات الأمان والحماية</h3>
              <p className="text-sm text-muted-foreground">أدوات لتأمين وحماية البيانات والأنظمة</p>
            </div>
            {!newTool && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleAddTool("security")}
              >
                <PlusCircle size={16} className="mr-1" />
                إضافة أداة
              </Button>
            )}
          </div>
          
          {newTool && newTool.category === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>إضافة أداة أمان جديدة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tool-name">اسم الأداة</Label>
                      <Input 
                        id="tool-name" 
                        placeholder="اسم الأداة"
                        value={newTool.name}
                        onChange={(e) => handleUpdateNewTool("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tool-version">الإصدار</Label>
                      <Input 
                        id="tool-version" 
                        placeholder="1.0.0"
                        value={newTool.version}
                        onChange={(e) => handleUpdateNewTool("version", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tool-description">وصف الأداة</Label>
                    <Input 
                      id="tool-description" 
                      placeholder="وصف مختصر للأداة ووظيفتها"
                      value={newTool.description}
                      onChange={(e) => handleUpdateNewTool("description", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tool-api">عنوان API (اختياري)</Label>
                    <Input 
                      id="tool-api" 
                      placeholder="https://api.example.com/"
                      value={newTool.apiEndpoint || ""}
                      onChange={(e) => handleUpdateNewTool("apiEndpoint", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="ghost" onClick={handleCancelAddTool}>إلغاء</Button>
                <Button onClick={handleSaveTool}>حفظ</Button>
              </CardFooter>
            </Card>
          )}
          
          <div className="space-y-4">
            {getToolsByCategory('security').map(renderToolCard)}
            
            {getToolsByCategory('security').length === 0 && searchQuery && (
              <div className="text-center p-4 border rounded-md">
                <p className="text-muted-foreground">لا توجد أدوات تطابق "{searchQuery}"</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="api-management">
          <AccordionTrigger className="py-4">
            <div className="flex items-center">
              <ExternalLink className="mr-2 h-5 w-5" />
              <span>إعدادات تكامل API</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">حالة الاتصال بواجهات API</h4>
                    <div className="space-y-2">
                      {["REST API", "GraphQL", "gRPC", "WebSocket"].map(api => (
                        <div key={api} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Server size={16} className="text-primary" />
                            <span>{api}</span>
                          </div>
                          <Badge variant="outline">{api === "REST API" || api === "WebSocket" ? "متصل" : "غير متصل"}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">إعدادات المصادقة</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="api-key" className="flex-1">مفتاح API العام</Label>
                        <Input id="api-key" className="w-2/3" value="API-****-****-****-****" disabled />
                        <Button variant="ghost" size="sm" className="ml-2">تغيير</Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="rate-limit" className="flex-1">حد الطلبات</Label>
                        <select className="w-2/3 p-2 border rounded-md bg-background">
                          <option>100 طلب / دقيقة</option>
                          <option>500 طلب / دقيقة</option>
                          <option>1000 طلب / دقيقة</option>
                          <option>غير محدود</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Card>
        <CardHeader>
          <CardTitle>تقرير أداء الأدوات</CardTitle>
          <CardDescription>مراقبة حالة وأداء جميع الأدوات والخدمات</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">تحديث النظام</h4>
                <Badge variant={progress < 100 ? "secondary" : "default"}>
                  {progress < 100 ? 'جاري التحديث' : 'مكتمل'}
                </Badge>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">آخر تحديث: منذ {Math.floor(Math.random() * 60)} دقيقة</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-sm font-medium">الأدوات النشطة</h5>
                  <span className="text-2xl font-semibold">{tools.filter(t => t.enabled).length}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">من أصل {tools.length} أداة</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-sm font-medium">تكاملات API</h5>
                  <span className="text-2xl font-semibold">{tools.filter(t => t.apiEndpoint).length}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">واجهات برمجة تطبيقات متاحة</p>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-sm font-medium">أدوات أساسية</h5>
                  <span className="text-2xl font-semibold">{tools.filter(t => t.isCore).length}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">ضرورية لعمل النظام</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
