
import React from "react";
import { Check } from "lucide-react";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageDropdownContentProps {
  languages: Language[];
  currentLanguage: Language;
  onChangeLanguage: (langCode: string) => void;
}

export function LanguageDropdownContent({ 
  languages, 
  currentLanguage, 
  onChangeLanguage 
}: LanguageDropdownContentProps) {
  return (
    <DropdownMenuContent align="end" className="z-50 min-w-[240px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-xl rounded-lg">
      <DropdownMenuLabel className="text-center font-medium">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">اللغة</span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30" />
      {languages.map((lang) => {
        const isActive = currentLanguage.code === lang.code;
        
        return (
          <DropdownMenuItem
            key={lang.code}
            className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all ${
              isActive 
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 font-medium' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:translate-y-[-1px]'
            }`}
            onClick={() => onChangeLanguage(lang.code)}
            data-testid={`language-option-${lang.code}`}
          >
            <div className="flex items-center">
              <span className="text-lg mr-3 rtl:ml-3 rtl:mr-0">{lang.flag}</span>
              <span>{lang.nativeName}</span>
            </div>
            
            {isActive && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-5 h-5 shadow-md"
              >
                <Check className="h-3 w-3" />
              </motion.div>
            )}
          </DropdownMenuItem>
        );
      })}
    </DropdownMenuContent>
  );
}
