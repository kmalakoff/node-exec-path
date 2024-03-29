"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return path;
    }
});
var _fsaccesssynccompat = /*#__PURE__*/ _interop_require_default(require("fs-access-sync-compat"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function path(path) {
    try {
        (0, _fsaccesssynccompat.default)(path);
        return true;
    } catch (_err) {
        return false;
    }
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) exports.default[key] = exports[key]; module.exports = exports.default; }