import { checkSchema } from "express-validator";

export const registerSchema = checkSchema({
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
