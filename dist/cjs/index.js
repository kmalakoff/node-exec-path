"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "satisfiesSemverSync", {
    enumerable: true,
    get: function() {
        return _satisfiesSemverSync.default;
    }
});
require("./polyfills.js");
var _satisfiesSemverSync = /*#__PURE__*/ _interop_require_default(require("./satisfiesSemverSync.js"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }