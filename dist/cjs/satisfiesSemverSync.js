"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return satisfiesSemverSync;
    }
});
require("./polyfills.js");
var _path = /*#__PURE__*/ _interop_require_default(require("path"));
var _envpathkey = /*#__PURE__*/ _interop_require_default(require("env-path-key"));
var _semver = /*#__PURE__*/ _interop_require_default(require("semver"));
var _constantsts = /*#__PURE__*/ _interop_require_default(require("./constants.js"));
var _existsSyncts = /*#__PURE__*/ _interop_require_default(require("./existsSync.js"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var processVersion = _path.default.join(__dirname, "workers", "processVersion.js");
var functionExec = null; // break dependencies
function satisfiesSemverSync(versionString) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!functionExec) functionExec = require("function-exec-sync"); // break dependencies
    var _options_env;
    var env = (_options_env = options.env) !== null && _options_env !== void 0 ? _options_env : process.env;
    var pathKey = (0, _envpathkey.default)(env);
    var envPaths = env[pathKey].split(_path.default.delimiter);
    for(var i = 0; i < envPaths.length; i++){
        var envPath = envPaths[i];
        var execPath = _path.default.join(envPath, _constantsts.default.node);
        if (!(0, _existsSyncts.default)(execPath)) continue;
        var version = functionExec({
            execPath: execPath
        }, processVersion);
        if (_semver.default.satisfies(version, versionString)) return execPath;
    }
    return null;
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }