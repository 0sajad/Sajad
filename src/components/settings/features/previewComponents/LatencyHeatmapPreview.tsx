
import React from "react";

export const LatencyHeatmapPreview = () => {
  return (
    <div className="relative h-72 bg-slate-900 rounded-lg overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 p-4">
        {Array(36).fill(0).map((_, i) => {
          const hue = Math.floor(Math.random() * 120);
          return (
            <div 
              key={i} 
              className="rounded-md" 
              style={{ 
                backgroundColor: `hsla(${hue}, 80%, 50%, ${Math.random() * 0.5 + 0.2})`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            />
          );
        })}
      </div>
      <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-md p-3 rounded-lg">
        <p className="text-white text-sm font-tajawal text-center">
          خريطة تفاعلية توضح مناطق تأخير الشبكة وتحديد النقاط الأسرع والأبطأ
        </p>
      </div>
    </div>
  );
};
