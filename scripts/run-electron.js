
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read the electron package.json
const electronPackagePath = path.join(__dirname, '../package.electron.json');
const electronPackage = JSON.parse(fs.readFileSync(electronPackagePath, 'utf8'));

// Get the command from arguments
const command = process.argv[2]; // e.g., 'dev' or 'build'
if (!command) {
  console.error('Please specify a command: dev or build');
  process.exit(1);
}

// Get the script from package.electron.json
const scriptKey = `electron:${command}`;
const script = electronPackage.scripts[scriptKey];

if (!script) {
  console.error(`Command "${scriptKey}" not found in package.electron.json`);
  console.error('Available commands:');
  Object.keys(electronPackage.scripts)
    .filter(key => key.startsWith('electron:'))
    .forEach(key => console.log(`- ${key.replace('electron:', '')}`));
  process.exit(1);
}

console.log(`Running Electron command: ${script}`);

// Execute the script
const [cmd, ...args] = script.split(' ');
const proc = spawn(cmd, args, { 
  stdio: 'inherit', 
  shell: true,
  env: { ...process.env, ELECTRON: 'true' } 
});

proc.on('close', (code) => {
  process.exit(code);
});
