"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.JTW_SECRET = exports.EMAIL_PASS = exports.EMAIL_USER = exports.EMAIL_PORT = exports.EMAIL_HOST = void 0;
_a = process.env, exports.EMAIL_HOST = _a.EMAIL_HOST, exports.EMAIL_PORT = _a.EMAIL_PORT, exports.EMAIL_USER = _a.EMAIL_USER, exports.EMAIL_PASS = _a.EMAIL_PASS, exports.JTW_SECRET = _a.JTW_SECRET;
exports.PORT = process.env.PORT || 3000;
//# sourceMappingURL=constants.js.map