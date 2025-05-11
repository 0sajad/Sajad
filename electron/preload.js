
// This is a preload script for Electron
// It provides safe access to Electron APIs from the renderer process

const { contextBridge, ipcRenderer } = require('electron');

// تعريف واجهة برمجة التطبيقات الآمنة للوصول من المتصفح
contextBridge.exposeInMainWorld('electron', {
  // الإشارة إلى أن التطبيق يعمل في بيئة إلكترون
  isElectron: true,
  
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
  console.log('Electron preload script loaded');
});
