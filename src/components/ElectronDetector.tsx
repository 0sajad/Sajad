
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function ElectronDetector() {
  const [isElectron, setIsElectron] = useState<boolean>(false);
  
  useEffect(() => {
    // التحقق ما إذا كان التطبيق يعمل في بيئة Electron
    if (typeof window !== 'undefined' && window.electron?.isElectron) {
      setIsElectron(true);
      toast.info('تم تشغيل التطبيق كبرنامج سطح المكتب', {
        duration: 3000,
      });
    }
  }, []);
  
  return null; // هذا المكون لا يعرض أي محتوى مرئي
}

export default ElectronDetector;
