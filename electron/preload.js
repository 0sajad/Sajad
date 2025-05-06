
// This is a preload script for Electron
// It provides safe access to Electron APIs from the renderer process

const { contextBridge, ipcRenderer } = require('electron');

// تعريف واجهة برمجة التطبيقات الآمنة للوصول من المتصفح
contextBridge.exposeInMainWorld('electronAPI', {
  // فحص الاتصال بالشبكة
  checkNetworkConnection: () => ipcRenderer.invoke('check-network-connection'),
  
  // فتح روابط خارجية بأمان
  openExternalLink: (url) => ipcRenderer.send('open-external-link', url),
  
  // الوصول إلى مسار التطبيق
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  
  // الحصول على معلومات النظام
  getSystemInfo: () => ipcRenderer.invoke('get-system-info')
});

// إضافة مستمع لأحداث التطبيق
window.addEventListener('DOMContentLoaded', () => {
  // تهيئة التطبيق عند جاهزية الصفحة
  console.log('تم تحميل واجهة المستخدم');
});

