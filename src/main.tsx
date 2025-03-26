
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n'; // استيراد ملف i18n

// تسجيل بداية تحميل التطبيق
console.log("Application starting...");

// التأكد من وجود عنصر الجذر
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Fatal: Root element not found in document");
} else {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
