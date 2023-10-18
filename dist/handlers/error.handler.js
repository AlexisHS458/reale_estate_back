"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const client_1 = require("@prisma/client");
const http_enum_js_1 = require("../enums/http.enum.js");
const api_error_js_1 = require("../models/api.error.js");
/* import { IS_PRODUCTION } from "../constants.js"; */
const errorHandler = (error, req, res, next) => {
    let status = http_enum_js_1.HttpStatus.INTERNAL_SERVER_ERROR;
    let message = (0, http_enum_js_1.getHttpStatusName)(status);
    let stack = undefined;
    if (error instanceof api_error_js_1.ApiError) {
        status = error.status;
        message = error.message;
        stack = error.meta;
    }
    else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        message = error.message;
        /*  if (IS_PRODUCTION) {
           stack = error.meta?.cause;
         } */
    }
    const response = {
        error: (0, http_enum_js_1.getHttpStatusName)(status),
        message: message,
        meta: stack,
    };
    res.status(status).json(response);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.handler.js.map