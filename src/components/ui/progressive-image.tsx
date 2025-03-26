
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useA11y } from "@/hooks/useA11y";

interface ProgressiveImageProps {
  src: string;
  placeholderSrc?: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  onLoad?: () => void;
}

export function ProgressiveImage({
  src,
  placeholderSrc = "/placeholder.svg",
  alt,
  className = "",
  width,
  height,
  onLoad,
}: ProgressiveImageProps) {
  const [imgSrc, setImgSrc] = useState(placeholderSrc);
  const [isLoaded, setIsLoaded] = useState(false);
  const { reducedMotion, highContrast } = useA11y();

  useEffect(() => {
    // إعادة تعيين الحالة عند تغيير مصدر الصورة
    setImgSrc(placeholderSrc);
    setIsLoaded(false);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
      onLoad?.();
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      // الاحتفاظ بالصورة البديلة في حالة الفشل
    };
    
    return () => {
      // إلغاء التحميل عند إزالة المكون
      img.onload = null;
      img.onerror = null;
    };
  }, [src, placeholderSrc, onLoad]);

  return (
    <motion.img
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={`${className} ${!isLoaded ? "blur-sm" : "blur-0"} ${
        highContrast ? "contrast-150 brightness-105" : ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0.5 }}
      transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
      onError={() => setImgSrc(placeholderSrc)}
      aria-busy={!isLoaded}
    />
  );
}
