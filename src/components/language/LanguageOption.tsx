
import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface LanguageOptionProps {
  langCode: string;
  languageName: string; 
  flag: string;
  isActive: boolean;
  isIraqiArabic: boolean;
  onClick: (langCode: string) => void;
  reducedMotion: boolean;
  // For compatibility with LanguageDropdownContent
  code?: string;
  name?: string;
  nativeName?: string;
  isSpecial?: boolean;
}

export function LanguageOption({
  langCode,
  languageName,
  flag,
  isActive,
  isIraqiArabic,
  onClick,
  reducedMotion,
  // Handle alternative prop formats
  code,
  name,
  nativeName,
  isSpecial
}: LanguageOptionProps) {
  // Use the props from either format
  const actualLangCode = code || langCode;
  const actualLanguageName = nativeName || languageName;
  const actualFlag = flag;
  const actualIsSpecial = isSpecial || isIraqiArabic;

  return (
    <DropdownMenuItem
      className={cn(
        "flex items-center justify-between px-4 py-3 cursor-pointer transition-all",
        isActive 
          ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 font-medium" 
          : "hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:translate-y-[-1px]",
        actualIsSpecial ? "border-l-2 border-green-500 dark:border-green-400" : ""
      )}
      onClick={() => onClick(actualLangCode)}
      data-testid={`language-option-${actualLangCode}`}
    >
      <div className="flex items-center">
        <span className="text-lg mr-3 rtl:ml-3 rtl:mr-0" aria-hidden="true">
          {actualFlag}
        </span>
        <span>{actualLanguageName}</span>
        
        {actualIsSpecial && (
          <span className="ml-2 text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded dark:bg-green-900/30 dark:text-green-300">
            محسّن
          </span>
        )}
      </div>
      
      {isActive && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: reducedMotion ? 30 : 15 
          }}
          className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-5 h-5 shadow-md"
        >
          <Check className="h-3 w-3" aria-hidden="true" />
        </motion.div>
      )}
    </DropdownMenuItem>
  );
}
