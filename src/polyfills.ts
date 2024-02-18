import path from 'path';
// @ts-ignore
if (!path.delimiter) path.delimiter = process.platform === 'win32' ? ';' : ':';
