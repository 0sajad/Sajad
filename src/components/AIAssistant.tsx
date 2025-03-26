
import React from "react";
import { AIAssistantMain } from "./ai/AIAssistantMain";

interface AIAssistantProps {
  minimized?: boolean;
  onMaximize?: () => void;
}

export function AIAssistant({ minimized = false, onMaximize }: AIAssistantProps) {
  return <AIAssistantMain minimized={minimized} onMaximize={onMaximize} />;
}
