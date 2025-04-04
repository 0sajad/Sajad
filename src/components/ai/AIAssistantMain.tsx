
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnhancedAIChat } from "./EnhancedAIChat";
import { PredictiveAnalysis } from "./PredictiveAnalysis";
import { useTranslation } from "react-i18next";
import { MessageCircle, BrainCircuit, Maximize2, Minimize2, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AIAssistantMainProps {
  minimized?: boolean;
  onMaximize?: () => void;
  onMinimize?: () => void;
}

export function AIAssistantMain({ 
  minimized = false, 
  onMaximize, 
  onMinimize 
}: AIAssistantMainProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("chat");
  
  // الرسائل الأولية للمحادثة
  const initialMessages = [
    { 
      role: "assistant", 
      content: "مرحباً! أنا مساعد OCTA-GRAM الذكي. كيف يمكنني مساعدتك في مجال الشبكات والاتصالات؟",
      timestamp: new Date()
    }
  ];
  
  if (minimized) {
    return (
      <Button 
        onClick={onMaximize} 
        className="fixed bottom-4 right-4 shadow-lg flex items-center gap-2 bg-octaBlue-600 hover:bg-octaBlue-700"
        size="sm"
      >
        <BrainCircuit className="h-4 w-4" />
        <span>{t('aiAssistant.maximize', 'فتح مساعد الذكاء الاصطناعي')}</span>
        <Maximize2 className="h-4 w-4 ml-1" />
      </Button>
    );
  }
  
  return (
    <Card className="w-full h-full shadow-lg border-octaBlue-200">
      <CardHeader className="pb-2 bg-gradient-to-r from-octaBlue-50 to-octaBlue-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BrainCircuit className="h-5 w-5 text-octaBlue-600 mr-2 rtl:ml-2 rtl:mr-0" />
            <CardTitle className="text-octaBlue-900 text-lg">
              {t('aiAssistant.title', 'مساعد الذكاء الاصطناعي')}
            </CardTitle>
          </div>
          
          {onMinimize && (
            <Button variant="ghost" size="icon" onClick={onMinimize} className="h-8 w-8">
              <Minimize2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid grid-cols-2 w-full max-w-[400px]">
            <TabsTrigger value="chat" className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
              {t('ai.chat', 'المحادثة')}
            </TabsTrigger>
            <TabsTrigger value="predictive" className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
              {t('predictiveAnalysis.title', 'التحليل التنبؤي')}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      
      <CardContent className="p-0 flex-1">
        <TabsContent value="chat" className="mt-0 h-full">
          <EnhancedAIChat initialMessages={initialMessages} useLocalModel={true} />
        </TabsContent>
        
        <TabsContent value="predictive" className="mt-0 p-4 h-full overflow-auto">
          <PredictiveAnalysis />
        </TabsContent>
      </CardContent>
    </Card>
  );
}
