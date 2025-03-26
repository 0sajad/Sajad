
// Generate security threats data
export const generateThreatsData = () => {
  return [
    { name: "Malware", value: Math.floor(Math.random() * 20) + 5 },
    { name: "Phishing", value: Math.floor(Math.random() * 25) + 10 },
    { name: "Intrusion", value: Math.floor(Math.random() * 15) + 3 },
    { name: "Vulnerabilities", value: Math.floor(Math.random() * 12) + 8 }
  ];
};

// Generate historical threat data
export const generateHistoricalData = () => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    return {
      day,
      blocked: Math.floor(Math.random() * 30) + 20,
      critical: Math.floor(Math.random() * 5),
      warnings: Math.floor(Math.random() * 10) + 5
    };
  }).reverse();
};

// Type definitions
export interface ThreatData {
  name: string;
  value: number;
}

export interface HistoricalData {
  day: string;
  blocked: number;
  critical: number;
  warnings: number;
}

// Helper function to get security status based on score
export const getSecurityStatus = (securityScore: number, t: (key: string, fallback: string) => string) => {
  if (securityScore >= 90) {
    return { label: t('securityDashboard.excellent', 'Excellent'), color: 'text-green-600' };
  } else if (securityScore >= 75) {
    return { label: t('securityDashboard.good', 'Good'), color: 'text-blue-600' };
  } else if (securityScore >= 60) {
    return { label: t('securityDashboard.fair', 'Fair'), color: 'text-amber-600' };
  } else {
    return { label: t('securityDashboard.poor', 'Poor'), color: 'text-red-600' };
  }
};

// Colors for pie chart
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
