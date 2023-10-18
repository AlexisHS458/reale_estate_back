"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_ctrl_1 = require("./auth.ctrl");
const register_schema_1 = require("./schema/register.schema");
const router = express_1.default.Router();
/* router.get("/login", loginForm);  */
router.post("/register", register_schema_1.registerSchema, auth_ctrl_1.register);
router.get("/confirm-email/:token", auth_ctrl_1.confirmEmail);
router.post("/reset-password/:token");
router.post("/forgot-password", auth_ctrl_1.forgotPassword);
/* router.get("/logout");
router.get("/forgot-password"); */
exports.default = router;
//# sourceMappingURL=auth.routes.js.map