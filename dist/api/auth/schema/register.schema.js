"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const express_validator_1 = require("express-validator");
exports.registerSchema = (0, express_validator_1.checkSchema)({
    name: {
        notEmpty: {
            errorMessage: "Name is required",
        },
        trim: true,
        isLength: {
            errorMessage: "Username should be at least 3 chars long",
            options: { min: 3 },
        },
    },
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
        isLength: {
            errorMessage: "Password should be at least 3 chars long",
            options: { min: 3 },
        },
    },
});
//# sourceMappingURL=register.schema.js.map