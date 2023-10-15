import express, { Request, Response } from "express";
import { register } from "../controllers/userController";

const router = express.Router();

/* router.get("/login", loginForm);  */
router.post("/register", register);
/* router.get("/logout");
router.get("/forgot-password"); */

export default router;