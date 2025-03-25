
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FiberOpticDashboard } from "@/components/FiberOpticDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";
import { Zap, Cpu, Activity, Settings, FileText } from "lucide-react";

const FiberOptic = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // محاكاة تحميل البيانات
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-muted/30">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-16 transition-all duration-300">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2 font-tajawal text-center">لوحة مراقبة الألياف الضوئية</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-center font-tajawal">
            تحليل ومراقبة الألياف الضوئية ومؤشرات أدائها في الوقت الفعلي
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full animate-fade-in">
          <TabsList className="grid grid-cols-4 mb-8 w-full max-w-md mx-auto">
            <TabsTrigger value="dashboard" className="font-tajawal">
              <Activity className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">لوحة التحكم</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="font-tajawal">
              <Zap className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">القياسات</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="font-tajawal">
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">التقارير</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="font-tajawal">
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">الإعدادات</span>
            </TabsTrigger>
          </TabsList>
          
          <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            <TabsContent value="dashboard" className="mt-0">
              <ResizablePanelGroup direction="horizontal" className="min-h-[600px] rounded-lg border">
                <ResizablePanel defaultSize={25} minSize={20} className="p-4">
                  <div className="font-medium mb-4 font-tajawal">التشخيص السريع</div>
                  <div className="space-y-4">
                    {/* محتوى القائمة الجانبية */}
                    <div className="p-2 rounded-md hover:bg-muted cursor-pointer font-tajawal">فحص سريع</div>
                    <div className="p-2 rounded-md hover:bg-muted cursor-pointer font-tajawal">تحليل الإشارة</div>
                    <div className="p-2 rounded-md hover:bg-muted cursor-pointer font-tajawal">مراقبة الأداء</div>
                    <div className="p-2 rounded-md hover:bg-muted cursor-pointer font-tajawal">الأعطال الشائعة</div>
                  </div>
                </ResizablePanel>
                
                <ResizableHandle withHandle />
                
                <ResizablePanel defaultSize={75}>
                  <FiberOpticDashboard />
                </ResizablePanel>
              </ResizablePanelGroup>
            </TabsContent>
            
            <TabsContent value="metrics">
              <div className="rounded-lg border p-6 min-h-[600px]">
                <h3 className="text-xl font-medium mb-4 font-tajawal">قياسات الألياف الضوئية</h3>
                <p className="text-muted-foreground font-tajawal">قياسات تفصيلية عن أداء الألياف الضوئية في الوقت الفعلي.</p>
                
                {/* محتوى صفحة القياسات */}
              </div>
            </TabsContent>
            
            <TabsContent value="reports">
              <div className="rounded-lg border p-6 min-h-[600px]">
                <h3 className="text-xl font-medium mb-4 font-tajawal">تقارير الألياف الضوئية</h3>
                <p className="text-muted-foreground font-tajawal">سجل تقارير مفصل لأداء الألياف الضوئية مع إمكانية التصدير.</p>
                
                {/* محتوى صفحة التقارير */}
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="rounded-lg border p-6 min-h-[600px]">
                <h3 className="text-xl font-medium mb-4 font-tajawal">إعدادات الألياف الضوئية</h3>
                <p className="text-muted-foreground font-tajawal">تخصيص إعدادات مراقبة وتحليل الألياف الضوئية.</p>
                
                {/* محتوى صفحة الإعدادات */}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default FiberOptic;
