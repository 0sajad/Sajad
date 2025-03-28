
import React, { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * مكون صور محسن للأداء
 * يدعم التحميل الكسول وتقليل جودة الصور للأجهزة منخفضة الأداء
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  objectFit = "cover",
  quality,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const { deviceTier, optimizeImageSrc } = usePerformanceOptimization();
  const imgRef = useRef<HTMLImageElement>(null);

  // تحسين مصدر الصورة حسب قدرة الجهاز
  const getOptimizedSrc = () => {
    if (!src) return '';
    
    // تحديد جودة الصورة حسب نوع الجهاز إذا لم يتم تحديدها
    const autoQuality = quality ?? (deviceTier === 'low' ? 60 : deviceTier === 'medium' ? 80 : 100);
    // نستدعي optimizeImageSrc بالمعلمات الصحيحة
    return optimizeImageSrc(src, width, autoQuality);
  };

  useEffect(() => {
    if (priority) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px",
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  // في حالة حدوث خطأ في تحميل الصورة
  if (hasError) {
    return (
      <div 
        className={cn(
          "bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-600",
          className
        )}
        style={{
          width: width ? `${width}px` : "100%",
          height: height ? `${height}px` : "200px",
        }}
      >
        <span className="text-sm">{alt || 'صورة غير متوفرة'}</span>
      </div>
    );
  }

  return (
    <div
      className={cn("relative", className)}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "auto",
      }}
      ref={imgRef}
    >
      {!isLoaded && isVisible && (
        <Skeleton
          className="absolute inset-0 z-10"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
      
      {isVisible && (
        <img
          src={getOptimizedSrc()}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          style={{
            objectFit,
            width: "100%",
            height: "100%",
          }}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
        />
      )}
    </div>
  );
}
