
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { initialize } = require('../electron/electron-init');

// Initialize the environment
if (!initialize()) {
  console.error('Failed to initialize Electron environment. Exiting...');
  process.exit(1);
}

// Read the electron package.json
const electronPackagePath = path.join(__dirname, '../package.electron.json');
const electronPackage = JSON.parse(fs.readFileSync(electronPackagePath, 'utf8'));

// Get the electron:dev script
const devScript = electronPackage.scripts["electron:dev"];

console.log('Starting Electron development environment...');
console.log(`Executing: ${devScript}`);

try {
  // Execute the script
  const [cmd, ...args] = devScript.split(' ');
  const proc = spawn(cmd, args, { 
    stdio: 'inherit', 
    shell: true,
    env: { ...process.env, ELECTRON: 'true' } 
  });
  
  proc.on('close', (code) => {
    process.exit(code);
  });
} catch (error) {
  console.error('Error running Electron:', error);
  process.exit(1);
}
