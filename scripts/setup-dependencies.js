
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
    'concurrently',
    'cross-env',
    'wait-on',
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
      // استخدام npm بدلاً من bun لتفادي مشاكل التثبيت
      execSync(`npm install --save-dev ${missingPackages.join(' ')} --no-fund --no-audit`, { stdio: 'inherit' });
      console.log('✅ تم تثبيت جميع المكتبات بنجاح');
      return true;
    } catch (error) {
      console.error('❌ حدث خطأ أثناء تثبيت المكتبات:', error.message);
      return false;
    }
  } else {
    console.log('✅ جميع المكتبات مثبتة بالفعل');
  }
  
  return true;
}

// دالة للتحقق من تثبيت vite
function checkViteInstallation() {
  try {
    const vitePath = path.join(process.cwd(), 'node_modules', 'vite');
    const viteBinPath = path.join(process.cwd(), 'node_modules', '.bin', process.platform === 'win32' ? 'vite.cmd' : 'vite');
    
    if (!fs.existsSync(vitePath) || !fs.existsSync(viteBinPath)) {
      console.log('Vite غير مثبت محلياً. جاري التثبيت...');
      try {
        execSync('npm install vite@latest @vitejs/plugin-react-swc --save-dev --no-fund --no-audit', { stdio: 'inherit' });
        console.log('✅ تم تثبيت Vite بنجاح');
        return true;
      } catch (e) {
        console.error('❌ فشل تثبيت Vite:', e.message);
        return false;
      }
    }
    
    return true;
  } catch (e) {
    return false;
  }
}

// تنفيذ الفحص إذا تم استدعاء هذا الملف مباشرة
if (require.main === module) {
  checkAndInstallPackages();
  checkViteInstallation();
}

// تصدير الدالتين للاستخدام في سكربتات أخرى
module.exports = {
  checkViteInstallation,
  checkAndInstallPackages
};
