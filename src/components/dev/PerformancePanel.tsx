
import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Clock, 
  Cpu, 
  Database, 
  Download, 
  LineChart, 
  RefreshCw,
  Memory, 
  Gauge,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import performanceMonitor from '@/utils/performance/PerformanceMonitor';
import { useAppState } from '@/hooks/state/use-app-state';

/**
 * لوحة عرض معلومات الأداء للمطورين
 */
export function PerformancePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [report, setReport] = useState<any>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const isDeveloperMode = useAppState(state => state.preferences.developerMode);

  useEffect(() => {
    // تحميل التقرير الأولي
    updateReport();
    
    let intervalId: NodeJS.Timeout;
    
    // إعداد التحديث التلقائي
    if (isOpen && autoRefresh) {
      intervalId = setInterval(updateReport, 2000);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isOpen, autoRefresh]);
  
  // إذا لم يكن وضع المطور مفعلاً، لا نعرض اللوحة
  if (!isDeveloperMode) {
    return null;
  }

  /**
   * تحديث تقرير الأداء
   */
  const updateReport = () => {
    setReport(performanceMonitor.getPerformanceReport());
  };

  /**
   * إعادة تعيين جميع القياسات
   */
  const resetMonitor = () => {
    performanceMonitor.reset();
    updateReport();
  };

  /**
   * تنزيل تقرير الأداء كملف JSON
   */
  const downloadReport = () => {
    const jsonReport = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonReport], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-report-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
  };

  /**
   * تبديل حالة اللوحة (مفتوحة/مغلقة)
   */
  const togglePanel = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // تحديث التقرير عند فتح اللوحة
      updateReport();
    }
  };

  /**
   * تنسيق الوقت (بالمللي ثانية)
   */
  const formatTime = (ms: number) => {
    return ms < 1 ? `${(ms * 1000).toFixed(2)}μs` : `${ms.toFixed(2)}ms`;
  };

  /**
   * تنسيق حجم الذاكرة
   */
  const formatMemory = (bytes: number) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  };

  return (
    <>
      {/* زر التبديل - دائمًا مرئي */}
      <Button
        size="sm"
        variant="outline"
        className="fixed right-4 bottom-4 z-50 bg-black/20 backdrop-blur-sm border-white/10 hover:bg-black/30"
        onClick={togglePanel}
      >
        {isOpen ? (
          <X className="mr-1 h-4 w-4" />
        ) : (
          <Gauge className="mr-1 h-4 w-4" />
        )}
        {isOpen ? 'Close' : 'Performance'}
      </Button>

      {/* لوحة الأداء */}
      {isOpen && (
        <div className="fixed right-4 bottom-16 z-50 w-96 max-h-[80vh] overflow-auto rounded-lg bg-black/80 backdrop-blur-md border border-white/10 shadow-2xl text-white">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Performance Monitor
              </h2>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                  onClick={updateReport}
                  title="Refresh"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                  onClick={downloadReport}
                  title="Download Report"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div>
                <Button
                  size="sm"
                  variant={autoRefresh ? "default" : "outline"}
                  className={`h-7 text-xs ${autoRefresh ? 'bg-green-600 hover:bg-green-700' : 'bg-transparent text-white/70'}`}
                  onClick={() => setAutoRefresh(!autoRefresh)}
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  {autoRefresh ? 'Auto Refresh: ON' : 'Auto Refresh: OFF'}
                </Button>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs bg-transparent text-white/70 hover:text-white"
                onClick={resetMonitor}
              >
                Reset Metrics
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="bg-black/50 border border-white/10">
                <TabsTrigger value="overview" className="data-[state=active]:bg-white/10">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="renders" className="data-[state=active]:bg-white/10">
                  Renders
                </TabsTrigger>
                <TabsTrigger value="events" className="data-[state=active]:bg-white/10">
                  Events
                </TabsTrigger>
                <TabsTrigger value="api" className="data-[state=active]:bg-white/10">
                  API Calls
                </TabsTrigger>
              </TabsList>

              {report ? (
                <>
                  {/* نظرة عامة */}
                  <TabsContent value="overview" className="space-y-4">
                    {/* FPS */}
                    {report.fps && (
                      <Card className="bg-black/30 border-white/10">
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm font-medium flex items-center">
                            <LineChart className="mr-2 h-4 w-4" />
                            Frames Per Second
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="py-0">
                          <div className="text-3xl font-bold">
                            {report.fps.current.toFixed(1)} <span className="text-sm font-normal text-white/70">FPS</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                            <div>
                              <div className="text-white/70">Average</div>
                              <div>{report.fps.avg.toFixed(1)} FPS</div>
                            </div>
                            <div>
                              <div className="text-white/70">Minimum</div>
                              <div>{report.fps.min.toFixed(1)} FPS</div>
                            </div>
                            <div>
                              <div className="text-white/70">Maximum</div>
                              <div>{report.fps.max.toFixed(1)} FPS</div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <Progress 
                              value={(report.fps.current / 60) * 100} 
                              className="h-2 bg-white/10"
                              indicatorClassName={`${
                                report.fps.current < 30 ? 'bg-red-500' : 
                                report.fps.current < 45 ? 'bg-amber-500' : 'bg-green-500'
                              }`}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Memory */}
                    {report.memory && (
                      <Card className="bg-black/30 border-white/10">
                        <CardHeader className="py-3">
                          <CardTitle className="text-sm font-medium flex items-center">
                            <Memory className="mr-2 h-4 w-4" />
                            Memory Usage
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="py-0">
                          <div className="text-3xl font-bold">
                            {formatMemory(report.memory.current.usedJSHeapSize)}
                            <span className="text-sm font-normal text-white/70"> / {formatMemory(report.memory.current.jsHeapSizeLimit)}</span>
                          </div>
                          <div className="mt-2">
                            <div className="text-xs text-white/70 mb-1">
                              Usage: {((report.memory.current.usedJSHeapSize / report.memory.current.jsHeapSizeLimit) * 100).toFixed(1)}%
                            </div>
                            <Progress 
                              value={(report.memory.current.usedJSHeapSize / report.memory.current.jsHeapSizeLimit) * 100} 
                              className="h-2 bg-white/10"
                              indicatorClassName={`${
                                report.memory.current.usedJSHeapSize > report.memory.current.jsHeapSizeLimit * 0.8 ? 'bg-red-500' : 
                                report.memory.current.usedJSHeapSize > report.memory.current.jsHeapSizeLimit * 0.6 ? 'bg-amber-500' : 'bg-blue-500'
                              }`}
                            />
                          </div>
                          <div className="mt-2 text-xs flex items-center">
                            <div className={`inline-block w-2 h-2 rounded-full mr-1 ${
                              report.memory.trend === 'increasing' ? 'bg-red-500' : 
                              report.memory.trend === 'decreasing' ? 'bg-green-500' : 
                              report.memory.trend === 'stable' ? 'bg-blue-500' : 'bg-gray-500'
                            }`}></div>
                            Trend: {report.memory.trend}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Summary Counts */}
                    <div className="grid grid-cols-3 gap-4">
                      <Card className="bg-black/30 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-5 w-5 text-blue-400" />
                            <div>
                              <div className="text-white/70 text-xs">Render Timers</div>
                              <div className="text-xl font-bold">{Object.keys(report.renderTimes).length}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-black/30 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <Cpu className="h-5 w-5 text-purple-400" />
                            <div>
                              <div className="text-white/70 text-xs">Event Handlers</div>
                              <div className="text-xl font-bold">{Object.keys(report.eventHandlerTimes).length}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-black/30 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2">
                            <Database className="h-5 w-5 text-green-400" />
                            <div>
                              <div className="text-white/70 text-xs">API Calls</div>
                              <div className="text-xl font-bold">{Object.keys(report.apiCallTimes).length}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* تفاصيل أوقات التصيير */}
                  <TabsContent value="renders" className="space-y-4">
                    {Object.keys(report.renderTimes).length === 0 ? (
                      <div className="text-center py-8 text-white/70">No render measurements yet</div>
                    ) : (
                      <div className="space-y-3">
                        {Object.entries(report.renderTimes).map(([componentId, stats]: [string, any]) => (
                          <Card key={componentId} className="bg-black/30 border-white/10">
                            <CardHeader className="py-3">
                              <CardTitle className="text-sm font-medium font-mono">{componentId}</CardTitle>
                            </CardHeader>
                            <CardContent className="py-0">
                              <div className="grid grid-cols-4 gap-2 text-xs">
                                <div>
                                  <div className="text-white/70">Count</div>
                                  <div>{stats.count}</div>
                                </div>
                                <div>
                                  <div className="text-white/70">Average</div>
                                  <div className={`${stats.avg > 16.67 ? 'text-red-400' : 'text-green-400'}`}>
                                    {formatTime(stats.avg)}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-white/70">Min</div>
                                  <div>{formatTime(stats.min)}</div>
                                </div>
                                <div>
                                  <div className="text-white/70">Max</div>
                                  <div className={`${stats.max > 50 ? 'text-red-400' : stats.max > 16.67 ? 'text-amber-400' : 'text-white'}`}>
                                    {formatTime(stats.max)}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2">
                                <Progress 
                                  value={Math.min((stats.avg / 16.67) * 100, 100)} 
                                  className="h-1 bg-white/10"
                                  indicatorClassName={`${
                                    stats.avg > 16.67 ? 'bg-red-500' : 'bg-green-500'
                                  }`}
                                />
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  {/* تفاصيل معالجات الأحداث */}
                  <TabsContent value="events" className="space-y-4">
                    {Object.keys(report.eventHandlerTimes).length === 0 ? (
                      <div className="text-center py-8 text-white/70">No event handler measurements yet</div>
                    ) : (
                      <div className="space-y-3">
                        {Object.entries(report.eventHandlerTimes).map(([eventName, stats]: [string, any]) => (
                          <Card key={eventName} className="bg-black/30 border-white/10">
                            <CardHeader className="py-3">
                              <CardTitle className="text-sm font-medium font-mono">{eventName}</CardTitle>
                            </CardHeader>
                            <CardContent className="py-0">
                              <div className="grid grid-cols-4 gap-2 text-xs">
                                <div>
                                  <div className="text-white/70">Count</div>
                                  <div>{stats.count}</div>
                                </div>
                                <div>
                                  <div className="text-white/70">Average</div>
                                  <div className={`${stats.avg > 50 ? 'text-red-400' : stats.avg > 10 ? 'text-amber-400' : 'text-green-400'}`}>
                                    {formatTime(stats.avg)}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-white/70">Min</div>
                                  <div>{formatTime(stats.min)}</div>
                                </div>
                                <div>
                                  <div className="text-white/70">Max</div>
                                  <div className={`${stats.max > 100 ? 'text-red-400' : stats.max > 50 ? 'text-amber-400' : 'text-white'}`}>
                                    {formatTime(stats.max)}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  {/* تفاصيل استدعاءات API */}
                  <TabsContent value="api" className="space-y-4">
                    {Object.keys(report.apiCallTimes).length === 0 ? (
                      <div className="text-center py-8 text-white/70">No API call measurements yet</div>
                    ) : (
                      <div className="space-y-3">
                        {Object.entries(report.apiCallTimes).map(([apiName, stats]: [string, any]) => (
                          <Card key={apiName} className="bg-black/30 border-white/10">
                            <CardHeader className="py-3">
                              <CardTitle className="text-sm font-medium font-mono">{apiName}</CardTitle>
                            </CardHeader>
                            <CardContent className="py-0">
                              <div className="grid grid-cols-4 gap-2 text-xs">
                                <div>
                                  <div className="text-white/70">Count</div>
                                  <div>{stats.count}</div>
                                </div>
                                <div>
                                  <div className="text-white/70">Average</div>
                                  <div className={`${stats.avg > 1000 ? 'text-red-400' : stats.avg > 500 ? 'text-amber-400' : 'text-green-400'}`}>
                                    {formatTime(stats.avg)}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-white/70">Min</div>
                                  <div>{formatTime(stats.min)}</div>
                                </div>
                                <div>
                                  <div className="text-white/70">Max</div>
                                  <div className={`${stats.max > 2000 ? 'text-red-400' : stats.max > 1000 ? 'text-amber-400' : 'text-white'}`}>
                                    {formatTime(stats.max)}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </>
              ) : (
                <div className="text-center py-8 text-white/70">Loading performance data...</div>
              )}
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
}
