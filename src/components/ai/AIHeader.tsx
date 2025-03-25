
import React from "react";
import { BrainCircuit } from "lucide-react";

export const AIHeader = () => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-6">
        <BrainCircuit className="mr-2" size={16} />
        <span className="font-tajawal">نظام الذكاء الاصطناعي المتطور</span>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold mb-6 font-tajawal">
        مساعد OCTA-GRAM الذكي
      </h1>
      
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-tajawal">
        ذكاء اصطناعي متطور يتعلم باستمرار ويتطور ذاتياً لمساعدتك في مجال الشبكات والاتصالات
      </p>
    </div>
  );
};
