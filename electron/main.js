const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object to prevent garbage collection
let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Load the app - in development from the dev server, in production from the built files
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true
  });
  
  mainWindow.loadURL(startUrl);

  // Uncomment to open DevTools automatically (during development)
  // if (process.env.NODE_ENV === 'development') {
  //   mainWindow.webContents.openDevTools();
  // }

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});

// Handle IPC messages from renderer process
ipcMain.handle('check-network-connection', async () => {
  // This is a simple implementation that just checks if electron can reach Google
  try {
    const response = await fetch('https://www.google.com/generate_204', {
      method: 'HEAD',
      cache: 'no-store',
    });
    return response.status === 204;
  } catch (error) {
    console.error('Network connection check failed:', error);
    return false;
  }
});
