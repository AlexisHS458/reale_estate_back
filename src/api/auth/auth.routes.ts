import express, { Request, Response } from "express";
import { confirmEmail, register, forgotPassword } from "./auth.ctrl";
import { registerSchema } from "./schema/register.schema";
const router = express.Router();

/* router.get("/login", loginForm);  */
router.post("/register", registerSchema, register);
router.get("/confirm-email/:token", confirmEmail);
router.post("/reset-password/:token");
router.post("/forgot-password", forgotPassword);
/* router.get("/logout");
router.get("/forgot-password"); */

export default router;
