
#!/usr/bin/env node
// هذا الملف يشغل Vite في وضع التطوير
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('جاري تشغيل Vite في وضع التطوير...');

// التحقق من وجود Vite وتثبيته إذا لزم الأمر
const setupVite = require('./scripts/setup-vite');
if (!setupVite) {
  console.error('❌ فشل إعداد Vite. سنحاول التشغيل على أي حال.');
}

// تحديد أمر التشغيل حسب النظام
const isWin = process.platform === 'win32';
const npxCommand = isWin ? 'npx.cmd' : 'npx';

// التحقق من وجود Vite في node_modules قبل التشغيل
const viteLocalPath = path.join(process.cwd(), 'node_modules', 'vite');
if (!fs.existsSync(viteLocalPath)) {
  console.log('⚠️ لم يتم العثور على Vite في node_modules، جاري التثبيت...');
  try {
    const { execSync } = require('child_process');
    execSync('npm install vite@latest --save-dev', { stdio: 'inherit' });
    console.log('✅ تم تثبيت Vite بنجاح');
  } catch (e) {
    console.error('❌ فشل تثبيت Vite:', e);
  }
}

// تشغيل Vite باستخدام npx
const viteProcess = spawn(npxCommand, ['vite', '--host', '--port', '8080'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    PATH: `${path.join(process.cwd(), 'node_modules', '.bin')}${isWin ? ';' : ':'}${process.env.PATH}`
  }
});

viteProcess.on('error', (error) => {
  console.error(`فشل تشغيل Vite: ${error.message}`);
  
  // محاولة تنفيذية أخرى في حالة الفشل
  console.log('محاولة بديلة لتشغيل Vite...');
  const altViteProcess = spawn(
    'node',
    [path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js'), '--host', '--port', '8080'],
    { stdio: 'inherit', shell: true }
  );
  
  altViteProcess.on('error', (err) => {
    console.error(`فشلت المحاولة البديلة أيضًا: ${err.message}`);
    process.exit(1);
  });
});

viteProcess.on('close', (code) => {
  process.exit(code || 0);
});
