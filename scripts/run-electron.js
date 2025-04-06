
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// تشغيل سكربت التحقق من المكتبات المطلوبة أولاً
try {
  require('./setup-dependencies');
} catch (e) {
  console.error('فشل في تحميل ملف setup-dependencies.js:', e);
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

// تأكد من أن cmd موجود في node_modules/.bin
const cmdPath = path.join(__dirname, '..', 'node_modules', '.bin', cmd);
const isWindows = process.platform === 'win32';
const finalCmdPath = isWindows ? `${cmdPath}.cmd` : cmdPath;

// إذا كان الأمر غير موجود في node_modules/.bin، استخدم الأمر مباشرة
const finalCmd = fs.existsSync(finalCmdPath) ? finalCmdPath : cmd;

console.log(`تنفيذ الأمر: ${finalCmd} ${args.join(' ')}`);

try {
  const proc = spawn(finalCmd, args, { 
    stdio: 'inherit', 
    shell: true,
    env: { ...process.env, ELECTRON: 'true' } 
  });

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
