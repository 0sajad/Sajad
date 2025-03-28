
import React from 'react';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  quality?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  quality,
  priority = false,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps & React.ImgHTMLAttributes<HTMLImageElement>) {
  const { optimizeImageSrc, isLowPerformanceDevice } = usePerformanceOptimization();
  
  // Safely handle undefined src
  if (!src) {
    console.warn('OptimizedImage: src is undefined');
    return (
      <div 
        className={cn("bg-gray-200 dark:bg-gray-800 flex items-center justify-center", className)}
        style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '200px' }}
        role="img"
        aria-label={alt || "Image placeholder"}
      >
        <span className="text-gray-400 dark:text-gray-600 text-sm">No image</span>
      </div>
    );
  }

  // Determine optimized source based on device capabilities - with safeguards
  let optimizedSrc;
  try {
    optimizedSrc = optimizeImageSrc ? optimizeImageSrc(src, width, quality) : src;
  } catch (err) {
    console.error('Error optimizing image:', err);
    optimizedSrc = src;
  }
  
  // Determine loading behavior
  const effectiveLoading = priority ? 'eager' : loading;
  
  // For low-end devices, use smaller size if height and width are provided
  const finalWidth = isLowPerformanceDevice && width ? Math.floor(width * 0.8) : width;
  const finalHeight = isLowPerformanceDevice && height ? Math.floor(height * 0.8) : height;
  
  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={finalWidth}
      height={finalHeight}
      loading={effectiveLoading}
      onLoad={onLoad}
      onError={onError}
      className={cn(
        'max-w-full',
        className
      )}
      {...props}
    />
  );
}
