
#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// تحديد نوع نظام التشغيل
const isWindows = process.platform === 'win32';

// تشغيل Vite
console.log('تشغيل Vite...');

// تحديد الأمر المناسب حسب نظام التشغيل
const command = isWindows ? 'npx.cmd' : 'npx';
const args = ['vite', '--host', '--port', '8080'];

const proc = spawn(command, args, {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    PATH: `${path.join(process.cwd(), 'node_modules', '.bin')}${isWindows ? ';' : ':'}${process.env.PATH}`
  }
});

proc.on('error', (error) => {
  console.error(`فشل تشغيل Vite: ${error.message}`);
  
  // محاولة تشغيل vite.js مباشرة باستخدام node
  const viteJsPath = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
  
  if (fs.existsSync(viteJsPath)) {
    console.log('محاولة تشغيل vite.js مباشرة...');
    
    const nodeProc = spawn('node', [viteJsPath, '--host', '--port', '8080'], {
      stdio: 'inherit',
      shell: true
    });
    
    nodeProc.on('close', (code) => {
      process.exit(code || 0);
    });
  } else {
    process.exit(1);
  }
});

proc.on('close', (code) => {
  process.exit(code || 0);
});
