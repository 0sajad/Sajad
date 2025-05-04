
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  animated?: boolean;
}

export function Logo({ className, animated = true }: LogoProps) {
  return (
    <div className={cn(
      "relative flex items-center justify-center",
      "bg-gradient-to-r from-blue-600 to-purple-600",
      "rounded-[40px]", // تقويس أكبر للحصول على شكل بيضاوي
      "px-14 py-3", // زيادة عرض الشعار لجعله مستطيلًا بيضاوياً
      "border border-white/20 dark:border-gray-800/50",
      "shadow-xl",
      className
    )}>
      <div className="absolute inset-0 bg-white/5 rounded-[40px]" />
      
      <div className="relative flex flex-col items-center text-white">
        <motion.span 
          className="text-xl font-bold tracking-wider"
          animate={animated ? {
            scale: [1, 1.03, 1],
            opacity: [1, 0.9, 1],
          } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          OCTA
        </motion.span>
        <div className="w-full h-px bg-white/30 my-1" />
        <motion.span 
          className="text-lg tracking-wide"
          animate={animated ? {
            scale: [1, 1.02, 1],
            opacity: [1, 0.95, 1],
          } : {}}
          transition={{ duration: 2, delay: 0.3, repeat: Infinity, repeatType: "reverse" }}
        >
          NETWORK
        </motion.span>
      </div>
      
      {/* تأثير التوهج المحسن */}
      <motion.div 
        className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-[45px] blur-lg -z-10" 
        animate={animated ? {
          opacity: [0.5, 0.8, 0.5],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
}
