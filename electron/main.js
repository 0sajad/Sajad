
const { app, BrowserWindow, ipcMain, net, shell } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');

// تخزين الإشارة إلى النافذة النشطة
let mainWindow;

function createWindow() {
  console.log('Creating Electron window...');
  
  // إنشاء نافذة المتصفح
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../public/favicon.ico'),
    title: 'Octa Network Haven'
  });

  // تحديد عنوان URL للنافذة
  let startUrl;
  
  // تحقق من وجود عنوان URL من بيئة التطوير
  if (process.env.ELECTRON_START_URL) {
    startUrl = process.env.ELECTRON_START_URL;
    console.log('Development mode: Using Vite dev server:', startUrl);
  } else {
    // التحقق من وجود مجلد dist
    const distPath = path.join(__dirname, '../dist');
    const indexPath = path.join(distPath, 'index.html');
    const distExists = fs.existsSync(distPath) && fs.existsSync(indexPath);
    
    console.log(`Checking for dist folder: ${distPath} - Exists: ${distExists}`);

    if (distExists) {
      // استخدام ملفات البناء
      startUrl = url.format({
        pathname: indexPath,
        protocol: 'file:',
        slashes: true
      });
      console.log('Production mode: Using built files:', startUrl);
    } else {
      // محاولة استخدام خادم محلي
      startUrl = 'http://localhost:8080';
      console.log('No dist folder found, trying local server:', startUrl);
    }
  }
  
  // تحميل عنوان URL
  console.log('Loading URL:', startUrl);
  mainWindow.loadURL(startUrl).catch((err) => {
    console.error('Failed to load URL:', err);
    
    // في حالة الفشل، محاولة فتح الخادم المحلي
    if (startUrl.startsWith('file:')) {
      console.log('Trying local server as fallback...');
      mainWindow.loadURL('http://localhost:8080').catch(e => {
        console.error('Failed to load local server:', e);
      });
    }
  });

  // فتح أدوات المطور في وضع التطوير
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
    console.log('Developer tools opened');
  }

  mainWindow.on('closed', function () {
    console.log('Window closed');
    mainWindow = null;
  });
  
  // منع فتح الروابط في النافذة نفسها
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// تهيئة التطبيق عند الاستعداد
app.whenReady().then(() => {
  console.log('Electron app is ready');
  createWindow();
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// الخروج عند إغلاق جميع النوافذ
app.on('window-all-closed', function () {
  console.log('All windows closed');
  if (process.platform !== 'darwin') app.quit();
});

// التحقق من اتصال الشبكة
ipcMain.handle('check-network-connection', async () => {
  return net.isOnline();
});

// فتح رابط خارجي
ipcMain.on('open-external-link', (event, url) => {
  shell.openExternal(url);
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

// تسجيل بدء التشغيل
console.log('Electron main process started');
