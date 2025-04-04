
const { spawn } = require('child_process');
const { createServer } = require('vite');
const path = require('path');

async function startElectronDev() {
  try {
    // Start Vite dev server
    const server = await createServer({
      configFile: path.resolve(__dirname, '../vite.config.ts'),
      mode: 'development',
      server: {
        port: 8080,
      },
    });
    
    await server.listen();
    const address = server.resolvedUrls.local[0];
    console.log(`Vite dev server started at ${address}`);
    
    // Start Electron process
    const electronProcess = spawn('electron', ['.'], {
      env: {
        ...process.env,
        ELECTRON_START_URL: address,
        ELECTRON: 'true',
        NODE_ENV: 'development'
      },
      stdio: 'inherit'
    });
    
    electronProcess.on('close', () => {
      server.close();
      process.exit();
    });
    
  } catch (err) {
    console.error('Error starting development environment:', err);
  }
}

startElectronDev();
