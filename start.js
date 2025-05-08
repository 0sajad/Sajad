
// Archivo de inicio para Octa Network Haven
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Octa Network Haven application...');

// Check if node_modules exists
if (!fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npx.cmd --no-install vite --version', { stdio: 'inherit' });
  } catch (error) {
    console.log('Installing vite and dependencies...');
    try {
      execSync('npx vite@latest --version', { stdio: 'inherit' });
    } catch (innerError) {
      console.error('❌ Failed to check vite version:', innerError.message);
    }
  }
}

// Run vite directly using npx to ensure it's found
console.log('🚀 Starting development server...');
const isWindows = process.platform === 'win32';
const npxCommand = isWindows ? 'npx.cmd' : 'npx';

const devProcess = spawn(npxCommand, ['vite', '--host', '--port', '8080'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'development'
  }
});

devProcess.on('close', (code) => {
  process.exit(code || 0);
});

devProcess.on('error', (err) => {
  console.error('❌ Failed to start development server:', err.message);
  process.exit(1);
});
