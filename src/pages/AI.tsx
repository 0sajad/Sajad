
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIAssistant } from "@/components/AIAssistant";
import { MessageSquare, Upload, Code } from "lucide-react";

// Import our new components
import { AIHeader } from "@/components/ai/AIHeader";
import { AIFeatures } from "@/components/ai/AIFeatures";
import { AIChat } from "@/components/ai/AIChat";
import { AIFileUpload } from "@/components/ai/AIFileUpload";
import { AITools } from "@/components/ai/AITools";

const AI = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState<{role: string, content: string, timestamp?: Date}[]>([
    {
      role: "assistant", 
      content: "مرحباً! أنا مساعد OCTA-GRAM الذكي. كيف يمكنني مساعدتك في مجال الشبكات والاتصالات؟", 
      timestamp: new Date()
    }
  ]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleFileUpload = (files: FileList) => {
    // محاكاة معالجة الملف
    const now = new Date();
    setMessages(prev => [...prev, {
      role: "user", 
      content: `قمت برفع ملف: ${files[0].name}`,
      timestamp: now
    }]);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant", 
        content: `تم استلام الملف ${files[0].name} بنجاح وتحليل محتواه. هل ترغب في مزيد من المعالجة؟`,
        timestamp: new Date()
      }]);
    }, 2000);
  };

  return (
    <div className={`min-h-screen w-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AIHeader />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <GlassCard className="h-full p-0">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="font-semibold text-lg">قدرات الذكاء الاصطناعي</h3>
                </div>
                <AIFeatures />
              </GlassCard>
            </div>
            
            <div className="lg:col-span-2">
              <Tabs defaultValue="chat" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="chat" className="flex-1">
                    <MessageSquare className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
                    المحادثة
                  </TabsTrigger>
                  <TabsTrigger value="files" className="flex-1">
                    <Upload className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
                    رفع الملفات
                  </TabsTrigger>
                  <TabsTrigger value="tools" className="flex-1">
                    <Code className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
                    الأدوات المتقدمة
                  </TabsTrigger>
                </TabsList>
                
                <GlassCard className="p-0 overflow-hidden">
                  <TabsContent value="chat" className="m-0">
                    <AIChat initialMessages={messages} />
                  </TabsContent>
                  
                  <TabsContent value="files" className="m-0">
                    <AIFileUpload onFileUpload={handleFileUpload} />
                  </TabsContent>
                  
                  <TabsContent value="tools" className="m-0">
                    <AITools />
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
