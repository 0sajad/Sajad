
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
    require.resolve(pkg);
    console.log(`✅ ${pkg} موجود`);
  } catch (e) {
    console.log(`❌ ${pkg} غير موجود`);
    missingPackages.push(pkg);
  }
}

// تثبيت المكتبات الناقصة
if (missingPackages.length > 0) {
  console.log(`تثبيت المكتبات الناقصة: ${missingPackages.join(', ')}`);
  try {
    execSync(`npm install --no-save ${missingPackages.join(' ')}`, { stdio: 'inherit' });
    console.log('✅ تم تثبيت جميع المكتبات بنجاح');
  } catch (error) {
    console.error('❌ حدث خطأ أثناء تثبيت المكتبات:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ جميع المكتبات المطلوبة مثبتة');
}

// إنشاء ملف تشغيل Electron للتأكد من وجوده
const electronInitPath = path.join(__dirname, '..', 'electron', 'electron-init.js');
console.log(`التحقق من وجود ملف تهيئة Electron في: ${electronInitPath}`);

if (!fs.existsSync(electronInitPath)) {
  console.error('❌ ملف تهيئة Electron غير موجود');
  process.exit(1);
}

console.log('✅ تم التحقق من جميع المتطلبات بنجاح');
