const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);

export default {
  isWindows,
  node: isWindows ? 'node.exe' : 'node',
};
