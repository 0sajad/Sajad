import { useState, useEffect, useCallback } from 'react';

interface PingResult {
  host: string;
  time: number; // in ms
  success: boolean;
  timestamp: number;
}

export function usePingData(hosts: string[] = [], interval = 5000) {
  const [pingResults, setPingResults] = useState<PingResult[]>([]);
  const [isPinging, setIsPinging] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPingDelay, setCurrentPingDelay] = useState<number>(0);
  const [pingHistory, setPingHistory] = useState<number[]>([]);
  const [activeHost, setActiveHost] = useState<string | null>(null);

  // Function to ping a specific host
  const pingHost = useCallback((host: string) => {
    setActiveHost(host);
    setIsPinging(true);
    setError(null);
  }, []);

  // Function to stop pinging
  const stopPing = useCallback(() => {
    setIsPinging(false);
    setActiveHost(null);
  }, []);

  // Simulate pinging hosts
  useEffect(() => {
    if (!isPinging || !activeHost) return;

    let mounted = true;
    
    const pingHosts = () => {
      // Simulate network request with random success/failure and time
      const success = Math.random() > 0.2; // 80% success rate
      const time = success ? Math.floor(Math.random() * 120) + 10 : 0;
      
      const newResult = {
        host: activeHost,
        time,
        success,
        timestamp: Date.now()
      };

      if (mounted) {
        setPingResults(prev => {
          // Keep the last 10 results per host
          const hostMap = new Map<string, PingResult[]>();
          
          // Add previous results to map
          for (const result of prev) {
            if (!hostMap.has(result.host)) {
              hostMap.set(result.host, []);
            }
            hostMap.get(result.host)!.push(result);
          }
          
          // Add new result to map
          if (!hostMap.has(newResult.host)) {
            hostMap.set(newResult.host, []);
          }
          hostMap.get(newResult.host)!.push(newResult);
          
          // Flatten map and keep last 10 per host
          const results: PingResult[] = [];
          for (const [host, hostResults] of hostMap.entries()) {
            results.push(...hostResults.slice(-10));
          }
          
          return results.sort((a, b) => a.timestamp - b.timestamp);
        });

        setCurrentPingDelay(time);
        setPingHistory(prev => {
          const newHistory = [...prev, time];
          return newHistory.slice(-20); // Keep last 20 ping times
        });
      }
    };

    pingHosts(); // Initial ping
    const timer = setInterval(pingHosts, interval);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [activeHost, interval, isPinging]);

  return {
    pingResults,
    isPinging,
    error,
    pingHost,
    stopPing,
    currentPingDelay,
    pingHistory
  };
}
