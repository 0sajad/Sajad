
# Octa Network Haven - Electron App

This application can be run as a desktop application using Electron.

## Running on Windows 11

### Prerequisites
- Node.js (v14 or newer)
- npm (comes with Node.js)

### Installation
1. Clone or download this repository
2. Open a command prompt in the project directory
3. Install dependencies:
```
npm install
```

### Running the Application in Development Mode
To run the application in development mode, you can:

1. Use the provided batch file:
```
run-electron-dev.bat
```

2. Or run the command directly:
```
node scripts/run-electron.js dev
```

### Building the Application
To build an installer for Windows:

1. Use the provided batch file:
```
run-electron-build.bat
```

2. Or run the command directly:
```
node scripts/run-electron.js build
```

The built application will be available in the `release` folder.

## Troubleshooting

If you encounter any issues:
- Make sure you have the latest version of Node.js installed
- Try running `npm install` again to ensure all dependencies are correctly installed
- Check the console output for specific error messages

For additional help, please open an issue in the project repository.
