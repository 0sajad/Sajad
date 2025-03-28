
import React from "react";
import { BrainCircuit, Moon, Sun, Zap, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

export function AIHeader() {
  const { t } = useTranslation();
  const [isDarkModeAuto, setIsDarkModeAuto] = React.useState(true);
  const [isEnhancedMode, setIsEnhancedMode] = React.useState(false);

  const toggleDarkModeAuto = () => setIsDarkModeAuto(!isDarkModeAuto);
  const toggleEnhancedMode = () => setIsEnhancedMode(!isEnhancedMode);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BrainCircuit size={20} className="mr-2 rtl:mr-0 rtl:ml-2" />
          <h3 className="font-medium text-sm">{t('aiAssistant.title')}</h3>
          {isEnhancedMode && (
            <Badge className="ml-2 bg-amber-400/20 text-amber-200 border-amber-400/30 text-[10px]">
              {t('ai.enhancedMode', 'وضع محسن')}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-full bg-white/10 hover:bg-white/20"
                  onClick={toggleEnhancedMode}
                >
                  <Zap size={14} className={isEnhancedMode ? "text-amber-200" : "text-white/70"} />
                  <span className="sr-only">{t('ai.toggleEnhancedMode', 'تبديل الوضع المحسن')}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{t('ai.enhancedModeTooltip', 'تمكين قدرات الذكاء الاصطناعي المتقدمة')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-full bg-white/10 hover:bg-white/20"
                  onClick={toggleDarkModeAuto}
                >
                  {isDarkModeAuto ? (
                    <div className="flex items-center">
                      <Moon size={12} className="mr-0.5 rtl:mr-0 rtl:ml-0.5" />
                      <Sun size={12} />
                    </div>
                  ) : (
                    <Sun size={14} className="text-white/70" />
                  )}
                  <span className="sr-only">{t('common.toggleDarkMode', 'تبديل الوضع الليلي')}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{t('common.darkModeAuto', 'الوضع الليلي التلقائي')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 rounded-full bg-white/10 hover:bg-white/20"
                >
                  <Settings size={14} className="text-white/70" />
                  <span className="sr-only">{t('common.aiSettings', 'إعدادات الذكاء الاصطناعي')}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{t('common.aiSettingsTooltip', 'تخصيص إعدادات الذكاء الاصطناعي')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Badge variant="outline" className="bg-white/10 text-white text-xs hover:bg-white/20 border-none">
            v2.5.1
          </Badge>
        </div>
      </div>
    </div>
  );
}
