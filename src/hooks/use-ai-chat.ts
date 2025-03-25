
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

type Message = {
  role: string;
  content: string;
  timestamp?: Date;
};

export function useAIChat(initialMessages: Message[] = []) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp || new Date()
    }))
  );
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [tools, setTools] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (!input.trim() && tools.length === 0) return;
    
    const userMessage = input || "استخدم الأدوات: " + tools.join(", ");
    
    const newMessage: Message = {
      role: "user", 
      content: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setTools([]);
    setIsProcessing(true);
    
    // محاكاة استجابة الذكاء الاصطناعي
    setTimeout(() => {
      const aiResponses = [
        "جاري معالجة طلبك وتنفيذه بأسرع وقت ممكن.",
        "تم تحليل المشكلة بنجاح، إليك الحل الأمثل.",
        "أقوم بتطوير أداة جديدة بناءً على طلبك، ستكون متاحة قريباً.",
        "اكتشفت تحديثًا جديداً في مجال تقنيات الشبكات، جاري تطبيقه على الأدوات الحالية.",
        "تم تحليل بنية الشبكة بنجاح، إليك التوصيات لتحسين الأداء.",
        "لقد قمت بمعالجة الملف وتحليل محتواه. هناك بعض التحسينات الممكنة التي يمكنك تطبيقها.",
        "أعمل على تحسين أداء الخوارزميات حاليًا، سيكون هناك تحديث قريبًا."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const assistantMessage: Message = {
        role: "assistant", 
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
      
      toast({
        title: t('ai.requestProcessed', "تم معالجة الطلب"),
        description: t('ai.aiProcessedRequest', "قام الذكاء الاصطناعي بمعالجة طلبك بنجاح")
      });
    }, 1500);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // محاكاة الاستماع الصوتي
      toast({
        title: t('ai.listeningStarted', "جاري الاستماع"),
        description: t('ai.speakNow', "يمكنك التحدث الآن...")
      });
      
      setTimeout(() => {
        setInput(t('ai.mockedVoiceInput', "تحليل أداء الشبكة وإصلاح المشاكل"));
        setIsListening(false);
        
        toast({
          title: t('ai.voiceRecognized', "تم التعرف على الصوت"),
          description: t('ai.voiceProcessed', "تم معالجة الأمر الصوتي")
        });
      }, 3000);
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const fileNames = Array.from(files).map(file => file.name).join(", ");
    
    const newMessage: Message = {
      role: "user",
      content: t('ai.fileUploaded', "قمت برفع الملفات: ") + fileNames,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setIsProcessing(true);
    
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: t('ai.fileAnalyzed', "تم استلام وتحليل الملفات بنجاح. هل ترغب في مزيد من المعالجة أو التحليل؟"),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
      
      toast({
        title: t('ai.fileProcessed', "تم معالجة الملفات"),
        description: t('ai.fileProcessedDesc', "تم تحليل الملفات بنجاح")
      });
    }, 2000);
  };

  const toggleTool = (tool: string) => {
    setTools(prev => 
      prev.includes(tool) 
        ? prev.filter(t => t !== tool) 
        : [...prev, tool]
    );
  };

  const clearAllTools = () => {
    setTools([]);
  };

  return {
    messages,
    input,
    setInput,
    isProcessing,
    isListening,
    tools,
    handleSendMessage,
    handleVoiceInput,
    handleFileUpload,
    toggleTool,
    clearAllTools
  };
}
