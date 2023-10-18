import nodemailer from "nodemailer";

const registerEmail = async (email, token, name) => {
	const transport = nodemailer.createTransport({
		host: "sandbox.smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "44aac6aaf81f7a",
			pass: "8b935d63a08f5b",
		},
	});

	await transport.sendMail({
		from: "alexishs451@gmail.com",
		to: email,
		subject: "Welcome to the club",
		html: `<h1>Hi ${name}</h1>
        <p>Click <a href="http://localhost:3000/auth/confirm-email/${token}">here</a> to confirm your email</p>`,
	});
};

export { registerEmail };
