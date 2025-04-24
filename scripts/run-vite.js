
#!/usr/bin/env node

// هذا الملف هو وسيط لتشغيل Vite من المسار الصحيح

const path = require('path');
const fs = require('fs');
const { execSync, spawn } = require('child_process');

// التحقق من وجود Vite
function findVitePath() {
  const possiblePaths = [
    path.join(process.cwd(), 'node_modules', '.bin', 'vite' + (process.platform === 'win32' ? '.cmd' : '')),
    path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js'),
    'vite' // الاعتماد على PATH
  ];

  for (const potentialPath of possiblePaths) {
    if (potentialPath === 'vite') {
      try {
        execSync('vite --version', { stdio: 'ignore' });
        return potentialPath;
      } catch (e) {
        // تجاهل الخطأ
      }
    } else if (fs.existsSync(potentialPath)) {
      return potentialPath;
    }
  }

  return null;
}

// تنفيذ Vite مع الوسائط
function runVite() {
  const vitePath = findVitePath();

  if (!vitePath) {
    console.error('❌ لم يتم العثور على Vite. الرجاء تثبيته أولاً باستخدام "npm install vite"');
    process.exit(1);
  }

  console.log(`تشغيل Vite من المسار: ${vitePath}`);

  let childProcess;
  const args = process.argv.slice(2);

  if (vitePath.endsWith('.js')) {
    // إذا كان المسار ينتهي بـ .js، استخدم node لتشغيله
    childProcess = spawn('node', [vitePath, ...args], {
      stdio: 'inherit',
      shell: true,
      env: process.env
    });
  } else {
    // وإلا، قم بتنفيذ الملف مباشرة
    childProcess = spawn(vitePath, args, {
      stdio: 'inherit',
      shell: true,
      env: process.env
    });
  }

  childProcess.on('close', (code) => {
    process.exit(code || 0);
  });

  childProcess.on('error', (error) => {
    console.error(`❌ خطأ في تنفيذ Vite: ${error.message}`);
    process.exit(1);
  });
}

// تنفيذ Vite
runVite();
