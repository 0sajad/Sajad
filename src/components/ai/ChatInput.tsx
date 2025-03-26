
import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, FileUp, Smile } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

export const ChatInput = memo(({
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
  const [isFocused, setIsFocused] = useState(false);
  
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isProcessing && (input.trim() || hasContent)) {
        handleSendMessage();
      }
    }
  }, [input, isProcessing, hasContent, handleSendMessage]);
  
  // تركيز حقل الإدخال عند تحميل المكون أو بعد معالجة الرسالة
  useEffect(() => {
    if (inputRef.current && !isProcessing) {
      inputRef.current.focus();
    }
  }, [isProcessing]);
  
  // تغيير نص placeholder بناءً على اللغة
  const getPlaceholder = useCallback(() => {
    if (isRTL) {
      return t('ai.writeSomething', "اكتب رسالتك هنا...");
    }
    return t('ai.writeSomething', "Write your message here...");
  }, [isRTL, t]);
  
  // تحسين الأداء باستخدام مخازن الذاكرة المؤقتة للدوال
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  
  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);
  
  return (
    <motion.div 
      className="flex gap-2 items-center pb-1"
      dir={isRTL ? "rtl" : "ltr"}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleVoiceInput}
                className={`${isListening ? 'bg-red-100 text-red-600 hover:bg-red-200' : ''} transition-colors`}
                aria-label={isListening ? t('ai.stopListening') : t('ai.startListening')}
                type="button"
                disabled={isProcessing}
              >
                <Mic size={18} />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            {isListening ? t('ai.stopListening') : t('ai.startListening')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleFileUpload}
                aria-label={t('ai.uploadFiles')}
                type="button"
                disabled={isProcessing}
              >
                <FileUp size={18} />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            {t('ai.uploadFiles')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <motion.div 
        className="flex-1 relative"
        animate={{ 
          scale: isFocused ? 1.01 : 1,
          boxShadow: isFocused ? "0 0 0 2px rgba(59, 130, 246, 0.3)" : "none"
        }}
      >
        <Input
          placeholder={getPlaceholder()}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="flex-1 transition-all"
          ref={inputRef}
          dir="auto"
          aria-label={t('ai.messageInput')}
          disabled={isProcessing}
          autoComplete="off"
        />
      </motion.div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                onClick={handleSendMessage} 
                size="icon"
                disabled={isProcessing || (!hasContent && !input.trim())}
                aria-label={t('ai.sendMessage')}
                type="button"
                className={`transition-all ${(!hasContent && !input.trim()) ? 'opacity-50' : 'opacity-100'}`}
              >
                <Send size={18} className={isProcessing ? "opacity-50" : ""} />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            {t('ai.sendMessage')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </motion.div>
  );
});

ChatInput.displayName = "ChatInput";
