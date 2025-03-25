
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { Send, Mic, FileUp, Code, Image, BrainCircuit } from "lucide-react";
import { useTranslation } from "react-i18next";

type Message = {
  role: string;
  content: string;
  timestamp?: Date;
};

interface AIChatProps {
  initialMessages?: Message[];
}

export const AIChat = ({ initialMessages = [] }: AIChatProps) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.map(msg => ({
      ...msg,
      timestamp: new Date()
    }))
  );
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [tools, setTools] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
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
    }
  };

  const toggleTool = (tool: string) => {
    if (tools.includes(tool)) {
      setTools(tools.filter(t => t !== tool));
    } else {
      setTools([...tools, tool]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[500px]">
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      
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
                <div className="mb-1">{msg.content}</div>
                {msg.timestamp && (
                  <div className="text-xs opacity-70 text-right">
                    {formatTime(msg.timestamp)}
                  </div>
                )}
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
      
      {tools.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 flex flex-wrap gap-2">
          {tools.map((tool, index) => (
            <div key={index} className="bg-octaBlue-100 text-octaBlue-800 text-xs px-2 py-1 rounded-full flex items-center">
              <span>{tool}</span>
              <button className="ml-1 text-octaBlue-600" onClick={() => toggleTool(tool)}>×</button>
            </div>
          ))}
          <button 
            className="text-xs text-gray-500 ml-2"
            onClick={() => setTools([])}
          >
            {t('ai.clearAll', "مسح الكل")}
          </button>
        </div>
      )}
      
      <div className="p-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2 mb-3">
          <Button 
            variant="outline" 
            size="sm" 
            className={`text-xs ${tools.includes('تحليل الشبكة') ? 'bg-octaBlue-100' : ''}`}
            onClick={() => toggleTool('تحليل الشبكة')}
          >
            <Network className="h-3 w-3 mr-1" />
            {t('ai.tools.networkAnalysis', "تحليل الشبكة")}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`text-xs ${tools.includes('تحرير الكود') ? 'bg-octaBlue-100' : ''}`}
            onClick={() => toggleTool('تحرير الكود')}
          >
            <Code className="h-3 w-3 mr-1" />
            {t('ai.tools.codeEdit', "تحرير الكود")}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`text-xs ${tools.includes('إنشاء صورة') ? 'bg-octaBlue-100' : ''}`}
            onClick={() => toggleTool('إنشاء صورة')}
          >
            <Image className="h-3 w-3 mr-1" />
            {t('ai.tools.imageGen', "إنشاء صورة")}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={`text-xs ${tools.includes('تعلم آلي') ? 'bg-octaBlue-100' : ''}`}
            onClick={() => toggleTool('تعلم آلي')}
          >
            <BrainCircuit className="h-3 w-3 mr-1" />
            {t('ai.tools.machineLearning', "تعلم آلي")}
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleVoiceInput}
            className={isListening ? 'bg-red-100 text-red-600' : ''}
          >
            <Mic size={18} />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleFileUpload}
          >
            <FileUp size={18} />
          </Button>
          
          <Input
            placeholder={t('ai.writeSomething', "اكتب رسالتك هنا...")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          
          <Button 
            onClick={handleSendMessage} 
            size="icon"
            disabled={isProcessing || (!input.trim() && tools.length === 0)}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

// أيقونة الشبكة
const Network = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="16" y="16" width="6" height="6" rx="1" />
    <rect x="2" y="16" width="6" height="6" rx="1" />
    <rect x="9" y="2" width="6" height="6" rx="1" />
    <path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3" />
    <path d="M12 12V8" />
  </svg>
);
