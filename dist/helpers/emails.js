"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotEmail = exports.registerEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const constants_1 = require("../utils/constants");
let transport = nodemailer_1.default.createTransport({
    host: constants_1.EMAIL_HOST,
    port: Number(constants_1.EMAIL_PORT),
    auth: {
        user: constants_1.EMAIL_USER,
        pass: constants_1.EMAIL_PASS,
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
exports.registerEmail = registerEmail;
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
exports.forgotEmail = forgotEmail;
//# sourceMappingURL=emails.js.map