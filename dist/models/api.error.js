"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(status, message, meta) {
        super(message);
        this.status = status;
        this.meta = meta;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=api.error.js.map