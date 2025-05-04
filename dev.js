
#!/usr/bin/env node
const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('جاري تشغيل التطبيق في وضع التطوير...');

// التأكد من تثبيت vite
try {
  console.log('التحقق من وجود Vite...');
  
  // تثبيت vite إذا لم يكن موجودًا
  const nodeModulesPath = path.join(process.cwd(), 'node_modules');
  const vitePath = path.join(nodeModulesPath, 'vite');
  if (!fs.existsSync(vitePath)) {
    console.log('Vite غير موجود. جاري التثبيت...');
    execSync('npm install vite@latest --save-dev', { stdio: 'inherit' });
    console.log('تم تثبيت Vite بنجاح.');
  }
  
  // تشغيل سكربت vite المحسن
  const runViteScript = path.join(__dirname, 'scripts', 'run-vite.js');
  
  if (fs.existsSync(runViteScript)) {
    console.log('تشغيل سكربت run-vite.js...');
    require(runViteScript);
  } else {
    console.log('سكربت run-vite.js غير موجود. استخدام الطريقة البديلة...');
    
    const isWindows = process.platform === 'win32';
    const viteLocalPath = path.join(process.cwd(), 'node_modules', '.bin', 'vite');
    const viteLocalPathJS = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
    
    let viteCommand = 'npx';
    let viteArgs = ['vite', '--host', '--port', '8080'];
    
    if (fs.existsSync(viteLocalPath) || fs.existsSync(viteLocalPath + (isWindows ? '.cmd' : ''))) {
      viteCommand = isWindows ? viteLocalPath + '.cmd' : viteLocalPath;
      viteArgs = ['--host', '--port', '8080'];
    } else if (fs.existsSync(viteLocalPathJS)) {
      viteCommand = 'node';
      viteArgs = [viteLocalPathJS, '--host', '--port', '8080'];
    }
    
    console.log(`تنفيذ: ${viteCommand} ${viteArgs.join(' ')}`);
    
    const viteProcess = spawn(viteCommand, viteArgs, {
      stdio: 'inherit',
      shell: true,
      env: {
        ...process.env,
        PATH: `${path.join(process.cwd(), 'node_modules', '.bin')}${isWindows ? ';' : ':'}${process.env.PATH}`
      }
    });
    
    viteProcess.on('error', (error) => {
      console.error(`فشل تشغيل Vite: ${error.message}`);
      
      // محاولة تنفيذ أخرى في حالة الفشل
      console.log('محاولة بديلة لتشغيل Vite عبر npx...');
      const altProcess = spawn('npx', ['vite', '--host', '--port', '8080'], {
        stdio: 'inherit',
        shell: true
      });
      
      altProcess.on('error', (err) => {
        console.error(`فشلت المحاولة البديلة: ${err.message}`);
        process.exit(1);
      });
    });
    
    viteProcess.on('close', (code) => {
      process.exit(code || 0);
    });
  }
} catch (error) {
  console.error(`حدثت مشكلة: ${error.message}`);
  process.exit(1);
}
