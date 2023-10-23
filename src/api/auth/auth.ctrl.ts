import { NextFunction, Request, Response } from "express";
import { create, confirmingEmail, forgotedPassword } from "./auth.serv";
import { sendResponse } from "../../handlers/response.handler";
import { HttpStatus } from "../../enums/http.enum";
import { registerEmail, forgotEmail } from "../../helpers/emails";
import { validationResult } from "express-validator";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateJwt } from "../../helpers/tokens";
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
		const user = await forgotedPassword(req.body.email);
		sendResponse(res, HttpStatus.OK, "Email sent");
		forgotEmail(user.email, user.token, user.name);
	} catch (error) {
		next(error);
	}
};

const resetPassword = async (
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

		const user = await prisma.user.findFirst({
			where: {
				token: token,
			},
		});
		if (!user) {
			throw new Error("Invalid token");
		}
		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				password: bcrypt.hashSync(newPassword, 10),
				token: "",
			},
		});
		sendResponse(res, HttpStatus.OK, "Password changed");
	} catch (error) {
		next(error);
	}
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		if (!user) {
			throw new Error("User not found");
		}
		const match = bcrypt.compareSync(password, user.password);
		if (!match) {
			throw new Error("Wrong password");
		}

		const token = generateJwt(user.id);
		
		sendResponse(res, HttpStatus.OK, { token });
	} catch (error) {
		next(error);
	}
};

export { register, confirmEmail, forgotPassword, resetPassword, login };
