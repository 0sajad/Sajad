
#!/usr/bin/env node
const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// تحديد نوع نظام التشغيل
const isWindows = process.platform === 'win32';

// التحقق من وجود Vite وتثبيته إذا لزم الأمر
function ensureViteInstalled() {
  const vitePath = path.join(process.cwd(), 'node_modules', 'vite');
  
  if (!fs.existsSync(vitePath)) {
    console.log('Vite غير موجود، جاري التثبيت...');
    try {
      execSync('npm install vite@latest @vitejs/plugin-react-swc lovable-tagger --save-dev --force', {
        stdio: 'inherit',
        shell: true
      });
      return true;
    } catch (e) {
      console.error('فشل تثبيت Vite:', e.message);
      return false;
    }
  }
  
  return true;
}

// تشغيل Vite
function runVite() {
  console.log('تشغيل Vite...');
  
  // تعيين متغيرات البيئة
  const env = { 
    ...process.env, 
    NODE_ENV: 'development',
    PATH: `${path.join(process.cwd(), 'node_modules', '.bin')}${path.delimiter}${process.env.PATH}`
  };
  
  // استخدام npx لتشغيل vite بطريقة موثوقة
  const command = isWindows ? 'npx.cmd' : 'npx';
  const args = ['vite', '--host', '--port', '8080'];
  
  console.log(`تنفيذ الأمر: ${command} ${args.join(' ')}`);
  const proc = spawn(command, args, {
    stdio: 'inherit',
    shell: true,
    env: env
  });
  
  proc.on('error', (error) => {
    console.error(`فشل تشغيل Vite: ${error.message}`);
    process.exit(1);
  });
  
  proc.on('close', (code) => {
    process.exit(code || 0);
  });
}

// التنفيذ الرئيسي
if (ensureViteInstalled()) {
  runVite();
} else {
  console.error('فشل تثبيت Vite، يرجى التثبيت يدوياً.');
  process.exit(1);
}
