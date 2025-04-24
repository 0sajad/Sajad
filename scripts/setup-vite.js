
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('التحقق من وجود Vite وتثبيته إذا لزم الأمر...');

// التحقق من وجود مجلد node_modules
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('❌ مجلد node_modules غير موجود، جاري إنشاؤه...');
  fs.mkdirSync(nodeModulesPath, { recursive: true });
}

// التحقق من وجود Vite
function checkViteInstallation() {
  // تحقق من وجود Vite في node_modules
  const vitePath = path.join(nodeModulesPath, 'vite');
  const viteBinPath = path.join(nodeModulesPath, '.bin', 'vite');
  const viteBinPathWindows = path.join(nodeModulesPath, '.bin', 'vite.cmd');
  
  if (fs.existsSync(vitePath) && (fs.existsSync(viteBinPath) || fs.existsSync(viteBinPathWindows))) {
    return true;
  }
  return false;
}

// تثبيت Vite إذا لم يكن موجودًا
function installVite() {
  console.log('⏳ جاري تثبيت Vite...');
  try {
    // استخدام --no-save للتثبيت السريع دون تعديل package.json
    execSync('npm install vite@latest --no-save', { stdio: 'inherit' });
    console.log('✅ تم تثبيت Vite بنجاح');
    return true;
  } catch (error) {
    console.error('❌ فشل تثبيت Vite:', error.message);
    
    try {
      // محاولة التثبيت بطريقة أخرى
      console.log('⏳ محاولة تثبيت Vite بطريقة أخرى...');
      execSync('npm install -g vite', { stdio: 'inherit' });
      console.log('✅ تم تثبيت Vite عالميًا');
      return true;
    } catch (globalError) {
      console.error('❌ فشل تثبيت Vite بشكل عام:', globalError.message);
      return false;
    }
  }
}

// إضافة Vite إلى package.json إذا لم يكن موجودًا
function updatePackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      // التأكد من وجود Vite في devDependencies
      if (!packageJson.devDependencies || !packageJson.devDependencies.vite) {
        packageJson.devDependencies = packageJson.devDependencies || {};
        packageJson.devDependencies.vite = "^5.0.0"; // أو أي إصدار آخر
        
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('✅ تم تحديث package.json بإضافة Vite');
      }
    } catch (error) {
      console.error('❌ خطأ في تحديث package.json:', error.message);
    }
  }
}

// إنشاء رابط رمزي لـ Vite في سطر الأوامر
function createSymlink() {
  const isWindows = process.platform === 'win32';
  const binPath = path.join(process.cwd(), 'node_modules', '.bin');
  
  try {
    if (!isWindows) {
      // لأنظمة Unix/Linux
      const vitePathInNodeModules = path.join(binPath, 'vite');
      const globalBinPath = '/usr/local/bin/vite';
      
      if (fs.existsSync(vitePathInNodeModules)) {
        try {
          execSync(`sudo ln -sf ${vitePathInNodeModules} ${globalBinPath}`, { stdio: 'ignore' });
          console.log(`✅ تم إنشاء رابط رمزي لـ Vite في ${globalBinPath}`);
        } catch (e) {
          // قد تفشل محاولة إنشاء الرابط الرمزي بسبب صلاحيات السوبر يوزر
          console.log('ملاحظة: لم نتمكن من إنشاء رابط رمزي عالمي لـ Vite');
        }
      }
    } else {
      // تحديث متغير البيئة PATH لـ Windows
      console.log(`إضافة ${binPath} إلى PATH للجلسة الحالية`);
      process.env.PATH = `${binPath}${path.delimiter}${process.env.PATH}`;
    }
  } catch (error) {
    console.log('ملاحظة: لم نتمكن من إنشاء ارتباط رمزي، لكن هذا ليس ضرورياً');
  }
}

// تنفيذ الخطوات واحدة تلو الأخرى
function setupVite() {
  // تحديث package.json أولاً
  updatePackageJson();
  
  // تحقق من وجود Vite
  if (checkViteInstallation()) {
    console.log('✅ Vite موجود بالفعل');
  } else {
    // تثبيت Vite إذا لم يكن موجودًا
    installVite();
  }
  
  // إنشاء رابط رمزي لتسهيل الوصول
  createSymlink();
  
  // تحقق مرة أخرى
  if (checkViteInstallation()) {
    console.log('✅ تم إعداد Vite بنجاح');
    return true;
  } else {
    console.error('❌ فشل إعداد Vite');
    return false;
  }
}

// تنفيذ عملية الإعداد
setupVite();
