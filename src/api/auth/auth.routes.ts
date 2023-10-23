import express, { Request, Response } from "express";
import {
	confirmEmail,
	register,
	forgotPassword,
	resetPassword,
	login,
} from "./auth.ctrl";
import { registerSchema } from "./schema/register.schema";
import { forgotPasswordSchema } from "./schema/forgotPassword.schema";
import { resetPasswordSchema } from "./schema/resetPassword.schema";
import { loginSchema } from "./schema/login.schema";
const router = express.Router();

/* router.get("/login", loginForm);  */
router.post("/register", registerSchema, register);
router.get("/confirm-email/:token", confirmEmail);
router.get("/reset-password/:token", resetPasswordSchema, resetPassword);
router.post("/forgot-password", forgotPasswordSchema, forgotPassword);
router.post("/login", loginSchema, login);
/* router.get("/logout");
router.get("/forgot-password"); */

export default router;
