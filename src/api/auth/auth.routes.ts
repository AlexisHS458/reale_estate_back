import express, { Request, Response } from "express";
import {
	handleRegister,
	handleEmailConfirmation,
	handleForgotPassword,
	handlePasswordReset,
	handleLogin,

} from "./auth.ctrl";
import { registerSchema } from "./schema/register.schema";
import { forgotPasswordSchema } from "./schema/forgotPassword.schema";
import { resetPasswordSchema } from "./schema/resetPassword.schema";
import { loginSchema } from "./schema/login.schema";
const router = express.Router();

/* router.get("/login", loginForm);  */
router.post("/register", registerSchema, handleRegister);
router.get("/confirm-email/:token", handleEmailConfirmation);
router.get("/reset-password/:token", resetPasswordSchema, handlePasswordReset);
router.post("/forgot-password", forgotPasswordSchema, handleForgotPassword);
router.post("/login", loginSchema, handleLogin);
/* router.get("/logout");
router.get("/forgot-password"); */

export default router;
