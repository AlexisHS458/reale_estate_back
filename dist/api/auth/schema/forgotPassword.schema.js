"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordSchema = void 0;
const express_validator_1 = require("express-validator");
exports.forgotPasswordSchema = (0, express_validator_1.checkSchema)({
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
});
//# sourceMappingURL=forgotPassword.schema.js.map