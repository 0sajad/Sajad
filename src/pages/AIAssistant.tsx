
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AITabContent } from "@/components/ai/AITabContent";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useA11y } from "@/hooks/useA11y";
import { useMode } from "@/context/ModeContext";
import { DeveloperPanel } from "@/components/developer/DeveloperPanel";

const initialMessages = [
  {
    role: "assistant",
    content: "مرحباً! كيف يمكنني مساعدتك في شبكتك اليوم؟",
    timestamp: new Date()
  }
];

const AIAssistant = () => {
  const { t } = useTranslation(['aiAssistantPage']);
  const { isDeveloperMode } = useMode();
  const { announce } = useA11y();
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // تحميل البيانات وإعداد الصفحة
    const timer = setTimeout(() => {
      setIsLoading(false);
      announce(t('title'), "info");
    }, 300);
    
    return () => clearTimeout(timer);
  }, [announce, t]);
  
  const toggleListening = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      announce(t('startRecording'), "info");
      // هنا يمكن إضافة رمز لبدء التسجيل
    } else {
      announce(t('stopRecording'), "info");
      // هنا يمكن إضافة رمز لإيقاف التسجيل
    }
  };
  
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {isDeveloperMode && <DeveloperPanel />}
        
        <main className="flex-grow container mx-auto p-6 pb-20">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-muted-foreground">{t('description')}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <AITabContent initialMessages={initialMessages} />
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>{t('tools.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => announce(t('tools.networkAnalysis'))}>
                    {t('tools.networkAnalysis')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => announce(t('tools.securityScan'))}>
                    {t('tools.securityScan')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => announce(t('tools.troubleshoot'))}>
                    {t('tools.troubleshoot')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => announce(t('tools.optimize'))}>
                    {t('tools.optimize')}
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => announce(t('tools.deviceSetup'))}>
                    {t('tools.deviceSetup')}
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>{t('suggestedQueries')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    {t('suggestions.networkIssue')}
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    {t('suggestions.securityCheck')}
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    {t('suggestions.deviceConnection')}
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    {t('suggestions.signalStrength')}
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>{t('voiceAssistance')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={toggleListening}
                    variant={isListening ? "destructive" : "default"}
                    className="w-full"
                  >
                    {isListening ? (
                      <>
                        <MicOff className="mr-2 h-4 w-4" />
                        {t('stopRecording')}
                      </>
                    ) : (
                      <>
                        <Mic className="mr-2 h-4 w-4" />
                        {t('startRecording')}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default AIAssistant;
