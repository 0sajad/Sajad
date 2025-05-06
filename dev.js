
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

// التأكد من وجود المجلدات الضرورية
const scriptsDir = path.join(process.cwd(), 'scripts');
if (!fs.existsSync(scriptsDir)) {
  fs.mkdirSync(scriptsDir, { recursive: true });
}

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

// التحقق من وجود ملف setup-dependencies.js
const setupDependenciesPath = path.join(scriptsDir, 'setup-dependencies.js');
if (!fs.existsSync(setupDependenciesPath)) {
  console.log('إنشاء ملف setup-dependencies.js...');
  try {
    // توليد محتوى ملف setup-dependencies.js
    const setupDepsContent = `// ... keep existing code`;
    fs.writeFileSync(setupDependenciesPath, setupDepsContent);
    console.log('✅ تم إنشاء ملف setup-dependencies.js');
  } catch (error) {
    console.error('❌ فشل إنشاء ملف setup-dependencies.js:', error.message);
  }
}

// التحقق من وجود ملف setup-vite.js
const setupVitePath = path.join(scriptsDir, 'setup-vite.js');
if (!fs.existsSync(setupVitePath)) {
  console.log('إنشاء ملف setup-vite.js...');
  try {
    // محتوى لملف setup-vite.js
    // سيتم إنشاء هذا الملف بشكل منفصل
    const setupViteContent = `// ملف يجب إنشاؤه من قبل`;
    fs.writeFileSync(setupVitePath, setupViteContent);
    console.log('✅ تم إنشاء ملف setup-vite.js');
  } catch (error) {
    console.error('❌ فشل إنشاء ملف setup-vite.js:', error.message);
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
    
    execSync('npm install vite@latest --save-dev', { stdio: 'inherit' });
    
    console.log('تم تثبيت Vite بنجاح.');
  }
  
  // محاولة تشغيل setup-vite.js لتنفيذ الإعداد الكامل لـ Vite
  try {
    console.log('تنفيذ إعداد Vite...');
    require('./scripts/setup-vite');
  } catch (error) {
    console.warn('لم نتمكن من تشغيل setup-vite.js، سنستمر بالطريقة الافتراضية:', error.message);
  }
  
  // تعزيز البحث عن Vite المناسب للنظام
  const possibleVitePaths = [
    path.join(process.cwd(), 'node_modules', '.bin', 'vite' + (isWindows ? '.cmd' : '')),
    path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js'),
    path.join(process.cwd(), 'scripts', 'run-vite.js'),
    'npx vite'
  ];

  let viteCommand = possibleVitePaths[3]; // الخيار الأخير كافتراضي
  for (const vPath of possibleVitePaths) {
    if (fs.existsSync(vPath)) {
      viteCommand = vPath;
      console.log(`استخدام Vite من: ${vPath}`);
      break;
    }
  }
  
  // إضافة متغير بيئة للإشارة إلى أن التطبيق يعمل في وضع التطوير
  process.env.NODE_ENV = 'development';
  
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
  } else if (viteCommand.endsWith('vite.js') || viteCommand.endsWith('run-vite.js')) {
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
