"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogin = exports.handlePasswordReset = exports.handleForgotPassword = exports.handleEmailConfirmation = exports.handleRegister = void 0;
const auth_serv_1 = require("./auth.serv");
const response_handler_1 = require("../../handlers/response.handler");
const http_enum_1 = require("../../enums/http.enum");
const emails_1 = require("../../helpers/emails");
const express_validator_1 = require("express-validator");
const handleRegister = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const input = req.body;
        const user = await (0, auth_serv_1.registerUser)(input);
        (0, response_handler_1.sendResponse)(res, http_enum_1.HttpStatus.CREATED, user);
        (0, emails_1.registerEmail)(user.email, user.token, user.name);
    }
    catch (error) {
        next(error);
    }
};
exports.handleRegister = handleRegister;
const handleEmailConfirmation = async (req, res, next) => {
    try {
        const { token } = req.params;
        await (0, auth_serv_1.confirmEmail)(token);
        (0, response_handler_1.sendResponse)(res, http_enum_1.HttpStatus.OK, "Email confirmed");
    }
    catch (error) {
        next(error);
    }
};
exports.handleEmailConfirmation = handleEmailConfirmation;
const handleForgotPassword = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = await (0, auth_serv_1.forgotUserPassword)(req.body.email);
        (0, response_handler_1.sendResponse)(res, http_enum_1.HttpStatus.OK, "Email sent");
        (0, emails_1.forgotEmail)(user.email, user.token, user.name);
    }
    catch (error) {
        next(error);
    }
};
exports.handleForgotPassword = handleForgotPassword;
const handlePasswordReset = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { token } = req.params;
        const { newPassword } = req.body;
        const user = await (0, auth_serv_1.resetUserPassword)(token, newPassword);
        (0, response_handler_1.sendResponse)(res, http_enum_1.HttpStatus.OK, "Password changed");
    }
    catch (error) {
        next(error);
    }
};
exports.handlePasswordReset = handlePasswordReset;
const handleLogin = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        const token = await (0, auth_serv_1.loginUser)(email, password);
        (0, response_handler_1.sendResponse)(res, http_enum_1.HttpStatus.OK, { token });
    }
    catch (error) {
        next(error);
    }
};
exports.handleLogin = handleLogin;
//# sourceMappingURL=auth.ctrl.js.map