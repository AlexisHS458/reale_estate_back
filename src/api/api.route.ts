import express from "express";
import userRoutes from "./auth/auth.routes";
/* import propertyRoutes from "./properties/properties.routes"; */
const router = express.Router();

router.use("/auth", userRoutes)
/* router.use("/properties") */

export default router;