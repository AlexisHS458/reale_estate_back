"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = void 0;
const express_validator_1 = require("express-validator");
exports.resetPasswordSchema = (0, express_validator_1.checkSchema)({
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
//# sourceMappingURL=resetPassword.schema.js.map