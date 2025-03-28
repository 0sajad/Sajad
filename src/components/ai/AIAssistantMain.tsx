
import React, { useState } from "react";
import { AIMinimizedButton } from "./assistantComponents/AIMinimizedButton";
import { AIStatusSection } from "./assistantComponents/AIStatusSection";
import { AICapabilitiesSection } from "./assistantComponents/AICapabilitiesSection";
import { AIHeader } from "./AIHeader";
import { AISidebar } from "./AISidebar";
import { AIMainContent } from "./AIMainContent";
import { AIChat } from "./AIChat";

interface AIAssistantMainProps {
  minimized?: boolean;
  onMaximize?: () => void;
}

export function AIAssistantMain({ minimized = false, onMaximize }: AIAssistantMainProps) {
  const [currentFeature, setCurrentFeature] = useState(1);
  const [progress, setProgress] = useState(45);
  const [status, setStatus] = useState<"learning" | "processing" | "idle" | "protecting" | "analyzing" | "optimizing">("analyzing");
  const [isCompact, setIsCompact] = useState(false);
  
  // Initial messages for AI chat
  const initialMessages = [
    { role: "system", content: "I'm your AI assistant. How can I help you today?" }
  ];
  
  // إذا كان مصغرًا، أظهر فقط زر التكبير
  if (minimized) {
    return <AIMinimizedButton onMaximize={onMaximize || (() => {})} />;
  }

  return (
    <div className="w-full h-full flex rounded-lg overflow-hidden border shadow-lg">
      <AISidebar />
      <div className="flex-1 flex flex-col h-full">
        <AIHeader />
        <div className="flex-1 flex">
          <AIMainContent initialMessages={initialMessages}>
            <AIChat />
          </AIMainContent>
          <div className="w-64 border-l p-4 shrink-0 bg-muted/20">
            <AIStatusSection 
              status={status} 
              progress={progress} 
              currentFeature={currentFeature} 
            />
            <div className="mt-6">
              <AICapabilitiesSection isCompact={isCompact} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
