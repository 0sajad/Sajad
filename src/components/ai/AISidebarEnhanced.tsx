
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AIModelSelector } from "./AIModelSelector";
import { AISuggestedUses } from "./AISuggestedUses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AILearningSourcesPanel } from "./AILearningSourcesPanel";
import { useAppState } from "@/hooks/state/use-app-state";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { motion } from "framer-motion";
import { Settings, BookOpen, Lightbulb } from "lucide-react";

export function AISidebarEnhanced() {
  const { t } = useTranslation();
  const { deviceTier } = usePerformanceOptimization();
  const { preferences } = useAppState();
  const [activeTab, setActiveTab] = useState("uses");
  
  // قابلية طي الشريط الجانبي اختياريًا
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // أنيميشن للشريط الجانبي
  const sidebarVariants = {
    expanded: { width: "16rem" },
    collapsed: { width: "4rem" }
  };
  
  // تحسين السلوك استنادًا إلى نوع الجهاز
  const isCompactMode = deviceTier === 'low' || preferences.compactMode;
  
  // مصادر التعلم مخصصة حسب اللغة
  const learningSources = {
    ar: [
      "وثائق أمان الشبكة",
      "بيانات تدريب نماذج الذكاء الاصطناعي",
      "تحليلات أداء النظام",
      "أنماط تفاعل المستخدم"
    ],
    en: [
      "Network Security Documentation",
      "AI Model Training Data",
      "System Performance Analytics",
      "User Interaction Patterns"
    ]
  };
  
  // الحصول على مصادر التعلم المناسبة للغة الحالية
  const getCurrentLearningSources = () => {
    const language = preferences.language;
    return learningSources[language === 'ar' ? 'ar' : 'en'];
  };
  
  // وظيفة تبديل حالة الطي
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  if (isCollapsed) {
    return (
      <motion.div 
        className="h-full flex flex-col border-r bg-muted/30 shrink-0"
        variants={sidebarVariants}
        initial="collapsed"
        animate="collapsed"
      >
        <div className="p-2 flex flex-col items-center">
          <button 
            onClick={toggleCollapse}
            className="p-2 mb-4 rounded-full hover:bg-muted transition-colors"
            aria-label={t('common.expand', 'توسيع')}
          >
            <Settings size={20} />
          </button>
          
          <button 
            onClick={() => { setIsCollapsed(false); setActiveTab("uses"); }}
            className="p-2 mb-2 rounded-full hover:bg-muted transition-colors"
            aria-label={t('ai.uses', 'الاستخدامات')}
          >
            <Lightbulb size={20} />
          </button>
          
          <button 
            onClick={() => { setIsCollapsed(false); setActiveTab("learning"); }}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label={t('ai.learning', 'التعلم')}
          >
            <BookOpen size={20} />
          </button>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      className="h-full flex flex-col border-r bg-muted/30 shrink-0"
      variants={sidebarVariants}
      initial="expanded"
      animate="expanded"
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{t('ai.assistant', 'المساعد الذكي')}</h2>
          <button 
            onClick={toggleCollapse}
            className="p-1 rounded-full hover:bg-muted transition-colors"
            aria-label={t('common.collapse', 'طي')}
          >
            <Settings size={16} />
          </button>
        </div>
        <AIModelSelector />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="mx-4 mb-4">
          <TabsTrigger value="uses" className="flex-1">
            <Lightbulb size={isCompactMode ? 14 : 16} className="mr-1 rtl:ml-1 rtl:mr-0" />
            {t('ai.uses', 'الاستخدامات')}
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex-1">
            <BookOpen size={isCompactMode ? 14 : 16} className="mr-1 rtl:ml-1 rtl:mr-0" />
            {t('ai.learning', 'التعلم')}
          </TabsTrigger>
        </TabsList>
        
        <div className="flex-1 overflow-auto">
          <TabsContent value="uses" className="p-4 h-full">
            <AISuggestedUses isCompact={isCompactMode} />
          </TabsContent>
          
          <TabsContent value="learning" className="p-4 h-full">
            <AILearningSourcesPanel 
              isCompact={isCompactMode} 
              recentSources={getCurrentLearningSources()} 
            />
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  );
}
