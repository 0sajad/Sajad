
import React from "react";
import { AISidebar } from "@/components/ai/AISidebar";
import { AITabContent } from "@/components/ai/AITabContent";

interface AIMainContentProps {
  initialMessages: {role: string, content: string, timestamp?: Date}[];
  children?: React.ReactNode; // Added children prop
}

export const AIMainContent = ({ initialMessages, children }: AIMainContentProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <AISidebar />
      </div>
      
      <div className="lg:col-span-2">
        {children ? children : <AITabContent initialMessages={initialMessages} />}
      </div>
    </div>
  );
};
