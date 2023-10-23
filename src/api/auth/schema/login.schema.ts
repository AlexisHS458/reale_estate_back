import { checkSchema } from "express-validator";

export const loginSchema = checkSchema({
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
