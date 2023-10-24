import nodemailer from "nodemailer";
import {
	EMAIL_HOST,
	EMAIL_PASS,
	EMAIL_PORT,
	EMAIL_USER,
} from "../utils/constants";

let transport = nodemailer.createTransport({
	host: EMAIL_HOST,
	port: Number(EMAIL_PORT),
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PASS,
	},
});

const registerEmail = async (email, token, name) => {
	await transport.sendMail({
		from: "alexishs451@gmail.com",
		to: email,
		subject: "Welcome to the club",
		html: `<h1>Hi ${name}</h1>
        <p>Click <a href="http://localhost:3000/auth/confirm-email/${token}">here</a> to confirm your email</p>`,
	});
};

const forgotEmail = async (email, token, name) => {
	await transport.sendMail({
		from: "alexishs451@gmail.com",
		to: email,
		subject: "Reset your password",
		text: "Reset your password",
		html: `<h1>Hi ${name}</h1>
        <p>Click <a href="http://localhost:3000/auth/reset-password/${token}">here</a> to reset password</p>`,
	});
};

export { registerEmail, forgotEmail };
