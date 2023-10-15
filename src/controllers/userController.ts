import { Request, Response } from "express";
import prisma from '../config/prisma';
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import {
    generateId
} from "../helpers/tokens";

const register = async (req: Request, res: Response) => {
	await check("email", "Email is not valid").isEmail().run(req);
	await check("password", "Password must be at least 6 characters long")
		.isLength({ min: 6 })
		.run(req);
	await check("confirmPassword", "Passwords do not match")
		.equals(req.body.password)
		.run(req);
	await check("name", "Name is required").notEmpty().run(req);
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password, name } = req.body;

	const userExists = await prisma.user.findUnique({
		where: {
			email: req.body.email,
		},
	});
	if (userExists) {
		return res.status(400).json({ errors: [{ msg: "User already exists" }] });
	}

	const user = await prisma.user.create({
		data: {
			email: email,
			password:  bcrypt.hashSync(password, 10),
			name: name,
            token: generateId(),
		},
	});
	
    res.status(200).json({ msg: "User created" });
};

export { register };
