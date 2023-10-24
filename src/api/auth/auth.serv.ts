import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import { generateId, generateJwt } from "../../helpers/tokens";

const registerUser = async (input: Prisma.UserCreateInput) => {
	const userExists = await prisma.user.findUnique({
		where: {
			email: input.email,
		},
	});
	if (userExists) {
		throw new Error("User already exists");
	}
	return await prisma.user.create({
		data: {
			email: input.email,
			password: bcrypt.hashSync(input.password, 10),
			name: input.name,
			token: generateId(),
		},
	});
};

const confirmEmail = async (token: string) => {
	const user = await findUniqueUserByToken(token, "Invalid token");
	return await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			confirmed: true,
			token: "",
		},
	});
};

const forgotUserPassword = async (email: string) => {
	const user = await findUniqueUserByEmail(email, "User not found");
	const token = generateId();
	return await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			token,
		},
	});
};

const resetUserPassword = async (token: string, newPassword: string) => {
	const user = await findUniqueUserByToken(token, "Invalid token");
	await prisma.user.update({
		where: {
			id: user.id,
		},
		data: {
			password: bcrypt.hashSync(newPassword, 10),
			token: "",
		},
	});
};

const loginUser = async (email: string, password: string) => {
	const user = await findUniqueUserByEmail(email, "User not found");
	const match = bcrypt.compareSync(password, user.password);
	if (!match) {
		throw new Error("Wrong password");
	}
	const token = generateJwt(user.id);
	return token;
};

const findUniqueUserByEmail = async (email: string, msg: string) => {
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	if (!user) {
		throw new Error(msg);
	}
	return user;
};

const findUniqueUserByToken = async (token: string, msg: string) => {
	const user = await prisma.user.findFirst({
		where: {
			token: token,
		},
	});
	if (!user) {
		throw new Error(msg);
	}
	return user;
};

export {
	registerUser,
	confirmEmail,
	forgotUserPassword,
	resetUserPassword,
	loginUser,
};
