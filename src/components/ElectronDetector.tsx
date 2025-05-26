
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getWebEnvironmentConfig } from '@/utils/electronDetector';

export function WebEnvironmentDetector() {
  const [platform, setPlatform] = useState<string>('');
  
  useEffect(() => {
    const config = getWebEnvironmentConfig();
    setPlatform(config.platform);
    
    // إعلام المستخدم بنوع البيئة
    if (config.platform === 'github-pages') {
      toast.info('مرحباً بك في Octa Network - نسخة GitHub Pages', {
        duration: 3000,
      });
    } else {
      toast.success('مرحباً بك في Octa Network', {
        duration: 3000,
      });
    }
  }, []);
  
  return null; // هذا المكون لا يعرض أي محتوى مرئي
}

export default WebEnvironmentDetector;
