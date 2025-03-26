
import React, { useRef, useEffect, useMemo, useCallback } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);
  
  // استخدام useMemo لتحسين الأداء بحساب القيم مرة واحدة فقط عند تغيير اللغة
  const isRTL = useMemo(() => {
    return i18n.language === "ar" || i18n.language === "ar-iq";
  }, [i18n.language]);
  
  const getPlaceholder = useMemo(() => {
    if (isRTL) {
      return t('ai.writeSomething', "اكتب رسالتك هنا...");
    }
    return t('ai.writeSomething', "Write your message here...");
  }, [isRTL, t]);
  
  // استخدام useCallback لتحسين الأداء
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isProcessing && (input.trim() || hasContent)) {
        handleSendMessage();
      }
    }
  }, [input, isProcessing, hasContent, handleSendMessage]);
  
  // تركيز حقل الإدخال عند تحميل المكون أو بعد معالجة الرسالة - تحسين باستخدام requestAnimationFrame
  useEffect(() => {
    if (inputRef.current && !isProcessing) {
      // استخدام setTimeout مع زمن قصير بدلاً من requestAnimationFrame للتسريع
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [isProcessing]);
  
  // حساب الخصائص مسبقًا لتحسين الأداء
  const containerProps = useMemo(() => ({
    className: "flex gap-2 items-center pb-1",
    dir: isRTL ? "rtl" : "ltr"
  }), [isRTL]);
  
  const micButtonClass = useMemo(() => {
    return `${isListening ? 'bg-red-100 text-red-600 hover:bg-red-200' : ''} transition-colors`;
  }, [isListening]);
  
  const sendButtonDisabled = useMemo(() => {
    return isProcessing || (!hasContent && !input.trim());
  }, [isProcessing, hasContent, input]);
  
  // استخدام useCallback لتحسين الأداء
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, [setInput]);
  
  return (
    <div {...containerProps}>
      <Button 
        variant="outline" 
        size="icon"
        onClick={handleVoiceInput}
        className={micButtonClass}
        title={isListening ? t('ai.stopListening') : t('ai.startListening')}
        aria-label={isListening ? t('ai.stopListening') : t('ai.startListening')}
        type="button"
        disabled={isProcessing}
      >
        <Mic size={18} />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon"
        onClick={handleFileUpload}
        title={t('ai.uploadFiles')}
        aria-label={t('ai.uploadFiles')}
        type="button"
        disabled={isProcessing}
      >
        <FileUp size={18} />
      </Button>
      
      <Input
        placeholder={getPlaceholder}
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="flex-1"
        ref={inputRef}
        dir="auto"
        aria-label={t('ai.messageInput')}
        disabled={isProcessing}
        autoComplete="off"
      />
      
      <Button 
        onClick={handleSendMessage} 
        size="icon"
        disabled={sendButtonDisabled}
        title={t('ai.sendMessage')}
        aria-label={t('ai.sendMessage')}
        type="button"
        className="transition-all"
      >
        <Send size={18} className={isProcessing ? "opacity-50" : ""} />
      </Button>
    </div>
  );
};
