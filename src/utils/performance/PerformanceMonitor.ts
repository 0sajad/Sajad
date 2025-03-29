
/**
 * أداة مراقبة أداء التطبيق
 * تقيس وتتبع معايير الأداء المختلفة
 */
class PerformanceMonitor {
  private renderTimes: Map<string, number[]> = new Map();
  private eventHandlerTimes: Map<string, number[]> = new Map();
  private apiCallTimes: Map<string, number[]> = new Map();
  private fps: number[] = [];
  private lastFrameTime: number = 0;
  private frameRequestId: number | null = null;
  private isTrackingFPS: boolean = false;
  private memorySnapshots: { timestamp: number; memory: any }[] = [];
  private isMeasuringMemory: boolean = false;
  private memoryIntervalId: NodeJS.Timeout | null = null;

  /**
   * بدء قياس وقت التصيير للمكون
   * @param componentId معرف المكون
   */
  startRenderTimer(componentId: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // تخزين وقت التصيير
      if (!this.renderTimes.has(componentId)) {
        this.renderTimes.set(componentId, []);
      }
      
      this.renderTimes.get(componentId)!.push(renderTime);
      
      // حفظ آخر 100 قياس فقط لتجنب تسرب الذاكرة
      if (this.renderTimes.get(componentId)!.length > 100) {
        this.renderTimes.get(componentId)!.shift();
      }
      
      // طباعة في وحدة التحكم إذا تجاوز وقت التصيير حدًا معينًا
      if (renderTime > 16.67) { // أكثر من 16.67 مللي ثانية (أقل من 60 إطارًا في الثانية)
        console.warn(`Slow render detected for ${componentId}: ${renderTime.toFixed(2)}ms`);
      }
    };
  }

  /**
   * قياس زمن تنفيذ معالج الحدث
   * @param eventName اسم الحدث
   * @param callback دالة معالجة الحدث
   */
  measureEventHandler<T extends any[], R>(eventName: string, callback: (...args: T) => R): (...args: T) => R {
    return (...args: T) => {
      const startTime = performance.now();
      const result = callback(...args);
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      
      // تخزين وقت التنفيذ
      if (!this.eventHandlerTimes.has(eventName)) {
        this.eventHandlerTimes.set(eventName, []);
      }
      
      this.eventHandlerTimes.get(eventName)!.push(executionTime);
      
      // حفظ آخر 100 قياس فقط
      if (this.eventHandlerTimes.get(eventName)!.length > 100) {
        this.eventHandlerTimes.get(eventName)!.shift();
      }
      
      // طباعة في وحدة التحكم إذا تجاوز وقت التنفيذ حدًا معينًا
      if (executionTime > 50) {
        console.warn(`Slow event handler detected for ${eventName}: ${executionTime.toFixed(2)}ms`);
      }
      
      return result;
    };
  }

  /**
   * قياس زمن استدعاء API
   * @param apiName اسم الـ API
   * @param promise الوعد الذي سيتم قياسه
   */
  async measureApiCall<T>(apiName: string, promise: Promise<T>): Promise<T> {
    const startTime = performance.now();
    
    try {
      const result = await promise;
      const endTime = performance.now();
      const callTime = endTime - startTime;
      
      // تخزين وقت الاتصال
      if (!this.apiCallTimes.has(apiName)) {
        this.apiCallTimes.set(apiName, []);
      }
      
      this.apiCallTimes.get(apiName)!.push(callTime);
      
      // حفظ آخر 100 قياس فقط
      if (this.apiCallTimes.get(apiName)!.length > 100) {
        this.apiCallTimes.get(apiName)!.shift();
      }
      
      // طباعة في وحدة التحكم إذا تجاوز وقت الاتصال حدًا معينًا
      if (callTime > 1000) {
        console.warn(`Slow API call detected for ${apiName}: ${callTime.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      console.error(`API call ${apiName} failed after ${(endTime - startTime).toFixed(2)}ms:`, error);
      throw error;
    }
  }

  /**
   * بدء قياس معدل الإطارات في الثانية
   */
  startTrackingFPS(): void {
    if (this.isTrackingFPS) return;
    
    this.isTrackingFPS = true;
    this.lastFrameTime = performance.now();
    
    const measureFPS = () => {
      const now = performance.now();
      const delta = now - this.lastFrameTime;
      this.lastFrameTime = now;
      
      const currentFPS = 1000 / delta;
      this.fps.push(currentFPS);
      
      // حفظ آخر 100 قياس فقط
      if (this.fps.length > 100) {
        this.fps.shift();
      }
      
      if (this.isTrackingFPS) {
        this.frameRequestId = requestAnimationFrame(measureFPS);
      }
    };
    
    this.frameRequestId = requestAnimationFrame(measureFPS);
  }

  /**
   * إيقاف قياس معدل الإطارات في الثانية
   */
  stopTrackingFPS(): void {
    this.isTrackingFPS = false;
    
    if (this.frameRequestId !== null) {
      cancelAnimationFrame(this.frameRequestId);
      this.frameRequestId = null;
    }
  }

  /**
   * بدء قياس استخدام الذاكرة
   * @param intervalMs الفاصل الزمني بين القياسات (بالمللي ثانية)
   */
  startMemoryMeasurement(intervalMs: number = 5000): void {
    if (this.isMeasuringMemory) return;
    
    this.isMeasuringMemory = true;
    
    const measureMemory = () => {
      try {
        // محاولة الحصول على معلومات الذاكرة (متوفرة فقط في بعض المتصفحات)
        const memory = (performance as any).memory;
        
        if (memory) {
          this.memorySnapshots.push({
            timestamp: Date.now(),
            memory: {
              usedJSHeapSize: memory.usedJSHeapSize,
              totalJSHeapSize: memory.totalJSHeapSize,
              jsHeapSizeLimit: memory.jsHeapSizeLimit
            }
          });
          
          // حفظ آخر 100 قياس فقط
          if (this.memorySnapshots.length > 100) {
            this.memorySnapshots.shift();
          }
          
          // التحذير من مشاكل الذاكرة المحتملة
          if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
            console.warn('Memory usage is high: ', 
              `${(memory.usedJSHeapSize / 1048576).toFixed(2)}MB / ${(memory.jsHeapSizeLimit / 1048576).toFixed(2)}MB`);
          }
        }
      } catch (error) {
        // تجاهل الأخطاء، حيث إن بعض المتصفحات لا تدعم قياس الذاكرة
      }
    };
    
    // قياس أولي
    measureMemory();
    
    // قياس دوري
    this.memoryIntervalId = setInterval(measureMemory, intervalMs);
  }

  /**
   * إيقاف قياس استخدام الذاكرة
   */
  stopMemoryMeasurement(): void {
    this.isMeasuringMemory = false;
    
    if (this.memoryIntervalId !== null) {
      clearInterval(this.memoryIntervalId);
      this.memoryIntervalId = null;
    }
  }

  /**
   * الحصول على تقرير أداء مفصل
   */
  getPerformanceReport(): {
    renderTimes: Record<string, { avg: number; min: number; max: number; count: number }>;
    eventHandlerTimes: Record<string, { avg: number; min: number; max: number; count: number }>;
    apiCallTimes: Record<string, { avg: number; min: number; max: number; count: number }>;
    fps: { current: number; avg: number; min: number; max: number; count: number } | null;
    memory: { current: any; trend: 'increasing' | 'stable' | 'decreasing' | 'unknown' } | null;
  } {
    // حساب إحصائيات أوقات التصيير
    const renderTimesStats: Record<string, { avg: number; min: number; max: number; count: number }> = {};
    this.renderTimes.forEach((times, componentId) => {
      if (times.length === 0) return;
      
      renderTimesStats[componentId] = {
        avg: times.reduce((sum, time) => sum + time, 0) / times.length,
        min: Math.min(...times),
        max: Math.max(...times),
        count: times.length
      };
    });
    
    // حساب إحصائيات أوقات معالجات الأحداث
    const eventHandlerTimesStats: Record<string, { avg: number; min: number; max: number; count: number }> = {};
    this.eventHandlerTimes.forEach((times, eventName) => {
      if (times.length === 0) return;
      
      eventHandlerTimesStats[eventName] = {
        avg: times.reduce((sum, time) => sum + time, 0) / times.length,
        min: Math.min(...times),
        max: Math.max(...times),
        count: times.length
      };
    });
    
    // حساب إحصائيات أوقات استدعاءات API
    const apiCallTimesStats: Record<string, { avg: number; min: number; max: number; count: number }> = {};
    this.apiCallTimes.forEach((times, apiName) => {
      if (times.length === 0) return;
      
      apiCallTimesStats[apiName] = {
        avg: times.reduce((sum, time) => sum + time, 0) / times.length,
        min: Math.min(...times),
        max: Math.max(...times),
        count: times.length
      };
    });
    
    // حساب إحصائيات معدل الإطارات في الثانية
    let fpsStats = null;
    if (this.fps.length > 0) {
      fpsStats = {
        current: this.fps[this.fps.length - 1],
        avg: this.fps.reduce((sum, fps) => sum + fps, 0) / this.fps.length,
        min: Math.min(...this.fps),
        max: Math.max(...this.fps),
        count: this.fps.length
      };
    }
    
    // تحليل اتجاه استخدام الذاكرة
    let memoryStats = null;
    if (this.memorySnapshots.length > 0) {
      const currentSnapshot = this.memorySnapshots[this.memorySnapshots.length - 1];
      
      let trend: 'increasing' | 'stable' | 'decreasing' | 'unknown' = 'unknown';
      
      if (this.memorySnapshots.length >= 10) {
        const recentSnapshots = this.memorySnapshots.slice(-10);
        const firstUsed = recentSnapshots[0].memory.usedJSHeapSize;
        const lastUsed = recentSnapshots[recentSnapshots.length - 1].memory.usedJSHeapSize;
        
        const percentChange = ((lastUsed - firstUsed) / firstUsed) * 100;
        
        if (percentChange > 10) {
          trend = 'increasing';
        } else if (percentChange < -10) {
          trend = 'decreasing';
        } else {
          trend = 'stable';
        }
      }
      
      memoryStats = {
        current: currentSnapshot.memory,
        trend
      };
    }
    
    return {
      renderTimes: renderTimesStats,
      eventHandlerTimes: eventHandlerTimesStats,
      apiCallTimes: apiCallTimesStats,
      fps: fpsStats,
      memory: memoryStats
    };
  }

  /**
   * تسجيل تقرير الأداء في وحدة التحكم
   */
  logPerformanceReport(): void {
    const report = this.getPerformanceReport();
    console.group('Performance Report');
    console.table(report.renderTimes);
    console.table(report.eventHandlerTimes);
    console.table(report.apiCallTimes);
    console.log('FPS:', report.fps);
    console.log('Memory:', report.memory);
    console.groupEnd();
  }

  /**
   * إعادة تعيين جميع المقاييس
   */
  reset(): void {
    this.renderTimes.clear();
    this.eventHandlerTimes.clear();
    this.apiCallTimes.clear();
    this.fps = [];
    this.memorySnapshots = [];
  }
}

// إنشاء نسخة مشتركة عامة
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;
