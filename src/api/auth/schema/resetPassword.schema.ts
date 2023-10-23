import { checkSchema } from "express-validator";

export const resetPasswordSchema = checkSchema({
    newPassword: {
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