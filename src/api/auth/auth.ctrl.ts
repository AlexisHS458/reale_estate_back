import { NextFunction, Request, Response } from "express";
import {
	registerUser,
	confirmEmail,
	forgotUserPassword,
	resetUserPassword,
	loginUser,
} from "./auth.serv";
import { sendResponse } from "../../handlers/response.handler";
import { HttpStatus } from "../../enums/http.enum";
import { registerEmail, forgotEmail } from "../../helpers/emails";
import { validationResult } from "express-validator";


const handleRegister = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const input = req.body;
		const user = await registerUser(input);
		sendResponse(res, HttpStatus.CREATED, user);
		registerEmail(user.email, user.token, user.name);
	} catch (error) {
		next(error);
	}
};

const handleEmailConfirmation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { token } = req.params;
		await confirmEmail(token);
		sendResponse(res, HttpStatus.OK, "Email confirmed");
	} catch (error) {
		next(error);
	}
};

const handleForgotPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const user = await forgotUserPassword(req.body.email);
		sendResponse(res, HttpStatus.OK, "Email sent");
		forgotEmail(user.email, user.token, user.name);
	} catch (error) {
		next(error);
	}
};

const handlePasswordReset = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { token } = req.params;
		const { newPassword } = req.body;
		const user = await resetUserPassword(token, newPassword);
		sendResponse(res, HttpStatus.OK, "Password changed");
	} catch (error) {
		next(error);
	}
};

const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		const token = await loginUser(email, password);
		sendResponse(res, HttpStatus.OK, { token });
	} catch (error) {
		next(error);
	}
};

export {
	handleRegister,
	handleEmailConfirmation,
	handleForgotPassword,
	handlePasswordReset,
	handleLogin,
};
