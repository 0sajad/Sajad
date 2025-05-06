
#!/usr/bin/env node
const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Octa Network Haven application...');

// Check if node_modules exists
if (!fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
}

// Check if vite is installed
const checkVite = () => {
  try {
    const vitePath = path.join(process.cwd(), 'node_modules', 'vite');
    return fs.existsSync(vitePath);
  } catch (e) {
    return false;
  }
};

// Install vite if not present
if (!checkVite()) {
  console.log('📦 Installing Vite...');
  try {
    execSync('npm install vite@latest @vitejs/plugin-react-swc lovable-tagger --save-dev --force', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Failed to install Vite:', error.message);
    process.exit(1);
  }
}

// Run vite using npx to ensure it's found
console.log('🚀 Starting development server...');
const devProcess = spawn('npx', ['vite', '--host', '--port', '8080'], {
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
