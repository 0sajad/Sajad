
import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Upload, Code } from "lucide-react";
import { AIChat } from "@/components/ai/AIChat";
import { AIFileUpload } from "@/components/ai/AIFileUpload";
import { AITools } from "@/components/ai/AITools";
import { useTranslation } from "react-i18next";

interface AITabContentProps {
  initialMessages: {role: string, content: string, timestamp?: Date}[];
}

export const AITabContent = ({ initialMessages }: AITabContentProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("chat");

  const handleFileUpload = (files: FileList) => {
    // محاكاة معالجة الملف
    const now = new Date();
    const fileUploadMessage = {
      role: "user", 
      content: `قمت برفع ملف: ${files[0].name}`,
      timestamp: now
    };
    
    // This functionality will be handled inside the AIChat component
    // The state is passed directly to AIChat which manages messages internally
  };

  return (
    <Tabs defaultValue="chat" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="w-full mb-4">
        <TabsTrigger value="chat" className="flex-1">
          <MessageSquare className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
          {t('ai.chat', "المحادثة")}
        </TabsTrigger>
        <TabsTrigger value="files" className="flex-1">
          <Upload className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
          {t('ai.files', "رفع الملفات")}
        </TabsTrigger>
        <TabsTrigger value="tools" className="flex-1">
          <Code className="mr-2 rtl:ml-2 rtl:mr-0 h-4 w-4" />
          {t('ai.tools', "الأدوات المتقدمة")}
        </TabsTrigger>
      </TabsList>
      
      <GlassCard className="p-0 overflow-hidden">
        <TabsContent value="chat" className="m-0">
          <AIChat initialMessages={initialMessages} />
        </TabsContent>
        
        <TabsContent value="files" className="m-0">
          <AIFileUpload onFileUpload={handleFileUpload} />
        </TabsContent>
        
        <TabsContent value="tools" className="m-0">
          <AITools />
        </TabsContent>
      </GlassCard>
    </Tabs>
  );
};
