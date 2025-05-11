
const { spawn } = require('child_process');
const { createServer } = require('vite');
const path = require('path');
const fs = require('fs');

async function startElectronDev() {
  try {
    // Check if electron is installed
    if (!fs.existsSync(path.resolve(__dirname, '../node_modules/electron'))) {
      console.log('Electron not found, installing...');
      require('child_process').execSync('npm install electron --no-save', { stdio: 'inherit' });
    }

    // Start Vite dev server
    console.log('Starting Vite development server...');
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
    console.log('Starting Electron...');
    const electronProcess = spawn(
      process.platform === 'win32' ? 'npx.cmd' : 'npx', 
      ['electron', path.resolve(__dirname, '../electron/main.js')], 
      {
        env: {
          ...process.env,
          ELECTRON_START_URL: address,
          ELECTRON: 'true',
          NODE_ENV: 'development'
        },
        stdio: 'inherit'
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
