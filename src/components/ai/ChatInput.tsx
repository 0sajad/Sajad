
import React, { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, FileUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

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
      if (!isProcessing && (input.trim() || hasContent)) {
        handleSendMessage();
      }
    }
  };
  
  // تركيز حقل الإدخال عند تحميل المكون أو بعد معالجة الرسالة
  useEffect(() => {
    if (inputRef.current && !isProcessing) {
      inputRef.current.focus();
    }
  }, [isProcessing]);
  
  // تغيير نص placeholder بناءً على اللغة
  const getPlaceholder = () => {
    if (isRTL) {
      return t('ai.writeSomething', "اكتب رسالتك هنا...");
    }
    return t('ai.writeSomething', "Write your message here...");
  };
  
  return (
    <motion.div 
      className="flex gap-2 items-center pb-1" 
      dir={isRTL ? "rtl" : "ltr"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleVoiceInput}
          className={`${isListening ? 'bg-red-100 text-red-600 hover:bg-red-200' : ''} transition-colors`}
          title={isListening ? t('ai.stopListening') : t('ai.startListening')}
          aria-label={isListening ? t('ai.stopListening') : t('ai.startListening')}
          type="button"
          disabled={isProcessing}
        >
          <Mic size={18} />
        </Button>
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
      </motion.div>
      
      <motion.div 
        className="flex-1"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <Input
          placeholder={getPlaceholder()}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-primary/30"
          ref={inputRef}
          dir="auto"
          aria-label={t('ai.messageInput')}
          disabled={isProcessing}
          autoComplete="off"
        />
      </motion.div>
      
      <motion.div 
        whileHover={!isProcessing && (hasContent || input.trim()) ? { scale: 1.1 } : {}}
        whileTap={!isProcessing && (hasContent || input.trim()) ? { scale: 0.9 } : {}}
      >
        <Button 
          onClick={handleSendMessage} 
          size="icon"
          disabled={isProcessing || (!hasContent && !input.trim())}
          title={t('ai.sendMessage')}
          aria-label={t('ai.sendMessage')}
          type="button"
          className="transition-all"
        >
          <Send size={18} className={`transition-opacity ${isProcessing ? "opacity-50" : ""}`} />
        </Button>
      </motion.div>
    </motion.div>
  );
};
