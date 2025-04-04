
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIPageHeader } from "@/components/ai/AIPageHeader";
import { EnhancedAIChat } from "@/components/ai/EnhancedAIChat";
import { LocalAIManager } from "@/components/ai/LocalAIManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { BrainCircuit, Database, Settings, Zap } from "lucide-react";

const AI = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const { t } = useTranslation();
  
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

  return (
    <div className={`min-h-screen w-full transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <AIPageHeader />
          
          <div className="mt-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                <TabsTrigger value="chat" className="flex items-center">
                  <BrainCircuit className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {t('ai.chat', 'المحادثة')}
                </TabsTrigger>
                <TabsTrigger value="models" className="flex items-center">
                  <Database className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {t('ai.models', 'النماذج')}
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center">
                  <Settings className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                  {t('ai.settings', 'الإعدادات')}
                </TabsTrigger>
              </TabsList>
              
              <div className="mt-8">
                <TabsContent value="chat" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <EnhancedAIChat initialMessages={messages} useLocalModel={true} />
                    </div>
                    <div className="space-y-6">
                      <LocalAIManager />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="models" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <LocalAIManager />
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-card border rounded-lg p-6">
                        <div className="flex items-center mb-4">
                          <Zap className="h-5 w-5 text-amber-500 mr-2 rtl:ml-2 rtl:mr-0" />
                          <h3 className="text-lg font-medium">{t('ai.selfLearning', 'التعلم الذاتي')}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {t('ai.selfLearningDesc', 'نماذج الذكاء الاصطناعي المحلية قادرة على التعلم من تفاعلاتك السابقة وتحسين استجاباتها مع مرور الوقت.')}
                        </p>
                        <div className="rounded-md bg-muted/50 p-3 text-sm">
                          <p className="text-muted-foreground">
                            {t('ai.localModelsAdvantage', 'ميزة النماذج المحلية: تعمل بدون اتصال بالإنترنت وتحافظ على خصوصية بياناتك.')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="mt-0">
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-card border rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-4">{t('ai.aiSettings', 'إعدادات الذكاء الاصطناعي')}</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        {t('ai.settingsDesc', 'ضبط سلوك وأداء الذكاء الاصطناعي وإدارة النماذج والبيانات')}
                      </p>
                      
                      <div className="space-y-6">
                        <LocalAIManager />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AI;
