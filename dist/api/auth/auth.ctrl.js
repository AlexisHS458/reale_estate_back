"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.resetPassword = exports.forgotPassword = exports.confirmEmail = exports.register = void 0;
const auth_serv_1 = require("./auth.serv");
const response_handler_1 = require("../../handlers/response.handler");
const http_enum_1 = require("../../enums/http.enum");
const emails_1 = require("../../helpers/emails");
const express_validator_1 = require("express-validator");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokens_1 = require("../../helpers/tokens");
const register = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const userExists = await prisma_1.default.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (userExists) {
            throw new Error("User already exists");
        }
        const input = req.body;
        const user = await (0, auth_serv_1.create)(input);
        (0, response_handler_1.sendResponse)(res, http_enum_1.HttpStatus.CREATED, user);
        (0, emails_1.registerEmail)(user.email, user.token, user.name);
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const confirmEmail = async (req, res, next) => {
    try {
        const { token } = req.params;
        const user = await prisma_1.default.user.findFirst({
            where: {
                token: token,
            },
        });
        if (!user) {
            throw new Error("Invalid token");
        }
        await (0, auth_serv_1.confirmingEmail)(user.id);
        (0, response_handler_1.sendResponse)(res, http_enum_1.HttpStatus.OK, "Email confirmed");
    }
    catch (error) {
        next(error);
    }
};
exports.confirmEmail = confirmEmail;
const forgotPassword = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = await (0, auth_serv_1.forgotedPassword)(req.body.email);
        (0, response_handler_1.sendResponse)(res, http_enum_1.HttpStatus.OK, "Email sent");
        (0, emails_1.forgotEmail)(user.email, user.token, user.name);
    }
    catch (error) {
        next(error);
    }
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { token } = req.params;
        const { newPassword } = req.body;
        const user = await prisma_1.default.user.findFirst({
            where: {
                token: token,
            },
        });
        if (!user) {
            throw new Error("Invalid token");
        }
        await prisma_1.default.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: bcrypt_1.default.hashSync(newPassword, 10),
                token: "",
            },
        });
        (0, response_handler_1.sendResponse)(res, http_enum_1.HttpStatus.OK, "Password changed");
    }
    catch (error) {
        next(error);
    }
};
exports.resetPassword = resetPassword;
const login = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        const match = bcrypt_1.default.compareSync(password, user.password);
        if (!match) {
            throw new Error("Wrong password");
        }
        const token = (0, tokens_1.generateJwt)(user.id);
        (0, response_handler_1.sendResponse)(res, http_enum_1.HttpStatus.OK, { token });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
//# sourceMappingURL=auth.ctrl.js.map