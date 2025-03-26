
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './components/ui/a11y-styles.css'; // إضافة أنماط إمكانية الوصول
import './i18n'; // استيراد ملف i18n المعاد هيكلته

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// إضافة تلميحات صوتية للقارئات الصوتية لدعم إمكانية الوصول
if (typeof window !== 'undefined') {
  // تعيين اللغة الافتراضية للصفحة
  document.documentElement.lang = document.documentElement.dir === 'rtl' ? 'ar' : 'en';
  
  // تحسين اكتشاف وضع الإضاءة المنخفضة
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    document.body.classList.add('reduced-motion');
  }
  
  // تعزيز التوافق للقارئات الصوتية
  const main = document.querySelector('main');
  if (main) {
    main.setAttribute('role', 'main');
    main.setAttribute('tabIndex', '-1');
  }
}
