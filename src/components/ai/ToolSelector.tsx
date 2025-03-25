
import React from "react";
import { Button } from "@/components/ui/button";
import { Code, Image, BrainCircuit } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Network } from "./icons/Network";

type ToolSelectorProps = {
  tools: string[];
  toggleTool: (tool: string) => void;
};

export const ToolSelector = ({ tools, toggleTool }: ToolSelectorProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-wrap gap-2 mb-3">
      <Button 
        variant="outline" 
        size="sm" 
        className={`text-xs ${tools.includes('تحليل الشبكة') ? 'bg-octaBlue-100' : ''}`}
        onClick={() => toggleTool('تحليل الشبكة')}
      >
        <Network className="h-3 w-3 mr-1" />
        {t('ai.tools.networkAnalysis', "تحليل الشبكة")}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className={`text-xs ${tools.includes('تحرير الكود') ? 'bg-octaBlue-100' : ''}`}
        onClick={() => toggleTool('تحرير الكود')}
      >
        <Code className="h-3 w-3 mr-1" />
        {t('ai.tools.codeEdit', "تحرير الكود")}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className={`text-xs ${tools.includes('إنشاء صورة') ? 'bg-octaBlue-100' : ''}`}
        onClick={() => toggleTool('إنشاء صورة')}
      >
        <Image className="h-3 w-3 mr-1" />
        {t('ai.tools.imageGen', "إنشاء صورة")}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className={`text-xs ${tools.includes('تعلم آلي') ? 'bg-octaBlue-100' : ''}`}
        onClick={() => toggleTool('تعلم آلي')}
      >
        <BrainCircuit className="h-3 w-3 mr-1" />
        {t('ai.tools.machineLearning', "تعلم آلي")}
      </Button>
    </div>
  );
};
