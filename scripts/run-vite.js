
#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// التحقق من وجود vite محليًا
const viteLocalPath = path.join(process.cwd(), 'node_modules', '.bin', 'vite');
const viteLocalPathJS = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
const isWindows = process.platform === 'win32';

// تحديد الأمر المناسب لتشغيل vite
let viteCommand = 'npx';
let viteArgs = ['vite', '--host', '--port', '8080'];

if (fs.existsSync(viteLocalPath) || fs.existsSync(viteLocalPath + (isWindows ? '.cmd' : ''))) {
  // استخدام vite المحلي من node_modules/.bin
  viteCommand = isWindows ? viteLocalPath + '.cmd' : viteLocalPath;
  viteArgs = ['--host', '--port', '8080'];
  console.log('استخدام Vite المحلي من node_modules/.bin');
} else if (fs.existsSync(viteLocalPathJS)) {
  // استخدام node لتشغيل vite.js
  viteCommand = 'node';
  viteArgs = [viteLocalPathJS, '--host', '--port', '8080'];
  console.log('استخدام Node لتشغيل Vite من node_modules/vite/bin/vite.js');
} else {
  console.log('استخدام Vite عبر npx');
}

// تشغيل Vite
console.log(`تنفيذ: ${viteCommand} ${viteArgs.join(' ')}`);

const viteProcess = spawn(viteCommand, viteArgs, {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    PATH: `${path.join(process.cwd(), 'node_modules', '.bin')}${isWindows ? ';' : ':'}${process.env.PATH}`
  }
});

viteProcess.on('error', (error) => {
  console.error(`فشل تشغيل Vite: ${error.message}`);
  process.exit(1);
});

viteProcess.on('close', (code) => {
  process.exit(code || 0);
});
