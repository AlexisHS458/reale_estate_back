import { Prisma } from "@prisma/client";
import prisma from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import { generateId } from "../../helpers/tokens";
import { errorHandler } from "../../handlers/error.handler.js";

const create = async (input: Prisma.UserCreateInput) => {
	console.log(input);

	return await prisma.user.create({
		data: {
			email: input.email,
			password: bcrypt.hashSync(input.password, 10),
			name: input.name,
			token: generateId(),
		},
	});
};

const confirmingEmail = async (idUser: number) => {
	return await prisma.user.update({
		where: {
			id: idUser,
		},
		data: {
			confirmed: true,
			token: "",
		},
	});
};

const forgotedPassword = async (email: string) => {
	
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});
	if (!user) {
		throw new Error("User not found");
	}
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

export { create, confirmingEmail, forgotedPassword };
