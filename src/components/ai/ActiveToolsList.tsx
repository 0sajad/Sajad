
import React from "react";
import { useTranslation } from "react-i18next";

type ActiveToolsListProps = {
  tools: string[];
  toggleTool: (tool: string) => void;
  clearAllTools: () => void;
};

export const ActiveToolsList = ({ tools, toggleTool, clearAllTools }: ActiveToolsListProps) => {
  const { t } = useTranslation();
  
  if (tools.length === 0) return null;
  
  return (
    <div className="px-4 py-2 bg-gray-50 flex flex-wrap gap-2">
      {tools.map((tool, index) => (
        <div key={index} className="bg-octaBlue-100 text-octaBlue-800 text-xs px-2 py-1 rounded-full flex items-center">
          <span>{tool}</span>
          <button className="ml-1 text-octaBlue-600" onClick={() => toggleTool(tool)}>×</button>
        </div>
      ))}
      <button 
        className="text-xs text-gray-500 ml-2"
        onClick={clearAllTools}
      >
        {t('ai.clearAll', "مسح الكل")}
      </button>
    </div>
  );
};
