
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('التحقق من المكتبات المطلوبة وتثبيتها إذا لزم الأمر...');

// قائمة بالمكتبات الضرورية
const requiredPackages = [
  'electron',
  'electron-builder',
  'vite',
  'react',
  'react-dom',
  'date-fns',
  'lucide-react',
  'wait-on',
  'cross-env',
  'concurrently'
];

// تحقق مما إذا كانت المكتبات مثبتة بالفعل
let missingPackages = [];
for (const pkg of requiredPackages) {
  try {
    // استخدام طريقة بديلة للتحقق من وجود الحزمة
    const packagePath = path.join(process.cwd(), 'node_modules', pkg);
    if (fs.existsSync(packagePath)) {
      console.log(`✅ ${pkg} موجود`);
    } else {
      throw new Error(`Package ${pkg} not found`);
    }
  } catch (e) {
    console.log(`❌ ${pkg} غير موجود`);
    missingPackages.push(pkg);
  }
}

// تثبيت المكتبات الناقصة
if (missingPackages.length > 0) {
  console.log(`تثبيت المكتبات الناقصة: ${missingPackages.join(', ')}`);
  try {
    execSync(`npm install --save-dev ${missingPackages.join(' ')}`, { stdio: 'inherit' });
    console.log('✅ تم تثبيت جميع المكتبات بنجاح');
  } catch (error) {
    console.error('❌ حدث خطأ أثناء تثبيت المكتبات:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ جميع المكتبات المطلوبة مثبتة');
}

// إنشاء مجلدات المكونات إذا لم تكن موجودة
const componentsDir = path.join(process.cwd(), 'src', 'components');
const subDirs = ['license', 'dev', 'ui'];

// التأكد من وجود المجلدات الأساسية
for (const dir of subDirs) {
  const fullPath = path.join(componentsDir, dir);
  if (!fs.existsSync(fullPath)) {
    try {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`✅ تم إنشاء مجلد ${dir}`);
    } catch (err) {
      console.error(`❌ فشل إنشاء مجلد ${dir}:`, err.message);
    }
  }
}

// التحقق من وجود ملفات Electron الأساسية
const electronDir = path.join(process.cwd(), 'electron');
if (!fs.existsSync(electronDir)) {
  console.error('❌ مجلد Electron غير موجود. يرجى التحقق من تثبيت المشروع بشكل صحيح.');
  process.exit(1);
}

const electronInitPath = path.join(electronDir, 'electron-init.js');
console.log(`التحقق من وجود ملف تهيئة Electron في: ${electronInitPath}`);

if (!fs.existsSync(electronInitPath)) {
  console.error('❌ ملف تهيئة Electron غير موجود. يرجى التحقق من تثبيت المشروع بشكل صحيح.');
  process.exit(1);
}

// التحقق من ملف package.electron.json
const packageElectronPath = path.join(process.cwd(), 'package.electron.json');
if (!fs.existsSync(packageElectronPath)) {
  console.error('❌ ملف package.electron.json غير موجود. يرجى التحقق من تثبيت المشروع بشكل صحيح.');
  process.exit(1);
}

console.log('✅ تم التحقق من جميع المتطلبات بنجاح');
