
#!/usr/bin/env node
const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

console.log('جاري تشغيل التطبيق في وضع التطوير...');

// تحديد نوع نظام التشغيل
const isWindows = os.platform() === 'win32';
const isMac = os.platform() === 'darwin';
const isLinux = os.platform() === 'linux';

console.log(`نظام التشغيل: ${isWindows ? 'Windows' : isMac ? 'macOS' : 'Linux'}`);

// فحص وتثبيت التبعيات الأساسية
function setupDependencies() {
  // التأكد من وجود المجلدات الضرورية
  const scriptsDir = path.join(process.cwd(), 'scripts');
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }

  // ضبط صلاحيات التنفيذ للملفات على لينكس وماك
  if (!isWindows) {
    try {
      if (fs.existsSync('./run-electron-dev.sh')) {
        execSync('chmod +x ./run-electron-dev.sh', { stdio: 'inherit' });
      }
      if (fs.existsSync('./run-electron-build.sh')) {
        execSync('chmod +x ./run-electron-build.sh', { stdio: 'inherit' });
      }
      if (fs.existsSync('./scripts/run-vite.js')) {
        execSync('chmod +x ./scripts/run-vite.js', { stdio: 'inherit' });
      }
    } catch (error) {
      console.log('تحذير: لم يتم ضبط صلاحيات التنفيذ للملفات. قد تحتاج إلى تنفيذ الأمر يدويًا.');
    }
  }

  // التحقق من وجود ملف setup-dependencies.js وتنفيذه
  const setupDependenciesPath = path.join(scriptsDir, 'setup-dependencies.js');
  if (!fs.existsSync(setupDependenciesPath)) {
    console.log('إنشاء ملف setup-dependencies.js...');
    try {
      const setupDepsTemplate = fs.readFileSync(
        path.join(__dirname, 'scripts', 'setup-dependencies.js'),
        'utf8'
      );
      fs.writeFileSync(setupDependenciesPath, setupDepsTemplate);
      console.log('✅ تم إنشاء ملف setup-dependencies.js');
    } catch (error) {
      console.error('❌ فشل إنشاء ملف setup-dependencies.js:', error.message);
    }
  }

  // تنفيذ ملف الإعداد
  try {
    console.log('تنفيذ إعداد التبعيات...');
    const setupModule = require('./scripts/setup-dependencies');
    const viteAvailable = setupModule.checkViteInstallation();
    
    if (!viteAvailable) {
      console.log('⚠️ لم يتم العثور على Vite، جاري التثبيت...');
      execSync('npm install vite@latest @vitejs/plugin-react-swc --save-dev --force', { stdio: 'inherit' });
      console.log('✅ تم تثبيت Vite');
    }
  } catch (error) {
    console.error('❌ خطأ أثناء إعداد التبعيات:', error.message);
    console.log('جاري تثبيت Vite بشكل مباشر...');
    execSync('npm install vite@latest @vitejs/plugin-react-swc --save-dev --force', { stdio: 'inherit' });
  }

  // إنشاء ملف setup-vite.js إذا لم يكن موجودًا
  const setupVitePath = path.join(scriptsDir, 'setup-vite.js');
  if (!fs.existsSync(setupVitePath)) {
    console.log('إنشاء ملف setup-vite.js...');
    try {
      // تحاول نسخ القالب إذا كان موجودًا، وإلا سننشئ ملفًا بسيطًا
      let setupViteContent = '';
      const templatePath = path.join(__dirname, 'scripts', 'setup-vite.js');
      
      if (fs.existsSync(templatePath)) {
        setupViteContent = fs.readFileSync(templatePath, 'utf8');
      } else {
        setupViteContent = `
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// التحقق من وجود vite
function checkViteExists() {
  try {
    const vitePath = path.join(process.cwd(), 'node_modules', 'vite');
    if (!fs.existsSync(vitePath)) {
      console.log('تثبيت Vite...');
      execSync('npm install vite@latest @vitejs/plugin-react-swc --save-dev', { stdio: 'inherit' });
    }
    return true;
  } catch (error) {
    console.error('خطأ في تثبيت Vite:', error.message);
    return false;
  }
}

module.exports = checkViteExists();
`;
      }
      
      fs.writeFileSync(setupVitePath, setupViteContent);
      console.log('✅ تم إنشاء ملف setup-vite.js');
    } catch (error) {
      console.error('❌ فشل إنشاء ملف setup-vite.js:', error.message);
    }
  }
}

// التأكد من وجود ملف للتبعيات
setupDependencies();

// تعزيز البحث عن Vite المناسب للنظام
function findViteExecutable() {
  const possibleVitePaths = [
    // محاولة تنفيذ سكربت run-vite.js الخاص بنا
    path.join(__dirname, 'scripts', 'run-vite.js'),
    // المسار المباشر للملف التنفيذي
    path.join(__dirname, 'node_modules', '.bin', 'vite' + (isWindows ? '.cmd' : '')),
    path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js'),
    // استخدام NPX
    isWindows ? 'npx.cmd' : 'npx',
    // محاولة استخدام المسار المؤقت إذا تم إنشاؤه
    path.join(__dirname, 'temp', isWindows ? 'vite.cmd' : 'vite')
  ];

  // إضافة قائمة بالأوامر البديلة
  const fallbackCommands = [
    { cmd: isWindows ? 'npx.cmd' : 'npx', args: ['vite', '--host', '--port', '8080'] },
    { cmd: 'node', args: [path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js'), '--host', '--port', '8080'] },
    { cmd: isWindows ? 'npm.cmd' : 'npm', args: ['run', 'dev'] }
  ];

  // أولاً نبحث عن ملفات تنفيذية مباشرة
  for (const vitePath of possibleVitePaths) {
    if (fs.existsSync(vitePath)) {
      console.log(`استخدام Vite من: ${vitePath}`);
      return { type: 'path', path: vitePath };
    }
  }

  // إذا لم نجد ملفات مباشرة، نجرب الأوامر الاحتياطية
  return { type: 'fallback', commands: fallbackCommands };
}

// تشغيل Vite
function runVite() {
  // إضافة متغيرات بيئة للإشارة إلى أن التطبيق يعمل في وضع التطوير
  process.env.NODE_ENV = 'development';

  // البحث عن الأمر المناسب لتشغيل Vite
  const viteExecutable = findViteExecutable();

  console.log('تشغيل Vite...');
  
  if (viteExecutable.type === 'path') {
    // استخدام المسار المباشر للملف التنفيذي
    const vitePath = viteExecutable.path;
    
    if (vitePath.endsWith('.js')) {
      // تشغيل ملف JS باستخدام Node
      runProcess(process.execPath, [vitePath, '--host', '--port', '8080']);
    } else if (vitePath.endsWith('run-vite.js')) {
      // تشغيل سكربت run-vite.js الخاص بنا
      runProcess(process.execPath, [vitePath]);
    } else if (vitePath.endsWith('.cmd') || !vitePath.includes('.')) {
      // تشغيل ملف تنفيذي مباشر
      runProcess(vitePath, ['--host', '--port', '8080']);
    } else {
      // تشغيل NPX كخطة بديلة
      runProcess(isWindows ? 'npx.cmd' : 'npx', ['vite', '--host', '--port', '8080']);
    }
  } else {
    // استخدام الأوامر الاحتياطية بالترتيب
    console.log('استخدام خطة بديلة لتشغيل Vite...');
    
    // نجرب الأوامر البديلة واحدًا تلو الآخر
    executeNextFallbackCommand(viteExecutable.commands, 0);
  }
}

// تنفيذ الأوامر الاحتياطية بالتسلسل
function executeNextFallbackCommand(commands, index) {
  if (index >= commands.length) {
    console.error('❌ فشلت جميع محاولات تشغيل Vite');
    console.error('يرجى تثبيت Vite يدويًا باستخدام: npm install vite@latest --save-dev');
    process.exit(1);
  }

  const { cmd, args } = commands[index];
  console.log(`محاولة تشغيل Vite باستخدام: ${cmd} ${args.join(' ')}`);

  const proc = spawn(cmd, args, {
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, NODE_ENV: 'development' }
  });

  proc.on('error', () => {
    console.log(`❌ فشلت المحاولة ${index + 1} من ${commands.length}`);
    // تجربة الأمر التالي في القائمة
    executeNextFallbackCommand(commands, index + 1);
  });

  proc.on('close', (code) => {
    if (code !== 0) {
      console.log(`❌ فشل الأمر بكود خروج: ${code}`);
      // تجربة الأمر التالي في القائمة
      executeNextFallbackCommand(commands, index + 1);
    } else {
      process.exit(0);
    }
  });
}

// دالة مساعدة لتشغيل العمليات
function runProcess(command, args) {
  console.log(`تنفيذ: ${command} ${args.join(' ')}`);
  
  const proc = spawn(command, args, {
    stdio: 'inherit',
    shell: true,
    env: { 
      ...process.env, 
      NODE_ENV: 'development',
      // إضافة مسار node_modules/.bin إلى PATH
      PATH: `${path.join(__dirname, 'node_modules', '.bin')}${path.delimiter}${process.env.PATH}`
    }
  });

  proc.on('error', (error) => {
    console.error(`❌ فشل تشغيل الأمر: ${error.message}`);
    
    // محاولة تنفيذ Vite عبر npx كخطة بديلة
    console.log('محاولة تشغيل Vite عبر npx...');
    
    const fallbackProcess = spawn(isWindows ? 'npx.cmd' : 'npx', ['vite', '--host', '--port', '8080'], {
      stdio: 'inherit',
      shell: true,
      env: { ...process.env, NODE_ENV: 'development' }
    });
    
    fallbackProcess.on('error', (err) => {
      console.error(`❌ فشلت المحاولة البديلة: ${err.message}`);
      
      // محاولة أخيرة باستخدام npm run dev
      console.log('محاولة تشغيل npm run dev...');
      
      const npmProcess = spawn(isWindows ? 'npm.cmd' : 'npm', ['run', 'dev'], {
        stdio: 'inherit',
        shell: true
      });
      
      npmProcess.on('error', (npmErr) => {
        console.error(`❌ فشلت جميع المحاولات: ${npmErr.message}`);
        process.exit(1);
      });
      
      npmProcess.on('close', (code) => {
        process.exit(code || 0);
      });
    });
    
    fallbackProcess.on('close', (code) => {
      process.exit(code || 0);
    });
  });

  proc.on('close', (code) => {
    process.exit(code || 0);
  });
}

// تنفيذ المرحلة الأخيرة: تشغيل Vite
runVite();
