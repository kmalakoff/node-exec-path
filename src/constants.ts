module.exports = {
  isWindows: process.platform === 'win32',
  node: process.platform === 'win32' ? 'node.exe' : 'node',
};
