// @ts-ignore
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "satisfiesSemverSync", {
    enumerable: true,
    get: function() {
        return _satisfiesSemverSyncts.default;
    }
});
require("./polyfills.js");
var _satisfiesSemverSyncts = /*#__PURE__*/ _interop_require_default(require("./satisfiesSemverSync.js"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
/* CJS INTEROP */ if (exports.__esModule && exports.default) { module.exports = exports.default; for (var key in exports) module.exports[key] = exports[key]; }