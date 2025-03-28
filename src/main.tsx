
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/rtl-support.css'
import './styles/accessibility-optimized.css'
import { i18n } from './i18n'
import { Toaster } from '@/components/ui/sonner'

// تهيئة خدمات إمكانية الوصول وتحسين الأداء
import { useA11y } from './hooks/useA11y'
import { useRTLSupport } from './hooks/useRTLSupport'
import { usePerformanceOptimization } from './hooks/usePerformanceOptimization'
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'

// تهيئة البيانات العالمية
if (typeof window !== 'undefined') {
  // إعداد خدمات إمكانية الوصول
  window.A11y = window.A11y || {};
  window.RTLSupport = window.RTLSupport || { isRTL: false };
  
  // إضافة مرشحات SVG لدعم عمى الألوان
  const svgFilters = document.createElement('div');
  svgFilters.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; height: 0; width: 0;">
      <defs>
        <filter id="protanopia-filter">
          <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0"/>
        </filter>
        <filter id="deuteranopia-filter">
          <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0"/>
        </filter>
        <filter id="tritanopia-filter">
          <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0"/>
        </filter>
      </defs>
    </svg>
  `;
  document.body.appendChild(svgFilters);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" />
  </React.StrictMode>,
)
