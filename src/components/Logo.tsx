
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn(
      "relative flex items-center justify-center",
      "bg-gradient-to-r from-blue-600 to-purple-600",
      "rounded-[40px]", // تقويس أكبر للحصول على شكل بيضاوي
      "px-12 py-3", // زيادة عرض الشعار لجعله مستطيلًا بيضاوياً
      "border border-white/20 dark:border-gray-800/50",
      "shadow-xl",
      className
    )}>
      <div className="absolute inset-0 bg-white/5 rounded-[40px]" />
      
      <div className="relative flex flex-col items-center text-white">
        <span className="text-xl font-bold tracking-wider">OCTA</span>
        <div className="w-full h-px bg-white/30 my-1" />
        <span className="text-lg tracking-wide">NETWORK</span>
      </div>
      
      {/* تأثير التوهج */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-[45px] blur-lg -z-10" />
    </div>
  );
}
