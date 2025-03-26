
import React from "react";
import { AIMainContent } from "@/components/ai/AIMainContent";

const AIAssistant = () => {
  // Define initial messages for the AI chat
  const initialMessages = [
    {
      role: "assistant",
      content: "مرحباً! أنا مساعد OCTA-GRAM الذكي. كيف يمكنني مساعدتك في مجال الشبكات والاتصالات؟",
      timestamp: new Date()
    }
  ];

  return <AIMainContent initialMessages={initialMessages} />;
};

export default AIAssistant;
