
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// تشغيل سكربت التحقق من المكتبات المطلوبة أولاً
try {
  require('./setup-dependencies');
} catch (e) {
  console.error('فشل في تحميل ملف setup-dependencies.js:', e);
}

// الحصول على الأمر من المعاملات
const command = process.argv[2]; // مثلاً، 'dev' أو 'build'
if (!command) {
  console.error('يرجى تحديد أمر: dev أو build');
  process.exit(1);
}

console.log(`تنفيذ أمر Electron: ${command}`);

// تحديد الأمر المناسب حسب نوع الأمر
let cmd, args;
const isWindows = process.platform === 'win32';

if (command === 'dev') {
  cmd = 'node';
  args = ['dev.js'];
} else if (command === 'build') {
  const buildScript = isWindows ? 'run-electron-build.bat' : './run-electron-build.sh';
  cmd = isWindows ? buildScript : '/bin/bash';
  args = isWindows ? [] : [buildScript];
} else {
  console.error('الأمر غير معروف:', command);
  process.exit(1);
}

// تحسين متغيرات البيئة
const enhancedEnv = { 
  ...process.env, 
  ELECTRON: 'true',
  PATH: `${path.join(__dirname, '..', 'node_modules', '.bin')}${path.delimiter}${process.env.PATH}`
};

// تنفيذ الأمر
console.log(`تنفيذ الأمر: ${cmd} ${args.join(' ')}`);
const proc = spawn(cmd, args, { 
  stdio: 'inherit', 
  shell: true,
  env: enhancedEnv
});

proc.on('close', (code) => {
  process.exit(code || 0);
});

proc.on('error', (error) => {
  console.error(`خطأ في تنفيذ الأمر: ${error.message}`);
  process.exit(1);
});
