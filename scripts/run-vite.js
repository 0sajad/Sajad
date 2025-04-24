
#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');

// تشغيل Vite باستخدام npx
const viteProcess = spawn('npx', ['vite', '--host', '--port', '8080'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    PATH: `${path.join(process.cwd(), 'node_modules', '.bin')}${process.platform === 'win32' ? ';' : ':'}${process.env.PATH}`
  }
});

viteProcess.on('error', (error) => {
  console.error(`فشل تشغيل Vite: ${error.message}`);
  process.exit(1);
});

viteProcess.on('close', (code) => {
  process.exit(code || 0);
});
