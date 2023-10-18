"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotedPassword = exports.confirmingEmail = exports.create = void 0;
const prisma_js_1 = __importDefault(require("../../lib/prisma.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokens_1 = require("../../helpers/tokens");
const create = async (input) => {
    console.log(input);
    return await prisma_js_1.default.user.create({
        data: {
            email: input.email,
            password: bcrypt_1.default.hashSync(input.password, 10),
            name: input.name,
            token: (0, tokens_1.generateId)(),
        },
    });
};
exports.create = create;
const confirmingEmail = async (idUser) => {
    return await prisma_js_1.default.user.update({
        where: {
            id: idUser,
        },
        data: {
            confirmed: true,
            token: "",
        },
    });
};
exports.confirmingEmail = confirmingEmail;
const forgotedPassword = async (email) => {
    const user = await prisma_js_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
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
exports.forgotedPassword = forgotedPassword;
//# sourceMappingURL=auth.serv.js.map