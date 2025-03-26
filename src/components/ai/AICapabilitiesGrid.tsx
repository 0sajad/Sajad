
import React from "react";
import { FileCode, Globe, Database, Network } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface AICapabilitiesGridProps {
  isCompact?: boolean;
}

export function AICapabilitiesGrid({ isCompact = false }: AICapabilitiesGridProps) {
  const { t } = useTranslation();
  
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
    <div className={`grid ${gridCols} gap-2 mb-3`}>
      {capabilities.map((capability) => (
        <motion.div
          key={capability.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: capability.delay, duration: 0.2 }}
          className="bg-muted/30 p-2 rounded-md text-center flex flex-col items-center"
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          aria-label={t(`aiAssistant.features.${capability.id}`, capability.id)}
        >
          <capability.icon className={`${capability.color} h-5 w-5 mb-1`} />
          <span className="text-xs text-muted-foreground">
            {t(`aiAssistant.features.${capability.id}`, capability.id)}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
