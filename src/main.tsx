
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// التأكد من تحميل i18n قبل التطبيق
import './i18n';

// إضافة معالج لأخطاء غير المعالجة
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
});

// تسجيل بداية تحميل التطبيق
console.log("Application starting...");

// التأكد من وجود عنصر الجذر
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Fatal: Root element not found in document");
} else {
  // إنشاء التطبيق وتسجيل نجاح العملية
  try {
    createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Root successfully rendered");
  } catch (error) {
    console.error("Failed to render application:", error);
  }
}
