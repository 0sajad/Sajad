
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('التحقق من المكتبات المطلوبة وتثبيتها إذا لزم الأمر...');

// دالة للتحقق من تثبيت الحزم
function checkAndInstallPackages() {
  // قائمة بالمكتبات الضرورية
  const requiredPackages = [
    'vite',
    '@vitejs/plugin-react-swc',
    'electron',
    'electron-builder',
    'react',
    'react-dom'
  ];
  
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
      return false;
    }
  } else {
    console.log('✅ جميع المكتبات مثبتة بالفعل');
  }
  
  return true;
}

// تصدير دالة للتحقق من تثبيت vite
module.exports = {
  checkViteInstallation: function() {
    try {
      const vitePath = path.join(process.cwd(), 'node_modules', 'vite');
      const viteGloballyAvailable = (() => {
        try {
          execSync('npx vite --version', { stdio: 'ignore' });
          return true;
        } catch (e) {
          return false;
        }
      })();
      
      if (!fs.existsSync(vitePath) && !viteGloballyAvailable) {
        checkAndInstallPackages();
      }
      
      return fs.existsSync(vitePath) || viteGloballyAvailable;
    } catch (e) {
      return false;
    }
  }
};

// تنفيذ الفحص إذا تم استدعاء هذا الملف مباشرة
if (require.main === module) {
  checkAndInstallPackages();
}
