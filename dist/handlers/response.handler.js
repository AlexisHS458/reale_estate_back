"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, status, data, message, meta) => {
    const response = {
        status,
        message,
        data,
        meta,
    };
    res.status(status).json(response);
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=response.handler.js.map