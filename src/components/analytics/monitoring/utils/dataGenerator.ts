
// إنشاء بيانات مصطنعة للوقت الفعلي
export const generateRealTimeData = () => {
  const now = new Date();
  const data = [];
  
  for (let i = 20; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 2000);
    const timeStr = time.toLocaleTimeString().split(":").slice(0, 2).join(":") + ":" + time.getSeconds();
    
    data.push({
      time: timeStr,
      download: Math.floor(Math.random() * 100) + 50,
      upload: Math.floor(Math.random() * 50) + 20,
      latency: Math.floor(Math.random() * 20) + 10
    });
  }
  
  return data;
};

// تحديد الشذوذ في البيانات كمثال على مشكلة
export const generateAnomaly = (data) => {
  const anomalies = [];
  
  data.forEach((point, index) => {
    if (point.latency > 25 || point.download < 40 || point.upload < 15) {
      anomalies.push({
        time: point.time,
        type: point.latency > 25 ? "latency" : point.download < 40 ? "download" : "upload",
        value: point.latency > 25 ? point.latency : point.download < 40 ? point.download : point.upload
      });
    }
  });
  
  return anomalies;
};
