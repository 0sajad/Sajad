
import React from "react";
import { useTranslation } from "react-i18next";
import { AIModelSelector } from "./AIModelSelector";
import { AISuggestedUses } from "./AISuggestedUses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AILearningSourcesPanel } from "./AILearningSourcesPanel";

export function AISidebarEnhanced() {
  const { t } = useTranslation();
  
  return (
    <div className="h-full flex flex-col border-r bg-muted/30 w-64 shrink-0">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">{t('ai.assistant', 'المساعد الذكي')}</h2>
        <AIModelSelector />
      </div>
      
      <Tabs defaultValue="uses" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mb-4">
          <TabsTrigger value="uses" className="flex-1">
            {t('ai.uses', 'الاستخدامات')}
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex-1">
            {t('ai.learning', 'التعلم')}
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-auto">
          <TabsContent value="uses" className="p-4 h-full">
            <AISuggestedUses />
          </TabsContent>
          
          <TabsContent value="learning" className="p-4 h-full">
            <AILearningSourcesPanel isCompact={true} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
