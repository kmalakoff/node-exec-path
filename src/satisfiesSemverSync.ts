import envPathKey from 'env-path-key';
import fs from 'fs';
import Module from 'module';
import path from 'path';
import semver from 'semver';
import url from 'url';

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE);
const pathDelimiter = path.delimiter ? path.delimiter : isWindows ? ';' : ':';
const NODE = isWindows ? 'node.exe' : 'node';
const _require = typeof require === 'undefined' ? Module.createRequire(import.meta.url) : require;

const existsSync = (test) => {
  try {
    (fs.accessSync || fs.statSync)(test);
    return true;
  } catch (_) {
    return false;
  }
};

const __dirname = path.dirname(typeof __filename === 'undefined' ? url.fileURLToPath(import.meta.url) : __filename);
const processVersion = path.join(__dirname, 'workers', 'processVersion.cjs');

export type satisfiesSemverSyncOptions = {
  env?: object;
};

let functionExec = null; // break dependencies
export default function satisfiesSemverSync(versionString: string, options: satisfiesSemverSyncOptions = {}): string | null {
  if (!functionExec) functionExec = _require('function-exec-sync'); // break dependencies

  const env = options.env || process.env;
  const pathKey = envPathKey(env);
  const envPaths = env[pathKey].split(pathDelimiter);

  for (let i = 0; i < envPaths.length; i++) {
    const envPath = envPaths[i];
    const execPath = path.join(envPath, NODE);
    if (!existsSync(execPath)) continue;
    const version = functionExec({ execPath }, processVersion);
    if (semver.satisfies(version, versionString)) return execPath;
  }

  return null;
}
