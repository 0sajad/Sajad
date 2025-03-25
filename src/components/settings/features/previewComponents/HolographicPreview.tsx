
import React from "react";

export const HolographicPreview = () => {
  return (
    <div className="relative h-72 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 bg-purple-500 opacity-50 rounded-full animate-pulse"></div>
        <div className="absolute w-48 h-48 border-2 border-blue-400 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute w-64 h-64 border border-blue-300 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-md p-3 rounded-lg">
        <p className="text-white text-sm font-tajawal text-center">
          واجهة ثلاثية الأبعاد تفاعلية تعرض معلومات الشبكة بشكل مرئي متطور
        </p>
      </div>
    </div>
  );
};
