
import React from "react";
import { Link } from "react-router-dom";
import { ArrowDown, BrainCircuit } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { AnimatedText } from "../animation/AnimatedText";
import { useA11y } from "@/hooks/useA11y";

export function EnhancedHeroSection() {
  const { t } = useTranslation();
  const a11y = useA11y();
  
  const handleExploreClick = () => {
    a11y.announce(t('accessibility.startExploring'));
    a11y.playSound('click');
  };
  
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="absolute -z-10 top-0 left-0 right-0 h-screen bg-gradient-to-b from-white dark:from-gray-900 via-white/80 dark:via-gray-900/80 to-transparent" />
      
      <div className="text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 mr-2 animate-pulse"></span>
          {t('hero.badge')}
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          <AnimatedText
            text="OCTA-GRAM"
            className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-gray-100 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent"
            delay={0.5}
            staggerChildren={0.05}
          />
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
        >
          {t('hero.description')}
        </motion.p>
        
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Link to="/ai">
            <motion.button 
              className="action-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExploreClick}
            >
              <BrainCircuit className="mr-2" size={18} />
              <span>{t('hero.aiAssistant')}</span>
            </motion.button>
          </Link>
          <motion.button 
            className="secondary-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{t('hero.learnMore')}</span>
          </motion.button>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-12 left-0 right-0 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.a 
          href="#dashboard" 
          className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-blue-600 dark:text-blue-400" />
        </motion.a>
      </motion.div>
    </section>
  );
}
