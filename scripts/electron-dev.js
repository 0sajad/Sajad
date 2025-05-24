
const { spawn } = require('child_process');
const { createServer } = require('vite');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

async function startElectronDev() {
  try {
    // التحقق من وجود Electron
    if (!fs.existsSync(path.resolve(__dirname, '../node_modules/electron'))) {
      console.log('Electron not found, installing...');
      try {
        execSync('npm install electron@latest --no-save', { stdio: 'inherit' });
      } catch (err) {
        console.error('Failed to install Electron:', err.message);
        return process.exit(1);
      }
    }

    // تشغيل خادم Vite للتطوير
    console.log('Starting Vite development server...');
    const server = await createServer({
      configFile: path.resolve(__dirname, '../vite.config.ts'),
      mode: 'development',
      server: {
        port: 8080,
        host: '0.0.0.0',
      },
    });
    
    await server.listen();
    const address = server.resolvedUrls.local[0];
    console.log(`Vite dev server started at ${address}`);
    
    // تأخير قصير للتأكد من بدء الخادم
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // تشغيل تطبيق Electron
    console.log('Starting Electron...');
    const electronPath = path.join(__dirname, '../node_modules/.bin', process.platform === 'win32' ? 'electron.cmd' : 'electron');
    
    const electronProcess = spawn(
      electronPath,
      [path.resolve(__dirname, '../electron/main.js')], 
      {
        env: {
          ...process.env,
          ELECTRON_START_URL: address,
          ELECTRON: 'true',
          NODE_ENV: 'development'
        },
        stdio: 'inherit',
        shell: true
      }
    );
    
    electronProcess.on('close', (code) => {
      console.log(`Electron process exited with code ${code}`);
      server.close();
      process.exit(code || 0);
    });
    
    electronProcess.on('error', (err) => {
      console.error('Failed to start Electron:', err);
      server.close();
      process.exit(1);
    });
    
  } catch (err) {
    console.error('Error starting development environment:', err);
    process.exit(1);
  }
}

startElectronDev();
