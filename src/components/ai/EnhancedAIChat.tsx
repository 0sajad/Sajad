
import React, { useState, useEffect, useRef } from "react";
import { useAIChat } from "@/hooks/use-ai-chat";
import { useLocalAI } from "@/hooks/use-local-ai";
import { ChatMessagesArea } from "./ChatMessagesArea";
import { FileInputHandler } from "./FileInputHandler";
import { ToolSelector } from "./ToolSelector";
import { ActiveToolsList } from "./ActiveToolsList";
import { ChatInput } from "./ChatInput";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BrainCircuit, Cpu, Server, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Message = {
  role: string;
  content: string;
  timestamp?: Date;
};

interface EnhancedAIChatProps {
  initialMessages?: Message[];
  useLocalModel?: boolean;
}

export const EnhancedAIChat = ({ 
  initialMessages = [],
  useLocalModel = false
}: EnhancedAIChatProps) => {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // AI Chat hook for UI and simulated responses
  const {
    messages,
    input,
    setInput,
    isProcessing: isSimulationProcessing,
    isListening,
    tools,
    handleSendMessage: handleSimulatedSendMessage,
    handleVoiceInput,
    handleFileUpload,
    toggleTool,
    clearAllTools
  } = useAIChat(initialMessages);
  
  // Local AI hook for actual AI processing
  const {
    isInitialized,
    isProcessing: isLocalAIProcessing,
    currentModel,
    generateText,
    deviceType
  } = useLocalAI();
  
  const [usingLocalAI, setUsingLocalAI] = useState(useLocalModel && isInitialized);
  const [processingMessage, setProcessingMessage] = useState('');
  
  const isProcessing = usingLocalAI ? isLocalAIProcessing : isSimulationProcessing;
  
  // المرور إلى أسفل عند إضافة رسائل جديدة
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // إرسال رسالة باستخدام الذكاء الاصطناعي المحلي
  const handleLocalAISendMessage = async () => {
    if (!input.trim() && tools.length === 0) return;
    
    const userMessage = input || "استخدم الأدوات: " + tools.join(", ");
    
    // إضافة رسالة المستخدم
    const userMessageObj: Message = {
      role: "user", 
      content: userMessage,
      timestamp: new Date()
    };
    
    // تحديث واجهة المستخدم
    setProcessingMessage(userMessage);
    setInput("");
    clearAllTools();
    
    // إضافة الرسالة إلى واجهة المستخدم باستخدام hook
    handleSimulatedSendMessage();
    
    // التحقق من النموذج المحمل
    if (!currentModel || currentModel.status !== 'loaded') {
      toast.error(t('ai.noModelLoaded', 'لم يتم تحميل نموذج الذكاء الاصطناعي'));
      return;
    }
    
    try {
      // توليد النص باستخدام النموذج المحلي
      const response = await generateText(userMessage);
      
      if (response) {
        // استخراج النص المولد (بدون النص الأصلي)
        const generatedText = response.replace(userMessage, '').trim();
        
        // إضافة رسالة الاستجابة من الذكاء الاصطناعي
        const aiResponse: Message = {
          role: "assistant",
          content: generatedText || t('ai.defaultResponse', 'أفهمك. هل يمكنني مساعدتك في شيء آخر؟'),
          timestamp: new Date()
        };
        
        // تحديث واجهة المستخدم
        handleSimulatedSendMessage();
      }
    } catch (error) {
      console.error('Error generating text:', error);
      toast.error(t('ai.textGenerationError', 'خطأ في توليد النص'));
    }
  };
  
  // مناولة إرسال الرسالة
  const handleSendMessage = () => {
    if (usingLocalAI && isInitialized && currentModel?.status === 'loaded') {
      handleLocalAISendMessage();
    } else {
      handleSimulatedSendMessage();
    }
  };
  
  // الحصول على أيقونة الجهاز
  const getDeviceIcon = () => {
    switch (deviceType) {
      case 'webgpu':
        return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'webgl':
        return <Server className="h-4 w-4 text-blue-500" />;
      default:
        return <Cpu className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <div className="flex flex-col h-[500px]" dir={isRTL ? "rtl" : "ltr"}>
      <FileInputHandler onFileChange={handleFileUpload}>
        {(triggerFileUpload) => (
          <>
            <div className="border-b pb-1 pt-1 px-3 flex items-center justify-between bg-muted/10">
              <div className="flex items-center">
                <BrainCircuit className="h-4 w-4 text-purple-500 mr-1.5 rtl:ml-1.5 rtl:mr-0" />
                <span className="text-sm font-medium">{t('ai.intelligentAssistant', 'المساعد الذكي')}</span>
              </div>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm" 
                      variant={usingLocalAI ? "default" : "outline"} 
                      className="h-7 text-xs"
                      onClick={() => setUsingLocalAI(prev => !prev)}
                      disabled={!isInitialized || !currentModel}
                    >
                      {getDeviceIcon()}
                      <span className="mx-1">{usingLocalAI ? t('ai.usingLocalAI', 'ذكاء محلي') : t('ai.usingSim', 'محاكاة')}</span>
                      <Badge variant="outline" className="text-[10px] h-4">
                        {usingLocalAI ? currentModel?.name || 'AI' : 'Demo'}
                      </Badge>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{usingLocalAI ? 
                      t('ai.usingLocalAITooltip', 'استخدام نموذج ذكاء اصطناعي محلي') : 
                      t('ai.usingSimTooltip', 'استخدام محاكاة للذكاء الاصطناعي')
                    }</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <ChatMessagesArea 
              messages={messages} 
              isProcessing={isProcessing}
            />
            
            <ActiveToolsList
              tools={tools}
              toggleTool={toggleTool}
              clearAllTools={clearAllTools}
            />
            
            <div className="p-4 border-t border-gray-100">
              <ToolSelector
                tools={tools}
                toggleTool={toggleTool}
              />
              
              <ChatInput
                input={input}
                setInput={setInput}
                handleSendMessage={handleSendMessage}
                handleVoiceInput={handleVoiceInput}
                handleFileUpload={triggerFileUpload}
                isProcessing={isProcessing}
                isListening={isListening}
                tools={tools}
                hasContent={input.trim().length > 0 || tools.length > 0}
              />
            </div>
            
            <div ref={messagesEndRef} />
          </>
        )}
      </FileInputHandler>
    </div>
  );
};
