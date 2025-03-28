
import React, { Suspense, useMemo, useState, useEffect } from 'react';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyComponentProps {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  fallback?: React.ReactNode;
  priority?: boolean;
  props?: Record<string, any>;
  onLoad?: () => void;
}

/**
 * مكون لتحميل المكونات بشكل كسول للتحسين الأداء
 */
export function LazyComponent({
  component: Component,
  fallback,
  priority = false,
  props = {},
  onLoad,
}: LazyComponentProps) {
  const { isLowPerformanceDevice } = usePerformanceOptimization();
  const [shouldRender, setShouldRender] = useState(priority);
  const [isVisible, setIsVisible] = useState(false);
  
  // إنشاء المكون الكسول
  const LazyComponentWithProps = useMemo(() => React.memo(() => {
    // استدعاء معالج التحميل
    useEffect(() => {
      if (isVisible) {
        onLoad?.();
      }
    }, [isVisible]);
    
    return <Component {...props} />;
  }), [Component, props, onLoad, isVisible]);
  
  // استخدام IntersectionObserver للتحميل الكسول
  useEffect(() => {
    if (priority) {
      setShouldRender(true);
      setIsVisible(true);
      return;
    }
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          setTimeout(() => setIsVisible(true), 100);
          observer.disconnect();
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: isLowPerformanceDevice ? '50px' : '200px', // تحميل قبل الظهور بمسافة أقل على الأجهزة الضعيفة
      threshold: 0.01,
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [priority, isLowPerformanceDevice]);
  
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // عرض احتياطي مخصص أو هيكل عظمي افتراضي
  const defaultFallback = (
    <div className="w-full">
      <Skeleton className="h-24 w-full" />
    </div>
  );
  
  return (
    <div ref={containerRef}>
      {shouldRender ? (
        <Suspense fallback={fallback || defaultFallback}>
          <LazyComponentWithProps />
        </Suspense>
      ) : (
        fallback || defaultFallback
      )}
    </div>
  );
}
