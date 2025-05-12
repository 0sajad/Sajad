
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

// تحديد نظام التشغيل
const isWindows = os.platform() === 'win32';
const isMac = os.platform() === 'darwin';
const isLinux = os.platform() === 'linux';

// التحقق من تثبيت الحزم المطلوبة
function checkDependencies() {
  try {
    // التحقق من تثبيت إلكترون
    try {
      const electronPath = require.resolve('electron');
      console.log(`✅ إلكترون مثبت (${electronPath})`);
    } catch (err) {
      console.log('⚠️ إلكترون غير مثبت، جاري التثبيت...');
      const npmCommand = 'npm install --no-save electron@latest --no-fund --no-audit';
      execSync(npmCommand, { stdio: 'inherit' });
    }
    
    // التحقق من تثبيت electron-builder
    try {
      const builderPath = require.resolve('electron-builder');
      console.log(`✅ إلكترون-بلدر مثبت (${builderPath})`);
    } catch (err) {
      console.log('⚠️ إلكترون-بلدر غير مثبت، جاري التثبيت...');
      const npmCommand = 'npm install --no-save electron-builder@latest --no-fund --no-audit';
      execSync(npmCommand, { stdio: 'inherit' });
    }
    
    return true;
  } catch (err) {
    console.error('❌ فشل تثبيت التبعيات:', err.message);
    return false;
  }
}

// التحقق من بنية المشروع
function verifyProjectStructure() {
  const requiredFiles = [
    'electron/main.js',
    'electron/preload.js'
  ];
  
  // إنشاء مجلد electron إذا لم يكن موجوداً
  const electronDir = path.resolve(__dirname);
  if (!fs.existsSync(electronDir)) {
    try {
      fs.mkdirSync(electronDir, { recursive: true });
      console.log('✅ تم إنشاء مجلد electron');
    } catch (e) {
      console.error('❌ فشل إنشاء مجلد electron:', e.message);
    }
  }
  
  // التحقق من وجود الملفات المطلوبة
  let isValid = true;
  
  for (const file of requiredFiles) {
    const filePath = path.resolve(__dirname, '..', file);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ ملف مفقود: ${file}`);
      isValid = false;
    }
  }
  
  if (isValid) {
    console.log('✅ تم التحقق من بنية المشروع بنجاح');
  }
  
  return isValid;
}

// إنشاء ملفات التشغيل المناسبة لنظام التشغيل
function createSystemSpecificFiles() {
  try {
    // إنشاء ملف تشغيل مناسب للنظام إذا لم يكن موجودًا
    if (!isWindows) {
      // لأنظمة Unix (Mac/Linux)
      const unixStartPath = path.resolve(__dirname, '..', 'run-electron.sh');
      if (!fs.existsSync(unixStartPath)) {
        const unixScript = `#!/bin/bash
echo "جاري تشغيل Octa Network Haven..."
cd "$(dirname "$0")"
npm run electron:start
`;
        fs.writeFileSync(unixStartPath, unixScript);
        execSync(`chmod +x ${unixStartPath}`, { stdio: 'ignore' });
        console.log(`✅ تم إنشاء ملف تشغيل للنظام: ${unixStartPath}`);
      }
    } else {
      // لنظام Windows
      const winStartPath = path.resolve(__dirname, '..', 'run-electron.bat');
      if (!fs.existsSync(winStartPath)) {
        const winScript = `@echo off
echo جاري تشغيل Octa Network Haven...
cd /d "%~dp0"
npm run electron:start
pause
`;
        fs.writeFileSync(winStartPath, winScript);
        console.log(`✅ تم إنشاء ملف تشغيل للنظام: ${winStartPath}`);
      }
    }
    
    // إنشاء ملف تهيئة إلكترون إذا لم يكن موجوداً
    const electronPackageJsonPath = path.join(__dirname, 'package.json');
    if (!fs.existsSync(electronPackageJsonPath)) {
      const packageJson = {
        name: "octa-network-haven",
        version: "1.0.0",
        description: "Octa Network Haven Desktop App",
        main: "main.js",
        author: "Octa Network",
        license: "MIT",
        scripts: {
          start: "electron ."
        }
      };
      
      fs.writeFileSync(electronPackageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(`✅ تم إنشاء ملف package.json لإلكترون`);
    }
    
    return true;
  } catch (err) {
    console.error('❌ فشل إنشاء ملفات خاصة بالنظام:', err.message);
    return false;
  }
}

// الدالة الرئيسية
function initialize() {
  console.log(`🔍 التحقق من بيئة Octa Network Haven على نظام ${isWindows ? 'Windows' : isMac ? 'macOS' : 'Linux'}...`);
  
  const dependenciesOk = checkDependencies();
  const structureOk = verifyProjectStructure();
  const systemFilesOk = createSystemSpecificFiles();
  
  if (dependenciesOk && structureOk && systemFilesOk) {
    console.log('✅ تم التحقق من البيئة بنجاح');
    return true;
  } else {
    console.error('❌ فشل التحقق من البيئة');
    return false;
  }
}

// تشغيل التهيئة إذا تم استدعاء هذا السكربت مباشرة
if (require.main === module) {
  const result = initialize();
  process.exit(result ? 0 : 1);
} else {
  // تصدير للاستخدام في سكربتات أخرى
  module.exports = { initialize };
}
