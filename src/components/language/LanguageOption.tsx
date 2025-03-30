
import React from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface LanguageOptionProps {
  langCode: string;
  languageName: string;
  flag: string;
  isActive: boolean;
  isIraqiArabic?: boolean;
  onClick: (langCode: string) => void;
  reducedMotion?: boolean;
}

export function LanguageOption({
  langCode,
  languageName,
  flag,
  isActive,
  isIraqiArabic,
  onClick,
  reducedMotion
}: LanguageOptionProps) {
  return (
    <DropdownMenuItem
      className="cursor-pointer flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/60"
      onClick={() => onClick(langCode)}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{flag}</span>
        <div>
          <span className={`text-sm ${isActive ? 'font-medium' : ''}`}>
            {languageName}
          </span>
          {isIraqiArabic && (
            <span className="text-xs text-muted-foreground block">العراقية</span>
          )}
        </div>
      </div>
      
      {isActive && (
        <motion.div
          initial={reducedMotion ? { scale: 1 } : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: reducedMotion ? 0 : 0.3 }}
        >
          <Check className="h-4 w-4 text-primary" />
        </motion.div>
      )}
    </DropdownMenuItem>
  );
}
