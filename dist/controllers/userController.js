"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokens_1 = require("../helpers/tokens");
const register = async (req, res) => {
    await (0, express_validator_1.check)("email", "Email is not valid").isEmail().run(req);
    await (0, express_validator_1.check)("password", "Password must be at least 6 characters long")
        .isLength({ min: 6 })
        .run(req);
    await (0, express_validator_1.check)("confirmPassword", "Passwords do not match")
        .equals(req.body.password)
        .run(req);
    await (0, express_validator_1.check)("name", "Name is required").notEmpty().run(req);
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, name } = req.body;
    const userExists = await prisma_1.default.user.findUnique({
        where: {
            email: req.body.email,
        },
    });
    if (userExists) {
        return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    const user = await prisma_1.default.user.create({
        data: {
            email: email,
            password: bcrypt_1.default.hashSync(password, 10),
            name: name,
            token: (0, tokens_1.generateId)(),
        },
    });
    res.status(200).json({ msg: "User created" });
};
exports.register = register;
//# sourceMappingURL=userController.js.map