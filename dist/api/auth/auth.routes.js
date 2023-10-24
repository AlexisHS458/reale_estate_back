"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_ctrl_1 = require("./auth.ctrl");
const register_schema_1 = require("./schema/register.schema");
const forgotPassword_schema_1 = require("./schema/forgotPassword.schema");
const resetPassword_schema_1 = require("./schema/resetPassword.schema");
const login_schema_1 = require("./schema/login.schema");
const router = express_1.default.Router();
/* router.get("/login", loginForm);  */
router.post("/register", register_schema_1.registerSchema, auth_ctrl_1.handleRegister);
router.get("/confirm-email/:token", auth_ctrl_1.handleEmailConfirmation);
router.get("/reset-password/:token", resetPassword_schema_1.resetPasswordSchema, auth_ctrl_1.handlePasswordReset);
router.post("/forgot-password", forgotPassword_schema_1.forgotPasswordSchema, auth_ctrl_1.handleForgotPassword);
router.post("/login", login_schema_1.loginSchema, auth_ctrl_1.handleLogin);
/* router.get("/logout");
router.get("/forgot-password"); */
exports.default = router;
//# sourceMappingURL=auth.routes.js.map