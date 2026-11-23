import assert from 'assert';
import spawn from 'cross-spawn-cb';
import fs from 'fs';
import { satisfiesSemverSync } from 'node-exec-path';
import os from 'os';
import path from 'path';
import semver from 'semver';
import url from 'url';

// `node -e` defines require and __filename as globals, which a dual build must not mistake for its own CJS module scope
const __dirname = path.dirname(typeof __filename !== 'undefined' ? __filename : url.fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', '..');
const canImportESM = semver.satisfies(process.versions.node, '^12.17.0 || >=13.2.0');

function evalScript(script: string, cwd: string, callback: (err?: Error) => void, cleanup?: () => void) {
  const expected = satisfiesSemverSync('>=0.8');
  spawn(process.execPath, ['-e', script], { cwd, encoding: 'utf8' }, (err, res) => {
    try {
      if (err) return callback(new Error(`${err.message}\n${(err as { stderr?: string }).stderr || ''}`));
      assert.equal(String(res?.stdout).trim(), expected);
      callback();
    } finally {
      if (cleanup) cleanup();
    }
  });
}

describe('node -e', () => {
  it('cjs build by name', (done) => {
    evalScript("console.log(require('node-exec-path').satisfiesSemverSync('>=0.8'))", root, done);
  });

  if (!canImportESM) return;

  it('esm build by name', (done) => {
    evalScript("import('node-exec-path').then(function (m) { console.log(m.satisfiesSemverSync('>=0.8')); })", root, done);
  });

  it('esm build from a directory with no node_modules above it', (done) => {
    // the eval's global require resolves from the cwd, so the cwd must be outside this repository
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'node-exec-path-'));
    const specifier = url.pathToFileURL(path.join(root, 'dist', 'esm', 'index.js')).href;
    evalScript(`import(${JSON.stringify(specifier)}).then(function (m) { console.log(m.satisfiesSemverSync('>=0.8')); })`, cwd, done, () => {
      fs.rmdirSync(cwd);
    });
  });
});
