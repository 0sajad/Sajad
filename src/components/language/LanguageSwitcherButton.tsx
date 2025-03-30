
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface LanguageSwitcherButtonProps {
  currentLanguageFlag: string;
  isTransitioning: boolean;
  isRTL?: boolean;
  reducedMotion?: boolean;
  onClick: () => void;
  tooltipText?: string;
  className?: string;
  variant?: 'icon' | 'full';
  currentLanguageNativeName?: string;
}

export function LanguageSwitcherButton({
  currentLanguageFlag,
  isTransitioning,
  isRTL,
  reducedMotion,
  onClick,
  tooltipText,
  className,
  variant = 'icon',
  currentLanguageNativeName
}: LanguageSwitcherButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={`relative ${className || ''}`}
      onClick={onClick}
      disabled={isTransitioning}
      aria-label={tooltipText}
    >
      <div className="flex items-center gap-2">
        <motion.div 
          animate={isTransitioning && !reducedMotion ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={isTransitioning ? "opacity-0" : ""}
        >
          <span className="text-lg">{currentLanguageFlag}</span>
        </motion.div>
        
        {variant === 'full' && currentLanguageNativeName && (
          <span className="text-sm">{currentLanguageNativeName}</span>
        )}
        
        {isTransitioning && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </motion.div>
        )}
      </div>
    </Button>
  );
}
