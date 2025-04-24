
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
    console.log('✅ وجدنا تثبيت Vite محلي');
    return true;
  }

  // تحقق من وجود Vite عالمي
  try {
    execSync('vite --version', { stdio: 'ignore' });
    console.log('✅ وجدنا تثبيت Vite عالمي');
    return true;
  } catch (e) {
    console.log('❌ لم نجد تثبيت Vite');
    return false;
  }
}

// تثبيت Vite إذا لم يكن موجودًا
function installVite() {
  console.log('⏳ جاري تثبيت Vite...');
  try {
    // محاولة تثبيت Vite محليًا
    execSync('npm install vite@latest --no-save', { stdio: 'inherit' });
    console.log('✅ تم تثبيت Vite بنجاح');

    // التحقق من نجاح التثبيت
    if (checkViteInstallation()) {
      return true;
    }

    // إذا لم يتم العثور على Vite بعد التثبيت، حاول تثبيته بطريقة أخرى
    console.log('⚠️ لم يتم العثور على Vite بعد التثبيت المحلي، جاري المحاولة بطريقة أخرى...');
    execSync('npm install -g vite', { stdio: 'inherit' });
    console.log('✅ تم تثبيت Vite عالميًا');
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

// تحديث package.json إذا لزم الأمر
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

      // إضافة سكربت لتشغيل Vite مباشرة
      if (!packageJson.scripts || !packageJson.scripts.vite) {
        packageJson.scripts = packageJson.scripts || {};
        packageJson.scripts.vite = "node ./node_modules/vite/bin/vite.js";
        
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('✅ تم تحديث package.json بإضافة سكربت Vite');
      }
    } catch (error) {
      console.error('❌ خطأ في تحديث package.json:', error.message);
    }
  }
}

// إنشاء ربط رمزي للوصول إلى Vite
function createViteSymlink() {
  const isWindows = process.platform === 'win32';
  const localViteBin = path.join(process.cwd(), 'node_modules', '.bin', 'vite' + (isWindows ? '.cmd' : ''));
  const localVitePath = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
  
  // إنشاء ملف وسيط لتشغيل Vite إذا لم يكن موجودًا
  if (!fs.existsSync(localViteBin) && fs.existsSync(localVitePath)) {
    console.log('⏳ إنشاء ملف وسيط لتشغيل Vite...');
    
    const viteRunnerPath = path.join(process.cwd(), 'scripts', 'run-vite.js');
    
    if (!fs.existsSync(viteRunnerPath)) {
      try {
        // كتابة ملف وسيط لتشغيل Vite
        const viteRunnerContent = `
#!/usr/bin/env node
require('${localVitePath.replace(/\\/g, '\\\\')}');
`;
        fs.writeFileSync(viteRunnerPath, viteRunnerContent);
        
        // جعل الملف قابل للتنفيذ على أنظمة يونكس
        if (!isWindows) {
          try {
            execSync(`chmod +x ${viteRunnerPath}`, { stdio: 'ignore' });
          } catch (e) {
            console.log('⚠️ لم نتمكن من جعل ملف run-vite.js قابل للتنفيذ');
          }
        }
        
        console.log(`✅ تم إنشاء ملف ${viteRunnerPath} لتشغيل Vite`);
      } catch (e) {
        console.error('❌ فشل إنشاء ملف وسيط لتشغيل Vite:', e.message);
      }
    }
  }
}

// إضافة Vite إلى متغير البيئة PATH
function addViteToPath() {
  const binPath = path.join(process.cwd(), 'node_modules', '.bin');
  const vitePath = path.join(process.cwd(), 'node_modules', 'vite', 'bin');
  
  console.log(`⏳ إضافة المسارات التالية إلى PATH:
- ${binPath}
- ${vitePath}`);

  // إضافة المسارات إلى PATH للعملية الحالية
  if (process.platform === 'win32') {
    process.env.PATH = `${binPath};${vitePath};${process.env.PATH}`;
  } else {
    process.env.PATH = `${binPath}:${vitePath}:${process.env.PATH}`;
  }
  
  console.log('✅ تم تحديث متغير PATH للعملية الحالية');
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
  
  // إنشاء ربط لتسهيل الوصول
  createViteSymlink();
  
  // إضافة Vite إلى PATH
  addViteToPath();
  
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
module.exports = setupVite();

// تنفيذ مباشر إذا تم استدعاء الملف مباشرة
if (require.main === module) {
  setupVite();
}
