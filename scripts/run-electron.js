
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// تشغيل سكربت التحقق من المكتبات المطلوبة أولاً
try {
  require('./setup-dependencies');
  const viteSetupSuccess = require('./setup-vite');  // استدعاء صريح لإعداد Vite
  if (!viteSetupSuccess) {
    console.error('❌ فشل إعداد Vite. قد لا يعمل التطبيق بشكل صحيح.');
  }
} catch (e) {
  console.error('فشل في تحميل ملف setup-dependencies.js أو setup-vite.js:', e);
}

// التأكد من وجود مجلد electron
const electronDir = path.join(__dirname, '..', 'electron');
if (!fs.existsSync(electronDir)) {
  console.error('خطأ: مجلد electron غير موجود.');
  process.exit(1);
}

// قراءة ملف package.electron.json
const electronPackagePath = path.join(__dirname, '../package.electron.json');
if (!fs.existsSync(electronPackagePath)) {
  console.error('خطأ: ملف package.electron.json غير موجود.');
  process.exit(1);
}

// تحليل محتويات ملف package.electron.json
let electronPackage;
try {
  electronPackage = JSON.parse(fs.readFileSync(electronPackagePath, 'utf8'));
} catch (error) {
  console.error('خطأ في قراءة أو تحليل ملف package.electron.json:', error.message);
  process.exit(1);
}

// الحصول على الأمر من المعاملات
const command = process.argv[2]; // مثلاً، 'dev' أو 'build'
if (!command) {
  console.error('يرجى تحديد أمر: dev أو build');
  process.exit(1);
}

// الحصول على السكربت من package.electron.json
const scriptKey = `electron:${command}`;
const script = electronPackage.scripts[scriptKey];

if (!script) {
  console.error(`الأمر "${scriptKey}" غير موجود في package.electron.json`);
  console.error('الأوامر المتاحة:');
  Object.keys(electronPackage.scripts)
    .filter(key => key.startsWith('electron:'))
    .forEach(key => console.log(`- ${key.replace('electron:', '')}`));
  process.exit(1);
}

console.log(`تشغيل أمر Electron: ${script}`);

// تنفيذ السكربت
const [cmd, ...args] = script.split(' ');

// البحث عن مسار Vite الصحيح
function findViteExecutable() {
  const isWindows = process.platform === 'win32';
  const possiblePaths = [
    // المسار المباشر للملف التنفيذي
    path.join(__dirname, '..', 'node_modules', '.bin', 'vite' + (isWindows ? '.cmd' : '')),
    path.join(__dirname, '..', 'node_modules', 'vite', 'bin', 'vite.js'),
    // ملف التشغيل الوسيط الذي أنشأناه
    path.join(__dirname, 'run-vite.js'),
    // استخدام node لتشغيل vite.js
    'node ' + path.join(__dirname, '..', 'node_modules', 'vite', 'bin', 'vite.js'),
    // استخدام npx
    'npx vite',
    // الاعتماد على PATH
    'vite'
  ];
  
  for (const potentialPath of possiblePaths) {
    if (potentialPath.startsWith('npx ') || potentialPath.startsWith('node ') || potentialPath === 'vite') {
      console.log(`استخدام الأمر: ${potentialPath}`);
      return potentialPath;
    } else if (fs.existsSync(potentialPath)) {
      console.log(`استخدام المسار: ${potentialPath}`);
      return potentialPath;
    }
  }
  
  console.warn('⚠️ لم نجد ملف تنفيذي لـ Vite، سنحاول استخدام npx');
  return 'npx vite';
}

// تحديد المسار النهائي للأمر
let finalCmd = cmd;
if (cmd === 'vite') {
  finalCmd = findViteExecutable();
} else if (cmd === 'npm') {
  finalCmd = 'npm';
} else {
  // بالنسبة للأوامر الأخرى، نتحقق مما إذا كانت موجودة في node_modules/.bin
  const cmdPath = path.join(__dirname, '..', 'node_modules', '.bin', cmd);
  const isWindows = process.platform === 'win32';
  const finalCmdPath = isWindows ? `${cmdPath}.cmd` : cmdPath;
  
  finalCmd = fs.existsSync(finalCmdPath) ? finalCmdPath : cmd;
}

console.log(`تنفيذ الأمر: ${finalCmd} ${args.join(' ')}`);

try {
  // تعديل طريقة تنفيذ الأمر لتحسين التوافق
  let proc;
  
  // تحسين متغيرات البيئة
  const enhancedEnv = { 
    ...process.env, 
    ELECTRON: 'true',
    // إضافة مسار node_modules/.bin و مسار vite إلى PATH
    PATH: `${path.join(__dirname, '..', 'node_modules', '.bin')}${path.delimiter}${path.join(__dirname, '..', 'node_modules', 'vite', 'bin')}${path.delimiter}${process.env.PATH}`
  };
  
  if (finalCmd.includes(' ')) {
    // إذا كان الأمر يحتوي على مسافة، فهذا يعني أنه مركب مثل "npx vite"
    const [executable, ...subArgs] = finalCmd.split(' ');
    proc = spawn(executable, [...subArgs, ...args], { 
      stdio: 'inherit', 
      shell: true,
      env: enhancedEnv
    });
  } else {
    proc = spawn(finalCmd, args, { 
      stdio: 'inherit', 
      shell: true,
      env: enhancedEnv
    });
  }

  proc.on('close', (code) => {
    if (code !== 0) {
      console.error(`فشل تنفيذ الأمر بكود خطأ: ${code}`);
    }
    process.exit(code || 0);
  });

  proc.on('error', (error) => {
    console.error(`خطأ في تنفيذ الأمر: ${error.message}`);
    process.exit(1);
  });
} catch (error) {
  console.error(`حدث خطأ أثناء محاولة تشغيل الأمر: ${error.message}`);
  process.exit(1);
}
