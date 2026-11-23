# Changelog

All notable changes to node-exec-path are documented here.

## [1.2.6] - 2026-11-22

### Fixed

- `satisfiesSemverSync` works when the ESM build is imported from `node -e`, `node -p` or a script piped to `node -`. Node defines `require` and `__filename` as globals there, and the ESM build mistook them for its own: it failed with `Cannot find module '../cjs/workers/processVersion.js'`, or `Cannot find module 'function-exec-sync'` when run outside the package's directory.

## [1.2.2] - 2026-05-26

### Changed

- The `env` option is typed as `NodeJS.ProcessEnv` instead of `object`.
- `function-exec-sync` is now required at `^2.0.1` (was `^1.0.0`).

### Fixed

- `satisfiesSemverSync` returns `null` instead of throwing `Cannot read properties of undefined (reading 'split')` when the `env` you pass has no `PATH`.

## [1.2.1] - 2025-12-15

### Changed

- `semver` is pinned to the exact version 5.7.2 instead of `^5.7.1`.

## [1.1.0] - 2025-06-21

### Fixed

- `require('node-exec-path')` works again. 1.0.38 failed with `Cannot find module '.../dist/cjs/workers/processVersion.cjs'`.

## [1.0.34] - 2025-05-20

### Added

- An ES module build. `import { satisfiesSemverSync } from 'node-exec-path'` now loads `dist/esm`, and `require` still loads `dist/cjs`.

## [1.0.28] - 2025-01-23

### Fixed

- `satisfiesSemverSync` works again after two broken releases: 1.0.26 failed with `Cannot find module './polyfills.cjs'`, and 1.0.27 returned `null` on macOS and Linux because it split `PATH` on `;`.

## [1.0.0] - 2024-11-29

### Changed

- `env-path-key` and `function-exec-sync` are now required at `^1.0.0` (were `^0.3.0` and `^0.2.11`); the API is unchanged.
