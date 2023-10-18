"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const registerEmail = async (email, token, name) => {
    const transport = nodemailer_1.default.createTransport({
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
exports.registerEmail = registerEmail;
//# sourceMappingURL=emails.js.map