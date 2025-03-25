
import React from "react";
import { useAIChat } from "@/hooks/use-ai-chat";
import { ChatMessagesArea } from "./ChatMessagesArea";
import { FileInputHandler } from "./FileInputHandler";
import { ToolSelector } from "./ToolSelector";
import { ActiveToolsList } from "./ActiveToolsList";
import { ChatInput } from "./ChatInput";
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
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  const {
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
  } = useAIChat(initialMessages);

  return (
    <div className="flex flex-col h-[500px]" dir={isRTL ? "rtl" : "ltr"}>
      <FileInputHandler onFileChange={handleFileUpload}>
        {(triggerFileUpload) => (
          <>
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
                hasContent={input.trim().length > 0 || tools.length > 0}
              />
            </div>
          </>
        )}
      </FileInputHandler>
    </div>
  );
};
