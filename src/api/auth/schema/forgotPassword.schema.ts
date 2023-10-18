import { checkSchema } from "express-validator";

export const forgotPasswordSchema = checkSchema({
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