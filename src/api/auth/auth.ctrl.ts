import { NextFunction, Request, Response } from "express";
import { create, confirmingEmail, forgotedPassword } from "./auth.serv";
import { sendResponse } from "../../handlers/response.handler";
import { HttpStatus } from "../../enums/http.enum";
import { registerEmail } from "../../helpers/emails";
import { validationResult } from "express-validator";
import prisma from "../../lib/prisma";

const register = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const userExists = await prisma.user.findUnique({
			where: {
				email: req.body.email,
			},
		});
		if (userExists) {
			throw new Error("User already exists");
		}
		const input = req.body;
		const user = await create(input);
		sendResponse(res, HttpStatus.CREATED, user);
		registerEmail(user.email, user.token, user.name);
	} catch (error) {
		next(error);
	}
};

const confirmEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { token } = req.params;
		const user = await prisma.user.findFirst({
			where: {
				token: token,
			},
		});
		if (!user) {
			throw new Error("Invalid token");
		}
		await confirmingEmail(user.id);
		sendResponse(res, HttpStatus.OK, "Email confirmed");
	} catch (error) {
		next(error);
	}
};

const forgotPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		await forgotedPassword(req.body.email);
		sendResponse(res, HttpStatus.OK, "Email confirmed");
	} catch (error) {
		next(error);
	}
};

export { register, confirmEmail, forgotPassword };
