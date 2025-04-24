
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('التحقق من المكتبات المطلوبة وتثبيتها إذا لزم الأمر...');

// قائمة بالمكتبات الضرورية مع التركيز على Vite
const requiredPackages = [
  'vite',
  '@vitejs/plugin-react-swc',
  'vite-cli',
  'electron',
  'electron-builder',
  'react',
  'react-dom',
  'wait-on',
  'cross-env',
  'concurrently'
];

// دالة للتحقق من تثبيت الحزم
function checkAndInstallPackages() {
  let missingPackages = [];
  
  for (const pkg of requiredPackages) {
    try {
      const packagePath = path.join(process.cwd(), 'node_modules', pkg);
      if (!fs.existsSync(packagePath)) {
        missingPackages.push(pkg);
      }
    } catch (e) {
      missingPackages.push(pkg);
    }
  }

  if (missingPackages.length > 0) {
    console.log(`جاري تثبيت المكتبات المفقودة: ${missingPackages.join(', ')}`);
    try {
      execSync(`npm install --save-dev ${missingPackages.join(' ')}`, { stdio: 'inherit' });
      console.log('✅ تم تثبيت جميع المكتبات بنجاح');

      // تثبيت Vite عالمياً إذا كان مفقوداً
      if (missingPackages.includes('vite')) {
        try {
          console.log('محاولة تثبيت Vite عالمياً للتأكيد...');
          execSync('npm install -g vite', { stdio: 'inherit' });
          console.log('✅ تم تثبيت Vite عالمياً');
        } catch (e) {
          console.log('⚠️ لم نتمكن من تثبيت Vite عالمياً، لكن التثبيت المحلي قد يكون كافياً');
        }
      }
    } catch (error) {
      console.error('❌ حدث خطأ أثناء تثبيت المكتبات:', error.message);
      
      // محاولة التثبيت عالميًا إذا فشل التثبيت محليًا
      try {
        execSync(`npm install -g ${missingPackages.join(' ')}`, { stdio: 'inherit' });
        console.log('✅ تم تثبيت المكتبات عالميًا');
      } catch (globalError) {
        console.error('❌ فشل تثبيت المكتبات عالميًا:', globalError.message);
        process.exit(1);
      }
    }
  } else {
    console.log('✅ جميع المكتبات مثبتة بالفعل');
  }
}

// إضافة Vite إلى مسار النظام
function addViteToPath() {
  const nodeModulesBinPath = path.join(process.cwd(), 'node_modules', '.bin');
  const viteModulePath = path.join(process.cwd(), 'node_modules', 'vite', 'bin');
  
  if (process.platform === 'win32') {
    // إضافة المسار للويندوز
    try {
      console.log(`إضافة ${nodeModulesBinPath} و ${viteModulePath} إلى PATH للجلسة الحالية`);
      process.env.PATH = `${nodeModulesBinPath};${viteModulePath};${process.env.PATH}`;
      
      try {
        execSync(`setx PATH "%PATH%;${nodeModulesBinPath};${viteModulePath}"`, { stdio: 'ignore' });
        console.log('✅ تم إضافة مسارات Vite للبيئة على Windows');
      } catch (e) {
        console.log('⚠️ لم نتمكن من تحديث PATH للنظام، لكن تم تحديثه للعملية الحالية');
      }
    } catch (error) {
      console.log('⚠️ تم تحديث PATH للعملية الحالية فقط');
      process.env.PATH = `${nodeModulesBinPath};${viteModulePath};${process.env.PATH}`;
    }
  } else {
    // لأنظمة Unix/Linux
    process.env.PATH = `${nodeModulesBinPath}:${viteModulePath}:${process.env.PATH}`;
    console.log(`✅ تم إضافة ${nodeModulesBinPath} و ${viteModulePath} إلى PATH للعملية الحالية`);
    
    const shellConfigPath = process.env.HOME + (process.platform === 'darwin' ? '/.bash_profile' : '/.bashrc');
    const pathExportLine = `export PATH=$PATH:${nodeModulesBinPath}:${viteModulePath}`;
    
    try {
      const shellConfig = fs.existsSync(shellConfigPath) ? fs.readFileSync(shellConfigPath, 'utf8') : '';
      if (!shellConfig.includes(pathExportLine)) {
        fs.appendFileSync(shellConfigPath, `\n${pathExportLine}\n`);
        console.log('✅ تم إضافة مسار Vite للبيئة بشكل دائم');
      }
    } catch (error) {
      console.log('⚠️ لم نتمكن من تحديث ملف التكوين للشل، لكن تم تحديث PATH للعملية الحالية');
    }
  }
}

// إنشاء ملف وسيط لتشغيل Vite
function createViteRunner() {
  const viteJsPath = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
  const viteRunnerPath = path.join(process.cwd(), 'scripts', 'run-vite.js');
  
  if (fs.existsSync(viteJsPath) && !fs.existsSync(viteRunnerPath)) {
    try {
      const viteRunnerContent = `
#!/usr/bin/env node
require('${viteJsPath.replace(/\\/g, '\\\\')}');
`;
      fs.writeFileSync(viteRunnerPath, viteRunnerContent);
      
      // جعل الملف قابل للتنفيذ على أنظمة يونكس
      if (process.platform !== 'win32') {
        try {
          execSync(`chmod +x ${viteRunnerPath}`, { stdio: 'ignore' });
        } catch (e) {
          console.log('⚠️ لم نتمكن من جعل ملف run-vite.js قابل للتنفيذ');
        }
      }
      
      console.log(`✅ تم إنشاء ملف ${viteRunnerPath} لتشغيل Vite مباشرة`);
    } catch (e) {
      console.log('⚠️ لم نتمكن من إنشاء ملف وسيط لتشغيل Vite');
    }
  }
}

// تنفيذ الوظائف
checkAndInstallPackages();
addViteToPath();
createViteRunner();

console.log('✅ تم الانتهاء من إعداد التبعيات بنجاح');

// تصدير دالة للتحقق من تثبيت vite
module.exports = {
  checkViteInstallation: function() {
    try {
      const vitePath = path.join(process.cwd(), 'node_modules', 'vite');
      const viteGloballyAvailable = (() => {
        try {
          execSync('vite --version', { stdio: 'ignore' });
          return true;
        } catch (e) {
          return false;
        }
      })();
      
      return fs.existsSync(vitePath) || viteGloballyAvailable;
    } catch (e) {
      return false;
    }
  }
};
