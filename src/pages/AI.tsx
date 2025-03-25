
import React, { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { AIAssistant } from "@/components/AIAssistant";
import { 
  BrainCircuit, 
  Send, 
  Upload, 
  Code, 
  Globe, 
  Wifi, 
  Network, 
  FileCode, 
  Database,
  Image as ImageIcon,
  FileVideo,
  Link as LinkIcon,
  MessageSquare,
  RefreshCcw
} from "lucide-react";

const AI = () => {
  const [loaded, setLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    {role: "assistant", content: "مرحباً! أنا مساعد OCTA-GRAM الذكي. كيف يمكنني مساعدتك في مجال الشبكات والاتصالات؟"}
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // المميزات المتاحة بالذكاء الاصطناعي
  const aiFeatures = [
    { name: "تطوير أدوات الشبكات", icon: Network, description: "إضافة وتطوير أدوات الشبكات والاتصالات باستمرار" },
    { name: "دعم جميع لغات البرمجة", icon: Code, description: "يدعم كافة لغات البرمجة العالمية" },
    { name: "تحليل الشبكات", icon: Wifi, description: "تحليل أداء الشبكات وتحسينها" },
    { name: "إنشاء برامج ومواقع", icon: Globe, description: "تطوير برامج وواجهات ويب احترافية" },
    { name: "معالجة الملفات المتعددة", icon: FileCode, description: "استقبال ومعالجة جميع أنواع الملفات" },
    { name: "التكامل مع بيئات التطوير", icon: Database, description: "الاتصال مع مختلف بيئات التطوير" }
  ];

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, {role: "user", content: userMessage}]);
    setInput("");
    setIsProcessing(true);
    
    // محاكاة استجابة الذكاء الاصطناعي
    setTimeout(() => {
      const aiResponses = [
        "جاري معالجة طلبك وتنفيذه بأسرع وقت ممكن.",
        "تم تحليل المشكلة بنجاح، إليك الحل الأمثل.",
        "أقوم بتطوير أداة جديدة بناءً على طلبك، ستكون متاحة قريباً.",
        "اكتشفت تحديثاً جديداً في مجال تقنيات الشبكات، جاري تطبيقه على الأدوات الحالية.",
        "تم تحليل بنية الشبكة بنجاح، إليك التوصيات لتحسين الأداء."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages(prev => [...prev, {role: "assistant", content: randomResponse}]);
      setIsProcessing(false);
      
      toast({
        title: "تم معالجة الطلب",
        description: "قام الذكاء الاصطناعي بمعالجة طلبك بنجاح",
      });
    }, 1500);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      toast({
        title: "تم استلام الملف",
        description: `تم استلام الملف ${files[0].name} وجاري معالجته`,
      });
      
      setMessages(prev => [...prev, {
        role: "user", 
        content: `قمت برفع ملف: ${files[0].name}`
      }]);
      
      // محاكاة معالجة الملف
      setIsProcessing(true);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: "assistant", 
          content: `تم استلام الملف ${files[0].name} بنجاح وتحليل محتواه. هل ترغب في مزيد من المعالجة؟`
        }]);
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <div className={`min-h-screen w-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-6">
              <BrainCircuit className="mr-2" size={16} />
              <span>نظام الذكاء الاصطناعي المتطور</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              مساعد OCTA-GRAM الذكي
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              ذكاء اصطناعي متطور يتعلم باستمرار ويتطور ذاتياً لمساعدتك في مجال الشبكات والاتصالات
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <GlassCard className="h-full p-0">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-lg">قدرات الذكاء الاصطناعي</h3>
                </div>
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
              </GlassCard>
            </div>
            
            <div className="lg:col-span-2">
              <Tabs defaultValue="chat" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="chat" className="flex-1">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    المحادثة
                  </TabsTrigger>
                  <TabsTrigger value="files" className="flex-1">
                    <Upload className="mr-2 h-4 w-4" />
                    رفع الملفات
                  </TabsTrigger>
                  <TabsTrigger value="tools" className="flex-1">
                    <Code className="mr-2 h-4 w-4" />
                    الأدوات المتقدمة
                  </TabsTrigger>
                </TabsList>
                
                <GlassCard className="p-0 overflow-hidden">
                  <TabsContent value="chat" className="m-0">
                    <div className="flex flex-col h-[500px]">
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          {messages.map((msg, index) => (
                            <div 
                              key={index} 
                              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div 
                                className={`max-w-[80%] p-3 rounded-lg ${
                                  msg.role === "user" 
                                    ? "bg-octaBlue-600 text-white" 
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {msg.content}
                              </div>
                            </div>
                          ))}
                          <div ref={messagesEndRef} />
                          {isProcessing && (
                            <div className="flex justify-start">
                              <div className="max-w-[80%] p-3 rounded-lg bg-gray-100">
                                <div className="flex space-x-2 rtl:space-x-reverse">
                                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                      
                      <div className="p-4 border-t border-gray-100">
                        <div className="flex gap-2">
                          <Input
                            placeholder="اكتب رسالتك هنا..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            className="flex-1"
                          />
                          <Button 
                            onClick={handleSendMessage} 
                            size="icon"
                            disabled={isProcessing || !input.trim()}
                          >
                            <Send size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="files" className="m-0">
                    <div className="p-6 flex flex-col items-center justify-center h-[500px]">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                      />
                      
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Upload size={32} className="text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">رفع الملفات للتحليل</h3>
                        <p className="text-muted-foreground max-w-md">
                          يمكنك رفع أي نوع من الملفات: صور، فيديو، صوت، مستندات، ملفات برمجية، وأكثر.
                        </p>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 justify-center mb-8">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <ImageIcon size={12} /> صور
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <FileVideo size={12} /> فيديو
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <FileCode size={12} /> برمجة
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Database size={12} /> بيانات
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <LinkIcon size={12} /> روابط
                        </Badge>
                      </div>
                      
                      <Button onClick={handleFileUpload} className="gap-2">
                        <Upload size={16} />
                        اختر ملفًا للرفع
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tools" className="m-0">
                    <div className="p-6 h-[500px]">
                      <h3 className="text-xl font-semibold mb-4">أدوات متقدمة للمطورين</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center">
                            <div className="p-2 rounded-md bg-octaBlue-50 mr-3">
                              <Code size={18} className="text-octaBlue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">محرر الكود الذكي</h4>
                              <p className="text-xs text-muted-foreground">تحرير وتحليل الكود مع اقتراحات ذكية</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center">
                            <div className="p-2 rounded-md bg-purple-50 mr-3">
                              <Network size={18} className="text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">محلل الشبكات</h4>
                              <p className="text-xs text-muted-foreground">تحليل وتشخيص مشاكل الشبكات</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center">
                            <div className="p-2 rounded-md bg-green-50 mr-3">
                              <Globe size={18} className="text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">منشئ التطبيقات</h4>
                              <p className="text-xs text-muted-foreground">إنشاء تطبيقات ويب وبرامج بسرعة</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center">
                            <div className="p-2 rounded-md bg-amber-50 mr-3">
                              <Database size={18} className="text-amber-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">إدارة قواعد البيانات</h4>
                              <p className="text-xs text-muted-foreground">إنشاء وإدارة قواعد البيانات</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2 flex items-center">
                          <RefreshCcw size={16} className="mr-2 animate-spin" />
                          جاري تطوير أدوات جديدة
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          يقوم الذكاء الاصطناعي بتطوير أدوات جديدة باستمرار بناءً على آخر التقنيات في مجال الشبكات والبرمجة
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </GlassCard>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AI;
