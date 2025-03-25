
import React from "react";
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
  const { t } = useTranslation();
  
  return (
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
        disabled={isProcessing || !hasContent}
      >
        <Send size={18} />
      </Button>
    </div>
  );
};
