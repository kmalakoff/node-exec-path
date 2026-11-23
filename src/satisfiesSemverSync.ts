import envPathKey from 'env-path-key';
import Module from 'module';
import path from 'path';
import semver from 'semver';
import url from 'url';
import { existsSync } from './compat.ts';

const isWindows = process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE ?? '');
const pathDelimiter = path.delimiter ? path.delimiter : isWindows ? ';' : ':';
const NODE = isWindows ? 'node.exe' : 'node';
// `node -e`, `node -p` and stdin scripts define require and __filename as globals, so a typeof check alone
// sends the ESM build down the CJS branch there; only the CJS build has module-scoped bindings that differ from the globals.
const _require = typeof require !== 'undefined' && require !== global.require ? require : Module.createRequire(import.meta.url);
const __dirname = path.dirname(typeof __filename !== 'undefined' && __filename !== global.__filename ? __filename : url.fileURLToPath(import.meta.url));
// Worker MUST always load from dist/cjs/ for old Node compatibility (works from both cjs and esm)
const processVersion = path.join(__dirname, '..', 'cjs', 'workers', 'processVersion.js');

export type satisfiesSemverSyncOptions = {
  env?: NodeJS.ProcessEnv;
};

let functionExec: ((options: Record<string, unknown>, workerPath: string) => unknown) | null = null;
export default function satisfiesSemverSync(versionString: string, options: satisfiesSemverSyncOptions = {}): string | null {
  if (!functionExec) functionExec = _require('function-exec-sync'); // break dependencies
  const exec = functionExec as (options: Record<string, unknown>, workerPath: string) => unknown;

  const env = options.env || process.env;
  const pathKey = envPathKey(env);
  const envPaths = (env[pathKey] ?? '').split(pathDelimiter);

  for (let i = 0; i < envPaths.length; i++) {
    const envPath = envPaths[i];
    const execPath = path.join(envPath, NODE);
    if (!existsSync(execPath)) continue;
    const version = exec({ execPath }, processVersion);
    if (semver.satisfies(version as string, versionString)) return execPath;
  }

  return null;
}
