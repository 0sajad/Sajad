
const { app, BrowserWindow, ipcMain, net } = require('electron');
const path = require('path');
const url = require('url');

// تخزين الإشارة إلى النافذة النشطة
let mainWindow;

function createWindow() {
  // إنشاء نافذة المتصفح
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../public/favicon.ico')
  });

  // تحديد عنوان URL للنافذة
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true
  });
  
  mainWindow.loadURL(startUrl);

  // فتح أدوات المطور في وضع التطوير
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
  
  // تكوين حدود الذاكرة لـ WebGPU
  app.commandLine.appendSwitch('enable-features', 'WebGPUDeviceInitialization,WebGPU');
  app.commandLine.appendSwitch('enable-unsafe-webgpu');
  app.commandLine.appendSwitch('gpu-memory-buffer-pool-size', '512');
  app.commandLine.appendSwitch('max-active-webgpu-contexts', '16');
  
  // تفعيل WebGL
  app.commandLine.appendSwitch('enable-webgl');
  app.commandLine.appendSwitch('ignore-gpu-blacklist');
}

// تهيئة التطبيق عند الاستعداد
app.whenReady().then(createWindow);

// الخروج عند إغلاق جميع النوافذ
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

// التحقق من اتصال الشبكة
ipcMain.handle('check-network-connection', async () => {
  return net.isOnline();
});

// فتح رابط خارجي
ipcMain.on('open-external-link', (event, url) => {
  require('electron').shell.openExternal(url);
});

// إعداد واجهة برمجة التطبيقات المحلية
ipcMain.handle('get-app-path', () => {
  return app.getPath('userData');
});

// الحصول على معلومات النظام
ipcMain.handle('get-system-info', () => {
  return {
    platform: process.platform,
    arch: process.arch,
    version: app.getVersion(),
    electronVersion: process.versions.electron,
    chromeVersion: process.versions.chrome,
    nodeVersion: process.versions.node
  };
});
