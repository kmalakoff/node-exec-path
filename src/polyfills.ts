import path from 'path';

if (!path.delimiter) {
  const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
  // @ts-ignore
  path.delimiter = isWindows ? ';' : ':';
}
