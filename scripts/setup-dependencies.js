
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
  
  if (process.platform === 'win32') {
    // إضافة المسار للويندوز
    try {
      execSync(`setx PATH "${nodeModulesBinPath};%PATH%"`, { stdio: 'inherit' });
      console.log('✅ تم إضافة مسار Vite للبيئة على Windows');
    } catch (error) {
      console.error('❌ فشل إضافة مسار Vite:', error.message);
    }
  } else {
    // لأنظمة Unix/Linux
    const shellConfigPath = process.env.HOME + (process.platform === 'darwin' ? '/.bash_profile' : '/.bashrc');
    const pathExportLine = `export PATH=$PATH:${nodeModulesBinPath}`;
    
    try {
      const shellConfig = fs.readFileSync(shellConfigPath, 'utf8');
      if (!shellConfig.includes(pathExportLine)) {
        fs.appendFileSync(shellConfigPath, `\n${pathExportLine}\n`);
        console.log('✅ تم إضافة مسار Vite للبيئة');
      }
    } catch (error) {
      console.error('❌ فشل إضافة مسار Vite:', error.message);
    }
  }
}

// تنفيذ الوظائف
checkAndInstallPackages();
addViteToPath();

console.log('✅ تم الانتهاء من إعداد التبعيات بنجاح');
