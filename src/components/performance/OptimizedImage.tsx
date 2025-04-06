
import React, { useState, useEffect } from "react";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { Skeleton } from "@/components/ui/skeleton";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * مكون صورة محسن للأداء يدعم التحميل الكسول والتحجيم التلقائي
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const { optimizeImageSrc, isLowPerformanceDevice, shouldUseLazyLoading } = usePerformanceOptimization();
  const [isLoaded, setIsLoaded] = useState(priority);
  const [isError, setIsError] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(priority ? optimizeImageSrc(src) : null);
  
  // استخدام IntersectionObserver للتحميل الكسول
  useEffect(() => {
    if (priority || imgSrc) return;
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setImgSrc(optimizeImageSrc(src));
          observer.disconnect();
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '200px', // تحميل الصورة قبل أن تظهر بـ 200 بكسل
      threshold: 0.01,
    });
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [priority, src, imgSrc, optimizeImageSrc]);
  
  const imgRef = React.useRef<HTMLImageElement>(null);
  
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };
  
  const handleError = () => {
    setIsError(true);
    setIsLoaded(true);
    onError?.();
  };
  
  // تقديم صورة احتياطية في حالة الخطأ
  if (isError) {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-800 flex items-center justify-center ${className}`}
        style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '200px' }}
      >
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          {alt || 'صورة غير متوفرة'}
        </span>
      </div>
    );
  }
  
  return (
    <>
      {!isLoaded && (
        <Skeleton
          className={`${className}`}
          style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '200px' }}
        />
      )}
      <img
        ref={imgRef}
        src={imgSrc || ''}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0 absolute'} transition-opacity duration-300`}
        loading={priority || !shouldUseLazyLoading ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
      />
    </>
  );
}
