"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwt = exports.generateId = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateId = () => {
    return Date.now().toString(32) + Math.random().toString(36).substring(2);
};
exports.generateId = generateId;
const generateJwt = (payload) => {
    return jsonwebtoken_1.default.sign({
        id: payload,
    }, "secret", {
        expiresIn: "1h",
    });
};
exports.generateJwt = generateJwt;
//# sourceMappingURL=tokens.js.map