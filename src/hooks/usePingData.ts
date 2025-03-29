import { useState, useEffect } from 'react';

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

  // Simulate pinging hosts
  useEffect(() => {
    if (hosts.length === 0) return;

    let mounted = true;
    setIsPinging(true);
    setError(null);

    const pingHosts = () => {
      const newResults = hosts.map(host => {
        // Simulate network request with random success/failure and time
        const success = Math.random() > 0.2; // 80% success rate
        const time = success ? Math.floor(Math.random() * 120) + 10 : 0;

        return {
          host,
          time,
          success,
          timestamp: Date.now()
        };
      });

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
          
          // Add new results to map
          for (const result of newResults) {
            if (!hostMap.has(result.host)) {
              hostMap.set(result.host, []);
            }
            hostMap.get(result.host)!.push(result);
          }
          
          // Flatten map and keep last 10 per host
          const results: PingResult[] = [];
          for (const [host, hostResults] of hostMap.entries()) {
            results.push(...hostResults.slice(-10));
          }
          
          return results.sort((a, b) => a.timestamp - b.timestamp);
        });
      }
    };

    pingHosts();
    const timer = setInterval(pingHosts, interval);

    return () => {
      mounted = false;
      clearInterval(timer);
      setIsPinging(false);
    };
  }, [hosts, interval]);

  return {
    pingResults,
    isPinging,
    error
  };
}
