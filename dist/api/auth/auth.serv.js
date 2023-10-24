"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.resetUserPassword = exports.forgotUserPassword = exports.confirmEmail = exports.registerUser = void 0;
const prisma_js_1 = __importDefault(require("../../lib/prisma.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokens_1 = require("../../helpers/tokens");
const registerUser = async (input) => {
    const userExists = await prisma_js_1.default.user.findUnique({
        where: {
            email: input.email,
        },
    });
    if (userExists) {
        throw new Error("User already exists");
    }
    return await prisma_js_1.default.user.create({
        data: {
            email: input.email,
            password: bcrypt_1.default.hashSync(input.password, 10),
            name: input.name,
            token: (0, tokens_1.generateId)(),
        },
    });
};
exports.registerUser = registerUser;
const confirmEmail = async (token) => {
    const user = await findUniqueUserByToken(token, "Invalid token");
    return await prisma_js_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            confirmed: true,
            token: "",
        },
    });
};
exports.confirmEmail = confirmEmail;
const forgotUserPassword = async (email) => {
    const user = await findUniqueUserByEmail(email, "User not found");
    const token = (0, tokens_1.generateId)();
    return await prisma_js_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            token,
        },
    });
};
exports.forgotUserPassword = forgotUserPassword;
const resetUserPassword = async (token, newPassword) => {
    const user = await findUniqueUserByToken(token, "Invalid token");
    await prisma_js_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: bcrypt_1.default.hashSync(newPassword, 10),
            token: "",
        },
    });
};
exports.resetUserPassword = resetUserPassword;
const loginUser = async (email, password) => {
    const user = await findUniqueUserByEmail(email, "User not found");
    const match = bcrypt_1.default.compareSync(password, user.password);
    if (!match) {
        throw new Error("Wrong password");
    }
    const token = (0, tokens_1.generateJwt)(user.id);
    return token;
};
exports.loginUser = loginUser;
const findUniqueUserByEmail = async (email, msg) => {
    const user = await prisma_js_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new Error(msg);
    }
    return user;
};
const findUniqueUserByToken = async (token, msg) => {
    const user = await prisma_js_1.default.user.findFirst({
        where: {
            token: token,
        },
    });
    if (!user) {
        throw new Error(msg);
    }
    return user;
};
//# sourceMappingURL=auth.serv.js.map