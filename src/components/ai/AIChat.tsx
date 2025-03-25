
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { Send } from "lucide-react";

type Message = {
  role: string;
  content: string;
};

interface AIChatProps {
  initialMessages?: Message[];
}

export const AIChat = ({ initialMessages = [] }: AIChatProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        "اكتشفت تحديثًا جديداً في مجال تقنيات الشبكات، جاري تطبيقه على الأدوات الحالية.",
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

  return (
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
  );
};
