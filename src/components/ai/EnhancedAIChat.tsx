
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
import { BrainCircuit, Cpu, Server, Zap, ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Message = {
  role: string;
  content: string;
  timestamp?: Date;
  id?: string;
  feedback?: 'positive' | 'negative' | null;
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
    messages: simulatedMessages,
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
    deviceType,
    isSelfLearningEnabled,
    toggleSelfLearning,
    addFeedback
  } = useLocalAI();
  
  const [usingLocalAI, setUsingLocalAI] = useState(useLocalModel && isInitialized);
  const [processingMessage, setProcessingMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  
  const isProcessing = usingLocalAI ? isLocalAIProcessing : isSimulationProcessing;
  
  // المرور إلى أسفل عند إضافة رسائل جديدة
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  
  // تحديث الرسائل عند تغيير الرسائل المحاكاة
  useEffect(() => {
    if (!usingLocalAI) {
      setMessages(simulatedMessages);
    }
  }, [simulatedMessages, usingLocalAI]);
  
  // إرسال رسالة باستخدام الذكاء الاصطناعي المحلي
  const handleLocalAISendMessage = async () => {
    if (!input.trim() && tools.length === 0) return;
    
    const userMessage = input || "استخدم الأدوات: " + tools.join(", ");
    
    // إضافة رسالة المستخدم
    const userMessageObj: Message = {
      role: "user", 
      content: userMessage,
      timestamp: new Date(),
      id: Date.now().toString()
    };
    
    setMessages(prev => [...prev, userMessageObj]);
    
    // تحديث واجهة المستخدم
    setProcessingMessage(userMessage);
    setInput("");
    clearAllTools();
    
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
          timestamp: new Date(),
          id: Date.now().toString(),
          feedback: null
        };
        
        // تحديث رسائل الدردشة
        setMessages(prev => [...prev, aiResponse]);
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
  
  // تقديم تغذية راجعة لرسالة
  const handleFeedback = (messageId: string | undefined, feedbackType: 'positive' | 'negative') => {
    if (!messageId) return;
    
    // تحديث حالة الرسالة
    setMessages(prev => {
      const updatedMessages = prev.map(msg => {
        if (msg.id === messageId) {
          return { ...msg, feedback: feedbackType };
        }
        return msg;
      });
      
      // العثور على مؤشر الرسالة وتقديم الملاحظات للذكاء الاصطناعي المحلي
      const messageIndex = prev.findIndex(msg => msg.id === messageId);
      if (messageIndex !== -1) {
        addFeedback(messageIndex, feedbackType);
      }
      
      return updatedMessages;
    });
    
    // عرض إشعار
    toast.success(
      feedbackType === 'positive' 
        ? t('ai.feedbackThanksPositive', 'شكراً على تقييمك الإيجابي! سأتعلم من هذا.')
        : t('ai.feedbackThanksNegative', 'شكراً على ملاحظاتك. سأحاول التحسن.')
    );
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
  
  // عرض المحادثة مع أزرار التغذية الراجعة للرسائل
  const renderMessagesWithFeedback = () => {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={message.id || index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
              <div className={`rounded-lg p-3 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                <p>{message.content}</p>
                {message.timestamp && (
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                )}
              </div>
              
              {message.role === 'assistant' && usingLocalAI && (
                <div className="flex flex-col space-y-1">
                  <Button 
                    size="icon" 
                    variant={message.feedback === 'positive' ? 'default' : 'outline'} 
                    className="h-6 w-6"
                    onClick={() => handleFeedback(message.id, 'positive')}
                    disabled={message.feedback !== null}
                  >
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant={message.feedback === 'negative' ? 'destructive' : 'outline'} 
                    className="h-6 w-6"
                    onClick={() => handleFeedback(message.id, 'negative')}
                    disabled={message.feedback !== null}
                  >
                    <ThumbsDown className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-secondary text-secondary-foreground rounded-lg p-3">
              <div className="flex space-x-1 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    );
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
              
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {usingLocalAI && (
                  <div className="flex items-center mr-2 rtl:ml-2 rtl:mr-0">
                    <Switch
                      id="self-learning"
                      checked={isSelfLearningEnabled}
                      onCheckedChange={toggleSelfLearning}
                      className="mr-1.5 rtl:ml-1.5 rtl:mr-0"
                    />
                    <Label htmlFor="self-learning" className="text-xs">
                      {t('ai.selfLearning', 'التعلم الذاتي')}
                    </Label>
                  </div>
                )}
                
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
            </div>
            
            {usingLocalAI ? renderMessagesWithFeedback() : (
              <ChatMessagesArea 
                messages={messages} 
                isProcessing={isProcessing}
              />
            )}
            
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
          </>
        )}
      </FileInputHandler>
    </div>
  );
};
