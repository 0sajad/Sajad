
// Generate sample system performance data
export const generatePerformanceData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i.toString(),
    cpu: Math.floor(Math.random() * 30) + 10,
    memory: Math.floor(Math.random() * 40) + 30,
    disk: Math.floor(Math.random() * 15) + 5,
    temperature: Math.floor(Math.random() * 15) + 45,
  }));
};

// Type definition for performance data point
export interface PerformanceDataPoint {
  time: string;
  cpu: number;
  memory: number;
  disk: number;
  temperature: number;
}
