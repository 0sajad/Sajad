
import React from "react";
import { ProgressiveImage } from "./progressive-image";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  layout?: "fill" | "responsive" | "intrinsic" | "fixed";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  quality?: number;
  placeholderColor?: string;
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  layout = "intrinsic",
  objectFit = "cover",
  quality = 85,
  placeholderColor = "#f3f4f6",
}: OptimizedImageProps) {
  // معالجة المصدر للصورة لتحسين التحميل استناداً إلى الحجم والجودة
  const optimizedSrc = (originalSrc: string): string => {
    // يمكن إضافة منطق هنا لتوليد عناوين URL محسنة للصور
    // مثل تغيير الحجم أو الضغط استناداً إلى بارامترات الإدخال
    
    // مثال بسيط: إضافة بارامترات الجودة فقط إذا كان المصدر يأتي من مصدر محدد
    if (originalSrc.includes("cloudinary.com")) {
      return originalSrc.replace("/upload/", `/upload/q_${quality}/`);
    }
    
    // يمكن إضافة منطق آخر هنا للتعامل مع خدمات الصور الأخرى
    
    return originalSrc;
  };
  
  // توليد الصورة البديلة ذات الدقة المنخفضة
  const generatePlaceholder = (): string => {
    // يمكن إنشاء صورة منخفضة الدقة هنا، ولكن سنستخدم placeholderColor كحل بسيط
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width || 100} ${height || 100}'%3E%3Crect width='100%25' height='100%25' fill='${placeholderColor.replace("#", "%23")}'/%3E%3C/svg%3E`;
  };
  
  // تحديد أسلوب CSS استناداً إلى layout
  const getLayoutStyle = () => {
    switch (layout) {
      case "fill":
        return "absolute inset-0 w-full h-full";
      case "responsive":
        return "w-full h-auto";
      case "fixed":
        return "";
      default:
        return "max-w-full";
    }
  };
  
  // تحديد أسلوب object-fit
  const getObjectFitStyle = () => {
    switch (objectFit) {
      case "contain":
        return "object-contain";
      case "cover":
        return "object-cover";
      case "fill":
        return "object-fill";
      case "none":
        return "object-none";
      case "scale-down":
        return "object-scale-down";
      default:
        return "object-cover";
    }
  };
  
  return (
    <ProgressiveImage
      src={optimizedSrc(src)}
      placeholderSrc={generatePlaceholder()}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${getLayoutStyle()} ${getObjectFitStyle()}`}
    />
  );
}
