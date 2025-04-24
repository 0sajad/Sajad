
module.exports = {
  // تكوين خاص بتوافق كالي لينكس
  linuxConfig: {
    target: ['AppImage', 'deb', 'rpm'],
    category: 'Network',
    maintainer: 'Octa Network',
    // دعم توزيعات لينكس المختلفة
    supportedPlatforms: ['x64', 'arm64'],
    // تكوين خاص بكالي لينكس
    debian: {
      depends: [
        'libgtk-3-0',
        'libnotify4',
        'libnss3',
        'libxss1',
        'libxtst6',
        'xdg-utils',
        'libatspi2.0-0',
        'libdrm2',
        'libgbm1',
        'libasound2'
      ]
    }
  }
};
