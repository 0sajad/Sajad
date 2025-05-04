
#!/usr/bin/env node
const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

console.log('جاري تشغيل التطبيق في وضع التطوير...');

// تحديد نوع نظام التشغيل
const isWindows = os.platform() === 'win32';
const isMac = os.platform() === 'darwin';
const isLinux = os.platform() === 'linux';

console.log(`نظام التشغيل: ${isWindows ? 'Windows' : isMac ? 'macOS' : 'Linux'}`);

// ضبط صلاحيات التنفيذ للملفات على لينكس وماك
if (!isWindows) {
  try {
    if (fs.existsSync('./run-electron-dev.sh')) {
      execSync('chmod +x ./run-electron-dev.sh', { stdio: 'ignore' });
    }
    if (fs.existsSync('./run-electron-build.sh')) {
      execSync('chmod +x ./run-electron-build.sh', { stdio: 'ignore' });
    }
  } catch (error) {
    console.log('تحذير: لم يتم ضبط صلاحيات التنفيذ للملفات. قد تحتاج إلى تنفيذ الأمر يدويًا.');
  }
}

// التأكد من تثبيت vite
try {
  console.log('التحقق من وجود Vite...');
  
  // تثبيت vite إذا لم يكن موجودًا
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  const vitePath = path.join(nodeModulesPath, 'vite');
  
  if (!fs.existsSync(vitePath)) {
    console.log('Vite غير موجود. جاري التثبيت...');
    
    if (isWindows) {
      execSync('npm install vite@latest --save-dev', { stdio: 'inherit' });
    } else {
      execSync('npm install vite@latest --save-dev', { stdio: 'inherit' });
    }
    
    console.log('تم تثبيت Vite بنجاح.');
  }
  
  // تحديد أمر تشغيل Vite المناسب لنظام التشغيل
  const viteLocalPath = path.join(process.cwd(), 'node_modules', '.bin', 'vite' + (isWindows ? '.cmd' : ''));
  const viteLocalPathJS = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
  
  let viteCommand, viteArgs;
  
  if (fs.existsSync(viteLocalPath)) {
    console.log(`استخدام Vite المحلي من: ${viteLocalPath}`);
    viteCommand = viteLocalPath;
    viteArgs = ['--host', '--port', '8080'];
  } else if (fs.existsSync(viteLocalPathJS)) {
    console.log(`استخدام Node لتشغيل Vite من: ${viteLocalPathJS}`);
    viteCommand = process.execPath; // node executable
    viteArgs = [viteLocalPathJS, '--host', '--port', '8080'];
  } else {
    console.log('استخدام Vite عبر npx');
    viteCommand = isWindows ? 'npx.cmd' : 'npx';
    viteArgs = ['vite', '--host', '--port', '8080'];
  }
  
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
    
    // محاولة تنفيذ أخرى في حالة الفشل
    console.log('محاولة بديلة لتشغيل Vite...');
    
    const fallbackCommand = isWindows ? 'npx.cmd' : 'npx';
    const altProcess = spawn(fallbackCommand, ['vite', '--host', '--port', '8080'], {
      stdio: 'inherit',
      shell: true
    });
    
    altProcess.on('error', (err) => {
      console.error(`فشلت المحاولة البديلة: ${err.message}`);
      process.exit(1);
    });
  });
  
  viteProcess.on('close', (code) => {
    process.exit(code || 0);
  });
  
} catch (error) {
  console.error(`حدثت مشكلة: ${error.message}`);
  process.exit(1);
}
