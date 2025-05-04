
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
      execSync('chmod +x ./run-electron-dev.sh', { stdio: 'inherit' });
    }
    if (fs.existsSync('./run-electron-build.sh')) {
      execSync('chmod +x ./run-electron-build.sh', { stdio: 'inherit' });
    }
    if (fs.existsSync('./scripts/run-vite.js')) {
      execSync('chmod +x ./scripts/run-vite.js', { stdio: 'inherit' });
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
  
  // تعزيز البحث عن Vite المناسب للنظام
  const possibleVitePaths = [
    path.join(process.cwd(), 'node_modules', '.bin', 'vite' + (isWindows ? '.cmd' : '')),
    path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js'),
    'npx vite'
  ];

  let viteCommand = possibleVitePaths[2]; // الخيار الأخير كافتراضي
  for (const vPath of possibleVitePaths) {
    if (fs.existsSync(vPath)) {
      viteCommand = vPath;
      console.log(`استخدام Vite من: ${vPath}`);
      break;
    }
  }
  
  // تشغيل Vite مع المعاملات المناسبة
  console.log('تشغيل Vite...');
  let viteProcess;
  
  if (viteCommand === 'npx vite') {
    // استخدام npx إذا لم يتم العثور على الملف مباشرة
    viteProcess = spawn(isWindows ? 'npx.cmd' : 'npx', ['vite', '--host', '--port', '8080'], {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, NODE_ENV: 'development' }
    });
  } else if (viteCommand.endsWith('vite.js')) {
    // استخدام node لتشغيل ملف vite.js
    viteProcess = spawn(process.execPath, [viteCommand, '--host', '--port', '8080'], {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, NODE_ENV: 'development' }
    });
  } else {
    // تشغيل الملف التنفيذي مباشرة
    viteProcess = spawn(viteCommand, ['--host', '--port', '8080'], {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, NODE_ENV: 'development' }
    });
  }
  
  viteProcess.on('error', (error) => {
    console.error(`فشل تشغيل Vite: ${error.message}`);
    
    // محاولة تنفيذ أخرى في حالة الفشل
    console.log('محاولة بديلة لتشغيل Vite...');
    
    const fallbackCommand = isWindows ? 'npx.cmd' : 'npx';
    const altProcess = spawn(fallbackCommand, ['vite', '--host', '--port', '8080'], {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, NODE_ENV: 'development' }
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
