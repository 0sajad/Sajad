
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { useTranslation } from "react-i18next";

interface AICapabilitiesBadgesProps {
  isCompact?: boolean;
}

export function AICapabilitiesBadges({ isCompact = false }: AICapabilitiesBadgesProps) {
  const { t } = useTranslation();
  
  const badges = [
    { 
      id: "multiLanguage", 
      translationKey: "aiAssistant.multiLanguage", 
      defaultText: "Multi-language",
      color: "from-blue-500 to-purple-500"
    },
    { 
      id: "fileHandling", 
      translationKey: "aiAssistant.fileHandling", 
      defaultText: "File handling",
      color: "from-green-500 to-emerald-500"
    },
    { 
      id: "security", 
      translationKey: "aiAssistant.security", 
      defaultText: "Security",
      color: "from-red-500 to-orange-500"
    },
    { 
      id: "selfDevelopment", 
      translationKey: "aiAssistant.selfDevelopment", 
      defaultText: "Self-development",
      color: "from-amber-500 to-yellow-500"
    }
  ];
  
  // حساب تأخير الرسوم المتحركة
  const getDelay = (index: number) => 0.1 + (index * 0.1);
  
  // تحديد طريقة عرض الشارات بناءً على حجم الشاشة
  const containerClassName = isCompact 
    ? "flex flex-col space-y-1.5"
    : "flex flex-wrap gap-1.5";
  
  return (
    <div className={containerClassName}>
      {badges.map((badge, index) => (
        <motion.div
          key={badge.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: getDelay(index), duration: 0.2 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          <Badge 
            className={`bg-gradient-to-r ${badge.color} hover:opacity-90 transition-opacity text-white border-none`}
            aria-label={t(badge.translationKey, badge.defaultText)}
          >
            {t(badge.translationKey, badge.defaultText)}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
}
