
import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface LanguageOptionProps {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isActive: boolean;
  isSpecial?: boolean;
  specialLabel?: string;
  onClick: (code: string) => void;
}

export function LanguageOption({
  code,
  name,
  nativeName,
  flag,
  isActive,
  isSpecial = false,
  specialLabel = "محسّن",
  onClick
}: LanguageOptionProps) {
  return (
    <DropdownMenuItem
      key={code}
      className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all ${
        isActive 
          ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 font-medium' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:translate-y-[-1px]'
      } ${
        isSpecial ? 'border-l-2 border-green-500 dark:border-green-400' : ''
      }`}
      onClick={() => onClick(code)}
      data-testid={`language-option-${code}`}
    >
      <div className="flex items-center">
        <span className="text-lg mr-3 rtl:ml-3 rtl:mr-0" aria-hidden="true">
          {flag}
        </span>
        <span>{nativeName}</span>
        
        {isSpecial && (
          <span className="ml-2 text-[10px] bg-green-100 text-green-800 px-1.5 py-0.5 rounded dark:bg-green-900/30 dark:text-green-300">
            {specialLabel}
          </span>
        )}
      </div>
      
      {isActive && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-5 h-5 shadow-md"
        >
          <Check className="h-3 w-3" aria-hidden="true" />
        </motion.div>
      )}
    </DropdownMenuItem>
  );
}
