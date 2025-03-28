
import React from "react";
import { BrainCircuit, Moon, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface AIHeaderProps {
  isDarkModeAuto: boolean;
  toggleDarkModeAuto: () => void;
}

export function AIHeader({ isDarkModeAuto, toggleDarkModeAuto }: AIHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <BrainCircuit size={20} className="mr-2 rtl:mr-0 rtl:ml-2" />
          <h3 className="font-medium text-sm">{t('aiAssistant.title')}</h3>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <button 
            onClick={toggleDarkModeAuto}
            className={`text-xs p-1 rounded-full transition-colors ${isDarkModeAuto ? 'bg-white/20 hover:bg-white/30' : 'hover:bg-white/10'}`}
            aria-label={isDarkModeAuto ? t('common.disableAutoDarkMode', 'تعطيل الوضع الليلي التلقائي') : t('common.enableAutoDarkMode', 'تفعيل الوضع الليلي التلقائي')}
          >
            {isDarkModeAuto ? (
              <div className="flex items-center">
                <Moon size={12} className="mr-1 rtl:mr-0 rtl:ml-1" />
                <Sun size={12} />
              </div>
            ) : (
              <div className="opacity-70">
                <Sun size={14} />
              </div>
            )}
          </button>
          <Badge variant="outline" className="bg-white/10 text-white text-xs hover:bg-white/20 border-none">
            v2.5.1
          </Badge>
        </div>
      </div>
    </div>
  );
}
