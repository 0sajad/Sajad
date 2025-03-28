
import React, { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";

interface LazyLoadProps {
  children: React.ReactNode;
  height?: string | number;
  width?: string | number;
  priority?: boolean;
  /**
   * مسافة التحميل المسبق بالبكسل قبل ظهور العنصر
   */
  threshold?: number;
  placeholder?: React.ReactNode;
  /**
   * استدعاء عند اكتمال التحميل
   */
  onLoad?: () => void;
  className?: string;
}

/**
 * مكون للتحميل الكسول للمحتوى
 * يساعد على تحسين أداء التطبيق بتحميل المكونات فقط عندما تكون مرئية للمستخدم
 */
export function LazyLoad({
  children,
  height,
  width,
  priority = false,
  threshold = 200,
  placeholder,
  onLoad,
  className = "",
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isLowPerformanceDevice } = usePerformanceOptimization();
  const containerRef = useRef<HTMLDivElement>(null);

  // ضبط مسافة التحميل المسبق حسب قدرة الجهاز
  const getOptimalThreshold = () => {
    if (isLowPerformanceDevice) {
      return threshold / 2; // مسافة أقل للأجهزة ضعيفة الأداء
    }
    return threshold;
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
        rootMargin: `${getOptimalThreshold()}px`,
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority, threshold]);

  // عند اكتمال التحميل
  useEffect(() => {
    if (isVisible && !isLoaded) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
        if (onLoad) {
          onLoad();
        }
      }, isLowPerformanceDevice ? 100 : 10); // تأخير أقل للأجهزة ذات الأداء المرتفع

      return () => clearTimeout(timer);
    }
  }, [isVisible, isLoaded, onLoad, isLowPerformanceDevice]);

  const getPlaceholder = () => {
    if (placeholder) {
      return placeholder;
    }
    return (
      <Skeleton
        className={className}
        style={{
          width: width ? (typeof width === "number" ? `${width}px` : width) : "100%",
          height: height ? (typeof height === "number" ? `${height}px` : height) : "12rem",
        }}
      />
    );
  };

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? (
        <div
          className={`transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {children}
        </div>
      ) : (
        getPlaceholder()
      )}
    </div>
  );
}
