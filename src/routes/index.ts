import express from "express";
import userRoutes from "../routes/userRoutes";

const router = express.Router();

router.use("/auth", userRoutes)


export default router;