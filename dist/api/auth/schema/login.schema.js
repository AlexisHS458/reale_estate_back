"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const express_validator_1 = require("express-validator");
exports.loginSchema = (0, express_validator_1.checkSchema)({
    email: {
        notEmpty: {
            errorMessage: "Email is required",
        },
        trim: true,
        isEmail: {
            errorMessage: "Invalid email",
        },
        normalizeEmail: true,
    },
    password: {
        notEmpty: {
            errorMessage: "Password is required",
        },
        trim: true,
    },
});
//# sourceMappingURL=login.schema.js.map