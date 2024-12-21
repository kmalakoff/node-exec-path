import './polyfills.ts';

import path from 'path';
import url from 'url';
import envPathKey from 'env-path-key';
import semver from 'semver';

import constants from './constants.js';
import existsSync from './existsSync.js';

const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const processVersion = path.join(__dirname, 'workers', 'processVersion.js');

export type satisfiesSemverSyncOptions = {
  env?: object;
};

let functionExec = null; // break dependencies
export default function satisfiesSemverSync(versionString: string, options: satisfiesSemverSyncOptions = {}): string | null {
  if (!functionExec) functionExec = require('function-exec-sync'); // break dependencies

  const env = options.env || process.env;
  const pathKey = envPathKey(env);
  const envPaths = env[pathKey].split(path.delimiter);

  for (let i = 0; i < envPaths.length; i++) {
    const envPath = envPaths[i];
    const execPath = path.join(envPath, constants.node);
    if (!existsSync(execPath)) continue;
    const version = functionExec({ execPath }, processVersion);
    if (semver.satisfies(version, versionString)) return execPath;
  }

  return null;
}
