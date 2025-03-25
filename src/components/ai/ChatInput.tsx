
import React, { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, FileUp } from "lucide-react";
import { useTranslation } from "react-i18next";

type ChatInputProps = {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: () => void;
  handleVoiceInput: () => void;
  handleFileUpload: () => void;
  isProcessing: boolean;
  isListening: boolean;
  hasContent: boolean;
};

export const ChatInput = ({
  input,
  setInput,
  handleSendMessage,
  handleVoiceInput,
  handleFileUpload,
  isProcessing,
  isListening,
  hasContent
}: ChatInputProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Focus the input field when component mounts
  useEffect(() => {
    if (inputRef.current && !isProcessing) {
      inputRef.current.focus();
    }
  }, [isProcessing]);
  
  return (
    <div 
      className="flex gap-2" 
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Button 
        variant="outline" 
        size="icon"
        onClick={handleVoiceInput}
        className={isListening ? 'bg-red-100 text-red-600' : ''}
        title={isListening ? t('ai.stopListening', "إيقاف الاستماع") : t('ai.startListening', "بدء الاستماع")}
        aria-label={isListening ? t('ai.stopListening', "إيقاف الاستماع") : t('ai.startListening', "بدء الاستماع")}
        type="button"
      >
        <Mic size={18} />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={handleFileUpload}
        title={t('ai.uploadFiles', "رفع الملفات")}
        aria-label={t('ai.uploadFiles', "رفع الملفات")}
        type="button"
      >
        <FileUp size={18} />
      </Button>
      
      <Input
        placeholder={isRTL ? "اكتب رسالتك هنا..." : "Write your message here..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1"
        ref={inputRef}
        dir="auto"
        aria-label={t('ai.messageInput', "حقل إدخال الرسالة")}
      />
      
      <Button 
        onClick={handleSendMessage} 
        size="icon"
        disabled={isProcessing || !hasContent}
        title={t('ai.sendMessage', "إرسال الرسالة")}
        aria-label={t('ai.sendMessage', "إرسال الرسالة")}
        type="button"
      >
        <Send size={18} />
      </Button>
    </div>
  );
};
