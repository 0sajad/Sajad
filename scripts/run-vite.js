
#!/usr/bin/env node
const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// تحديد نوع نظام التشغيل
const isWindows = process.platform === 'win32';

// التحقق من وجود Vite وتثبيته إذا لزم الأمر
function ensureViteInstalled() {
  const vitePath = path.join(process.cwd(), 'node_modules', 'vite');
  const viteBinPath = path.join(process.cwd(), 'node_modules', '.bin', isWindows ? 'vite.cmd' : 'vite');
  
  if (!fs.existsSync(vitePath) || !fs.existsSync(viteBinPath)) {
    console.log('Vite غير موجود، جاري التثبيت...');
    try {
      execSync('npm install vite@latest @vitejs/plugin-react-swc --save-dev --force', {
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
    PATH: `${path.join(process.cwd(), 'node_modules', '.bin')}${path.delimiter}${process.env.PATH}`
  };
  
  // اختيار الأمر المناسب
  const viteBin = path.join(process.cwd(), 'node_modules', '.bin', isWindows ? 'vite.cmd' : 'vite');
  const viteJs = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
  
  let command, args;
  
  if (fs.existsSync(viteBin)) {
    command = viteBin;
    args = ['--host', '--port', '8080'];
  } else if (fs.existsSync(viteJs)) {
    command = 'node';
    args = [viteJs, '--host', '--port', '8080'];
  } else {
    command = isWindows ? 'npx.cmd' : 'npx';
    args = ['vite', '--host', '--port', '8080'];
  }
  
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
