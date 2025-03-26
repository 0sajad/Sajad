
import React from "react";
import { FileCode, Globe, Database, Network } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useA11y } from "@/hooks/useA11y";

interface AICapabilitiesGridProps {
  isCompact?: boolean;
}

export function AICapabilitiesGrid({ isCompact = false }: AICapabilitiesGridProps) {
  const { t } = useTranslation();
  const { reducedMotion } = useA11y();
  
  const capabilities = [
    { 
      id: "webDevelopment", 
      icon: Globe, 
      color: "text-green-500",
      delay: 0.1
    },
    { 
      id: "codeAnalysis", 
      icon: FileCode, 
      color: "text-blue-500",
      delay: 0.2
    },
    { 
      id: "database", 
      icon: Database, 
      color: "text-amber-500",
      delay: 0.3
    },
    { 
      id: "networkAnalysis", 
      icon: Network, 
      color: "text-cyan-500",
      delay: 0.4
    }
  ];
  
  // تحديد عدد الأعمدة بناءً على isCompact
  const gridCols = isCompact ? "grid-cols-2" : "grid-cols-4";
  
  return (
    <div 
      className={`grid ${gridCols} gap-2 mb-3`} 
      aria-label={t('aiAssistant.aiCapabilities', 'قدرات الذكاء الاصطناعي')}
    >
      {capabilities.map((capability) => (
        <motion.div
          key={capability.id}
          initial={!reducedMotion ? { opacity: 0, y: 10 } : false}
          animate={!reducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={!reducedMotion ? { delay: capability.delay, duration: 0.2 } : {}}
          className="bg-muted/30 p-2 rounded-md text-center flex flex-col items-center"
          whileHover={!reducedMotion ? { scale: 1.03, transition: { duration: 0.2 } } : {}}
          aria-label={t(`aiAssistant.features.${capability.id}`, capability.id)}
          role="listitem"
        >
          <capability.icon className={`${capability.color} h-5 w-5 mb-1`} aria-hidden="true" />
          <span className="text-xs text-muted-foreground">
            {t(`aiAssistant.features.${capability.id}`, capability.id)}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
