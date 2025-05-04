
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
      "rounded-[40px]", // زيادة التقويس لجعله بيضاوي أكثر
      "px-10 py-3", // تعديل الهوامش لجعل الشكل مستطيلًا بيضاويًا
      "border border-white/20 dark:border-gray-800/50",
      "shadow-xl",
      className
    )}>
      <div className="absolute inset-0 bg-white/5 rounded-[40px]" />
      
      <div className="relative flex flex-col items-center text-white">
        <span className="text-xl font-bold">OCTA</span>
        <div className="w-full h-px bg-white/20 my-1" />
        <span className="text-lg">NETWORK</span>
      </div>
      
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[45px] blur-lg -z-10" />
    </div>
  );
}
