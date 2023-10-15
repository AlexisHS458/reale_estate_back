"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
/* router.get("/login", loginForm);  */
router.post("/register", userController_1.register);
/* router.get("/logout");
router.get("/forgot-password"); */
exports.default = router;
//# sourceMappingURL=userRoutes.js.map