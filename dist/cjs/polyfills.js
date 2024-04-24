"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _path = /*#__PURE__*/ _interop_require_default(require("path"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// @ts-ignore
if (!_path.default.delimiter) _path.default.delimiter = process.platform === "win32" ? ";" : ":";
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }