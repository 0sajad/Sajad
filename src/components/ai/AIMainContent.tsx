
import React from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessagesArea } from "./ChatMessagesArea";
import { AIFileUpload } from "./AIFileUpload";
import { ActiveToolsList } from "./ActiveToolsList";
import { useAIChat } from "@/hooks/use-ai-chat";
import { useTranslation } from "react-i18next";
import { AITools } from "./AITools";

interface AIMainContentProps {
  initialMessages: any[];
  children?: React.ReactNode;
}

export function AIMainContent({ initialMessages, children }: AIMainContentProps) {
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
  
  const { t } = useTranslation();
  
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-hidden flex flex-col">
        {children ? children : (
          <>
            <ChatMessagesArea 
              messages={messages} 
              isProcessing={isProcessing} 
            />
            
            <div className="p-4 border-t">
              {tools.length > 0 && (
                <ActiveToolsList tools={tools} clearAllTools={clearAllTools} />
              )}
              
              <AIFileUpload onFilesSelected={handleFileUpload} />
              
              <ChatInput 
                input={input}
                setInput={setInput}
                handleSendMessage={handleSendMessage}
                handleVoiceInput={handleVoiceInput}
                isProcessing={isProcessing}
                isListening={isListening}
                toggleTool={toggleTool}
                tools={tools}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
