
// Archivo de inicio para Octa Network Haven
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Octa Network Haven application...');

// Check if node_modules exists
if (!fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
  console.log('📦 Installing dependencies...');
  try {
    // Use npm instead of bun to avoid git dependency issues
    execSync('npm install vite@latest @vitejs/plugin-react-swc --save-dev', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
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
