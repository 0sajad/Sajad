
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// قراءة ملفات package.json
const mainPackageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const electronPackageJson = JSON.parse(fs.readFileSync('package.electron.json', 'utf8'));

// استخراج سكريبت "electron:dev" من ملف package.electron.json
const electronDevScript = electronPackageJson.scripts["electron:dev"];

console.log('Starting Electron development environment...');
console.log(`Executing: ${electronDevScript}`);

try {
  // تنفيذ الأمر
  execSync(electronDevScript, { stdio: 'inherit' });
} catch (error) {
  console.error('Error running Electron:', error);
  process.exit(1);
}
